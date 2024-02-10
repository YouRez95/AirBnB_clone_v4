/* global $ */

const list_amenities = []

$('#list_amenities input[type=checkbox]').click((e) => {
  const checked = e.target.checked;
  const amenityName = e.target.dataset.name;
  const amenityId = e.target.dataset.id;

  if (checked) {
    list_amenities.push(amenityName);
  } else {
    const index = list_amenities.indexOf(amenityName);
    list_amenities.splice(index, 1);
  }

  const text = list_amenities.join(', ')

  $('.amenities h4').text(text);
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  success: (response) => {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      let place = data[i];

      let article = $('<article>');
      let title = $('<h2>').text(place.name);
      let priceByNight = $('<div>').addClass('price_by_night').html('<p>$' + place.price_by_night + '</p>');
      let information = $('<div>').addClass('information');
      let maxGuest = $('<div>').addClass('max_guest').append($('<div>').addClass('guest_image')).append($('<p>').text(place.max_guest));
      let numberRooms = $('<div>').addClass('number_rooms').append($('<div>').addClass('bed_image')).append($('<p>').text(place.number_rooms));
      let numberBathrooms = $('<div>').addClass('number_bathrooms').append($('<div>').addClass('bath_image')).append($('<p>').text(place.number_bathrooms));
      let description = $('<div>').addClass('description').html('<p>' + place.description + '</p>');

      information.append(maxGuest, numberRooms, numberBathrooms, description);

      article.append(title, priceByNight, information);

      $('.places').append(article);
    }
  }
});

$('.filters > button').click(function () {
  $('.places > article').remove();
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({'amenities': list_amenities}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        
        let article = $('<article>');
        let title = $('<h2>').text(place.name);
        let priceByNight = $('<div>').addClass('price_by_night').html('<p>$' + place.price_by_night + '</p>');
        let information = $('<div>').addClass('information');
        let maxGuest = $('<div>').addClass('max_guest').append($('<div>').addClass('guest_image')).append($('<p>').text(place.max_guest));
        let numberRooms = $('<div>').addClass('number_rooms').append($('<div>').addClass('bed_image')).append($('<p>').text(place.number_rooms));
        let numberBathrooms = $('<div>').addClass('number_bathrooms').append($('<div>').addClass('bath_image')).append($('<p>').text(place.number_bathrooms));
        let description = $('<div>').addClass('description').html('<p>' + place.description + '</p>');

        information.append(maxGuest, numberRooms, numberBathrooms, description);

        article.append(title, priceByNight, information);

        $('.places').append(article);
      }
    }
  });
});
