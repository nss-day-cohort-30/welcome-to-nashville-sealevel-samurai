// declaring variables for searching API
const concertSearchStart = "https://app.ticketmaster.com/discovery/v2/events.json?"
const concertAPIKEY = "&dmaId=312&apikey=1IOrDckSKm979mY3YBxYLuqcNhgSUD26"
let concertChoice = ""

// Figure out checked genre
searchConcerts = function () {
  let concertFilterArray = []
  let genres = document.querySelectorAll(".concertGenre")
  genres.forEach(genre => {
    
    if (genre.checked === true) {
      
      concertFilterArray.push(`classificationId=${genre.id}`)
    }
  })
  
  // Search API for checked genre
  concertChoice = concertFilterArray.join("&")
  let concertSearchURL = concertSearchStart.concat(concertChoice).concat(concertAPIKEY)
  fetch(`${concertSearchURL}`)
  .then(response => response.json())
  .then(myParsedEvents => {
    console.log(myParsedEvents._embedded)
    let concertResults = document.querySelector("#concertResults")
    if (concertResults.hasChildNodes()) {
      concertResults.innerHTML = ""
    }

    // Assign variables for concert information
    for (let i = 0; i < myParsedEvents._embedded.events.length; i++) {
      let artist = myParsedEvents._embedded.events[i].name
      let venue = myParsedEvents._embedded.events[i]._embedded.venues[0].name
      let date = myParsedEvents._embedded.events[i].dates.start.localDate
      let time = myParsedEvents._embedded.events[i].dates.start.localTime
      let genre = myParsedEvents._embedded.events[i].classifications[0].genre.name
      let image = myParsedEvents._embedded.events[i].images[2].url
      let eventID = myParsedEvents._embedded.events[i].id
      let eventCard = `
      <div class="concertInfo">
      <img src="${image}" class="image">
      <div>
      <h1>${artist}</h1>
      <h2>${venue}</h2>
      <p>${date} ${time}</p>
      <p>${genre}</p>
      </div>
      <div>
                <button id="save-${eventID}">Save Concert</button>
            </div>
            </div>
      `
      // button above works with saveConcert function to add to itinerary

      // returns search results per event
      document.querySelector("#concertResults").innerHTML+=eventCard
    }
  })
}

 // Defines the dropdown list as dropdown
 let concertDropdown = document.querySelector("#concertGenresList");
 // Creates a function that expands or collapses the dropdown;
 executeConcertDropdown = function () {
     concertDropdown.classList.toggle("visible")
 }
 // Adds executeDropdown to "select desired features" bar
 document.querySelector(".concertAnchor").addEventListener("click", executeConcertDropdown) 

 // add search function to search button
 document.querySelector("#concertSearchButton").addEventListener("click", searchConcerts)

// add selection to itinerary for save button
 saveConcert=function(event) {
if (event.target.id.startsWith("save")) {
  let itineraryConcert=document.querySelector("#savedConcertDiv")
  if (itineraryConcert.textContent !== "") {
    itineraryConcert.textContent = "";
  }
  let concertNode = event.target.parentNode.parentNode.cloneNode(true);
  let concertNodeList = concertNode.childNodes;
  console.log(concertNodeList)
  let itineraryConcertHTML = `
  ${concertNodeList[3].childNodes[1].innerText}
  ${concertNodeList[3].childNodes[3].innerText}
  `
  itineraryConcert.innerText=itineraryConcertHTML;
}
 }
 // add function to save button
 document.querySelector("#concertResults").addEventListener("click",saveConcert)