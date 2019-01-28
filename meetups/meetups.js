//create an empy array for results
let results = []
//breaks the url down for custom search
const eventUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&q="
const eventToken = "&token=LSMF733OV2VR6EEC2LEY"
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
            console.log(typeof meetUps)
            meetUps.forEach(meetUp => {
                let name = meetUp.name.text
                console.log(name)
                let htmlBuilder = () => {
                    return `
                    <p>${results.events.name.text}<p>
                    `}
                    
                    console.log(results.name)
        });})



        // .push(myUrlSearch))
        // .then(addHtmlToDom(myUrlSearch))
        // .then(console.log(makeUrl))

}
// console.log(results)
//builds the html

//adds html to dom
const addHtmlToDom = (htmlBuilder) => {
    document.querySelector("#apiResults").innerHTML += htmlElement
}

//listens for the button
document.getElementById("input").addEventListener("click", getSearchTerms)
