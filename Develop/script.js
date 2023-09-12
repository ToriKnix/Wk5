$(document).ready(function () {
  // Function to update the time block's status
  function updateTimeBlockStatus() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var blockHour = parseInt(blockId.split('-')[1]);
      var textarea = $(this).find('textarea');

      textarea.removeClass('past present future');

      if (blockHour < currentHour) {
        textarea.addClass('past');
      } else if (blockHour === currentHour) {
        textarea.addClass('present');
      } else {
        textarea.addClass('future');
      }
    });
  }

  // Function to load and display saved events
  function loadSavedEvents() {
    $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var savedEvent = localStorage.getItem(blockId);
      var textarea = $(this).find('textarea');

      textarea.val(savedEvent);
    });
  }

  // Function to display the current date
  function displayCurrentDate() {
    var currentDay = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDay);
  }

  // Call the initial functions
  displayCurrentDate();
  updateTimeBlockStatus();
  loadSavedEvents();

  // Event listener for the save buttons
  $('.saveBtn').on('click', function () {
    var blockId = $(this).parent().attr('id');
    var eventText = $(this).siblings('textarea').val();

    localStorage.setItem(blockId, eventText);
  });
});