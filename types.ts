
export interface PropertyContact {
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  img?: string;
}

export interface PropertyMarketStats {
  avgRent: string;
  vacancyRate: string;
  trend: string;
}

export interface PropertyAvailability {
  total: string;
  contiguous: string;
  minDivisible: string;
  type: string;
}

export interface PropertyFinancials {
  rent?: string;
  pricePerSF?: string;
  leaseType: string;
  taxRate?: string;
  capRate?: string;
  noi?: string;
}

export interface PropertyDetails {
  buildingName?: string;
  yearBuilt?: string;
  lotSize?: string;
  parking?: string;
  zoning?: string;
  tenancy?: string;
  construction?: string;
  anchor?: string;
  loading?: string;
  power?: string;
  stories?: string;
  sprinklers?: string;
  elevators?: string;
}

export interface MapLayerPoint {
  lat: number;
  lng: number;
  label: string;
}

export interface FloodRisk {
  status: string;
  zone: string;
}

export interface Walkability {
  score: string;
  label: string;
}

export interface PropertyMapData {
  anchors?: MapLayerPoint[];
  traffic?: MapLayerPoint[];
  entrances?: MapLayerPoint[];
  transit?: MapLayerPoint[];
  amenities?: MapLayerPoint[];
  loadingDocks?: MapLayerPoint[];
  highwayAccess?: MapLayerPoint;
  trafficCount?: string;
  floodRisk?: FloodRisk;
  walkability?: Walkability;
  specs?: { label: string }[];
  hasTradeArea?: boolean;
  visibility?: { label: string };
}

export interface Property {
  id: number;
  address: string;
  city: string;
  zip?: string;
  state: string;
  type: 'Retail' | 'Industrial' | 'Office' | 'Multifamily' | 'Flex' | 'Land' | 'Hospitality' | string;
  subtype?: string;
  status: 'For Lease' | 'For Sale' | 'Under Contract' | 'Sold';
  price: string;
  size: string;
  img: string;
  images?: string[]; // Array of additional images for carousel
  description?: string;
  headline?: string;
  details?: PropertyDetails;
  financials?: PropertyFinancials;
  availability?: PropertyAvailability;
  marketStats?: PropertyMarketStats;
  contact?: PropertyContact;
  lat: number;
  lng: number;
  mapData?: PropertyMapData;
}

export interface SafeProperty {
  address: string;
  location: {
    city: string;
    state: string;
    zip: string;
    county?: string;
    coordinates?: string;
    market?: string;
    submarket?: string;
    cluster?: string;
  };
  price_per_sf: number;
  size_sf: string;
  type: string;
  status: string;
  description: string;
  building: {
    class: string;
    rating: number;
    status: string;
    year_built: number;
    size_sf: string;
    floor_size_sf?: string;
    stories?: number;
    land_area_acres?: number;
    land_area_sf?: string;
    construction_type?: string;
    collateral_type?: string;
    construction_status?: string;
    ownership?: string;
  };
  financial: {
    rent_per_sf: number;
    occupancy_rate?: number;
    vacancy_rate?: number;
    tax_rate_per_sf?: number;
    annual_taxes?: number;
    tax_year?: number;
    building_expenses_note?: string;
    days_on_market?: number;
    operating_expenses_per_sf?: number;
  };
  features: Record<string, any>;
  space_availability: Record<string, any>;
  energy_certifications?: Record<string, any>;
  fema_flood?: Record<string, any>;
  anchor_tenants?: string[];
  transit?: Record<string, any>;
}

export interface Article {
  id: number;
  title: string;
  category: 'Market Analysis' | 'Development' | 'Regulation';
  date: string;
  summary: string;
  imageUrl: string;
}
