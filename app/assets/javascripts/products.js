// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(function () {
  // Toggling dispay of tags on the server and UI.
  $("#category-wall").on("click", "a", function(event) {
    var category = $(this).attr("href");
    var follow = $(this).hasClass('btn-default');
    $.ajax({
      type: "GET",
      url: "/category/" + category,
      data: { follow: follow, category: category }
    });
    $(this).toggleClass('btn-primary', follow)
           .toggleClass('btn-default', !follow);
    return false;
  });
});

