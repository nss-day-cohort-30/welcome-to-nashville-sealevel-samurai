// let events = []
const listEl = document.getElementById("eventList")

// Fetch data from API
fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=312&apikey=1IOrDckSKm979mY3YBxYLuqcNhgSUD26")
.then(response => response.json())
.then(myParsedEvents => {
  console.log(myParsedEvents._embedded)
  for (let i = 0; i < myParsedEvents._embedded.events.length; i++) {
    let artist = myParsedEvents._embedded.events[i].name
    let venue = myParsedEvents._embedded.events[i]._embedded.venues[0].name
    let date = myParsedEvents._embedded.events[i].dates.start.localDate
    let time = myParsedEvents._embedded.events[i].dates.start.localTime
    let genre = myParsedEvents._embedded.events[i].classifications[0].genre.name
    let image = myParsedEvents._embedded.events[i].images[3].url
    let eventCard = `
    <h1>${artist}</h1>
    <h2>${venue}</h2>
    <p>${date} ${time}</p>
    <p>${genre}</p>
    <img src="${image}" class="image">
    `
    // listEl.innerHTML+=eventCard
    // console.log(artist)
    // console.log(venue)
    // console.log(date)
    // console.log(time)
    // console.log(genre)
    // console.log(image)
  }
})
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
