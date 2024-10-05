# Global Climate Change Visualization

This project provides an interactive data visualization of global climate change, specifically focusing on global temperature anomalies and CO2 levels from 1880 to 2024. The tool helps users explore the effects of climate change across different seasons and time periods.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [About the Data](#about-the-data)
- [Future Enhancements](#future-enhancements)


## Features

- **Interactive Climate Chart**: Visualizes temperature anomalies (in °C) and CO2 levels (in ppm) from 1880 to 2024.
- **Play/Pause Timeline**: Animates the progression of climate data over time.
- **Season Selection**: Allows users to explore climate data for specific seasons (Annual, Spring, Summer, Autumn, Winter).
- **Data Comparison Tool**: Users can compare temperature and CO2 levels between two selected years.
- **Dataset Toggling**: Option to display or hide temperature or CO2 datasets.
- **Export Data**: Allows users to download the climate data in CSV format.

## Technologies Used

- **HTML5**: Provides the structure for the visualization page.
- **CSS3**: Styles the application, ensuring a clean and responsive layout.
- **JavaScript (ES6)**: Handles data processing, chart rendering, and user interactions.
- **Chart.js**: A JavaScript library used to create the interactive line chart for climate data visualization.
- **Simulated Climate Data**: The data is generated based on trends from NASA GISS and NOAA (can be replaced with real data in the future).

## Usage

Follow these instructions to interact with the climate visualization tool:

1. **Play/Pause Animation**:
   - Click the "Play" button to animate climate data, showing the changes in temperature anomalies and CO2 levels from 1880 to 2024.
   - Click the "Pause" button to stop the animation at any time.

2. **Reset the Visualization**:
   - Click the "Reset" button to restart the animation from the year 1880.

3. **Select a Season**:
   - Use the dropdown menu to explore data for specific seasons:
     - **Annual** (default)
     - **Spring**
     - **Summer**
     - **Autumn**
     - **Winter**
   - This changes the displayed temperature anomaly values based on the selected season.

4. **Toggle Datasets**:
   - Two datasets are available: **Temperature Anomalies** and **CO2 Levels**. You can toggle these datasets on and off using the checkboxes labeled "Temperature" and "CO2 Levels".
   - Unchecking a dataset will hide its corresponding graph line.

5. **Data Comparison Tool**:
   - Enter two years in the provided fields under the "Data Comparison Tool".
   - Click "Compare Data" to display the difference in temperature anomalies and CO2 levels between the two selected years.
   - The compared years will be highlighted on the chart.

6. **Export Data**:
   - Click the "Export Data (CSV)" button to download the displayed climate data in CSV format, including temperature anomalies and CO2 levels for all available years.

### Example Use Case

If you want to explore how climate change affected spring temperatures:
1. Select "Spring" from the season dropdown.
2. Click "Play" to watch the progression of temperature and CO2 levels over time.
3. Use the **Data Comparison Tool** to compare spring data between two years (e.g., 1880 and 2024).
4. Download the data by clicking "Export Data (CSV)" if needed for further analysis.


## About the Data

- **Temperature Data**: Represented as anomalies (°C) relative to the baseline average from 1951-1980.
- **CO2 Data**: Displayed in parts per million (ppm).

## Future Enhancements

- Integrate real-world data using APIs.
- Expand dataset options (e.g., Methane levels, Sea ice extent).
- Add more interactive features, such as zooming and detailed year-by-year analysis.
