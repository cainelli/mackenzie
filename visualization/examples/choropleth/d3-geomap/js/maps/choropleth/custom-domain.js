var map = d3.geomap.choropleth()
    .geofile('https://cainelli.github.io/mackenzie/visualization/examples/choropleth/d3-geomap/topojson/world/countries.json')
    .colors(['green','red'])
    .column('1800')
    .domain([0, 1])
    .legend(false)
    .unitId('Country');

d3.csv('https://cainelli.github.io/mackenzie/visualization/examples/choropleth/data/data.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
});
