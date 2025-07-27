# US States & Counties Interactive Map

A modern, responsive web application that displays an interactive map of all 50 US states with the ability to drill down to county-level details.

## Features

- **Interactive State Map**: View all 50 US states with clickable regions
- **County Exploration**: Click on any state to see its counties
- **Detailed Information**: View state and county statistics including population, area, and capitals
- **Navigation**: Breadcrumb navigation and back/home buttons for easy navigation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## How to Use

1. **View States**: The map initially shows all 50 US states as clickable regions
2. **Select a State**: Click on any state to explore its counties
3. **Explore Counties**: Click on counties within a state to view detailed information
4. **Navigate**: Use the breadcrumb navigation or back/home buttons to move between levels
5. **Information Panel**: View detailed statistics and information in the right sidebar

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and map interactions
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript**: Interactive functionality and map controls
- **Leaflet.js**: Open-source mapping library
- **OpenStreetMap**: Free map tiles and data

## State Information Included

Each state includes:
- State name and nickname
- Capital city
- Population (2020 Census data)
- Land area
- Number of counties
- Geographic coordinates

## County Information

When viewing counties, you'll see:
- County name
- County seat
- Population data
- Land area
- State affiliation

## Browser Compatibility

This application works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Getting Started

1. Download or clone the files to your local machine
2. Open `index.html` in your web browser
3. Start exploring the interactive map!

## Customization

The application can be easily customized by:
- Modifying the color scheme in `styles.css`
- Adding more state/county data in `script.js`
- Changing map tiles or adding additional layers
- Extending the information panel with more details

## Data Sources

- State boundaries and coordinates are approximated for demonstration
- Population data is from the 2020 US Census
- County information is simulated for demonstration purposes
- In a production environment, you would integrate with real GIS data APIs

## Future Enhancements

Potential improvements could include:
- Real GIS boundary data for accurate state/county shapes
- Integration with Census Bureau APIs for real-time data
- Additional demographic information
- Search functionality
- Export capabilities
- Historical data visualization

## License

This project is open source and available under the MIT License.

---

**Note**: This is a demonstration application. For production use with real data, you would need to integrate with official GIS data sources and APIs.