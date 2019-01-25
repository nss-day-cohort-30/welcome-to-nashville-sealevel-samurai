
let arrayOfResturants = [

]

foodType = prompt("What are you looking for?")


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
            let blankRestObject = {}

            blankRestObject.names = name
            blankRestObject.types = type
            blankRestObject.costs = cost
            blankRestObject.locations = location

            arrayOfResturants.push(blankRestObject)
        }
        console.table(arrayOfResturants)
        if (arrayOfResturants.length < 3) {
            alert("Please try another query.")
        }
    })




