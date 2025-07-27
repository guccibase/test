// Global variables
let map;
let currentLevel = 'states';
let currentState = null;
let currentCounty = null;
let stateLayer = null;
let countyLayer = null;
let stateData = {};
let countyData = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    loadStatesData();
});

function initializeMap() {
    // Initialize the map centered on the United States
    map = L.map('map').setView([39.8283, -98.5795], 4);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
}

function setupEventListeners() {
    // Back button
    document.getElementById('back-btn').addEventListener('click', goBack);
    
    // Home button
    document.getElementById('home-btn').addEventListener('click', goHome);
    
    // Breadcrumb navigation
    document.getElementById('breadcrumb').addEventListener('click', function(e) {
        if (e.target.classList.contains('breadcrumb-item')) {
            const level = e.target.dataset.level;
            navigateToLevel(level);
        }
    });
}

function loadStatesData() {
    // Simulated state data - in a real application, this would come from an API
    stateData = {
        'california': {
            name: 'California',
            capital: 'Sacramento',
            population: '39,538,223',
            area: '163,696 sq mi',
            counties: 58,
            description: 'The Golden State is known for its diverse geography, from the Pacific Coast to the Sierra Nevada mountains.',
            coordinates: [36.7783, -119.4179]
        },
        'texas': {
            name: 'Texas',
            capital: 'Austin',
            population: '29,145,505',
            area: '268,596 sq mi',
            counties: 254,
            description: 'The Lone Star State is the second-largest state by both area and population.',
            coordinates: [31.9686, -99.9018]
        },
        'florida': {
            name: 'Florida',
            capital: 'Tallahassee',
            population: '21,538,187',
            area: '65,758 sq mi',
            counties: 67,
            description: 'The Sunshine State is known for its warm climate and beautiful beaches.',
            coordinates: [27.6648, -81.5158]
        },
        'new-york': {
            name: 'New York',
            capital: 'Albany',
            population: '20,201,249',
            area: '54,555 sq mi',
            counties: 62,
            description: 'The Empire State is home to New York City, the most populous city in the United States.',
            coordinates: [42.1657, -74.9481]
        },
        'pennsylvania': {
            name: 'Pennsylvania',
            capital: 'Harrisburg',
            population: '13,002,700',
            area: '46,054 sq mi',
            counties: 67,
            description: 'The Keystone State played a crucial role in the founding of the United States.',
            coordinates: [40.5908, -77.2098]
        }
    };

    // Add more states with simplified data
    const additionalStates = {
        'alabama': { name: 'Alabama', capital: 'Montgomery', population: '5,024,279', area: '52,420 sq mi', counties: 67, coordinates: [32.3182, -86.9023] },
        'alaska': { name: 'Alaska', capital: 'Juneau', population: '733,391', area: '665,384 sq mi', counties: 19, coordinates: [63.5887, -154.4931] },
        'arizona': { name: 'Arizona', capital: 'Phoenix', population: '7,151,502', area: '113,990 sq mi', counties: 15, coordinates: [33.7298, -111.4312] },
        'arkansas': { name: 'Arkansas', capital: 'Little Rock', population: '3,011,524', area: '53,179 sq mi', counties: 75, coordinates: [34.9697, -92.3731] },
        'colorado': { name: 'Colorado', capital: 'Denver', population: '5,773,714', area: '104,094 sq mi', counties: 64, coordinates: [39.5501, -105.7821] },
        'connecticut': { name: 'Connecticut', capital: 'Hartford', population: '3,605,944', area: '5,543 sq mi', counties: 8, coordinates: [41.6032, -73.0877] },
        'delaware': { name: 'Delaware', capital: 'Dover', population: '989,948', area: '2,489 sq mi', counties: 3, coordinates: [38.9108, -75.5277] },
        'georgia': { name: 'Georgia', capital: 'Atlanta', population: '10,711,908', area: '59,425 sq mi', counties: 159, coordinates: [32.1656, -82.9001] },
        'hawaii': { name: 'Hawaii', capital: 'Honolulu', population: '1,455,271', area: '10,932 sq mi', counties: 5, coordinates: [19.8968, -155.5828] },
        'idaho': { name: 'Idaho', capital: 'Boise', population: '1,839,106', area: '83,569 sq mi', counties: 44, coordinates: [44.2405, -114.4788] },
        'illinois': { name: 'Illinois', capital: 'Springfield', population: '12,812,508', area: '57,914 sq mi', counties: 102, coordinates: [40.3495, -88.9861] },
        'indiana': { name: 'Indiana', capital: 'Indianapolis', population: '6,785,528', area: '36,418 sq mi', counties: 92, coordinates: [39.8494, -86.2583] },
        'iowa': { name: 'Iowa', capital: 'Des Moines', population: '3,190,369', area: '56,273 sq mi', counties: 99, coordinates: [42.0329, -93.4038] },
        'kansas': { name: 'Kansas', capital: 'Topeka', population: '2,937,880', area: '82,278 sq mi', counties: 105, coordinates: [38.5266, -96.7265] },
        'kentucky': { name: 'Kentucky', capital: 'Frankfort', population: '4,505,836', area: '40,408 sq mi', counties: 120, coordinates: [37.6681, -84.6701] },
        'louisiana': { name: 'Louisiana', capital: 'Baton Rouge', population: '4,657,757', area: '52,378 sq mi', counties: 64, coordinates: [31.1695, -91.8678] },
        'maine': { name: 'Maine', capital: 'Augusta', population: '1,362,359', area: '35,380 sq mi', counties: 16, coordinates: [44.6939, -69.3819] },
        'maryland': { name: 'Maryland', capital: 'Annapolis', population: '6,177,224', area: '12,406 sq mi', counties: 23, coordinates: [39.0639, -76.8021] },
        'massachusetts': { name: 'Massachusetts', capital: 'Boston', population: '7,029,917', area: '10,554 sq mi', counties: 14, coordinates: [42.2304, -71.5301] },
        'michigan': { name: 'Michigan', capital: 'Lansing', population: '10,077,331', area: '96,714 sq mi', counties: 83, coordinates: [44.3148, -85.6024] },
        'minnesota': { name: 'Minnesota', capital: 'Saint Paul', population: '5,706,494', area: '86,936 sq mi', counties: 87, coordinates: [46.7296, -94.6859] },
        'mississippi': { name: 'Mississippi', capital: 'Jackson', population: '2,961,279', area: '48,432 sq mi', counties: 82, coordinates: [32.7416, -89.6787] },
        'missouri': { name: 'Missouri', capital: 'Jefferson City', population: '6,154,913', area: '69,707 sq mi', counties: 114, coordinates: [38.4561, -92.2884] },
        'montana': { name: 'Montana', capital: 'Helena', population: '1,084,225', area: '147,040 sq mi', counties: 56, coordinates: [46.8797, -110.3626] },
        'nebraska': { name: 'Nebraska', capital: 'Lincoln', population: '1,961,504', area: '77,348 sq mi', counties: 93, coordinates: [41.4925, -99.9018] },
        'nevada': { name: 'Nevada', capital: 'Carson City', population: '3,104,614', area: '110,572 sq mi', counties: 16, coordinates: [38.8026, -116.4194] },
        'new-hampshire': { name: 'New Hampshire', capital: 'Concord', population: '1,377,529', area: '9,349 sq mi', counties: 10, coordinates: [43.1939, -71.5724] },
        'new-jersey': { name: 'New Jersey', capital: 'Trenton', population: '9,288,994', area: '8,723 sq mi', counties: 21, coordinates: [40.0583, -74.4057] },
        'new-mexico': { name: 'New Mexico', capital: 'Santa Fe', population: '2,117,522', area: '121,590 sq mi', counties: 33, coordinates: [34.5199, -105.8701] },
        'north-carolina': { name: 'North Carolina', capital: 'Raleigh', population: '10,439,388', area: '53,819 sq mi', counties: 100, coordinates: [35.7596, -79.0193] },
        'north-dakota': { name: 'North Dakota', capital: 'Bismarck', population: '779,094', area: '70,698 sq mi', counties: 53, coordinates: [47.5515, -101.0020] },
        'ohio': { name: 'Ohio', capital: 'Columbus', population: '11,799,448', area: '44,825 sq mi', counties: 88, coordinates: [40.4173, -82.9071] },
        'oklahoma': { name: 'Oklahoma', capital: 'Oklahoma City', population: '3,959,353', area: '69,899 sq mi', counties: 77, coordinates: [35.5653, -96.9289] },
        'oregon': { name: 'Oregon', capital: 'Salem', population: '4,237,256', area: '98,379 sq mi', counties: 36, coordinates: [44.5720, -122.0709] },
        'rhode-island': { name: 'Rhode Island', capital: 'Providence', population: '1,097,379', area: '1,545 sq mi', counties: 5, coordinates: [41.6809, -71.5118] },
        'south-carolina': { name: 'South Carolina', capital: 'Columbia', population: '5,118,425', area: '32,020 sq mi', counties: 46, coordinates: [33.8569, -80.9450] },
        'south-dakota': { name: 'South Dakota', capital: 'Pierre', population: '886,667', area: '77,116 sq mi', counties: 66, coordinates: [44.2998, -99.4388] },
        'tennessee': { name: 'Tennessee', capital: 'Nashville', population: '6,910,840', area: '42,144 sq mi', counties: 95, coordinates: [35.7478, -86.6923] },
        'utah': { name: 'Utah', capital: 'Salt Lake City', population: '3,271,616', area: '84,897 sq mi', counties: 29, coordinates: [39.3210, -111.0937] },
        'vermont': { name: 'Vermont', capital: 'Montpelier', population: '643,077', area: '9,616 sq mi', counties: 14, coordinates: [44.0459, -72.7107] },
        'virginia': { name: 'Virginia', capital: 'Richmond', population: '8,631,393', area: '42,775 sq mi', counties: 95, coordinates: [37.4316, -78.6569] },
        'washington': { name: 'Washington', capital: 'Olympia', population: '7,705,281', area: '71,298 sq mi', counties: 39, coordinates: [47.7511, -120.7401] },
        'west-virginia': { name: 'West Virginia', capital: 'Charleston', population: '1,793,716', area: '24,230 sq mi', counties: 55, coordinates: [38.5976, -80.4549] },
        'wisconsin': { name: 'Wisconsin', capital: 'Madison', population: '5,893,718', area: '65,496 sq mi', counties: 72, coordinates: [43.7844, -88.7879] },
        'wyoming': { name: 'Wyoming', capital: 'Cheyenne', population: '576,851', area: '97,813 sq mi', counties: 23, coordinates: [42.7475, -107.2085] }
    };

    // Merge the data
    Object.assign(stateData, additionalStates);

    // Create state polygons (simplified rectangles for demonstration)
    createStatePolygons();
}

