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