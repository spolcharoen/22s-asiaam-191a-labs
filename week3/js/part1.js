// declare the map
const map = L.map('the_map').setView([13.7563,100.5018], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(13.891230,100.538368,'nichada thani','my neighborhood in thailand!')
addMarker(13.684490,100.619400,"grandma's","grandma's house! grew up here eating delicious homemade food :)")
addMarker(13.7462,100.5347,'siam paragon','my favorite mall in thailand!')
addMarker(13.6900,100.7501,'suvarnabhumi airport','i leave from here to fly to ucla!')
addMarker(13.8930,100.5262,'international school bangkok','i went to elementary and middle school here!')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    document.getElementById("contents").appendChild(newButton); //this adds the button to our page.
}
