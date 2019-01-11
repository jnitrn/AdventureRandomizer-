
  //Longitude: -180 to +180, toFixed() decides the amount of decimals
  //Latitude: -90 to +90, toFixed() decides the amount of decimals
  function getCoordinates() {
    var long = (Math.random() * (-180 - 180) + 180).toFixed(7) * 1;
    var lat = (Math.random() * (-90 - 90) + 90).toFixed(7) * 1;
    getHotels(long, lat);
  }

  function getHotels(long, lat) {
      $.ajax({
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+long+"&radius=50000&type=lodging&key=AIzaSyBLs-NPmwcLLjovVoIC4tKKhysLzND7vuo",
        headers: {"Accept": "application/json"}
      })
      .done(function(data) {
        if(data['results'] == 0) {
          getCoordinates();
        } else {
          randomizeHotel(data['results']);
        }
      });
  }

  function randomizeHotel(hotels) {
    var hotel = hotels[Math.floor(Math.random() * hotels.length)];
    extractFacts(hotel);
  }

  function extractFacts(hotel) { //kan vara onödig
    $('#hotel').text(hotel['name']);
    $('#rating').text(hotel['rating']);
    var hotelLat = hotel['geometry']['location']['lat'];
    var hotelLong = hotel['geometry']['location']['lng'];
    console.log(hotelLat);
    console.log(hotelLong);
    //hantera 0 om den är undefined, ha en hårdkodad bild
    if (typeof hotel['photos'] == "undefined" ) {
      console.log("finns ej bilder");
  } else {
    var imageRef = hotel['photos']['0']['photo_reference'];
  }

    var placeID = hotel['place_id'];
    displayInfo(hotelLat, hotelLong);
    getLocation(placeID);

    //$('#destination-img').html('<img src="' + photoref+'">');
    console.log(placeID);
  //console.log(hotel['photos']['0']['photo_reference']);

  //  getPicture(imageRef);
  }

  function changeWindow() {
    window.location.pathname = '/index.html';
  }

  function placeMarker(hotelLat, hotelLong) {
    var location = {lat: hotelLat, lng: hotelLong};
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: location});
    var marker = new google.maps.Marker({position: location, map: map});
  }

  function displayInfo(hotelLat, hotelLong, hotelName, hotelRating) {
    placeMarker(hotelLat, hotelLong);
  //  getContinent(hotelLat, hotelLong);
    //Uppdatera vänstra delen av med namn, bild??, rating, stad, land
  }

  function getPicture(imageRef) {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+imageRef+"&key=AIzaSyBLs-NPmwcLLjovVoIC4tKKhysLzND7vuo ",
      headers: {"Accept": "application/json"}
    })
    .done(function(data) {
      var image = data;
        $('#destination-img').html('<img src="' + image+'">');
    });
  }

  function getLocation(placeID) {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key=AIzaSyBLs-NPmwcLLjovVoIC4tKKhysLzND7vuo",
      headers: {"Accept": "application/json"}
    })
    .done(function(data) {
      var webpage = data['result']['website'];
      var address = data['result']['address_components'];

    //  console.log(address);
      displayCountry(address);
      //console.log(webpage);
      //länka knappen till hemsidan
    });
  }

  function displayCountry(arr) {
    var obj = null;
    for(var i=0; i<arr.length;i++) {
      obj = arr[i];
      if(obj.types['0'] == 'country') {
        console.log(obj.long_name);
            console.log(obj.short_name);

      }
    }
  }
