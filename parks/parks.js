const searchStart = "https://data.nashville.gov/resource/xbru-cfzi.json?"
const APIKey = "&$$app_token=AJNDweW2mpoIQRcy43HbdJgdq"

// function that will read which dropdown options are checked, and create the string of filters that needs to be inserted into the Fetch URL
let filters = ""
makeURLFilters = function () {
    let parkFeatures = document.querySelectorAll(".parkFeature")
    parkFeatures.forEach(feature => {
        if (feature.checked === true) {
        }
        
    });
}


document.querySelector("#searchButton").addEventListener("click", makeURLFilters)

// add all search strings together
let searchReady = searchStart.concat(filters).concat(APIKey)

// fetch("https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=AJNDweW2mpoIQRcy43HbdJgdq")
// fetch(`${searchReady}`)
//     .then(parks => parks.json())
//     .then(parsedParks => {
//         parsedParks.forEach(park =>
//             console.log(park))
//     })