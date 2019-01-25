
    let arrayOfResturants = []
    
    // foodType = prompt("What are you looking for?")
    let textArea = document.getElementById("foodSearch");
    let clicked = false

    let foodSearcher = () => {
        let foodType = textArea.value
        let html = ""
        console.log(foodType)
        let el = document.getElementById("putHere")
        el.innerHTML = ""
    
    fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&apikey=a5b9a73d046e9d6841fc6862a427d076&q=${foodType}
    `)
        .then(response => response.json())
        .then(restInfo => {
            console.table(restInfo)
            for (let i = 0; i < restInfo.restaurants.length; i++) {
                let name = restInfo.restaurants[i].restaurant.name;
                let type = restInfo.restaurants[i].restaurant.cuisines;
                let cost = restInfo.restaurants[i].restaurant.average_cost_for_two;
                let location = restInfo.restaurants[i].restaurant.location.locality
                let rating = restInfo.restaurants[i].restaurant.user_rating.aggregate_rating


                html = `
                <div>
                <h2>${name}</h2>
                <h3>Type: ${type}</h3>
                <p> Cost: $${cost} for two people  Rating: ${rating}  Location: ${location}</p>
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
            console.table(arrayOfResturants)
            if (arrayOfResturants.length < 3) {
                alert("Please try another query.")
            } 
            
       
            arrayOfResturants = []
        
        })
    }

    document.getElementById("submitButton").addEventListener("click", foodSearcher)