
import { Property, Article } from './types';

const COLLIN_CONTACT = {
    name: "Collin Mulcahy",
    role: "Broker",
    company: "Lornell Real Estate",
    phone: "860-305-7432",
    email: "collin@lornell.com",
    img: "./images/collin.jpg"
};

export const PROPERTY_DATA: Property[] = [
  { 
    id: 1, 
    address: "133 Main St", 
    city: "Spencer", 
    state: "MA",
    zip: "01562",
    type: "Retail", 
    subtype: "Freestanding / Shopping Center",
    status: "For Lease", 
    price: "$12.00/SF", 
    size: "53,103 SF", 
    img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2677&auto=format&fit=crop",
    description: "Step into a premier retail destination in the heart of Outlying Worcester. Spencer Shopper's Village is not just a location; it's a community cornerstone anchored by CVS Pharmacy. Spanning over 53,000 square feet on 5.46 acres, this masonry retail center offers exceptional visibility and accessibility.",
    headline: "PRIME RETAIL ANCHOR OPPORTUNITY",
    details: {
        buildingName: "Spencer Shopper's Village",
        yearBuilt: "1962",
        lotSize: "5.46 Acres",
        parking: "228 Spaces (4.29 Ratio)",
        zoning: "TC",
        tenancy: "Multi-Tenant",
        construction: "Masonry",
        anchor: "CVS Pharmacy (7,900 SF)"
    },
    financials: {
        rent: "$12.00 / SF",
        leaseType: "Triple Net (NNN)",
        taxRate: "$0.0091/SF"
    },
    availability: {
        total: "8,056 SF",
        contiguous: "8,056 SF",
        minDivisible: "8,056 SF", 
        type: "Direct Lease"
    },
    contact: COLLIN_CONTACT,
    lat: 42.2451,
    lng: -71.9934,
    mapData: {
      anchors: [{ lat: 42.2451, lng: -71.9945, label: "CVS Pharmacy" }],
      trafficCount: "Rte 9: ~16,000 ADT",
      traffic: [{ lat: 42.2450, lng: -71.9910, label: "ADT: ~16,000" }], // Visual label
      entrances: [
          { lat: 42.2442, lng: -71.9934, label: "Main Entrance" },
          { lat: 42.2442, lng: -71.9925, label: "Secondary Entrance" }
      ],
      hasTradeArea: true,
      floodRisk: { status: "High", zone: "AE (100-yr)" }
    }
  },
  { 
    id: 2, 
    address: "21-69 S Main St", 
    city: "Leicester", 
    state: "MA",
    zip: "01524",
    type: "Flex", 
    subtype: "Industrial / Mill Redevelopment",
    status: "For Sale", 
    price: "$3,500,000", 
    size: "74,745 SF", 
    headline: "HISTORIC MILL REDEVELOPMENT", 
    img: "https://images.unsplash.com/photo-1565610222536-ef125c59da2c?q=80&w=2670&auto=format&fit=crop",
    description: "A massive 74,745 SF flex/industrial complex located in the heart of Leicester. This historic masonry property offers incredible value-add potential. Featuring high ceilings, robust construction, and significant land area, this asset is primed for adaptive reuse.",
    details: {
        buildingName: "Historic Leicester Mill",
        yearBuilt: "1880",
        lotSize: "3.74 Acres",
        parking: "60 Spaces",
        zoning: "B",
        tenancy: "Multi-Tenant",
        construction: "Masonry",
        loading: "4 Docks, 2 Drive-Ins",
        stories: "3",
        sprinklers: "Wet"
    },
    financials: {
        pricePerSF: "$46.83 / SF",
        leaseType: "Fee Simple Sale",
        capRate: "6.46%"
    },
    availability: {
        total: "50,000 SF",
        contiguous: "20,000 SF",
        minDivisible: "300 SF", 
        type: "Sale or Lease"
    },
    contact: COLLIN_CONTACT,
    lat: 42.2412670,
    lng: -71.8661787,
    mapData: {
      trafficCount: "Rte 9: High Traffic",
      loadingDocks: [
        { lat: 42.2411, lng: -71.8660, label: "4 Loading Docks" },
        { lat: 42.2413, lng: -71.8663, label: "2 Drive-In Doors" }
      ],
      transit: [{ lat: 42.2415, lng: -71.8650, label: "Worcester Regional Transit" }]
    }
  },
  { 
    id: 3, 
    address: "1155 Victory Hwy", 
    city: "Burrillville", 
    state: "RI",
    zip: "02858",
    type: "Industrial", 
    subtype: "Warehouse",
    status: "For Sale", 
    price: "$1,800,000", 
    size: "10,000 SF", 
    headline: "PREMIUM INDUSTRIAL WAREHOUSE", 
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
    description: "High-quality metal construction warehouse facility situated on 0.45 acres in Northern Rhode Island. Features exceptional clear heights (21'), heavy power (400a 3p), and three loading docks.",
    details: {
        buildingName: "Victory Highway Industrial",
        yearBuilt: "1987",
        lotSize: "0.45 Acres",
        parking: "27 Spaces",
        zoning: "GC",
        tenancy: "Single Tenant",
        construction: "Metal",
        loading: "3 Docks, 1 Drive-In",
        power: "400a 3p",
        stories: "1"
    },
    financials: {
        pricePerSF: "$180.00 / SF",
        taxRate: "$0.6451/SF",
        leaseType: "Fee Simple Sale",
        capRate: "5.56%"
    },
    availability: {
        total: "10,000 SF",
        contiguous: "10,000 SF",
        minDivisible: "10,000 SF", 
        type: "Sale"
    },
    contact: COLLIN_CONTACT,
    lat: 41.9569016,
    lng: -71.6475405,
    mapData: {
      trafficCount: "Rte 102 Access",
      highwayAccess: { lat: 41.9600, lng: -71.6500, label: "To Rte 146/I-395" },
      loadingDocks: [
        { lat: 41.9569, lng: -71.6476, label: "3 Loading Docks" },
        { lat: 41.9571, lng: -71.6474, label: "1 Drive-In Door" }
      ],
      specs: [{ label: "21' Clear Height" }, { label: "400a Power" }]
    }
  },
  { 
    id: 4, 
    address: "12 Crane St", 
    city: "Southbridge", 
    state: "MA",
    zip: "01550",
    type: "Retail", 
    status: "For Lease", 
    price: "$15.00/SF", 
    size: "26,400 SF", 
    img: "https://images.unsplash.com/photo-1519567241046-7f570eee3c9e?q=80&w=2574&auto=format&fit=crop", 
    description: "Multi-tenant retail property with 90% occupancy. Excellent value-add potential in Southbridge. 3-story building with 26,400 SF on 0.68 acres.",
    details: {
      yearBuilt: "1930",
      lotSize: "0.68 Acres",
      zoning: "CC",
      parking: "30 Spaces",
      stories: "3",
      tenancy: "Multi-Tenant"
    },
    availability: {
      total: "2,500 SF",
      contiguous: "2,500 SF",
      minDivisible: "1,500 SF",
      type: "Direct Lease"
    },
    financials: {
        rent: "$15.00 / SF",
        leaseType: "Triple Net",
        taxRate: "$0.6875/SF"
    },
    contact: COLLIN_CONTACT, 
    lat: 42.0804910, 
    lng: -72.0351780,
    mapData: {
      trafficCount: "Main St Intersection",
      anchors: [{ lat: 42.0730, lng: -72.0280, label: "Big Y Market" }],
      entrances: [{ lat: 42.0804, lng: -72.0352, label: "30 Dedicated Spaces" }],
      hasTradeArea: true
    }
  },
  { 
    id: 5, 
    address: "15 Crane St", 
    city: "Southbridge", 
    state: "MA",
    zip: "01550",
    type: "Retail", 
    status: "For Lease", 
    price: "$20.00/SF", 
    size: "7,344 SF", 
    img: "https://images.unsplash.com/photo-1559856579-bb6e15a9a82b?q=80&w=2670&auto=format&fit=crop", 
    description: "Storefront retail/residential mix. High visibility location. 2-story building built in 1888.",
    details: { yearBuilt: "1888", lotSize: "0.09 Acres", zoning: "GC", stories: "2", tenancy: "Multi-Tenant" },
    availability: { total: "400 SF", contiguous: "400 SF", minDivisible: "400 SF", type: "Direct Lease" },
    financials: {
        rent: "$20.00 / SF",
        leaseType: "Full Service",
        taxRate: "$0.8843/SF"
    },
    contact: COLLIN_CONTACT, 
    lat: 42.0802186, 
    lng: -72.0353897,
    mapData: {
      trafficCount: "Main St Intersection",
      anchors: [{ lat: 42.0730, lng: -72.0280, label: "Big Y Market" }],
      hasTradeArea: true
    }
  },
  { 
    id: 6, 
    address: "15 Hamilton St", 
    city: "Southbridge", 
    state: "MA",
    zip: "01550",
    type: "Retail", 
    status: "For Lease", 
    price: "$12.00/SF", 
    size: "7,757 SF", 
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2670&auto=format&fit=crop", 
    description: "Classic storefront retail property in Southbridge. Masonry construction with 2 stories.",
    details: { yearBuilt: "1900", lotSize: "0.12 Acres", zoning: "CC", stories: "2", construction: "Masonry", tenancy: "Multi-Tenant" },
    availability: { total: "1,600 SF", contiguous: "1,600 SF", minDivisible: "800 SF", type: "Direct Lease" },
    financials: { rent: "$12.00 / SF", leaseType: "Triple Net", taxRate: "$0.5141/SF" },
    contact: COLLIN_CONTACT, 
    lat: 42.0765307, 
    lng: -72.0348137,
    mapData: {
      trafficCount: "Main St Intersection",
      anchors: [{ lat: 42.0730, lng: -72.0280, label: "Big Y Market" }],
      hasTradeArea: true
    }
  },
  { 
    id: 7, 
    address: "21 Pearl St", 
    city: "Webster", 
    state: "MA",
    zip: "01570",
    type: "Industrial", 
    status: "For Lease", 
    price: "$6.00/SF", 
    size: "58,000 SF", 
    headline: "RIVERFRONT MILL INDUSTRIAL",
    description: "Classic masonry mill building offering affordable industrial space with river frontage. Renovated in 2021.",
    img: "https://images.unsplash.com/photo-1535473895227-563728b8e875?q=80&w=2670&auto=format&fit=crop", 
    details: { yearBuilt: "1924", lotSize: "2.18 Acres", zoning: "IND", loading: "4 Docks", construction: "Masonry", stories: "3", sprinklers: "Wet" },
    availability: { total: "58,000 SF", contiguous: "25,000 SF", minDivisible: "8,000 SF", type: "Direct Lease" },
    financials: { rent: "$6.00 / SF", leaseType: "Plus Utilities", taxRate: "$0.2763/SF" },
    contact: COLLIN_CONTACT, 
    lat: 42.0583459, 
    lng: -71.8794360,
    mapData: {
      highwayAccess: { lat: 42.0550, lng: -71.8750, label: "I-395 Access (1 mi)" },
      loadingDocks: [{ lat: 42.0583, lng: -71.8794, label: "4 Loading Docks" }],
      specs: [{ label: "29k SF Office" }, { label: "Renovated 2021" }],
      floodRisk: { status: "High", zone: "AE (100-yr)" }
    }
  },
  { 
    id: 8, 
    address: "2323 Mass Ave", 
    city: "Cambridge", 
    state: "MA",
    zip: "02140",
    type: "Retail", 
    status: "For Lease", 
    price: "$35.00/SF", 
    size: "12,512 SF", 
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", 
    headline: "CAMBRIDGE STOREFRONT",
    description: "Highly desirable retail location in the W Cambridge/Alewife submarket. High foot traffic and visibility.",
    details: { yearBuilt: "1960", lotSize: "0.29 Acres", zoning: "BA2", stories: "1", construction: "Masonry", tenancy: "Multi-Tenant" },
    availability: { total: "650 SF", contiguous: "650 SF", minDivisible: "650 SF", type: "Direct Lease" },
    financials: { rent: "$35.00 / SF", taxRate: "$1.9102/SF", leaseType: "Direct" },
    contact: COLLIN_CONTACT, 
    lat: 42.3959770, 
    lng: -71.1283220,
    mapData: {
      trafficCount: "Mass Ave: Heavy Vol.",
      transit: [
        { lat: 42.3884, lng: -71.1191, label: "Porter Sq (Red Line)" },
        { lat: 42.3960, lng: -71.1284, label: "Bus Stop (77/96)" }
      ],
      walkability: { score: "95", label: "Walker's Paradise" }
    }
  },
  { 
    id: 9, 
    address: "253-255 Main St", 
    city: "Webster", 
    state: "MA",
    zip: "01570",
    type: "Office", 
    subtype: "Loft/Creative",
    status: "For Lease", 
    price: "$6-14/SF", 
    size: "19,370 SF", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop", 
    description: "Loft/Creative Office space in Webster. Features wet sprinklers, masonry construction, and significant parking ratio (5.11).",
    details: { yearBuilt: "1900", stories: "3", zoning: "GB-4 W", parking: "99 Spaces", construction: "Masonry", sprinklers: "Wet", tenancy: "Multi-Tenant" },
    availability: { total: "8,575 SF", contiguous: "4,000 SF", minDivisible: "500 SF", type: "Direct Lease" },
    financials: { rent: "$6.00 - 14.00 / SF", leaseType: "Modified Gross", taxRate: "$0.6995/SF" },
    contact: COLLIN_CONTACT, 
    lat: 42.0495471, 
    lng: -71.8824892 
  },
  { 
    id: 10, 
    address: "300 Main St", 
    city: "Southbridge", 
    state: "MA",
    zip: "01550",
    type: "Retail", 
    status: "For Lease", 
    price: "$8.17-9.98/SF", 
    size: "4,135 SF", 
    img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2664&auto=format&fit=crop", 
    description: "Storefront Retail/Office in Southbridge. 3-story masonry building situated on Main St.",
    details: { yearBuilt: "1900", lotSize: "0.04 Acres", zoning: "CC", stories: "3", construction: "Masonry", tenancy: "Multi-Tenant" },
    financials: { rent: "$8.17 - 9.98 / SF", leaseType: "Triple Net", taxRate: "$0.8430/SF" },
    availability: { total: "Call for Details", contiguous: "0 SF", minDivisible: "0 SF", type: "Lease" },
    contact: COLLIN_CONTACT, 
    lat: 42.0753680, 
    lng: -72.0340350,
    mapData: {
      trafficCount: "Main St Intersection",
      anchors: [{ lat: 42.0730, lng: -72.0280, label: "Big Y Market" }],
      hasTradeArea: true
    }
  },
  { 
    id: 11, 
    address: "368 Main St", 
    city: "Southbridge", 
    state: "MA",
    zip: "01550",
    type: "Office", 
    status: "For Lease", 
    price: "$12.00/SF", 
    size: "8,822 SF", 
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop", 
    description: "Office / Loft Creative Space. Historic 1841 build with 2 stories.",
    details: { yearBuilt: "1841", lotSize: "0.12 Acres", zoning: "CC", stories: "2", parking: "6 Spaces", tenancy: "Multi-Tenant" },
    availability: { total: "4,100 SF", contiguous: "2,500 SF", minDivisible: "800 SF", type: "Direct Lease" },
    financials: { rent: "$12.00 / SF", leaseType: "Modified Gross", taxRate: "$0.5235/SF" },
    contact: COLLIN_CONTACT, 
    lat: 42.0762818, 
    lng: -72.0350693 
  },
  { 
    id: 12, 
    address: "415 Main St", 
    city: "Worcester", 
    state: "MA",
    zip: "01608",
    type: "Office", 
    status: "For Sale", 
    price: "$219,000", 
    size: "27,012 SF", 
    img: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2674&auto=format&fit=crop", 
    headline: "DOWNTOWN OFFICE OPPORTUNITY",
    description: "Medical/Office condo in downtown Worcester. Features elevators, bio-tech capability, and 24-hour access. 4 stories, masonry construction.",
    details: { yearBuilt: "1900", lotSize: "0.12 Acres", zoning: "BG-6", stories: "4", elevators: "4", construction: "Masonry", tenancy: "Multi-Tenant" },
    availability: { total: "3,495 SF", contiguous: "3,495 SF", minDivisible: "3,495 SF", type: "Sale" },
    financials: { pricePerSF: "$8.11 / SF", taxRate: "$0.2945/SF", leaseType: "Fee Simple Sale" },
    contact: COLLIN_CONTACT, 
    lat: 42.2636132, 
    lng: -71.8018343,
    mapData: {
      amenities: [
        { lat: 42.2650, lng: -71.8020, label: "Worcester Courthouse" },
        { lat: 42.2620, lng: -71.7980, label: "Saint Vincent Hospital" }
      ],
      transit: [{ lat: 42.2610, lng: -71.7950, label: "Union Station (0.5mi)" }]
    }
  },
  { 
    id: 13, 
    address: "606 Southbridge St", 
    city: "Auburn", 
    state: "MA",
    zip: "01501",
    type: "Retail", 
    status: "For Sale", 
    price: "$1,200,000", 
    size: "3,242 SF", 
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop", 
    description: "Retail / Auto Repair facility with high visibility in Auburn. 2-story masonry building on 0.78 acres.",
    details: { yearBuilt: "1947", lotSize: "0.78 Acres", zoning: "HB", stories: "2", construction: "Masonry", loading: "1 Drive-In", tenancy: "Single Tenant" },
    financials: { pricePerSF: "$370.14 / SF", taxRate: "$0.0238/SF", rent: "$25.00 / SF", leaseType: "Triple Net" },
    availability: { total: "3,242 SF", contiguous: "3,242 SF", minDivisible: "3,242 SF", type: "Sale or Lease" },
    contact: COLLIN_CONTACT, 
    lat: 42.1890740, 
    lng: -71.8494620,
    mapData: {
      trafficCount: "Rte 12: High Vol.",
      highwayAccess: { lat: 42.1950, lng: -71.8450, label: "I-290 Ramp" },
      visibility: { label: "Signalized Intersection" }
    }
  },
  { 
    id: 14, 
    address: "7 Sutton Ave", 
    city: "Oxford", 
    state: "MA",
    zip: "01540",
    type: "Retail", 
    status: "For Lease", 
    price: "$11-14/SF", 
    size: "5,446 SF", 
    img: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2676&auto=format&fit=crop", 
    description: "Retail Storefront in Oxford. Wood frame construction, single story with parking.",
    details: { yearBuilt: "1900", lotSize: "0.21 Acres", zoning: "GB", parking: "15 Spaces", stories: "1", construction: "Wood Frame", tenancy: "Multi-Tenant" },
    financials: { rent: "$11.00 - 14.00 / SF", taxRate: "$1.1747/SF", leaseType: "Modified Gross" },
    availability: { total: "Call for details", contiguous: "0 SF", minDivisible: "0 SF", type: "Lease" },
    contact: COLLIN_CONTACT, 
    lat: 42.1168222, 
    lng: -71.8640423 
  },
  { 
    id: 15, 
    address: "74 Green Hill Pky", 
    city: "Worcester", 
    state: "MA",
    zip: "01605",
    type: "Multifamily", 
    status: "For Sale", 
    price: "Call for Price", 
    size: "3,605 SF", 
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop", 
    description: "Multifamily investment opportunity in Worcester. 3-story wood frame building.",
    details: { yearBuilt: "1890", lotSize: "0.17 Acres", zoning: "RG-5", stories: "3", construction: "Wood Frame", parking: "1 Space" },
    financials: { taxRate: "$1.7398/SF", leaseType: "Fee Simple Sale" },
    availability: { total: "3,605 SF", contiguous: "3,605 SF", minDivisible: "3,605 SF", type: "Sale" },
    contact: COLLIN_CONTACT, 
    lat: 42.2806803, 
    lng: -71.7919072,
    mapData: {
      amenities: [
        { lat: 42.2830, lng: -71.7850, label: "Green Hill Park (Zoo/Golf)" },
        { lat: 42.2750, lng: -71.7800, label: "UMass Memorial" }
      ],
      transit: [{ lat: 42.2806, lng: -71.7920, label: "Bus Rte 23/26" }]
    }
  },
  { 
    id: 16, 
    address: "78 Green Hill Pky", 
    city: "Worcester", 
    state: "MA",
    zip: "01605",
    type: "Multifamily", 
    status: "For Sale", 
    price: "Call for Price", 
    size: "4,437 SF", 
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2670&auto=format&fit=crop", 
    description: "Multifamily property in Brittan Square submarket. 3-story wood frame.",
    details: { yearBuilt: "1910", lotSize: "0.13 Acres", zoning: "RG-5", stories: "3", construction: "Wood Frame" },
    financials: { taxRate: "$2.1458/SF", leaseType: "Fee Simple Sale" },
    availability: { total: "4,437 SF", contiguous: "4,437 SF", minDivisible: "4,437 SF", type: "Sale" },
    contact: COLLIN_CONTACT, 
    lat: 42.2806120, 
    lng: -71.7915180,
    mapData: {
      amenities: [
        { lat: 42.2830, lng: -71.7850, label: "Green Hill Park (Zoo/Golf)" },
        { lat: 42.2750, lng: -71.7800, label: "UMass Memorial" }
      ],
      transit: [{ lat: 42.2806, lng: -71.7920, label: "Bus Rte 23/26" }]
    }
  },
  { 
    id: 17, 
    address: "82 Green Hill Pky", 
    city: "Worcester", 
    state: "MA",
    zip: "01605",
    type: "Multifamily", 
    status: "For Sale", 
    price: "Call for Price", 
    size: "4,782 SF", 
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop", 
    description: "Multifamily asset in Worcester. 3-story wood frame with yard and deck amenities.",
    details: { yearBuilt: "1920", lotSize: "0.16 Acres", zoning: "RG-5", stories: "3", construction: "Wood Frame", parking: "1 Space" },
    financials: { leaseType: "Fee Simple Sale" },
    availability: { total: "4,782 SF", contiguous: "4,782 SF", minDivisible: "4,782 SF", type: "Sale" },
    contact: COLLIN_CONTACT, 
    lat: 42.2805584, 
    lng: -71.7913209,
    mapData: {
      amenities: [
        { lat: 42.2830, lng: -71.7850, label: "Green Hill Park (Zoo/Golf)" },
        { lat: 42.2750, lng: -71.7800, label: "UMass Memorial" }
      ],
      transit: [{ lat: 42.2806, lng: -71.7920, label: "Bus Rte 23/26" }]
    }
  },
  { 
    id: 18, 
    address: "993 Main St", 
    city: "Leicester", 
    state: "MA",
    zip: "01524",
    type: "Multifamily", 
    status: "For Sale", 
    price: "Call for Price", 
    size: "4,404 SF", 
    img: "https://images.unsplash.com/photo-1551030173-122f52353cd0?q=80&w=2584&auto=format&fit=crop", 
    description: "Multifamily apartments in Leicester. Historic 1822 masonry construction on 1.19 acres.",
    details: { yearBuilt: "1822", lotSize: "1.19 Acres", zoning: "R2", stories: "3", parking: "4 Spaces", construction: "Masonry" },
    financials: { rent: "$11.64 - 14.22 / SF (Est)", leaseType: "Fee Simple Sale" },
    availability: { total: "4,404 SF", contiguous: "4,404 SF", minDivisible: "4,404 SF", type: "Sale" },
    contact: COLLIN_CONTACT, 
    lat: 42.2459851, 
    lng: -71.9049834,
    mapData: {
      amenities: [{ lat: 42.2480, lng: -71.9100, label: "Leicester High School" }],
      transit: [{ lat: 42.2460, lng: -71.9050, label: "Leicester Ctr Bus" }]
    }
  },
  { 
    id: 19, 
    address: "997 Main St", 
    city: "Leicester", 
    state: "MA",
    zip: "01524",
    type: "Multifamily", 
    status: "For Sale", 
    price: "Call for Price", 
    size: "3,504 SF", 
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop", 
    description: "Multifamily apartments in Leicester. 3-story masonry building built in 1950.",
    details: { yearBuilt: "1950", lotSize: "0.29 Acres", zoning: "R2", stories: "3", parking: "4 Spaces", construction: "Masonry" },
    financials: { taxRate: "$1.5006/SF", leaseType: "Fee Simple Sale" },
    availability: { total: "3,504 SF", contiguous: "3,504 SF", minDivisible: "3,504 SF", type: "Sale" },
    contact: COLLIN_CONTACT, 
    lat: 42.2459734, 
    lng: -71.9052247,
    mapData: {
      amenities: [{ lat: 42.2480, lng: -71.9100, label: "Leicester High School" }],
      transit: [{ lat: 42.2460, lng: -71.9050, label: "Leicester Ctr Bus" }]
    }
  }
];

