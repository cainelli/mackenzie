var map = d3.geomap.choropleth()
    .geofile('https://cainelli.github.io/mackenzie/visualization/examples/choropleth/d3-geomap/topojson/world/countries.json')
    .colors(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"])
    .column('Rate')
    .domain([0, 60])
    .legend(true)
    .unitId('Country');

d3.csv('https://cainelli.github.io/mackenzie/visualization/examples/choropleth/data/data.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
});