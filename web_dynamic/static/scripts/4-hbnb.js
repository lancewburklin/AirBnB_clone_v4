#!/usr/bin/node
const $ = window.$;

function getPlaces (info) {
  $.ajax({
    type: 'POST',
    url: 'http://192.168.33.10:5001/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(info),
    success: function (data, status) {
      for (let i = 0; i < data.length; i++) {
        const newArt = '<article class="temp"></article>';
        $('.places').append(newArt);
        $('.temp').append('<div class="title_box"></div>');
        /* Fill in title_box */
        $('.temp .title_box').append('<h2>' + data[i].name + '</h2>');
        $('.temp .title_box').append('<div class="price_by_night"></div>');
        $('.temp .price_by_night').append(data[i].price_by_night);
        /* create information div */
        $('.temp').append('<div class="information"></div>');
        let tempGuest = 'Guest';
        if (data[i].max_guest !== 1) {
          tempGuest = 'Guests';
        }
        let tempBed = 'Bedroom';
        if (data[i].number_rooms !== 1) {
          tempBed = 'Bedrooms';
        }
        let tempBat = 'Bathroom';
        if (data[i].number_bathrooms !== 1) {
          tempBat = 'Bathrooms';
        }
        $('.temp .information').append('<div class="max_guest">' +
                                       data[i].max_guest +
                                       ' ' + tempGuest + '</div>');
        $('.temp .information').append('<div class="number_rooms">' +
                                       data[i].number_rooms +
                                       ' ' + tempBed + '</div>');
        $('.temp .information').append('<div class="number_bathrooms">' +
                                       data[i].number_bathrooms +
                                       ' ' + tempBat + '</div>');
        /* Create user */
        $('.temp').append('<div class ="description"></div>');
        if (data[i].description === null) {
          data[i].description = 'None';
        }
        $('.temp .description').append(data[i].description);
        $('.temp').removeClass('temp');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const items = [];
  const names = [];
  $('input:checkbox').change(function () {
    const theName = $(this).attr('data-name');
    const theId = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      items.push(theId);
      names.push(theName);
      const namesNice = names.join(', ');
      $('.amenities h4').text(namesNice);
    } else {
      const indexOne = items.indexOf(theId);
      items.splice(indexOne, 1);
      const indexTwo = names.indexOf(theName);
      names.splice(indexTwo, 1);
      const namesNice = names.join(', ');
      $('.amenities h4').text(namesNice);
    }
  });
  $.get('http://192.168.33.10:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  const info = {};
  getPlaces(info);
  $('button').click(function () {
    let newInfo = {};
    if (items.length !== 0) {
      newInfo = { amenities: items };
    }
    $('.places article').remove();
    getPlaces(newInfo);
  });
});
