#!/usr/bin/node
const $ = window.$;
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
});
