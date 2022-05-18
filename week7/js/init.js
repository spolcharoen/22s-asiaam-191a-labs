// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5};

let namjoon = L.featureGroup();
let tae = L.featureGroup();
let jin = L.featureGroup();
let jungkook = L.featureGroup();
let jimin = L.featureGroup();
let yoongi = L.featureGroup();
let hobi = L.featureGroup();

let layers = {
    "Namjoon (RM) Bias": namjoon,
    "Tae (V) Bias": tae,
    "Jin Bias": jin,
    "Jungkook Bias": jungkook,
    "Jimin Bias": jimin,
    "Yoongi (SUGA) Bias": yoongi,
    "Hobi (JHope) Bias": hobi
};

let circleOptions = {
    radius: 7,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
};

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn6rqhN-tHgqJ-7xkmSq4kinPDxkJj1s-xmyN5Q52RBEmirJ9072kVH9lSIXn7YDoiX_JEmcBCtbHN/pub?output=csv";

const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

// add layer control box
L.control.layers(null,layers).addTo(map);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data["Who's your bias?"] == "Namjoon (RM)"){
        circleOptions.fillColor = "blue"
        namjoon.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Namjoon (RM) Bias</h2>`))
        createButtons(data.lat,data.lng,data.Location)
        }
    else if(data["Who's your bias?"] == "Tae (V)"){
        circleOptions.fillColor = "green"
        tae.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Tae (V) Bias</h2>`))
        createButtons(data.lat,data.lng,data.Location)
        }
    else if(data["Who's your bias?"] == "Jin"){
        circleOptions.fillColor = "pink"
        jin.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Jin Bias</h2>`))
        createButtons(data.lat,data.lng,data.Location)
        }
    else if(data["Who's your bias?"] == "Jungkook"){
        circleOptions.fillColor = "red"
        jungkook.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Jungkook Bias</h2>`))
        createButtons(data.lat,data.lng,data.Location)
        }
    else if(data["Who's your bias?"] == "Jimin"){
        circleOptions.fillColor = "yellow"
        jimin.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Jimin Bias</h2>`))
        createButtons(data.lat,data.lng,data.Location)
        }
    else if(data["Who's your bias?"] == "Yoongi (SUGA)"){
        circleOptions.fillColor = "black"
        yoongi.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Yoongi (SUGA) Bias</h2>`))
        createButtons(data.lat,data.lng,data.Location)
        }
    else{
        circleOptions.fillColor = "navy"
        hobi.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Hobi (JHope) Bias</h2>`))
        createButtons(data.lat,data.lng,data.Location)
    }
    return data
};

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
};

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
};

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    namjoon.addTo(map) // add our layers after markers have been made
    tae.addTo(map) // add our layers after markers have been made
    jin.addTo(map) // add our layers after markers have been made
    jungkook.addTo(map) // add our layers after markers have been made
    jimin.addTo(map) // add our layers after markers have been made
    yoongi.addTo(map) // add our layers after markers have been made
    hobi.addTo(map) // add our layers after markers have been made
    let allLayers = L.featureGroup([namjoon,tae,jin,jungkook,jimin,yoongi,hobi]);
    map.fitBounds(allLayers.getBounds());
};

loadData(dataUrl)