function createStatePolygons() {
    // Clear existing layer
    if (stateLayer) {
        map.removeLayer(stateLayer);
    }

    stateLayer = L.layerGroup();

    // Create simplified state polygons (rectangles for demonstration)
    Object.keys(stateData).forEach(stateKey => {
        const state = stateData[stateKey];
        const [lat, lng] = state.coordinates;
        
        // Create a rectangle around the state coordinates
        const bounds = [
            [lat - 2, lng - 3],
            [lat + 2, lng + 3]
        ];
        
        const rectangle = L.rectangle(bounds, {
            color: '#667eea',
            weight: 2,
            fillColor: '#667eea',
            fillOpacity: 0.3
        });

        rectangle.bindPopup(`
            <div style="text-align: center;">
                <h3 style="margin: 0 0 10px 0; color: #2d3748;">${state.name}</h3>
                <p style="margin: 5px 0; color: #4a5568;"><strong>Capital:</strong> ${state.capital}</p>
                <p style="margin: 5px 0; color: #4a5568;"><strong>Population:</strong> ${state.population}</p>
                <p style="margin: 5px 0; color: #4a5568;"><strong>Counties:</strong> ${state.counties}</p>
                <button onclick="selectState('${stateKey}')" style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    margin-top: 10px;
                    font-weight: 600;
                ">Explore Counties</button>
            </div>
        `);

        rectangle.on('click', () => selectState(stateKey));
        stateLayer.addLayer(rectangle);
    });

    stateLayer.addTo(map);
}

