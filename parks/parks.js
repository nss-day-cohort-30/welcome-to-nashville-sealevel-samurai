const searchStart = "https://data.nashville.gov/resource/xbru-cfzi.json?"
const APIKey = "&$$app_token=AJNDweW2mpoIQRcy43HbdJgdq"
let filters = ""


// function that will read which dropdown options are checked, and create the string of filters that needs to be inserted into the Fetch URL
searchParksAPI = function () {
    let URLFilterString = [];
    let parkFeatures = document.querySelectorAll(".parkFeature")
    parkFeatures.forEach(feature => {
        if (feature.checked === true) {
            URLFilterString.push(`${feature.id}=Yes`)
        }
    });
    filters = URLFilterString.join("&");
    // add all search strings together
    let fullSearchURL = searchStart.concat(filters).concat(APIKey)
    fetch(`${fullSearchURL}`)
        .then(parks => parks.json())
        .then(parsedParks => {
            let parksThatMatch = document.querySelector("#parksThatMatch")
            if (parksThatMatch.hasChildNodes()) {
                parksThatMatch.innerHTML = "";
            }
            if (parsedParks.length === 0) {
                parksThatMatch.innerHTML  = `
                <div id="noParks" class="noParks">
                    No parks match your criteria, please try a less restrictive search!
                </div>
                `
            } else {
                parsedParks.forEach(park => {
                    let parkName = park.park_name;
                    let parkAddress = `${park.mapped_location_address}, ${park.mapped_location_city}, ${park.mapped_location_state}, ${park.mapped_location_zip}`;
                    parksThatMatch.innerHTML += `
                        <article id="${parkName}" class="matchingPark">
                            <h2 id="${parkName}-header" class="matchingParkHeader">${parkName}</h2>
                            <div id="${parkName}-address" class="matchingParkAddress">${parkAddress}</div>
                        </article>
                    `
                })
            }
        })
}




document.querySelector("#searchButton").addEventListener("click", searchParksAPI)


// fetch("https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=AJNDweW2mpoIQRcy43HbdJgdq")
// fetch(`${searchReady}`)
//     .then(parks => parks.json())
//     .then(parsedParks => {
//         parsedParks.forEach(park =>
//             console.log(park))
//     })