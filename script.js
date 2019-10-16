const hikingKey = '200616064-e1179b9f85f40484fd23132602b1b789';
const hikingUrl = 'https://www.hikingproject.com/data/get-trails?lat=44.4280&lon=-110.5885&key=200616064-e1179b9f85f40484fd23132602b1b789';

const weatherKey = '273aa1cbe2cd87586632673b6637c0de';
const weatherUrl ='api.openweathermap.org/data/2.5/forecast?lat=44.4280&lon=-110.5885&APIKey=273aa1cbe2cd87586632673b6637c0de';

const mapKey = 'AIzaSyDog9d8kc7VcB88_lhRhJvXdookxEfLrCs';
const mapUrl='https://maps.googleapis.com/maps/api/geocode/json?address=Yellow+Stone+National+Park&key=AIzaSyDog9d8kc7VcB88_lhRhJvXdookxEfLrCs&latlng=44.427963,-110.588455';

function searchResults(responseJson) {
    console.log(responseJson);
    for (let i=0; i<responseJson.items.length; i++) {
        $('#trail-list').append(
            `<li>
                <h3>${responseJson.items[i].lat.lng}</h3>
                <p>${responseJson.items[i].long_name.location_type}</p>
            </li>`
        )
    }
    $('.results').removeClass('hidden')
}

function findTrails(searchTrail) {
    const params = {
        address = searchTrail,
        key= mapKey,
    };

    let queryString = searchTrail = $.param(params);
    console.log("QueryString", queryString);
    const  url = mapUrl + '?' + queryString;
    console.log(url);

    fetch(url)
    .then(response) => {
        if (response.ok) {
            return response.json();
        }
    .then(responseJson => searchResults(responseJson))
    });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let  = ${'#trail-local'}.val();

        if 
    })
}
