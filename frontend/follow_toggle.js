var FollowToggle = function (el){
  this.$el = $(el);
  this.userId = this.$el.data("userId");
  this.followState = this.$el.data("initialFollowState") || "unfollowed";
  this.render();
  this.handleClick();
};

FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowed"){
    this.$el.html("follow");
    this.$el.removeProp("disabled");
  }
  else if(this.followState === "followed") {
    this.$el.html("unfollow");
    this.$el.removeProp("disabled");
  }
  else if(this.followState === "following") {
    this.$el.prop("disabled", true);
  }
  else if(this.followState === "unfollowing") {
    this.$el.prop("disabled", true);
  }
};

FollowToggle.prototype.handleClick = function() {
  var that = this;


  that.$el.on("click", function(e) {

    that.followState = that.followState === "followed" ? "unfollowing" : "following";
    that.render();

    e.preventDefault();

    if (that.followState === "following") {
      $.ajax({
        type: 'POST',
        url: '/users/' + that.userId + '/follow',
        success: function () {
          that.followState = "followed";
          that.render();
        },
        dataType: "json"
        }
      );
    }
    else if(that.followState === "unfollowing") {

      $.ajax({
        type: 'DELETE',
        url: '/users/' + that.userId + '/follow',
        success: function () {
          that.followState = "unfollowed";
          that.render();
        },
          dataType: "json"
        }
      );
    }
  });

};


module.exports = FollowToggle;
