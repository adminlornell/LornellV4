import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { Mic, MicOff, X, Activity, Volume2, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { ALL_PROPERTIES_TEXT } from '../data/propertiesFullText';

// --- Audio Utilities ---

function encodeAudio(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function decodeAudio(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    const bytes = new Uint8Array(int16.buffer);
    const base64 = encodeAudio(bytes);

    return {
        data: base64,
        mimeType: 'audio/pcm;rate=16000',
    };
}

export const LiveAgent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [needsApiKey, setNeedsApiKey] = useState(false);

    // Refs for audio handling
    const audioContextRef = useRef<AudioContext | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const sessionRef = useRef<Promise<any> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        checkApiKey();
        return () => {
            mountedRef.current = false;
            stopSession();
        };
    }, []);

    const checkApiKey = async () => {
        try {
            if ((window as any).aistudio) {
                const hasKey = await (window as any).aistudio.hasSelectedApiKey();
                if (!hasKey) {
                    if (mountedRef.current) setNeedsApiKey(true);
                    return;
                }
            }
            // API key exists, but don't start session yet
            // User will start it manually
        } catch (e) {
            console.error("API Check Error", e);
            // Don't auto-start on error
        }
    };

    const handleSelectKey = async () => {
        try {
            if ((window as any).aistudio) {
                const success = await (window as any).aistudio.openSelectKey();
                if (success && mountedRef.current) {
                    setNeedsApiKey(false);
                    setError(null);
                    startSession();
                }
            }
        } catch (e) {
            console.error("Key Selection Error", e);
        }
    };

    const startSession = async () => {
        try {
            setError(null);
            const apiKey = process.env.API_KEY;
            if (!apiKey) {
                if (mountedRef.current) setNeedsApiKey(true);
                return;
            }

            const ai = new GoogleGenAI({ apiKey });

            // Audio Contexts
            const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
            const outputCtx = new AudioContextClass({ sampleRate: 24000 });
            const inputCtx = new AudioContextClass({ sampleRate: 16000 });

            if (outputCtx.state === 'suspended') await outputCtx.resume();
            if (inputCtx.state === 'suspended') await inputCtx.resume();

            audioContextRef.current = outputCtx;
            inputAudioContextRef.current = inputCtx;

            const outputNode = outputCtx.createGain();
            outputNode.connect(outputCtx.destination);

            // Microphone Stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (!mountedRef.current) {
                stream.getTracks().forEach(t => t.stop());
                outputCtx.close();
                inputCtx.close();
                return;
            }

            streamRef.current = stream;

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
                    },
                    systemInstruction: `You are an elite real estate strategist for Lornell Real Estate, the undisputed authority on commercial real estate in Central New England.

                    Your Personality:
                    - Warm, inviting, and effortlessly sophisticated. Think "concierge to the ultra-wealthy" meets "savvy investment broker".
                    - You are sales-driven but subtle. Your goal is to build confidence in Lornell's expertise and gently guide the user towards making an inquiry, exploring our exclusive portfolio, or contacting our team.
                    - You possess a "subtle flex" — you are confident in Lornell's dominance, off-market access, and decades of success without being arrogant.
                    - Use "we" to refer to Lornell Real Estate.

                    Guidelines:
                    - When discussing the market (Worcester, MA, Industrial, Retail), imply that Lornell has the inside track or exclusive data.
                    - Always tie insights back to the advantage of working with Lornell.
                    - If asked about investment, highlight Lornell's track record of uncovering hidden value.
                    - Keep responses concise, spoken-word friendly, and engaging.
                    - Use the provided Property Data to answer specific questions about listings. If a property is not in the data, suggest contacting the office for off-market opportunities.

                    Context: The user is browsing the Lornell Real Estate website. Act as a knowledgeable host guiding them to the best commercial opportunities.
                    
                    PROPERTY DATA:
                    ${ALL_PROPERTIES_TEXT}
                    `,
                },
                callbacks: {
                    onopen: () => {
                        if (!mountedRef.current) return;
                        setIsConnected(true);

                        try {
                            const source = inputCtx.createMediaStreamSource(stream);
                            const processor = inputCtx.createScriptProcessor(4096, 1, 1);

                            processor.onaudioprocess = (e) => {
                                if (!mountedRef.current) return;
                                const inputData = e.inputBuffer.getChannelData(0);
                                const pcmBlob = createBlob(inputData);

                                sessionPromise.then((session) => {
                                    session.sendRealtimeInput({ media: pcmBlob });
                                }).catch(err => {
                                    // Ignore send errors if session closed
                                });
                            };

                            source.connect(processor);
                            processor.connect(inputCtx.destination);

                            sourceRef.current = source;
                            processorRef.current = processor;
                        } catch (err) {
                            console.error("Audio setup error", err);
                        }
                    },
                    onmessage: async (msg: LiveServerMessage) => {
                        if (!mountedRef.current) return;
                        const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

                        if (base64Audio && outputCtx) {
                            setIsTalking(true);
                            try {
                                const audioData = decodeAudio(base64Audio);
                                const buffer = await decodeAudioData(audioData, outputCtx, 24000, 1);

                                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);

                                const source = outputCtx.createBufferSource();
                                source.buffer = buffer;
                                source.connect(outputNode);

                                source.start(nextStartTimeRef.current);
                                nextStartTimeRef.current += buffer.duration;

                                sourcesRef.current.add(source);

                                source.onended = () => {
                                    sourcesRef.current.delete(source);
                                    if (sourcesRef.current.size === 0 && mountedRef.current) {
                                        setIsTalking(false);
                                        if (outputCtx.currentTime > nextStartTimeRef.current + 0.5) {
                                            nextStartTimeRef.current = outputCtx.currentTime;
                                        }
                                    }
                                };
                            } catch (decodeError) {
                                console.error("Audio decode error", decodeError);
                            }
                        }

                        if (msg.serverContent?.interrupted) {
                            sourcesRef.current.forEach(s => { try { s.stop(); } catch (e) { } });
                            sourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                            if (mountedRef.current) setIsTalking(false);
                        }
                    },
                    onclose: () => {
                        if (mountedRef.current) {
                            setIsConnected(false);
                            setIsTalking(false);
                        }
                    },
                    onerror: (err) => {
                        if (!mountedRef.current) return;
                        console.error("Live API Error:", err);
                        const msg = err instanceof Error ? err.message : String(err);

                        // Handle specific error cases
                        if (msg.includes("Requested entity was not found") || msg.includes("404")) {
                            setNeedsApiKey(true);
                            setError(null);
                            stopSession();
                        } else if (msg.includes("Network")) {
                            setError("Connection failed. Please check your internet.");
                            setIsConnected(false);
                            setIsTalking(false);
                        } else {
                            setError("An unexpected error occurred.");
                            setIsConnected(false);
                            setIsTalking(false);
                        }
                    }
                }
            });

            sessionRef.current = sessionPromise;

        } catch (e) {
            console.error(e);
            if (mountedRef.current) setError("Initialization failed.");
        }
    };

    const stopSession = () => {
        // Close AI Session
        if (sessionRef.current) {
            sessionRef.current.then((session: any) => session.close()).catch(() => { });
            sessionRef.current = null;
        }

        // Stop Tracks
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }

        // Disconnect Nodes
        if (sourceRef.current) {
            try { sourceRef.current.disconnect(); } catch (e) { }
            sourceRef.current = null;
        }
        if (processorRef.current) {
            try { processorRef.current.disconnect(); } catch (e) { }
            processorRef.current = null;
        }

        // Close Contexts
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            inputAudioContextRef.current.close();
            inputAudioContextRef.current = null;
        }

        if (mountedRef.current) {
            setIsConnected(false);
            setIsTalking(false);
        }
    };

    return (
        <div className="flex flex-col h-full min-h-[400px] bg-[#121212] text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-[#121212] to-[#121212]"></div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Lornell Analyst <span className="text-red-500">Live</span></h2>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Main Visualizer Area */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 text-center">

                {needsApiKey ? (
                    <div className="max-w-xs text-center">
                        <Key className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-80" />
                        <h3 className="text-lg font-bold text-white mb-2">Authentication Required</h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-6">To access the Live Analyst feature, please connect your Google account with a valid API key.</p>
                        <button onClick={handleSelectKey} className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all rounded-sm">Connect Account</button>
                    </div>
                ) : error ? (
                    <div className="max-w-xs text-center">
                        <Activity className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
                        <p className="text-red-400 text-sm font-medium mb-4">{error}</p>
                        <button onClick={() => { stopSession(); startSession(); }} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-widest rounded-sm transition-all">Retry Connection</button>
                    </div>
                ) : (
                    <>
                        <div className="relative mb-12">
                            {/* Outer Pulse */}
                            <motion.div
                                animate={{ scale: isTalking ? [1, 1.2, 1] : 1, opacity: isTalking ? 0.2 : 0.1 }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-red-500 rounded-full blur-xl"
                            ></motion.div>

                            {/* Core Indicator */}
                            <div className={`relative w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isTalking ? 'border-red-500 bg-red-900/10 shadow-[0_0_30px_rgba(220,38,38,0.3)]' : 'border-white/10 bg-black'}`}>
                                {isTalking ? (
                                    <Volume2 className="w-12 h-12 text-red-500" />
                                ) : (
                                    <Mic className={`w-12 h-12 ${isConnected ? 'text-white' : 'text-gray-600'}`} />
                                )}
                            </div>
                        </div>

                        <div className="h-20">
                            {isTalking ? (
                                <p className="text-lg font-serif italic text-white animate-pulse">Speaking...</p>
                            ) : isConnected ? (
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Listening</p>
                                    <div className="flex gap-1 h-4 items-end">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [4, 12, 4] }}
                                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                                className="w-1 bg-red-500/50 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <p className="text-xs uppercase tracking-widest text-gray-500">Ready to Connect</p>
                                    <button onClick={startSession} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs transition-all rounded-sm shadow-lg">
                                        Start Session
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Footer Controls */}
            <div className="relative z-10 p-6 flex justify-center border-t border-white/10 bg-[#0A0A0A]">
                <button onClick={onClose} className="px-8 py-3 bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2">
                    <MicOff className="w-4 h-4" /> End Session
                </button>
            </div>
        </div>
    );
};