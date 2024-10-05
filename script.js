
        // Simulated data (We can replace with real data in a production environment)
        const generateClimateData = (startYear, endYear) => {
            const seasons = ['winter', 'spring', 'summer', 'autumn'];
            const data = {};
            
            for (let year = startYear; year <= endYear; year++) {
                data[year] = {
                    temperature: {
                        annual: Math.sin((year - startYear) * 0.1) * 0.5 + ((year - startYear) * 0.01),
                    },
                    co2: 280 + ((year - startYear) * 0.8) + (Math.random() - 0.5) * 5,
                };
                
                seasons.forEach(season => {
                    data[year].temperature[season] = data[year].temperature.annual + (Math.random() - 0.5) * 0.3;
                });
            }
            
            return data;
        };

        const climateData = generateClimateData(1880, 2024);

        const ctx = document.getElementById('climateChart').getContext('2d');
        const yearDisplay = document.getElementById('year-display');
        const playPauseButton = document.getElementById('play-pause');
        const resetButton = document.getElementById('reset');
        const compareButton = document.getElementById('compare-btn');
        const comparisonResult = document.getElementById('comparison-result');
        const seasonSelect = document.getElementById('season-select');
        const exportButton = document.getElementById('export-btn');
        const tempToggle = document.getElementById('temp-toggle');
        const co2Toggle = document.getElementById('co2-toggle');

        let currentYearIndex = 0;
        let isPlaying = false;
        let animationId;
        let currentSeason = 'annual';

        const years = Object.keys(climateData);

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Temperature Anomaly (°C)',
                        data: [],
                        borderColor: 'rgb(255, 99, 132)',
                        yAxisID: 'y-temperature',
                    },
                    {
                        label: 'CO2 Levels (ppm)',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        yAxisID: 'y-co2',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    'y-temperature': {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperature Anomaly (°C)'
                        }
                    },
                    'y-co2': {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'CO2 Levels (ppm)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });

        function updateChart() {
            chart.data.datasets[0].data = years.slice(0, currentYearIndex + 1).map(year => climateData[year].temperature[currentSeason]);
            chart.data.datasets[1].data = years.slice(0, currentYearIndex + 1).map(year => climateData[year].co2);
            chart.update();
            yearDisplay.textContent = `Year: ${years[currentYearIndex]}`;
        }

        function animate() {
            if (currentYearIndex < years.length - 1) {
                currentYearIndex++;
                updateChart();
                animationId = requestAnimationFrame(animate);
            } else {
                isPlaying = false;
                playPauseButton.textContent = 'Play';
            }
        }

        playPauseButton.addEventListener('click', () => {
            if (isPlaying) {
                cancelAnimationFrame(animationId);
                isPlaying = false;
                playPauseButton.textContent = 'Play';
            } else {
                if (currentYearIndex === years.length - 1) {
                    currentYearIndex = 0;
                }
                isPlaying = true;
                playPauseButton.textContent = 'Pause';
                animate();
            }
        });

        resetButton.addEventListener('click', () => {
            cancelAnimationFrame(animationId);
            isPlaying = false;
            playPauseButton.textContent = 'Play';
            currentYearIndex = 0;
            updateChart();
        });

        compareButton.addEventListener('click', () => {
            const year1 = parseInt(document.getElementById('year1').value);
            const year2 = parseInt(document.getElementById('year2').value);
            
            if (year1 < 1880 || year1 > 2024 || year2 < 1880 || year2 > 2024) {
                comparisonResult.textContent = "Please enter valid years between 1880 and 2024.";
                return;
            }

            const temp1 = climateData[year1].temperature[currentSeason];
            const temp2 = climateData[year2].temperature[currentSeason];
            const co2_1 = climateData[year1].co2;
            const co2_2 = climateData[year2].co2;

            const tempDiff = (temp2 - temp1).toFixed(2);
            const co2Diff = (co2_2 - co2_1).toFixed(2);

            comparisonResult.textContent = `Temperature change: ${tempDiff}°C, CO2 change: ${co2Diff} ppm`;

            // Highlight the compared years on the chart
            chart.data.datasets.forEach(dataset => {
                dataset.pointBackgroundColor = years.map(year => 
                    (year == year1 || year == year2) ? 'red' : dataset.borderColor
                );
                dataset.pointRadius = years.map(year => 
                    (year == year1 || year == year2) ? 6 : 3
                );
            });
            chart.update();
        });

        seasonSelect.addEventListener('change', (event) => {
            currentSeason = event.target.value;
            updateChart();
        });

        exportButton.addEventListener('click', () => {
            let csv = 'Year,Temperature Anomaly (°C),CO2 Levels (ppm)\n';
            years.forEach(year => {
                csv += `${year},${climateData[year].temperature[currentSeason].toFixed(2)},${climateData[year].co2.toFixed(2)}\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "climate_data.csv");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });

        function toggleDataset(datasetIndex, visible) {
            chart.data.datasets[datasetIndex].hidden = !visible;
            chart.update();
        }

        tempToggle.addEventListener('change', (event) => {
            toggleDataset(0, event.target.checked);
        });

        co2Toggle.addEventListener('change', (event) => {
            toggleDataset(1, event.target.checked);
        });

        updateChart();