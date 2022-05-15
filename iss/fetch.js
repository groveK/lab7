let url = "https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeLocationFetched = document.querySelector('#time')

let update = 10000
let maxFailAttempts = 3
let issMarker
let issIcon = L.icon({
    iconUrl: 'noun-iss.png',
    iconSize: [50, 50],
    iconAnchor: [25,25],
})
let map = L.map('iss-map').setView([0,0], 1)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailAttempts) //call function one time to start

function iss(attempts) {

    if (attempts <= 0) {
        alert('Failed to contact ISS server after 3 attempts')
        return
    }
    fetch(url).then((res) => {
        return res.json() //process response into JSON
    }).then((issData) => {
        console.log(issData) //return promise - display data on webpage
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        //create marker if it doesn't exist
        //move if it does exist
        if (!issMarker) {
            //create market
            issMarker = L.marker([lat, long],{icon: issIcon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let now = Date()
        timeLocationFetched.innerHTML = `This data was fetched at ${now}`
    }).catch((err) => {
        attempts-- //subtract 1 from number of attempts
        console.log('ERROR!', err)
    }).finally(() => {
        setTimeout(iss, update, attempts)
    })
}

// if fetch works - then is called. if fetch fails, error returns