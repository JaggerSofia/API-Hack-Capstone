weatherKey = "882c100e357f5ad81cfdce3b65036425";
hikingKey = "200616177-251562ab104a6def31b38b058d4acf3a";
mapsKey = "AIzaSyB4NifjFp63z2lo8oXCaggg5Yrme4z5b_A";
mapsUrl = "https://maps.googleapis.com/maps/api/geocode/json"
weatherUrl = "api.openweathermap.org/data/2.5/forecast?"
hikingUrl = "https://www.hikingproject.com/data/get-trails"




function displayResults(trailsJson, mapsJson) {
    $("#results-list").empty();

    console.log("displaying", trailsJson, mapsJson);

    for(let i=0; i<trailsJson.trails.length; i++) {
        $("#results-list").append(
            `<li>
            <h3>${trailsJson.trails[i].name}</h3>
            <img src="${trailsJson.trails[i].imgSmallMed}">
            <p>${trailsJson.trails[i].summary}</p>

            <div class="details-list"> 
                <p>Ascent: ${trailsJson.trails[i].ascent}</p>
                <p>Difficulty: ${trailsJson.trails[i].difficulty}</p>
                <p>Length: ${trailsJson.trails[i].length} miles</p>
                <p>Location: ${trailsJson.trails[i].location}</p>
            </div>

            <img src="https://maps.googleapis.com/maps/api/staticmap?markers=${trailsJson.trails[i].latitude},${trailsJson.trails[i].longitude}|${mapsJson.results[0].geometry.location.lat},${mapsJson.results[0].geometry.location.lng}&size=700x300&key=AIzaSyB4NifjFp63z2lo8oXCaggg5Yrme4z5b_A">

            </li>
            `
        )
    }
    $("#results").removeClass("hidden");

}



function getTrails(mapsJson) {
    console.log("maps data", mapsJson);

    const params= {
        lat: `${mapsJson.results[0].geometry.location.lat}`,
        lon: `${mapsJson.results[0].geometry.location.lng}`,
        maxResults: `20`,
        maxDistance: `10`,
        key: hikingKey,
    };

    console.log(`${mapsJson.results[0].geometry.location.lat}`);

    let queryString = $.param(params);
    console.log(queryString);
    const url = hikingUrl + "?" + queryString;
    console.log(url);

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(trailsJson=>displayResults(trailsJson, mapsJson))
        .catch(err => {
            $("#js-error-message").text(`Something failed: ${err.message}`);
        });
}



function getLocation(searchTerm) {
    console.log("Formdata", searchTerm);
    const params= {
        address: searchTerm,
        key: mapsKey,
    };

    let queryString = $.param(params);
    console.log(queryString);
    const url = mapsUrl + "?" + queryString;

    fetch(url)
        .then(response=> {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(mapsJson=>getTrails(mapsJson))
        .catch(err => {
            $("#js-error-message").text(`Something failed: ${err.message}`);
        });

}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let searchTerm=$("#search-term").val();
        
        if(searchTerm != "") {
            getLocation(searchTerm);
        } else {
            alert("Please enter a location");
        }
    })

}


$(watchForm)