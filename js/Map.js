"use strict";
// mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoidGVhbTEyMSIsImEiOiJja29rN3puYTMwNjNxMnBscDRvbHFvdTB4In0.PI4xCl3-5EG2OK-P3RzmRw";
// Geocoding API token
const KEY = "9f3ddfdbd63c442f929b83dc367d2e18";
// Global variables to store pickup address
let pickupAddress = "";
// Global variables to store pickup address
let dropOffAddress = "";
// Global variable to store user's dropped pin
let userPin;
let circle = false;
let stopCount = 0;
let routesComplete = false;
// Geocoding API base url
let url = "https://api.opencagedata.com/geocode/v1/json";

// Array to hold trip locations
let locations = [];

// Initializing mapbox access token
mapboxgl.accessToken = MAPBOX_TOKEN
// create a new instance of mapbox map
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [145.1343136, -37.9110467], // starting position [lng, lat]
    zoom: 14 // starting zoom
    });

// Todo on map click
map.on('click', function(){
    
    if(stopCount==0){
        if(window.confirm("Confirm pickup Location?")===true){
            locations.push({
                coordinates: [userPin['lng'], userPin['lat']],
                description: 'Pickup Location'
            });
            
            // showLocations();
            // showPath();
            addMarker();
            stopCount += 1;
        } 
    }else if(stopCount>=1){
            if(window.confirm("Confirm dropoff Location?")===true){
                locations.push({
                    coordinates: [userPin['lng'], userPin['lat']],
                    description: 'Stop '+stopCount
                });
                
                // showLocations();
                // showPath();
                addMarker();
                stopCount += 1;
            }else{
                routesComplete = true;
                showLocations();
                showPath();
            }
        
        
    }
    
})



function addMarker(){
    // Create a new marker for the user to drop pin for locations
    let marker = new mapboxgl.Marker({
    draggable: true // Allows marker to be dragged
    })
    .setLngLat([145.1343136, -37.9110467]) // Sets the starting position of the marker
    .addTo(map); // Adds the marker to the map
    // Calls onDragEnd function whenever marker is dragged
    marker.on('dragend', function(){
        userPin = marker.getLngLat();
    });
}

// Create a new marker for the user to drop pin for locations
let marker = new mapboxgl.Marker({
    draggable: true // Allows marker to be dragged
    })
    .setLngLat([145.1343136, -37.9110467]) // Sets the starting position of the marker
    .addTo(map); // Adds the marker to the map
    // Calls onDragEnd function whenever marker is dragged
    marker.on('dragend', onDragEnd);
    

// Todo on map load
map.on('load', function(){
    
    
    let time = document.getElementById("startTime");
    let date = document.getElementById("startDate");

});

/**
 * Updates the user location everytime its dragged on the map
 */
function onDragEnd() {
    userPin = marker.getLngLat();
    //forwardGeocode(userPin['lat'], userPin['lng']);
    nearbyCabs(userPin);
    document.getElementById("pickUpAddress").value=JSON.stringify(userPin);
    }

/**
 * Geocodes coordinates into an address 
 * @param {Integer} LAT 
 * @param {Integer} LNG 
 */
function forwardGeocode(LAT, LNG){
    let data = {
        q: LAT + "," + LNG, // Coordinates
        key: KEY, // API key
        jsonp: "forReq" // callback function
    }
    webServiceRequest(url, data);
}

/**
 * Callback function to hold geocoded address
 * @param {String} result 
 */
function forReq(result){
    geocodeAddress = result['results'][0]['formatted'];
}

/**
 * Geocodes an address into coordinates
 * @param {String} PLACENAME 
 */
function backwardGeocode(PLACENAME){
    let data = {
        q: PLACENAME, // Address
        key: KEY, // API key
        jsonp: "backReq" // callback function
    }
    webServiceRequest(url, data);
}

/**
 * Callback function to hold geocoded coordinates
 * @param {Array} result 
 */
function backReq(result){
    geocodeCoord = [
        result['results'][1]['annotations']['DMS']['lat'],
        result['results'][1]['annotations']['DMS']['lng']
    ]
}

/**
 * show path connceting locations
 */
function showPath(){
    let object = {
        type: "geojson",
        data: {
        type: "Feature",
        properties: {},
        geometry: {
        type: "LineString",
        coordinates: []
        }
        }
        };
        
        for(let i = 0; i < locations.length; i++)
        {
        object.data.geometry.coordinates.push(locations[i].coordinates);
        }
        
        map.addLayer({
        id: "routes",
        type: "line",
        source: object,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#888", "line-width": 6 }
        });
}

/**
 * shows popup markers on all locations
 */
function showLocations(){
    for (let i = 0; i < locations.length; i++){
	let location = locations[i];
    // Display the marker.
	let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
	marker.setLngLat(location.coordinates);
    // Display the popup.
	let popup = new mapboxgl.Popup({ offset: 45});
	popup.setText(location.description);
    // Attach the popup to the marker
	marker.setPopup(popup)
    // Add the marker to the map
	marker.addTo(map);
    // Add the popup to the map
	popup.addTo(map);
    }
    
}

/**
 * Shows a newly added location to the map
 * @param {Array} location 
 */
function showNewLocation(location){
	let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
	marker.setLngLat(location.coordinates);
    // Display the popup.
	let popup = new mapboxgl.Popup({ offset: 45});
	popup.setText(location.description);
    // Attach the popup to the marker
	marker.setPopup(popup)
    // Add the marker to the map
	marker.addTo(map);
    // Add the popup to the map
	popup.addTo(map);
}

/**
 * Adds the location the user has dropped pin on to the array of locations
 * @param {JSON} userPin 
 */
function addLoc(userPin){
    let location = {
		coordinates: [userPin['lat'], userPin['lng']],
		description: 'Current'
	};
    location.push(location);
    showNewLocation(location);
}

/**
 * Pans map to user location
 */
function panToUser(){
    
	map.panTo(userLocation);
    let marker = new mapboxgl.Marker({ "color": "#03D327" });
    marker.setLngLat(userLocation.coordinates);

    let popup = new mapboxgl.Popup({ offset: 45});
    popup.setText(userLocation.description);

	marker.setPopup(popup)

	// Display the marker.
	marker.addTo(map);

	// Display the popup.
	popup.addTo(map);
}

/**
 * function to draw a circle around user pin to indicate range for nearby cabs
 * @param {JSON} userPin 
 */
function nearbyCabs(userPin){
    
    if(circle){
        map.removeSource('circle');
        map.removeLayer('circle');
    }
    map.addSource('circle', {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [userPin['lng'], userPin['lat']]
          },
          "properties": {}
        }
      });
      
      map.addLayer({
        id: 'circle',
        type: 'circle',
        source: 'circle',
        paint: {
          'circle-color': '#00b7bf',
          'circle-radius': 500,
          'circle-opacity': 0.2,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#333',
        },
      });
}


