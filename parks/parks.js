const searchStart = "https://data.nashville.gov/resource/xbru-cfzi.json?"

// function that will read which dropdown options are checked, and create the string of filters that needs to be inserted into the Fetch URL
let filters = ""

makeURLFilters = function() {
    document.querySelectorAll()
}

let searchReady = searchStart.concat(filters)

// fetch("https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=AJNDweW2mpoIQRcy43HbdJgdq")
fetch(`${searchReady}&$$app_token=AJNDweW2mpoIQRcy43HbdJgdq`)
    .then(parks => parks.json())
    .then(parsedParks => {
        parsedParks.forEach(park =>
            console.log(park))
    })