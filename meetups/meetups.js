//create an empy array for results
let results = []
//breaks the url down for custom search
const eventUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&q="
const eventToken = "&token=LSMF733OV2VR6EEC2LEY"
const meetupDiv = document.getElementById("savedMeetupDiv")
let myUrlSearch = ""
//gets the custom search
let getSearchTerms = () => {
    myUrlSearch = document.getElementById("searchTerms").value

    //gets the api
    let makeUrl = eventUrl.concat(myUrlSearch).concat(eventToken)
    fetch(makeUrl)
        .then(response => response.json())
        .then(results => {
            console.log(results.events)
            let meetUps = results.events
            // console.log(typeof meetUps)
            if(meetUpsThatWork.hasChildNodes()) {
                meetUpsThatWork.innerHTML = ""
            }
            meetUps.forEach(meetUp => {
                let name = meetUp.name.text
                let url = meetUp.url
                console.log(name)
                let htmlBuilder = meetUpsThatWork.innerHTML +=
                    `
                    <div>
                    <a href=${url} target="_blank">${name}</a>
                    <button id="save-${url}">Save Event</button>
                    </div>
                    `
                // console.log(results.name)
            });
        })



    // .push(myUrlSearch))
    // .then(addHtmlToDom(myUrlSearch))
    // .then(console.log(makeUrl))

}
// console.log(results)
//builds the html

//adds html to dom
const addHtmlToDom = (htmlBuilder) => {
    let meetupResults = document.getElementById("meetUpsThatWork")
    meetupResults.innerHTML += htmlElement
}
// let saveMeetUp = () => {
//     document.querySelector("meetUpSearchResults")
// }

//listens for the button
document.getElementById("meetUpInput").addEventListener("click", getSearchTerms)

document.getElementById("meetupsSearchResults").addEventListener("click", function(event) {
    if (event.target.nodeName === "BUTTON") {
        let selectedResult = event.target.previousSibling.previousSibling.cloneNode(true)
        savedMeetupDiv.innerHTML = ""
        savedMeetupDiv.appendChild(selectedResult)
    }
})