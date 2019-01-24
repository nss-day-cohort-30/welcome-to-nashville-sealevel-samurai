let concerts = []

fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=312&apikey=1IOrDckSKm979mY3YBxYLuqcNhgSUD26")
.then(response => response.json())
    .then(concerts => {
      //  console.table(concerts)
       console.log(concerts._embedded.events[0].classification)
      }
      );


// const genre = () => {
//   return `
//   <article class="musicGenre">
//   <section>
//       Genre: ${_embedded.}
//   </section>
//   </article>
// }

// fetch({
//     type:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=312&apikey=1IOrDckSKm979mY3YBxYLuqcNhgSUD26",
//     async:true,
//     dataType: "json",
//     success: function(json) {
//                 console.log(json);
//                 // Parse the response.
//                 // Do other things.
//              },
//     error: function(xhr, status, err) {
//                 // This time, we do not end up here!
//              }
//   });