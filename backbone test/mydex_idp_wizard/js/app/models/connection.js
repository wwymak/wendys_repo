/*global Backbone */
/*jshint indent:2 */
var app = app || {};

(function () {
  'use strict';

  // Connection Model
  // ----------

  // Our basic **Connection** model has `title`, `order`, and `completed` attributes.
  // Instances of some connections have different attributes, depending on the datasets they might rely on.
  // The DVLA might have different attributes to the passport agency one, for example
  app.Connection = Backbone.Model.extend({
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
      title: '',
      completed: false
    },

    initialize: function(){
      // give off event for elements to subscribe to
      this.on('change:completed', function(){
        app.pubsub.trigger('enabled', this);
      });
      this.on('change:usedforConnection', function(){
        app.pubsub.trigger('usedforConnection', this);
      });
    },

    // Toggle the `completed` state of this todo item.
    toggle: function () {
      this.save({
        completed: !this.get('completed')
      });
    },
  });
})();