function selectState(stateKey) {
    currentState = stateKey;
    currentLevel = 'counties';
    
    // Update breadcrumb
    updateBreadcrumb();
    
    // Show back button
    document.getElementById('back-btn').style.display = 'block';
    
    // Load county data for the selected state
    loadCountyData(stateKey);
    
    // Update info panel
    updateInfoPanel();
    
    // Center map on the state
    const state = stateData[stateKey];
    map.setView(state.coordinates, 7);
}

function loadCountyData(stateKey) {
    // Clear existing county layer
    if (countyLayer) {
        map.removeLayer(countyLayer);
    }

    // Simulated county data - in a real application, this would come from an API
    const countyCount = stateData[stateKey].counties;
    countyData = {};
    
    // Generate sample counties
    for (let i = 1; i <= Math.min(countyCount, 20); i++) {
        const countyKey = `county-${i}`;
        countyData[countyKey] = {
            name: `County ${i}`,
            population: Math.floor(Math.random() * 500000) + 10000,
            area: Math.floor(Math.random() * 2000) + 100,
            seat: `City ${i}`,
            description: `This is a sample county in ${stateData[stateKey].name}.`
        };
    }

    // Create county polygons
    createCountyPolygons(stateKey);
}

function createCountyPolygons(stateKey) {
    countyLayer = L.layerGroup();
    const state = stateData[stateKey];
    const [stateLat, stateLng] = state.coordinates;
    
    let countyIndex = 0;
    Object.keys(countyData).forEach(countyKey => {
        const county = countyData[countyKey];
        
        // Create a smaller rectangle for each county
        const offset = countyIndex * 0.5;
        const bounds = [
            [stateLat - 1 + offset, stateLng - 1.5 + offset],
            [stateLat + 1 + offset, stateLng + 1.5 + offset]
        ];
        
        const rectangle = L.rectangle(bounds, {
            color: '#764ba2',
            weight: 1,
            fillColor: '#764ba2',
            fillOpacity: 0.4
        });

        rectangle.bindPopup(`
            <div style="text-align: center;">
                <h4 style="margin: 0 0 10px 0; color: #2d3748;">${county.name}</h4>
                <p style="margin: 5px 0; color: #4a5568;"><strong>County Seat:</strong> ${county.seat}</p>
                <p style="margin: 5px 0; color: #4a5568;"><strong>Population:</strong> ${county.population.toLocaleString()}</p>
                <p style="margin: 5px 0; color: #4a5568;"><strong>Area:</strong> ${county.area} sq mi</p>
                <button onclick="selectCounty('${countyKey}')" style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 15px;
                    cursor: pointer;
                    margin-top: 8px;
                    font-weight: 600;
                    font-size: 0.8rem;
                ">View Details</button>
            </div>
        `);

        rectangle.on('click', () => selectCounty(countyKey));
        countyLayer.addLayer(rectangle);
        countyIndex++;
    });

    countyLayer.addTo(map);
}

