mapboxgl.accessToken = 'pk.eyJ1IjoiZWJhbmRlcmEiLCJhIjoiY2w3ejg3anBtMTZrbTNvcWMzYnQxODZ1ciJ9._pYUSURFikRViDPWTr1Ikg';
var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-87.76181455339704,41.77802679879325],
        zoom: 11
});
let markers = [];
async function run(){
    // get bus data    
	const locations = await getBusLocations();
	removeMarkers();
	addMarkers(locations);

	// timer
	setTimeout(run, 15000);
}
function addMarkers(locs){
	for(let i=0;i<locs.length;i++){
		let marker = new mapboxgl.Marker()
  			.setLngLat(locs[i])
  			.addTo(map);
		markers.push(marker);
	}
}
function removeMarkers(){
	for(let i=0;i<markers.length;i++){
	markers[i].remove();
	}
	markers=[];
}

// Request bus data from CTA
async function getBusLocations(){
    //const url = 'https://www.ctabustracker.com/bustime/api/v3/getvehicles?key=wZHcXx3PsREP5QqHSbjYQ2sLi&format=json&rt=62,62H,63,63W';
   // const url = 'https://www.ctabustracker.com/bustime/api/v3/getvehicles?key=89dj2he89d8j3j3ksjhdue93&format=json&rt=62,62H,63,63W';
	//const response = await fetch(url);
    console.log(busses);
    const vehicles = busses['bustime-response'].vehicle;
    console.log(vehicles);
	let locations = [];
	for(let i=0;i<vehicles.length;i++){
		locations.push([vehicles[i].lon,vehicles[i].lat]);
        //console.log(json);
    }
	
	return locations;
}

run();