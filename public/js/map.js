    //var x = document.getElementById("demo");
    var lat=null;
    var lon=null;
    var an = 10;
function getLocation() {                                                                    //getLocation() function points to the current location of user.
    if (navigator.geolocation) {                                                            
        navigator.geolocation.getCurrentPosition(showPosition, showError);                  // if current position is obtained showPosition() function points to the location
    } else {                                                                                //showError() gives error if current position cannot be obtained
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
     lat = position.coords.latitude;                                                     // lat is the latitude
    lon = position.coords.longitude;
                                                        // lon is longitude
    var latlon = new google.maps.LatLng(lat, lon)
                                             // latlon gives the marker on map
    var mapholder = document.getElementById("mapholder");    
    if(window.screen.width > 640) {                               // mapholder is used to position the Google Map on the HTML page;
        mapholder.style.height = "450px";
        mapholder.style.width = "1200px";
    }
    if(window.screen.width <= 640) {                               // mapholder is used to position the Google Map on the HTML page;
        mapholder.style.height = "300px";
        mapholder.style.width = "250px";
    }
    //mapholder.style.col
    //document.getElementById("bt1").style.visibility = "visible";
    document.getElementById("bt2").style.visibility = "visible";
    //document.getElementsByClassName("container-btn").style.visibility = "visible";
    //newFunction();
    document.getElementById('lat').innerHTML = lat;
    document.getElementById('lon').innerHTML = lon;
    var myOptions = {
    center:latlon,zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    
    }
    
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
    google.maps.event.addDomListener(window, 'load', getLocation);

<<<<<<< HEAD
    module.exports.lat = lat;
    module.exports.lon = lon;
    
    console.log(lat);
}
=======
    
    
    console.log(lat);
}
module.exports.lat = lat;
    module.exports.lon = lon;
>>>>>>> 4c5934540c52db7e3a93e3bbcab35f1d1d60b47c
module.exports.an = an;
/*function newFunction() {
    document.getElementByName("bt1").style.visibility = "visible";
}*/

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function insertImage() {
    var x = document.getElementById("mapholder");
    var img = new Image();
    img.onload = function() {
        x.appendChild(img);
        x.style.height = "450 px";
        x.style.width = "1200px";
        document.getElementById("bt1").style.visibility = "visible";
    document.getElementById("bt2").style.visibility = "visible";
    };
    img.src = "images/icons/cars.jpg";
}

function pit() {                                                                                 // references the next page after clicking on Pitstop button
    window.location.href = "pitstop.html";
}

function need() {
    window.location.href = "needassistance.html";                                                // references the next page after clicking on Need Assistance button
}
/*var button = document.getElementById('mapbutton')
button.addEventListener('click',hideshow,false);
function hideshow() {
    document.getElementById('mapholder').style.display = 'block'; 
    this.style.display = 'none'
}   

document.getElementById("load").style.visibility="hidden";*/
