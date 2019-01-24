// let names = []
// let types = []
// let costs = []
let arrayOfResturants = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}

]

fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&apikey=a5b9a73d046e9d6841fc6862a427d076
`)
    .then(response => response.json())
    .then(restInfo => {
        console.table(restInfo)
        for (let i = 0; i < 20; i++) {
            let name = restInfo.restaurants[i].restaurant.name;
            let type = restInfo.restaurants[i].restaurant.cuisines;
            let cost = restInfo.restaurants[i].restaurant.average_cost_for_two;

            arrayOfResturants[i].names = name
            arrayOfResturants[i].types = type
            arrayOfResturants[i].costs = cost
            // console.log(name)
            // console.log(type)

            // names.push(name)
            // types.push(type)
            // costs.push(cost)
            
            
        }
        // restuarants[0] = restInfo.restaurants[3].restaurant.name
        // console.log(restInfo.restaurants[3].restaurant.name)
        // console.table(names)
        // console.table(types)
        // console.table(costs)
        console.table(arrayOfResturants)

    })
    // restuarants[0] = restInfo[1]


