var map = L.map('map', {
	center: [10.309938, 123.893468],
	zoom: 19
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors',
    minZoom: 19,
    maxZoom: 19
}).addTo(map);
