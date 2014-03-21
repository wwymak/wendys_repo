/*global Backbone */
/*jshint indent:2 */
var app = app || {};

(function () {
  'use strict';

  // Connection Collection
  // ---------------
  // This maintains a list of the connections we might
  // take a user through during sign up.
  var ConnectionList = Backbone.Collection.extend({

    // Allow for different kinds of model in the
    // collection to have different validation and events
    // http://documentcloud.github.io/backbone/#Collection-model
    model: function(attrs, options) {
      switch  (attrs.type) {
      case 'MobileProvider':
        return new app.MobileProvider(attrs, options);
      default:
        return new app.Connection(attrs, options);
      }
    },

    // Save all of the todo items under the `"connections"` namespace.
    localStorage: new Backbone.LocalStorage('connections-backbone'),

        // Filter down the list of all connection items that are already setup.
    completed: function () {
      return this.filter(function (connection) {
        return connection.get('completed');
      });
    },

    // Filter down the list to only connection items that are not setup yet.
    remaining: function () {
      return this.without.apply(this, this.completed());
    },

    // We keep the connections in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
      if (!this.length) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    // connections are sorted by their original insertion order.
    comparator: function (connection) {
      return connection.get('order');
    }
  });

  // Create our global collection of **connections**.
  app.ConnectionList = new ConnectionList();
})();