function selectCounty(countyKey) {
    currentCounty = countyKey;
    currentLevel = 'county-detail';
    
    // Update breadcrumb
    updateBreadcrumb();
    
    // Update info panel with county details
    updateInfoPanel();
    
    // Zoom in on the county
    map.setZoom(10);
}

function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = '';
    
    if (currentLevel === 'states') {
        breadcrumb.innerHTML = '<span class="breadcrumb-item active" data-level="states">United States</span>';
    } else if (currentLevel === 'counties') {
        breadcrumb.innerHTML = `
            <span class="breadcrumb-item" data-level="states">United States</span>
            <span class="breadcrumb-item active" data-level="counties">${stateData[currentState].name}</span>
        `;
    } else if (currentLevel === 'county-detail') {
        breadcrumb.innerHTML = `
            <span class="breadcrumb-item" data-level="states">United States</span>
            <span class="breadcrumb-item" data-level="counties">${stateData[currentState].name}</span>
            <span class="breadcrumb-item active" data-level="county-detail">${countyData[currentCounty].name}</span>
        `;
    }
}

function updateInfoPanel() {
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const infoDetails = document.getElementById('info-details');
    
    if (currentLevel === 'states') {
        infoTitle.textContent = 'Welcome to the US Interactive Map';
        infoDescription.textContent = 'Click on any state to explore its counties and learn more about the geography and demographics of the United States.';
        infoDetails.innerHTML = `
            <div class="info-details">
                <h4>Quick Facts</h4>
                <p><strong>Total States:</strong> 50</p>
                <p><strong>Total Counties:</strong> 3,142</p>
                <p><strong>Largest State:</strong> Alaska (665,384 sq mi)</p>
                <p><strong>Most Populous:</strong> California (39.5M)</p>
            </div>
        `;
    } else if (currentLevel === 'counties') {
        const state = stateData[currentState];
        infoTitle.textContent = state.name;
        infoDescription.textContent = state.description || `Explore the counties of ${state.name}.`;
        infoDetails.innerHTML = `
            <div class="info-details">
                <h4>State Information</h4>
                <p><strong>Capital:</strong> ${state.capital}</p>
                <p><strong>Population:</strong> ${state.population}</p>
                <p><strong>Area:</strong> ${state.area}</p>
                <p><strong>Counties:</strong> ${state.counties}</p>
                <p><strong>Counties Shown:</strong> ${Object.keys(countyData).length}</p>
            </div>
        `;
    } else if (currentLevel === 'county-detail') {
        const county = countyData[currentCounty];
        const state = stateData[currentState];
        infoTitle.textContent = county.name;
        infoDescription.textContent = county.description;
        infoDetails.innerHTML = `
            <div class="info-details">
                <h4>County Information</h4>
                <p><strong>State:</strong> ${state.name}</p>
                <p><strong>County Seat:</strong> ${county.seat}</p>
                <p><strong>Population:</strong> ${county.population.toLocaleString()}</p>
                <p><strong>Area:</strong> ${county.area} sq mi</p>
            </div>
        `;
    }
}

