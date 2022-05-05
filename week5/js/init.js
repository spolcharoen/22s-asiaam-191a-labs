// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data){
    console.log(data)
    L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>Bias: ${data["Who's your bias?"]}</h2> <h3>How you discovered BTS: ${data["How did you discover BTS?"]}</h3> <h3>Favorite song: ${data["What's your favorite song?"]}</h3>`)
    // return message
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn6rqhN-tHgqJ-7xkmSq4kinPDxkJj1s-xmyN5Q52RBEmirJ9072kVH9lSIXn7YDoiX_JEmcBCtbHN/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
        // addMarker(data.lat,data.lng,data['How did you discover BTS?'],data["Who's your bias?"])
    })
}

loadData(dataUrl)
