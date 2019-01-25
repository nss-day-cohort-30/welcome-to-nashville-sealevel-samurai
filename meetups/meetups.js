//create an empy array for results
let results = []
//breaks the url down for custom search
const eventUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&q="
const eventToken = "&token=LSMF733OV2VR6EEC2LEY"
let myUrlSearch = ""
//gets the custom search
let getSearchTerms = () => {
    myUrlSearch = document.getElementById("searchTerms").value
    console.log(myUrlSearch)
    //gets the api
    let makeUrl = eventUrl.concat(myUrlSearch).concat(eventToken)
    fetch(makeUrl)
        .then(response => response.json())
        .then(results => {console.log(results)})
        // .push(myUrlSearch))
        // .then(addHtmlToDom(myUrlSearch))
        // .then(console.log(makeUrl))

}
console.log(results)
//builds the html
let htmlBuilder = (results) => {
    return `
 <p>${results.name}<p>
 `}
 
//adds html to dom
const addHtmlToDom = (htmlElement) => {
    document.querySelector("#apiResults").innerHTML += htmlElement
}

//listens for the button
document.getElementById("input").addEventListener("click", getSearchTerms)
