var FollowToggle = require('./follow_toggle.js');
var UserSearch = require('./users_search.js');

$(function () {
  var $allEls = $(".follow-toggle");


  // var followToggle = new FollowToggle($el);
  $allEls.each(function(idx, el) {
    var ft = new FollowToggle(el);
  });

  var $UserSearch = $(".users-search");

  new UserSearch($UserSearch);

});
