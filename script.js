weatherKey = "882c100e357f5ad81cfdce3b65036425";
hikingKey = "200616177-251562ab104a6def31b38b058d4acf3a";
mapsKey = "AIzaSyB4NifjFp63z2lo8oXCaggg5Yrme4z5b_A";
mapsUrl = "https://maps.googleapis.com/maps/api/geocode/json"
weatherUrl = "api.openweathermap.org/data/2.5/forecast?"
hikingUrl = ""




function displayResults(responseJson) {
    $("#results-list").empty();

    console.log(responseJson);
    for(let i=0; i<responseJson.data.length; i++) {
        $("#results-list").append(
            `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}"> ${responseJson.data[i].url}</a>
            </li>
            `
        )
    }
    $("#results").removeClass("hidden");

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
        }).then(responseJson=>displayResults(responseJson))
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