
'use strict'
const weatherKey = '273aa1cbe2cd87586632673b6637c0de';
const weatherUrl ='api.openweathermap.org/data/2.5/forecast'
// weatherKey = "882c100e357f5ad81cfdce3b65036425";
const hikingKey = "200616177-251562ab104a6def31b38b058d4acf3a";
const mapsKey = "AIzaSyB4NifjFp63z2lo8oXCaggg5Yrme4z5b_A";
const mapsUrl = "https://maps.googleapis.com/maps/api/geocode/json"
// weatherUrl = "api.openweathermap.org/data/2.5/forecast?"
const hikingUrl = "https://www.hikingproject.com/data/get-trails"
const myHikingKey = '200616064-e1179b9f85f40484fd23132602b1b789'
const trailConditions = 'https://www.hikingproject.com/data/get-conditions'



// displays all information
function displayResults(trailsJson, mapsJson) {
    $("#results-list").empty();

    for(let i=0; i<trailsJson.trails.length; i++) {
        $("#results-list").append(
            `<div class='result-page'>
                <li>
                <h3 class='domine-font'>${trailsJson.trails[i].name}</h3>
                <div class="trail-detail">
                    <div class='trail-img'>
                        <img src="${trailsJson.trails[i].imgSmallMed}" class='image-size'>
                    </div>
                    <div class='details-list'>
                        <p class='roboto-font'>${trailsJson.trails[i].summary}</p> 
                        <p class='roboto-font'>Ascent: ${trailsJson.trails[i].ascent} ft</p>
                        <p class='roboto-font'>Length: ${trailsJson.trails[i].length} miles</p>
                        <p class='roboto-font'>Location: ${trailsJson.trails[i].location}</p>
                    </div>
                </div>
                <div class='trail-img'>
                    <img src="https://maps.googleapis.com/maps/api/staticmap?markers=label:B|${trailsJson.trails[i].latitude},${trailsJson.trails[i].longitude}&markers=label:A|${mapsJson.results[0].geometry.location.lat},${mapsJson.results[0].geometry.location.lng}&size=700x300&key=AIzaSyB4NifjFp63z2lo8oXCaggg5Yrme4z5b_A" class='map-size'>
                </div>
                </li>
            </div>`
        )
    }
    $("#results").removeClass("hidden");
}


// Fetches a json of all trails nearby provided location
function getTrails(mapsJson) {

    // parameters for hiking project api
    const params= {
        lat: `${mapsJson.results[0].geometry.location.lat}`,
        lon: `${mapsJson.results[0].geometry.location.lng}`,
        maxResults: `20`,
        maxDistance: `10`,
        key: hikingKey,
    };

    // creates url for hiking project api
    let queryString = $.param(params);
    const url = hikingUrl + "?" + queryString;

    // fetches json using the url created
    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(trailsJson=>displayResults(trailsJson, mapsJson))
        .catch(err => {
            $("#js-error-message").text(`Trails failed: ${err.message}`);
        });
}


// Gets the location json(google maps api) using the searchTerm as an address
function getLocation(searchTerm) {

    // parameters for google maps api
    const params= {
        address: searchTerm,
        key: mapsKey,
    };

    // creates url for google maps json
    let queryString = $.param(params);
    const url = mapsUrl + "?" + queryString;


    // fetches the json using the url created
    fetch(url)
        .then(response=> {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(mapsJson=>getTrails(mapsJson))
        .catch(err => {
            $("#js-error-message").text(`Location failed: ${err.message}`);
        });
}


// Watches submit button via event listener to get input data
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
