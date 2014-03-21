/*global Backbone, jQuery, _*/
/*jshint indent:2 */
var app = app || {};

(function ($) {
  'use strict';

  // Activity Pane View
  // This shows the form pertaining to data
  // associated with a given connection
  // --------------

  // The DOM element for a todo item...
  app.MobileProvider = Backbone.Model.extend({
    defaults: {
      completed: false
    },

    initialize: function(){
      // give off event for elements to subscribe to
      this.on('change:completed', function(){
        app.pubsub.trigger('enabled', this);
      }),
      // debugging to show respndong to changes on the model
      this.on('change', function(){
        console.log('just changed!');
        console.log(this.attributes);
      });
    },

  });
})(jQuery);


