import fs from 'fs';
import path from 'path';

const INPUT_FILE = 'AllProperties.md';
const OUTPUT_DIR = 'knowledge_base/properties';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const rawContent = fs.readFileSync(INPUT_FILE, 'utf-8');

// Split by property header (e.g., "# 133 Main St")
const properties = rawContent.split(/^# /gm).filter(p => p.trim().length > 0);

console.log(`Found ${properties.length} properties.`);

properties.forEach((propContent, index) => {
    const lines = propContent.split('\n');
    const titleLine = lines[0].trim();
    const address = titleLine;

    // Helper to extract value by regex
    const extract = (regex: RegExp): string | null => {
        const match = propContent.match(regex);
        return match ? match[1].trim() : null;
    };

    // Helper to parse numeric values
    const parseNum = (val: string | null): number | null => {
        if (!val) return null;
        const clean = val.replace(/[^0-9.]/g, '');
        return clean ? parseFloat(clean) : null;
    };

    // Helper to parse boolean
    const parseBool = (val: string | null): boolean | null => {
        if (!val) return null;
        const lower = val.toLowerCase();
        return lower === 'yes' || lower === 'true';
    };

    // --- Location Parsing ---
    const location: any = {};
    const cityStateZipMatch = propContent.match(/- \*\*City\/State\/Zip:\*\* (.*)/);
    if (cityStateZipMatch) {
        const parts = cityStateZipMatch[1].split(',');
        if (parts.length >= 2) {
            location.city = parts[0].trim();
            const stateZip = parts[1].trim().split(' ');
            location.state = stateZip[0];
            if (stateZip.length > 1) location.zip = stateZip[1];
        }
    } else {
        location.city = extract(/- \*\*City:\*\* (.*)/);
        location.state = extract(/- \*\*State:\*\* (.*)/);
        location.zip = extract(/- \*\*Zip Code:\*\* (.*)/);
    }
    location.county = extract(/- \*\*County:\*\* (.*)/);
    location.coordinates = extract(/- \*\*Coordinates:\*\* (.*)/);
    location.market = extract(/- \*\*Market:\*\* (.*)/);
    location.submarket = extract(/- \*\*Submarket:\*\* (.*)/);
    location.cluster = extract(/- \*\*Cluster:\*\* (.*)/);


    // --- Building Parsing ---
    const building: any = {};
    building.class = extract(/\*\*Building Class:\*\* (.*)/);
    building.rating = parseNum(extract(/\*\*Building Rating:\*\* (.*)/));
    building.status = extract(/\*\*Building Status:\*\* (.*)/);
    building.construction_status = extract(/\*\*Construction Status:\*\* (.*)/);

    // Map "No" to "Condo: false" if needed, or just keep raw
    const ownershipRaw = extract(/\*\*Condo Ownership:\*\* (.*)/);
    building.ownership = ownershipRaw === 'No' ? 'Condo: false' : ownershipRaw;

    building.size_sf = extract(/- \*\*Building Size:\*\* (.*)/);
    building.year_built = parseNum(extract(/- \*\*Year Built:\*\* (.*)/));
    building.floor_size_sf = extract(/- \*\*Typical Floor Size:\*\* (.*)/);
    building.stories = parseNum(extract(/- \*\*Stories:\*\* (.*)/));

    const landAreaMatch = extract(/- \*\*Land Area:\*\* (.*)/);
    if (landAreaMatch) {
        const acresMatch = landAreaMatch.match(/([\d.]+) Acres/);
        if (acresMatch) building.land_area_acres = parseFloat(acresMatch[1]);
        const sfMatch = landAreaMatch.match(/\(([\d,]+) SF\)/);
        if (sfMatch) building.land_area_sf = sfMatch[1];
    }

    building.construction_type = extract(/- \*\*Construction Type:\*\* (.*)/);
    building.collateral_type = extract(/- \*\*Collateral Type:\*\* (.*)/);


    // --- Financial Parsing (FILTERED) ---
    const financial: any = {};
    financial.rent_per_sf = extract(/- \*\*Rent Per SF:\*\* (.*)/);
    // financial.occupancy_rate = parseNum(extract(/- \*\*Occupancy Rate:\*\* (.*)/)); // Maybe sensitive? Keeping for now as it's often public in listings
    // financial.vacancy_rate = parseNum(extract(/- \*\*Vacancy Rate:\*\* (.*)/));

    financial.tax_rate_per_sf = extract(/- \*\*Tax Rate:\*\* (.*)/);
    if (financial.tax_rate_per_sf) financial.tax_rate_per_sf = financial.tax_rate_per_sf.replace('$', '').replace('/SF', '');

    // financial.annual_taxes = parseNum(extract(/- \*\*Annual Taxes:\*\* (.*)/)); // Sensitive?
    // financial.tax_year = parseNum(extract(/- \*\*Tax Year:\*\* (.*)/));
    // financial.building_expenses_note = extract(/- \*\*Building Expenses:\*\* (.*)/);
    // financial.days_on_market = parseNum(extract(/- \*\*Days On Market:\*\* (.*)/));
    // financial.operating_expenses_per_sf = extract(/- \*\*Operating Expenses Per SF:\*\* (.*)/);

    // EXCLUDED: Loan Amount, Loan Type, Interest Rate, Origination, Originator, Maturity


    // --- Space Availability ---
    const space: any = {};
    space.total_available_sf = parseNum(extract(/- \*\*Total Available Space:\*\* (.*)/));
    space.direct_available_sf = parseNum(extract(/- \*\*Direct Available Space:\*\* (.*)/));
    space.direct_vacant_sf = parseNum(extract(/- \*\*Direct Vacant Space:\*\* (.*)/));
    space.sublet_available_sf = parseNum(extract(/- \*\*Sublet Available Space:\*\* (.*)/));
    space.sublet_vacant_sf = parseNum(extract(/- \*\*Sublet Vacant Space:\*\* (.*)/));
    space.max_contiguous_sf = parseNum(extract(/- \*\*Max Contiguous Space:\*\* (.*)/));
    space.max_floor_contiguous_sf = parseNum(extract(/- \*\*Max Floor Contiguous:\*\* (.*)/));
    space.smallest_available_sf = parseNum(extract(/- \*\*Smallest Available:\*\* (.*)/));


    // --- Features ---
    const features: any = {};
    features.elevators = parseNum(extract(/- \*\*Elevators:\*\* (.*)/));
    features.drive_in_doors = extract(/- \*\*Drive-In Doors:\*\* (.*)/);
    features.tenancy = extract(/- \*\*Tenancy:\*\* (.*)/);
    features.zoning = extract(/- \*\*Zoning:\*\* (.*)/);
    features.scale = extract(/- \*\*Scale:\*\* (.*)/);


    // --- Energy & Certifications ---
    const energy: any = {};
    energy.energy_star = extract(/- Energy Star: (.*)/) || 'false';
    energy.leed_certified = extract(/- LEED Certified: (.*)/) || 'false';


    // --- FEMA ---
    const fema: any = {};
    // fema.map_date = extract(/- FEMA Map Date: (.*)/);
    // fema.map_id = extract(/- FEMA Map ID: (.*)/);
    // fema.firm_id = extract(/- Firm ID: (.*)/);
    // fema.panel = extract(/- Firm Panel: (.*)/);
    fema.in_sfha = parseBool(extract(/- In SFHA: (.*)/));
    fema.floodplain_area = extract(/- Floodplain Area: (.*)/);
    fema.zone = extract(/- FEMA Flood Zone: (.*)/);
    fema.risk_area = extract(/- Flood Risk Area: (.*)/);


    // --- Contacts (FILTERED) ---
    const contacts: any = {};

    // Leasing (Public)
    const leasingCompany = extract(/### Leasing[\s\S]*?- \*\*Company:\*\* (.*)/);
    const leasingContact = extract(/### Leasing[\s\S]*?- \*\*Contact:\*\* (.*)/);
    const leasingPhone = extract(/### Leasing[\s\S]*?- \*\*Phone:\*\* (.*)/);

    if (leasingCompany || leasingContact) {
        contacts.leasing = {
            company: leasingCompany,
            contact: leasingContact,
            phone: leasingPhone
        };
    }

    // EXCLUDED: Owner, Recorded Owner, Property Manager (unless explicitly public, usually private)


    // --- Additional Info ---
    const additional: any = {};
    additional.property_id = extract(/- \*\*Property ID:\*\* (.*)/);
    // additional.parcel_number = extract(/- \*\*Parcel Number:\*\* (.*)/); // Often public record but maybe sensitive? Keeping ID, removing parcel for safety if unsure.
    // additional.institution = extract(/- \*\*Institution:\*\* (.*)/);


    // --- Top Level ---
    const price = extract(/- \*\*Asking Price:\*\* (.*)/) || extract(/- \*\*Rent Per SF:\*\* (.*)/) || extract(/- \*\*Price:\*\* (.*)/);
    const size = extract(/- \*\*Building Size:\*\* (.*)/);
    const type = extract(/\*\*Property Type:\*\* (.*)/);
    const status = extract(/\*\*Status:\*\* (.*)/);

    // Construct Description
    const secondaryType = extract(/\*\*Secondary Type:\*\* (.*)/);
    let description = `${address}`;
    if (secondaryType) description += ` ${secondaryType}`;
    else if (type) description += ` ${type}`;

    if (building.class) description += `. Class ${building.class}`;
    if (building.rating) description += `, Building Rating ${building.rating}`;
    if (building.status) description += `. ${building.status} structure`;
    if (building.year_built) description += `, built ${building.year_built}`;
    description += '.';


    const finalObj = {
        address,
        location,
        price_per_sf: parseNum(price),
        size_sf: size,
        type,
        status,
        description,
        building,
        financial,
        space_availability: space,
        features,
        energy_certifications: energy,
        anchor_tenants: [],
        fema_flood: fema,
        transit: null,
        contacts,
        // property_management: null, // Removed
        additional_info: additional
    };

    // Clean up nulls/undefined from the object recursively? 
    // JSON.stringify handles undefined by omitting keys, which is good.

    const jsonOutput = JSON.stringify(finalObj, null, 2);

    const filename = address.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json';
    const filepath = path.join(OUTPUT_DIR, filename);

    fs.writeFileSync(filepath, jsonOutput);
    console.log(`Generated ${filepath}`);
});
