
    let arrayOfResturants = []
    
    // foodType = prompt("What are you looking for?")
    let textArea = document.getElementById("foodSearch");
    let clicked = false

    let foodSearcher = () => {
        let foodType = textArea.value
        let html = ""
        // console.log(foodType)
        let el = document.getElementById("resturantResultsDisplay")
        el.innerHTML = ""
    
    fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&apikey=a5b9a73d046e9d6841fc6862a427d076&q=${foodType}
    `)
        .then(response => response.json())
        .then(restInfo => {
            // console.table(restInfo)
            for (let i = 0; i < restInfo.restaurants.length; i++) {
                let name = restInfo.restaurants[i].restaurant.name;
                let type = restInfo.restaurants[i].restaurant.cuisines;
                let cost = restInfo.restaurants[i].restaurant.average_cost_for_two;
                let location = restInfo.restaurants[i].restaurant.location.locality
                let rating = restInfo.restaurants[i].restaurant.user_rating.aggregate_rating
                let address = restInfo.restaurants[i].restaurant.location.address


                html = `
                <div class="restSearchDisplay">
                <h2>${name}</h2>
                <h3>Type: ${type}</h3>
                <p> Cost: $${cost} for two people | Rating: ${rating} | Location: ${location}</p>
                <p> Address: ${address} </p>
                <button id="save--${name}">Save this resturant</button>
                <br>
                </div>
            `
                el.innerHTML += html
                let blankRestObject = {}
    
                blankRestObject.names = name
                blankRestObject.types = type
                blankRestObject.costs = cost
                blankRestObject.ratings = rating
                blankRestObject.locations = location
    
                arrayOfResturants.push(blankRestObject)
            }
            // console.table(arrayOfResturants)
            if (arrayOfResturants.length < 3) {
                alert("Please try another query.")
            } 
            
       
            arrayOfResturants = []
        
        })
    }

    document.getElementById("submitButton").addEventListener("click", foodSearcher)


    saveRestToItinerary = function (event) {
        // checks to make sure a seave button is clicked
        if(event.target.id.startsWith("save")) {
            // Clears out any pre-existing parks in the saved itinerary:
            let itineraryRest = document.querySelector("#savedRestaurantDiv")
            if (itineraryRest.textContent !== "") {
                itineraryRest.textContent = "";
            }

            // let itineraryRestHTML = 
            // `
            // <h1>CLicked rest</h1>
            
            
            
            // `
            // makes a copy of a node. I'm working with the node because I'm having difficulty querySelecting elemnts with spaces in the id name, which some of the tags generated with park names have spaces in the id. 
            // copying the parent node so it doesnt get moved out of the results list
            let restNode = event.target.parentNode.cloneNode(true);
            // making a list of the child nodes so I can select just the name and address
            let restNodeList = restNode.childNodes;
            console.log( restNodeList)
            let itineraryRestHTML = `
            <h2>${restNodeList[1].textContent}</h2>
            <div>${restNodeList[7].textContent}</div>
            `
            document.querySelector("#savedRestaurantDiv").innerHTML = itineraryRestHTML;
    
    
    
    
        }
    }
    
    document.querySelector("#resturantResultsDisplay").addEventListener("click", saveRestToItinerary)