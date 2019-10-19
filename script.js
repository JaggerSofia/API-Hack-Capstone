
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


function displayResults(trailsJson) {
    $("#results-list").empty();

    console.log("displaying", trailsJson);

    for(let i=0; i<trailsJson.trails.length; i++) {
        $("#results-list").append(
            `<div class='result-page'>
                <li>
                <h3 class='domine-font'>${trailsJson.trails[i].name}</h3>
                <div class='trail-img'>
                    <img src="${trailsJson.trails[i].imgSmallMed}">
                </div>
                <p class='roboto-font'>${trailsJson.trails[i].summary}</p>
                </li>
            </div>`
        )
    }
    $("#results").removeClass("hidden");
}

function getTrails(mapsJson) {
    console.log("maps data", mapsJson);

    const params= {
        lat: `${mapsJson.results[0].geometry.location.lat}`,
        lon: `${mapsJson.results[0].geometry.location.lng}`,
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
        }).then(trailsJson=>displayResults(trailsJson))
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
