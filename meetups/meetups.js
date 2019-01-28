//create an empy array for results
let results = []
//breaks the url down for custom search
const eventUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&q="
const eventToken = "&token=LSMF733OV2VR6EEC2LEY"
const meetupDiv = document.getElementById("savedMeetupDiv")
let myUrlSearch = ""
//gets the custom search
let getSearchTerms = () => {
    myUrlSearch = document.getElementById("meetUpsearchTerms").value

    //gets the api
    let makeUrl = eventUrl.concat(myUrlSearch).concat(eventToken)
    fetch(makeUrl)
        .then(response => response.json())
        .then(results => {
            console.log(results.events)
            let meetUps = results.events
            // console.log(typeof meetUps)
            if (meetUpsThatWork.hasChildNodes()) {
                meetUpsThatWork.innerHTML = ""
            }
            //loops through the meetups and displays in results
            meetUps.forEach(meetUp => {
                let name = meetUp.name.text
                let url = meetUp.url
                console.log(name)
                let htmlBuilder = meetUpsThatWork.innerHTML +=
                    //builds the html
                    `
                    <div>
                    <a href=${url} target="_blank">${name}</a>
                    <button id="save-${url}">Save Event</button>
                    </div>
                    `
                // console.log(results.name)
            });
        })





}


//adds html to dom
const addHtmlToDom = (htmlBuilder) => {
    let meetupResults = document.getElementById("meetUpsThatWork")
    meetupResults.innerHTML += htmlElement
}


//listens for the button
document.getElementById("meetUpInput").addEventListener("click", getSearchTerms)
//puts the saved result into itinerary
document.getElementById("meetupsSearchResults").addEventListener("click", function (event) {
    if (event.target.nodeName === "BUTTON") {
        let selectedResult = event.target.previousSibling.previousSibling.cloneNode(true)
        savedMeetupDiv.innerHTML = ""
        savedMeetupDiv.appendChild(selectedResult)
    }
})