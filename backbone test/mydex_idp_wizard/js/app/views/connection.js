/*global Backbone, jQuery, _*/
/*jshint indent:2 */
var app = app || {};

(function ($) {
  'use strict';

  // Sidebar Item View
  // --------------

  // The DOM element for a todo item...
  app.ConnectionItemView = Backbone.View.extend({

    tagName:  'li',

    // add a unique classname for DOM manipulation
    className: function() {
      return this.dasherize(this.model);
    },

    // here's our template for loading the list items
    // Cache the template function for a single item.
    template: _.template( $('#connection-item-template').html() ),

    events: {
      'click' : 'makeActive',
      'click a' : 'noop'
    },

    // we want our list item to reflect changes made to
    // the state, when a connection is enabled
    initialize: function() {

      app.pubsub.on('cleared_items', this.clearActiveItems);

      this.listenTo(this.model, 'change', this.render);

      // app.pubsub.on('step', function(step, connection){
        // console.log('conn: item ' + step + ' ' + connection);

          // if (this.model.title == connection)
          // app.pubsub.trigger('activated', this.model);
      // )
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    // add this to the anchor in case the actual
    // text is clicked
    noop: function(event) {
      event.preventDefault();
    },
    // convenience function for resetting list item appearance
    clearActiveItems: function() {
      $('#connection-list > li').removeClass('active');
    },
    makeActive: function() {
      $('#connection-list > li').removeClass('active');
      this.$el.addClass('active');
      // trigger to a central bus so other elements can
      // listen without being coupled to this one
      app.pubsub.trigger('activated', this.model);
    },
    // convenience function to convert a title to an
    // nicer form for DOM manipulation
    dasherize: function(model) {
      return model.attributes.title
        .replace(' ', '_')
        .toLowerCase();
    }
  });
})(jQuery);