function goBack() {
    if (currentLevel === 'county-detail') {
        currentLevel = 'counties';
        currentCounty = null;
        document.getElementById('back-btn').style.display = 'block';
    } else if (currentLevel === 'counties') {
        currentLevel = 'states';
        currentState = null;
        document.getElementById('back-btn').style.display = 'none';
        
        // Remove county layer and show states
        if (countyLayer) {
            map.removeLayer(countyLayer);
        }
        if (stateLayer) {
            stateLayer.addTo(map);
        }
        
        map.setView([39.8283, -98.5795], 4);
    }
    
    updateBreadcrumb();
    updateInfoPanel();
}

function goHome() {
    currentLevel = 'states';
    currentState = null;
    currentCounty = null;
    
    document.getElementById('back-btn').style.display = 'none';
    
    // Remove all layers and show states
    if (countyLayer) {
        map.removeLayer(countyLayer);
    }
    if (stateLayer) {
        stateLayer.addTo(map);
    }
    
    map.setView([39.8283, -98.5795], 4);
    updateBreadcrumb();
    updateInfoPanel();
}

function navigateToLevel(level) {
    if (level === 'states') {
        goHome();
    } else if (level === 'counties' && currentState) {
        currentLevel = 'counties';
        currentCounty = null;
        document.getElementById('back-btn').style.display = 'block';
        updateBreadcrumb();
        updateInfoPanel();
    }
}