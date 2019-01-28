const concertSearchStart = "https://app.ticketmaster.com/discovery/v2/events.json?"
const concertAPIKEY = "&dmaId=312&apikey=1IOrDckSKm979mY3YBxYLuqcNhgSUD26"
let concertChoice = ""

// Fetch data from API
searchConcerts = function () {
  let concertFilterArray = []
  let genres = document.querySelectorAll(".concertGenre")
  genres.forEach(genre => {

    if (genre.checked === true) {

      concertFilterArray.push(`classificationId=${genre.id}`)
    }
  })
  concertChoice = concertFilterArray.join("&")
  let concertSearchURL = concertSearchStart.concat(concertChoice).concat(concertAPIKEY)
  // fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&genre=Country&dmaId=312&apikey=1IOrDckSKm979mY3YBxYLuqcNhgSUD26")
  fetch(`${concertSearchURL}`)
  .then(response => response.json())
  .then(myParsedEvents => {
    console.log(myParsedEvents._embedded)
    let concertResults = document.querySelector("#concertResults")
    if (concertResults.hasChildNodes()) {
      concertResults.innerHTML = ""
    }
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
      document.querySelector("#concertResults").innerHTML+=eventCard
      // listEl.innerHTML+=eventCard
      // console.log(artist)
      // console.log(venue)
      // console.log(date)
      // console.log(time)
      // console.log(genre)
      // console.log(image)
    }
  })
}
// console.log(listEl)
// const addEventToDom = artist => listEl.innerHTML += artist

 // Defines the dropdown list as dropdown
 let concertDropdown = document.querySelector("#concertGenresList");
 // Creates a function that expands or collapses the dropdown;
 executeConcertDropdown = function () {
     concertDropdown.classList.toggle("visible")
 }
 // Adds executeDropdown to "select desired features" bar
 document.querySelector(".concertAnchor").addEventListener("click", executeConcertDropdown) 

 document.querySelector("#concertSearchButton").addEventListener("click", searchConcerts)

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
 document.querySelector("#concertResults").addEventListener("click",saveConcert)