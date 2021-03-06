// creates basic components for the fetch URL
const searchStart = "https://data.nashville.gov/resource/xbru-cfzi.json?"
const APIKey = "&$$app_token=AJNDweW2mpoIQRcy43HbdJgdq"
let filters = ""


// function that will read which dropdown options are checked, and create the string of filters that needs to be inserted into the Fetch URL
searchParksAPI = function () {
    // creates an array to handle multiple desired features
    let URLFilterString = [];
    // checks to see which boxes are checked, and adds those features to URLFilterString
    let parkFeatures = document.querySelectorAll(".parkFeature")
    parkFeatures.forEach(feature => {
        if (feature.checked === true) {
            URLFilterString.push(`${feature.id}=Yes`)
        }
    });
    // Converts URLFilterString to the proper format for the URL search filters
    filters = URLFilterString.join("&");
    // add all search strings together
    let fullSearchURL = searchStart.concat(filters).concat(APIKey)
    // executes fetch with the proper URL filters
    fetch(`${fullSearchURL}`)
        .then(parks => parks.json())
        .then(parsedParks => {
            let parksThatMatch = document.querySelector("#parksThatMatch")
            // clears out #parksThatMatch if there are multiple searches
            if (parksThatMatch.hasChildNodes()) {
                parksThatMatch.innerHTML = "";
            }
            // Sends a message that lets the user know no parks match the request
            if (parsedParks.length === 0) {
                parksThatMatch.innerHTML  = `
                <div id="noParks" class="noParks">
                    No parks match your criteria, please try a less restrictive search!
                </div>
                `
            // takes parks that match the request, strips out the name and address, and adds those in a new article tag to #parksThatMatch
            } else {
                parsedParks.forEach(park => {
                    let parkName = park.park_name;
                    let parkAddress = `${park.mapped_location_address}, ${park.mapped_location_city}, ${park.mapped_location_state}
                    `;
                    parksThatMatch.innerHTML += `
                        <article id="${parkName}" class="matchingPark">
                            <h2 id="${parkName}-header" class="matchingParkHeader">${parkName}</h2>
                            <div id="${parkName}-address" class="matchingParkAddress">${parkAddress}</div>
                            <button id="save-${parkName}" class="savePark">
                                Save this park!
                            </button>
                        </article>
                    `
                })
            }
        })
}

document.querySelector("#parkSearchButton").addEventListener("click", searchParksAPI)

// Defines the dropdown list as dropdown
let dropdown = document.querySelector("#parkFeaturesList");
// Creates a function that expands or collapses the dropdown;
executeDropdown = function () {
    dropdown.classList.toggle("visible")
}
// Adds executeDropdown to "select desired features" bar
document.querySelector(".anchor").addEventListener("click", executeDropdown)



saveParkToItinerary = function (event) {
    // checks to make sure a seave button is clicked
    if(event.target.id.startsWith("save")) {
        // Clears out any pre-existing parks in the saved itinerary:
        let itineraryPark = document.querySelector("#savedParkDiv")
        if (itineraryPark.textContent !== "") {
            itineraryPark.textContent = "";
        }
        // makes a copy of a node. I'm working with the node because I'm having difficulty querySelecting elemnts with spaces in the id name, which some of the tags generated with park names have spaces in the id. 
        // copying the parent node so it doesnt get moved out of the results list
        let parkNode = event.target.parentNode.cloneNode(true);
        // making a list of the child nodes so I can select just the name and address
        let parkNodeList = parkNode.childNodes;
        let itineraryParkHTML = `
        <h2>${parkNodeList[1].textContent}</h2>
        <div>${parkNodeList[3].textContent}</div>
        `
        document.querySelector("#savedParkDiv").innerHTML = itineraryParkHTML;
    }
}

document.querySelector("#parksThatMatch").addEventListener("click", saveParkToItinerary)