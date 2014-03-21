/*global Backbone */
var app = app || {};

(function() {
  'use strict';

  // Todo Router
  // ----------
  var Workspace = Backbone.Router.extend({

    // when a route is passed to the url,
    // we call the steStep function, which other
    // elements listen for and change accordingly
    routes: {
      'retrieve(/:connection)': 'retrieveConnection',
      'share(/:connection)': 'shareConnection',
      'access(/:state)': 'setResult',
      '*intro': 'setIntro' //default
    },
    setIntro: function() {
      app.pubsub.step = 'intro';
      console.log('router: intro');
      app.pubsub.trigger('intro');
    },
    retrieveConnection: function(connection) {
      app.pubsub.step = 1;
      var step = 1;
      console.log('router: step ' + step + ', connection: ' + connection);
      app.pubsub.trigger('step', step);
    },
    shareConnection: function(connection) {
      var step = 2;
      app.pubsub.step = 2;
      console.log('router: step ' + step + ' - ' + connection);
      app.pubsub.trigger('step', step, connection);
    },
    setResult: function(state) {
      var step = 3;
      app.pubsub.step = 3;
      console.log('router: result - ' + state);
      app.pubsub.trigger('step', step);
      app.pubsub.trigger('result', state);
    }

  });
  // add the router object to let it listen for changes to the url params
  app.Router = new Workspace();

  // Let backbone pick up control of the route

  Backbone.history.start({ pushstate: true, root: '#'} );
})();