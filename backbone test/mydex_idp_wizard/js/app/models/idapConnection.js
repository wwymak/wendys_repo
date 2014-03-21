/*global Backbone */
/*jshint indent:2 */
var app = app || {};

(function () {
  'use strict';

  // IDP Connection  Model
  // ----------

  // Our basic **Connection** model has `title`, `order`, and `completed` attributes.
  // Instances of some connections have different attributes, depending on the datasets they might rely on.
  // The DVLA might have different attributes to the passport agency one, for example
  app.IDAPConnection = Backbone.Model.extend({
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
      completed: false
    },

    initialize: function(){

      // maybe add link to collection models here, for easier access
      // when modifying them
      //
      //
      // give off event for elements to subscribe to
      this.on('change:completed', function(){
        app.pubsub.trigger('idap:enabled', this);
      });
      // debugging to show respndong to changes on the model
      this.on('change', function(){
        console.log('IDAP: just changed!');
        console.log(this.attributes);
      });
    }
  });
})();
