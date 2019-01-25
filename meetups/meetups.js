let results = []
const eventUrl ="https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&categories="
const eventToken ="&token=LSMF733OV2VR6EEC2LEY"
let myUrlSearch = ""
let makeUrl = eventUrl.concat(myUrlSearch).concat(eventToken) 
let getSearchTerms = () => {
   myUrlSearch = document.getElementById("searchTerms").value
   console.log(myUrlSearch)
   fetch(makeUrl)
   .then(response => response.json)
   .then(results.push(myUrlSearch))
   .then(addHtmlToDom(myUrlSearch ))
   
}
 console.log(results)

 let htmlBuilder = (myUrlSearch) =>  {
 return `

 <p>${myUrlSearch.name}<p>
 
 `}      
 
 const addHtmlToDom = (htmlElement) => {
     document.querySelector("#apiResults").innerHTML += htmlElement
    }
    
    
    

 document.getElementById("input").addEventListener("click", getSearchTerms, addHtmlToDom)
    