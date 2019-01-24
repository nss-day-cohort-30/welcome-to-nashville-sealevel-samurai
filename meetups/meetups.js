fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&location.within=50mi&token=LSMF733OV2VR6EEC2LEY`, {
    headers: {
        "accept": "application/json"
      },
})
    .then(response => response.json())
    .then(entries => {console.log(entries)})
    .then(
    for (let i = 0; i < entries.length; i++) {
        const element = entries[i];
        console.table(element)
    })