
import React, { useEffect, useRef, useState } from 'react';
import { Property } from '../types';
import { Layers, Car, Anchor, Bus, Move, Truck, MapPin, Info } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  onSelectProperty: (p: Property) => void;
  onBoundsChange: (visibleProperties: Property[]) => void;
}

const getMarkerColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('retail')) return '#DC2626'; // Red
    if (t.includes('multifamily')) return '#2563EB'; // Blue
    if (t.includes('office')) return '#FFFFFF'; // White
    if (t.includes('industrial')) return '#F97316'; // Orange
    if (t.includes('flex')) return '#EAB308'; // Yellow
    if (t.includes('land')) return '#16A34A'; // Green
    return '#9CA3AF'; // Gray default
};

export const MapComponent: React.FC<InteractiveMapProps> = ({ properties, onSelectProperty, onBoundsChange }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markerClusterRef = useRef<any>(null);
    const layerGroupsRef = useRef<{
        anchors: any;
        traffic: any;
        entrances: any;
        transit: any;
        tradeArea: any;
        amenities: any;
        loading: any;
    }>({ anchors: null, traffic: null, entrances: null, transit: null, tradeArea: null, amenities: null, loading: null });

    const isSingleProperty = properties.length === 1;
    const activeProperty = isSingleProperty ? properties[0] : null;
    const hasMapData = activeProperty?.mapData;

    const [layersState, setLayersState] = useState({
        anchors: true,
        traffic: true,
        entrances: false,
        transit: false,
        tradeArea: false
    });

    // Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        if ((window as any).L) {
            const L = (window as any).L;
            const map = L.map(mapContainerRef.current, { 
                zoomControl: false,
                attributionControl: false 
            }).setView([42.15, -71.85], 10);
            
            // Dark Matter Basemap
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap &copy; CARTO',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            L.control.zoom({ position: 'bottomright' }).addTo(map);

            map.on('moveend', () => {
                const bounds = map.getBounds();
                const visible = properties.filter((p: Property) => 
                    p.lat && p.lng && bounds.contains([p.lat, p.lng])
                );
                onBoundsChange(visible);
            });

            mapInstanceRef.current = map;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Handle Property Markers
    useEffect(() => {
        if (!mapInstanceRef.current || !(window as any).L) return;
        const L = (window as any).L;
        const map = mapInstanceRef.current;

        if (markerClusterRef.current) {
            map.removeLayer(markerClusterRef.current);
            markerClusterRef.current = null;
        }

        const createMarker = (prop: Property) => {
            const color = getMarkerColor(prop.type);
            const iconHtml = `
                <div style="
                    background-color: ${color}; 
                    width: 16px; 
                    height: 16px; 
                    border-radius: 50%; 
                    box-shadow: 0 0 0 4px rgba(0,0,0,0.5), 0 0 20px ${color}90; 
                    border: 2px solid #fff;
                    transition: transform 0.2s;
                "></div>`;
            
            const customIcon = L.divIcon({
                html: iconHtml,
                className: 'custom-map-marker',
                iconSize: [16, 16],
                iconAnchor: [8, 8],
                popupAnchor: [0, -12]
            });

            const marker = L.marker([prop.lat, prop.lng], { icon: customIcon, zIndexOffset: 1000 })
                .bindPopup(`
                    <div style="font-family: 'Inter', sans-serif; min-width: 220px; border: none;">
                        <div style="height: 120px; width: 100%; background-image: url('${prop.img}'); background-size: cover; background-position: center; border-radius: 4px 4px 0 0; margin-bottom: 10px;"></div>
                        <div style="padding: 0 4px;">
                            <span style="color: ${color}; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">${prop.type}</span>
                            <h3 style="font-weight: 600; font-size: 15px; margin: 4px 0; color: white; font-family: 'Playfair Display', serif;">${prop.address}</h3>
                            <p style="font-size: 12px; color: #9ca3af; margin-bottom: 12px;">${prop.city}, ${prop.state} | ${prop.status}</p>
                            <button id="popup-btn-${prop.id}" style="width: 100%; padding: 8px; background: white; border: none; color: black; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: background 0.2s;">View Details</button>
                        </div>
                    </div>
                `);

            marker.on('popupopen', () => {
                 setTimeout(() => {
                     const btn = document.getElementById(`popup-btn-${prop.id}`);
                     if(btn) {
                        btn.onclick = () => onSelectProperty(prop);
                        btn.onmouseenter = () => btn.style.background = '#e5e5e5';
                        btn.onmouseleave = () => btn.style.background = 'white';
                     }
                 }, 50);
            });
            return marker;
        };

        if (isSingleProperty) {
            const prop = properties[0];
            if (prop.lat && prop.lng) {
                const marker = createMarker(prop);
                map.addLayer(marker);
                markerClusterRef.current = marker; 
                map.setView([prop.lat, prop.lng], 16);
            }
        } else {
            if (L.markerClusterGroup) {
                const markers = L.markerClusterGroup({
                    showCoverageOnHover: false,
                    maxClusterRadius: 40,
                    spiderfyOnMaxZoom: true,
                    iconCreateFunction: function (cluster: any) {
                        const count = cluster.getChildCount();
                        return L.divIcon({
                            html: `<div style="background-color: #DC2626; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #121212; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">${count}</div>`,
                            className: 'custom-cluster-icon',
                            iconSize: L.point(32, 32)
                        });
                    }
                });

                properties.forEach(prop => {
                    if (prop.lat && prop.lng) {
                        markers.addLayer(createMarker(prop));
                    }
                });

                map.addLayer(markers);
                markerClusterRef.current = markers;

                if (properties.length > 0 && !mapInstanceRef.current._loadedBounds) {
                    map.fitBounds(markers.getBounds(), { padding: [80, 80], maxZoom: 14 });
                    mapInstanceRef.current._loadedBounds = true;
                }
            }
        }

    }, [properties, isSingleProperty, onSelectProperty]);

    // Handle Overlays
    useEffect(() => {
        if (!mapInstanceRef.current || !(window as any).L) return;
        const L = (window as any).L;
        const map = mapInstanceRef.current;
        const groups = layerGroupsRef.current;

        Object.values(groups).forEach((group: any) => {
            if (group) map.removeLayer(group);
        });

        if (!isSingleProperty || !hasMapData || !activeProperty?.mapData) return;

        const data = activeProperty.mapData;

        // 1. Anchors (includes anchors + amenities)
        if (layersState.anchors) {
            const anchorLayer = L.layerGroup();
            if (data.anchors) {
                data.anchors.forEach(p => {
                    const icon = L.divIcon({
                        html: `<div style="background: #DC2626; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 10px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.5); border: 1px solid white; display: flex; align-items: center; gap: 4px;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"/></svg>
                                ${p.label}
                            </div>`,
                        className: 'anchor-label',
                        iconSize: [140, 24],
                        iconAnchor: [70, 30]
                    });
                    L.marker([p.lat, p.lng], { icon }).addTo(anchorLayer);
                });
            }
            if (data.amenities) {
                 data.amenities.forEach(p => {
                    const icon = L.divIcon({
                        html: `<div style="background: #9333EA; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 10px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.5); border: 1px solid white; display: flex; align-items: center; gap: 4px;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                ${p.label}
                            </div>`,
                        className: 'amenity-label',
                        iconSize: [140, 24],
                        iconAnchor: [70, 30]
                    });
                    L.marker([p.lat, p.lng], { icon }).addTo(anchorLayer);
                });
            }
            anchorLayer.addTo(map);
            groups.anchors = anchorLayer;
        }

        // 2. Traffic (includes traffic + highwayAccess)
        if (layersState.traffic) {
            const trafficLayer = L.layerGroup();
            if (data.traffic) {
                data.traffic.forEach(p => {
                    const icon = L.divIcon({
                        html: `<div style="background: #1F2937; color: #60A5FA; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; white-space: nowrap; border: 1px solid #374151; display: flex; align-items: center; gap: 4px;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63a6 6 0 0 0-.24 1.64V16h3m0 0h5v-5"/></svg>
                                ${p.label}
                            </div>`,
                        className: 'traffic-label',
                        iconSize: [100, 24],
                        iconAnchor: [50, 12]
                    });
                    L.marker([p.lat, p.lng], { icon }).addTo(trafficLayer);
                });
            }
            if (data.highwayAccess) {
                const p = data.highwayAccess;
                const icon = L.divIcon({
                    html: `<div style="background: #2563EB; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; white-space: nowrap; border: 1px solid white; display: flex; align-items: center; gap: 4px;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 7h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2m-6 0h-2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2m-2 10h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2m6 0h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2"/></svg>
                            ${p.label}
                        </div>`,
                    className: 'highway-label',
                    iconSize: [120, 24],
                    iconAnchor: [60, 12]
                });
                L.marker([p.lat, p.lng], { icon }).addTo(trafficLayer);
            }
            trafficLayer.addTo(map);
            groups.traffic = trafficLayer;
        }

        // 3. Entrances (includes entrances + loadingDocks)
        if (layersState.entrances) {
            const entranceLayer = L.layerGroup();
            if (data.entrances) {
                data.entrances.forEach(p => {
                    const icon = L.divIcon({
                        html: `<div style="color: #10B981; background: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                            </div>`,
                        className: 'entrance-icon',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    });
                    L.marker([p.lat, p.lng], { icon }).addTo(entranceLayer);
                });
            }
            if (data.loadingDocks) {
                 data.loadingDocks.forEach(p => {
                    const icon = L.divIcon({
                        html: `<div style="background: #CA8A04; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px; white-space: nowrap; border: 1px solid white; display: flex; align-items: center; gap: 4px;">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                                ${p.label}
                            </div>`,
                        className: 'dock-label',
                        iconSize: [100, 20],
                        iconAnchor: [50, 20]
                    });
                    L.marker([p.lat, p.lng], { icon }).addTo(entranceLayer);
                });
            }
            entranceLayer.addTo(map);
            groups.entrances = entranceLayer;
        }

        // 4. Transit
        if (data.transit && layersState.transit) {
            const transitLayer = L.layerGroup();
            data.transit.forEach(p => {
                const icon = L.divIcon({
                    html: `<div style="background: #F59E0B; color: black; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 10px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.5); border: 1px solid white; display: flex; align-items: center; gap: 4px;">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 20v2"/><path d="M18 20v2"/><path d="M8 4v4"/><path d="M16 4v4"/><path d="M2 8h20"/></svg>
                             ${p.label}
                           </div>`,
                    className: 'transit-label',
                    iconSize: [120, 24],
                    iconAnchor: [60, 30]
                });
                L.marker([p.lat, p.lng], { icon }).addTo(transitLayer);
            });
            transitLayer.addTo(map);
            groups.transit = transitLayer;
        }

        // 5. Trade Area
        if (data.hasTradeArea && layersState.tradeArea) {
            const tradeLayer = L.featureGroup();
            const center = [activeProperty.lat, activeProperty.lng];
            
            L.circle(center, { radius: 1609, color: '#fff', weight: 1, fillOpacity: 0.05, dashArray: '5, 5' }).addTo(tradeLayer);
            L.circle(center, { radius: 4828, color: '#fff', weight: 1, fillOpacity: 0.05, dashArray: '5, 5' }).addTo(tradeLayer);
            L.circle(center, { radius: 8046, color: '#fff', weight: 1, fillOpacity: 0.05, dashArray: '5, 5' }).addTo(tradeLayer);

            tradeLayer.addTo(map);
            groups.tradeArea = tradeLayer;

            if (layersState.tradeArea) {
                map.fitBounds(tradeLayer.getBounds(), { padding: [20, 20] });
            }
        }

    }, [isSingleProperty, hasMapData, layersState, activeProperty]);

    const toggleLayer = (layer: keyof typeof layersState) => {
        setLayersState(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    return (
        <div className="relative w-full h-full">
            <div ref={mapContainerRef} className="w-full h-full bg-[#121212] z-0" />
            
            {isSingleProperty && hasMapData && (
                <>
                <div className="absolute top-6 right-6 z-[1000] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-sm shadow-2xl max-w-[200px]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                        <Layers className="w-3 h-3" /> Map Layers
                    </h4>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-[10px] uppercase font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-2"><Anchor className="w-3 h-3" /> Anchors</span>
                            <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" checked={layersState.anchors} onChange={() => toggleLayer('anchors')} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300" style={{ right: layersState.anchors ? '0' : 'auto', left: layersState.anchors ? 'auto' : '0', borderColor: layersState.anchors ? '#EF4444' : '#ccc' }}/>
                                <label className={`toggle-label block overflow-hidden h-4 rounded-full cursor-pointer ${layersState.anchors ? 'bg-red-900' : 'bg-gray-700'}`}></label>
                            </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-[10px] uppercase font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-2"><Car className="w-3 h-3" /> Traffic</span>
                            <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" checked={layersState.traffic} onChange={() => toggleLayer('traffic')} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300" style={{ right: layersState.traffic ? '0' : 'auto', left: layersState.traffic ? 'auto' : '0', borderColor: layersState.traffic ? '#3B82F6' : '#ccc' }}/>
                                <label className={`toggle-label block overflow-hidden h-4 rounded-full cursor-pointer ${layersState.traffic ? 'bg-blue-900' : 'bg-gray-700'}`}></label>
                            </div>
                        </label>

                         <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-[10px] uppercase font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-2"><Move className="w-3 h-3" /> Access</span>
                            <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" checked={layersState.entrances} onChange={() => toggleLayer('entrances')} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300" style={{ right: layersState.entrances ? '0' : 'auto', left: layersState.entrances ? 'auto' : '0', borderColor: layersState.entrances ? '#10B981' : '#ccc' }}/>
                                <label className={`toggle-label block overflow-hidden h-4 rounded-full cursor-pointer ${layersState.entrances ? 'bg-green-900' : 'bg-gray-700'}`}></label>
                            </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-[10px] uppercase font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-2"><Bus className="w-3 h-3" /> Transit</span>
                            <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" checked={layersState.transit} onChange={() => toggleLayer('transit')} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300" style={{ right: layersState.transit ? '0' : 'auto', left: layersState.transit ? 'auto' : '0', borderColor: layersState.transit ? '#F59E0B' : '#ccc' }}/>
                                <label className={`toggle-label block overflow-hidden h-4 rounded-full cursor-pointer ${layersState.transit ? 'bg-yellow-900' : 'bg-gray-700'}`}></label>
                            </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-[10px] uppercase font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-2"><Layers className="w-3 h-3" /> Trade Area</span>
                            <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" checked={layersState.tradeArea} onChange={() => toggleLayer('tradeArea')} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300" style={{ right: layersState.tradeArea ? '0' : 'auto', left: layersState.tradeArea ? 'auto' : '0', borderColor: layersState.tradeArea ? '#ffffff' : '#ccc' }}/>
                                <label className={`toggle-label block overflow-hidden h-4 rounded-full cursor-pointer ${layersState.tradeArea ? 'bg-gray-500' : 'bg-gray-700'}`}></label>
                            </div>
                        </label>
                    </div>
                </div>
                
                {/* Info Cards for non-layer data (Flood/Walkability) */}
                <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-2">
                    {hasMapData.floodRisk && (
                        <div className="bg-black/80 backdrop-blur-md border border-red-900/50 p-3 rounded-sm shadow-lg flex items-center gap-3 max-w-[220px]">
                            <div className="p-2 bg-red-900/30 rounded-full text-red-500"><Info className="w-4 h-4"/></div>
                            <div>
                                <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Flood Risk</p>
                                <p className="text-white text-xs font-bold">{hasMapData.floodRisk.status} <span className="text-red-500">({hasMapData.floodRisk.zone})</span></p>
                            </div>
                        </div>
                    )}
                     {hasMapData.walkability && (
                        <div className="bg-black/80 backdrop-blur-md border border-green-900/50 p-3 rounded-sm shadow-lg flex items-center gap-3 max-w-[220px]">
                            <div className="p-2 bg-green-900/30 rounded-full text-green-500"><MapPin className="w-4 h-4"/></div>
                            <div>
                                <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Walk Score®</p>
                                <p className="text-white text-xs font-bold">{hasMapData.walkability.score} <span className="text-green-500">({hasMapData.walkability.label})</span></p>
                            </div>
                        </div>
                    )}
                </div>
                </>
            )}
        </div>
    );
};
