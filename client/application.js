Template.home.users = function () {
  if (Meteor.user()) {
    var id = Meteor.user()._id;
    return Meteor.users.find({ _id: {$ne: id } } , {sort: {"profile.name": 1}});
  } else {
    return Meteor.users.find({}, {sort: {"profile.name": 1}});
  }
};

Template.profile.events({
  'click #save': function(e) {
    var name = $('#name').val();
    var tagline = $('#tagline').val();
    if (name.length > 0) {
      Meteor.users.update(Meteor.user()._id, {$set: {"profile.name": name, "profile.tagline": tagline}});
      Router.go('home');
    } else {
      $('.bg-danger').show();
      $('#name_group').addClass("has-error");
    }
  },

  'click #cancel': function() {
    Router.go('home');
  }
});

Template.layout.events({
  'click #profile': function(e) {
    Router.go('profile');
  }
});

Template.layout.helpers({
  userCount: function() {
    if (Meteor.user()) {
      var id = Meteor.user()._id;
      userCount = Meteor.users.find({ _id: {$ne: id } } , {sort: {"profile.name": 1}});
    } else {
      userCount = Meteor.users.find({}, {sort: {"profile.name": 1}});
    }

    return userCount.count();
  }
});