export const INSIGHTS_DATA: Article[] = [
  { id: 1, title: "Worcester Market Report Q3 2024", category: "Market Analysis", date: "Oct 12, 2024", summary: "Vacancy rates stabilize as bio-tech demand surges in the downtown corridor.", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" },
  { id: 2, title: "Zoning Reforms in Central MA", category: "Regulation", date: "Sep 28, 2024", summary: "New MBTA communities zoning laws present unique opportunities for multifamily developers.", imageUrl: "https://images.unsplash.com/photo-1577017040065-65052831a153?q=80&w=2670&auto=format&fit=crop" },
  { id: 3, title: "Adaptive Reuse: Mill Conversions", category: "Development", date: "Sep 15, 2024", summary: "How historic tax credits are fueling the next wave of residential inventory.", imageUrl: "https://images.unsplash.com/photo-1565610222536-ef125c59da2c?q=80&w=2670&auto=format&fit=crop" },
  { id: 4, title: "The Industrial Sector Outlook", category: "Market Analysis", date: "Aug 30, 2024", summary: "Supply chain shifts continue to drive demand for small-bay industrial assets.", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop" },
  { id: 5, title: "Interest Rate Impacts on Cap Rates", category: "Market Analysis", date: "Aug 14, 2024", summary: "Analyzing the spread between borrowing costs and yield in the current climate.", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff0a77?q=80&w=2670&auto=format&fit=crop" },
  { id: 6, title: "Sustainable Building Trends", category: "Development", date: "Jul 22, 2024", summary: "Why LEED certification is becoming a baseline requirement for institutional tenants.", imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2565&auto=format&fit=crop" },
  { id: 7, title: "Suburban Office Renaissance", category: "Market Analysis", date: "Jul 10, 2024", summary: "Flight to quality: How high-end amenities are bringing workers back.", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" },
  { id: 8, title: "Rhode Island Commercial Incentives", category: "Regulation", date: "Jun 28, 2024", summary: "Navigating state-level grants for business expansion in Northern RI.", imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2674&auto=format&fit=crop" }
];
