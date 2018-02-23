var green = "rgba(120, 230, 132, 0.8)";
var red = "rgba(255, 99, 132, 0.8)";


function initDoughnutChart(data) {
    var leftChart = document.getElementById("leftChart");

    return new Chart(leftChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0,0],
                backgroundColor: [green, red]
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Positive',
                'Negative'
            ]
        },
        options: {}
    });
}

function initBarChart() {
    var rightChart = document.getElementById("rightChart");

    return new Chart(rightChart, {
        type: "bar",
        data: {
            labels: ["11/08", "11/09", "11/10", "11/11", "11/12", "11/13", "11/14"],
            datasets: [{
                label: "Positive",
                data: [0,0,0,0,0,0,0],
                fill: false,
                backgroundColor: [green, green, green, green, green, green, green],
                borderWidth: 1
            }, {
                label: "Negative",
                data: [0,0,0,0,0,0,0],
                fill: false,
                backgroundColor: [red, red, red, red, red, red, red],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: { beginAtZero: true, suggestedMax: 20 },
                    stacked: true
                }],
                xAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

var donutChart = initDoughnutChart();
var barChart = initBarChart();


function updateCharts(newData) {
    var positiveSum = 0;
    var negativeSum = 0;
    for (var i = 0; i < newData.positiveTweetCounts.length; i++) {
        positiveSum += newData.positiveTweetCounts[i];
        barChart.data.datasets[0].data[i] = newData.positiveTweetCounts[i];
    }
    for (var i = 0; i < newData.negativeTweetCounts.length; i++) {
        negativeSum += Math.abs(newData.negativeTweetCounts[i]);
        barChart.data.datasets[1].data[i] = newData.negativeTweetCounts[i];
    }

    var positiveSum = newData.positiveTotal;
    var negativeSum = newData.negativeTotal;

    if (!tweets[0].sentiment) {
        positiveSum = undefined;
        negativeSum = undefined;
    } 

    donutChart.data.datasets[0].data[0] = positiveSum;
    donutChart.data.datasets[0].data[1] = negativeSum;

    document.getElementById('graphs-section').style.display = "flex";

    donutChart.update();
    barChart.update();
}


var map, infobox;

function GetMap() {
    map = new Microsoft.Maps.Map('#map', {
        credentials: config.mapQueryKey,
        center: new Microsoft.Maps.Location(40.743051, -73.987513),
        zoom: 12,
        disableScrollWheelZoom: true
    });

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    //Create random locations in the map bounds., 
    var hotelLocations = [
        { name: "Platinum Hotel", latitude: 40.739474, longitude: -73.998671, altitude: 0, altitudeReference: -1 },
        { name: "Gold Hotel", latitude: 40.762361, longitude: -73.972235, altitude: 0, altitudeReference: -1 },
        { name: "Diamond Hotel", latitude: 40.757680, longitude: -73.988372, altitude: 0, altitudeReference: -1 }
    ];

    for (var i = 0; i < hotelLocations.length; i++) {
        let hotel = hotelLocations[i];
        var pin = new Microsoft.Maps.Pushpin(
            hotel,
            { color: getPinColor(counts[hotel.name].average) }
        );

        //Store some metadata with the pushpin.
        pin.metadata = {
            title: hotel.name,
            description: 'Sentiment average: ' + counts[hotel.name].average.toFixed(1)
        };

        //Add a click event handler to the pushpin.
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

        //Add pushpin to the map.
        map.entities.push(pin);
    }
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });

        updateCharts(counts[e.target.metadata.title]);
    }
}

function getPinColor(score) {
    if (score > 7) {
        return new Microsoft.Maps.Color(255, 100, 163, 56);
    } else if (score > 5) {
        return new Microsoft.Maps.Color(255, 247, 146, 50);
    } else {
        return new Microsoft.Maps.Color(255, 224, 59, 36);
    }
}