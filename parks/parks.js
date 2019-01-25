const searchStart = "https://data.nashville.gov/resource/xbru-cfzi.json?"
const APIKey = "&$$app_token=AJNDweW2mpoIQRcy43HbdJgdq"
let filters = ""


// function that will read which dropdown options are checked, and create the string of filters that needs to be inserted into the Fetch URL
makeURLFilters = function () {
    let URLFilterString = [];
    let parkFeatures = document.querySelectorAll(".parkFeature")
    parkFeatures.forEach(feature => {
        if (feature.checked === true) {
            URLFilterString.push(`${feature.id}=Yes`)
        }
    });
    filters = URLFilterString.join("&");
    // add all search strings together
    let searchReady = searchStart.concat(filters).concat(APIKey)
    fetch(`${searchReady}`)
        .then(parks => parks.json())
        .then(parsedParks => {
            if (parsedParks.length === 0) {
                console.log(`No parks match your criteria, please try a less restrictive search!S`)
            } else {
            parsedParks.forEach(park => {
                    console.log(park)
                })
            }
        })
}




document.querySelector("#searchButton").addEventListener("click", makeURLFilters)


// fetch("https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=AJNDweW2mpoIQRcy43HbdJgdq")
// fetch(`${searchReady}`)
//     .then(parks => parks.json())
//     .then(parsedParks => {
//         parsedParks.forEach(park =>
//             console.log(park))
//     })