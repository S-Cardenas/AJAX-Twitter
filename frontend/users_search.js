var FollowToggle = require('./follow_toggle.js');

var UserSearch = function (el) {
  this.$el = $(el);
  this.input = this.$el.find("input");
  this.ul = this.$el.find("ul");
  this.handleInput();
};

UserSearch.prototype.handleInput= function () {
  var that = this;
  that.input.on("keyup", function(e) {
    var input = that.input.val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: {
         "query": input
        },
      dataType: "json",
      success: function (res) {
        $("ul.users").empty();
        res.forEach( function (user) {
            var follow = user.followed ? "followed" : "unfollowed";
            $("ul.users").append("<li>" + user.username);
            $("ul.users").append('<button class="follow-toggle" data-user-id="' + user.id + '" data-initial-follow-state="' + follow + '"></button></li>');
          }
        );

        $("ul.users").find("button").each (function(idx, button) {
          new FollowToggle(button);
        });

      },
      error: function(res) {
        console.log(res);
      }

    });



  });

};


module.exports = UserSearch;
