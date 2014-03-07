var IR_BeforeHooks = {
  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      Router.go('home');
      this.stop();
    }
  }
};

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.before(IR_BeforeHooks.isLoggedIn, {only: ['profile']});

Router.map(function () {
    this.route('home', {
      path: '/',
      yieldTemplates: {
            'loggedInUser': {to: 'userInfo'}
          }
    });

    this.route('profile', {
      path: '/profile'
    });
});
