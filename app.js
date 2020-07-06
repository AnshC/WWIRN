// Init

getLocation();

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
     document.getElementById("tz","rainDate","statement"),innerHTML = "Browser Not Supported"
    }
  }
  
  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log('longitude: ' + long)
    console.log('latitude: '+ lat)

    // When Will It Rain Next [JavaScript]

let api = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=metric&%20exclude=daily&appid=faa07538ebede655590a83a34ef856f8'
console.log('API: ' + api)

// Fetching Api

fetch(api)
.then(response =>{
    return response.json();
})
.then(data =>{
    
    // Logging API data to Console

    console.log(data)
    
    // Initializing of variables and con
    
    var date = 0;
    const mainState = data.daily[date].weather[0].main;
    const timeZone = data.timezone;
    
    //////////////////////Function Blocks///////////////////////////////

    function dateCounter(){
        let date = 0;
        date = date + 1;
        if (date > 7){
            document.getElementById("rainDate").innerHTML = "It won't rain this week :(";
            console.log("No rain this week :/")
            }
        else{
            check();
        }
    }

    function check(){
        

        if (mainState.includes("Rain" || "Thunderstorm" || "Drizzle")){
            console.log('How many days till rain: ' + date)
            console.log('Main: ' + mainState)
            if (mainState == "Rain" || "Drizzle"){
                document.body.style.backgroundImage = "url('https://cdn.glitch.com/c317777f-79fd-409f-97be-8d11a91c6bf8%2Frain.jpg?v=1593864572653')";
            }
            else if (mainState == "Thunderstorm"){
                document.body.style.backgroundImage = "url('https://cdn.glitch.com/c317777f-79fd-409f-97be-8d11a91c6bf8%2Fthunder.jpg?v=1593864572328')"
            }
            else{
                document.body.style.backgroundImage = "url('https://cdn.glitch.com/c317777f-79fd-409f-97be-8d11a91c6bf8%2Fclear.jpg?v=1593864572870')"
            }
        }
        else {
            
            dateCounter();
        }
    }

    ///////////////////////////////////////////////////////////////

    // Program Start

    check();
    
    // formatting Description

    var State = data.daily[date].weather[0].description;
    var State = State.substring(0, 1).toUpperCase() + State.substring(1);

    statement = State;

    // HTML logic

    if (date == 0){
        document.getElementById("rainDate").innerHTML = 'When Will It Rain Next:' + ' ' + 'Today! (24 hours)'
    }
    else{
        document.getElementById("rainDate").innerHTML = 'When Will It Rain Next:'+ ' ' + '+' + date + ' ' + 'days';
    }

    document.getElementById("statement").innerHTML = 'Type of Rain:' + ' ' + statement;
    document.getElementById("tz").innerHTML = timeZone
});
}


