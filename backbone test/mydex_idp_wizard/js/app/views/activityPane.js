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
  app.ActivityPaneView = Backbone.View.extend({

    // here's our template for loading the list items
    // Cache the template function for a single item.
    template: _.template( $('#activity-pane-template').html() ),

    events: {
      'submit #code-confirm-form': 'formConnection'
    },

    // we want to track the active model, so we use the app.pubsub bus
    // to track what's being clicked, then change the
    // activity pane accordingly
    initialize: function() {
      app.pubsub.on('activated', function(model) {
        this.savedValue = model;
        this.render();
      }, this);
      app.pubsub.on('enabled', function(model) {
        this.savedValue = model;
        this.render();
      }, this);

    },
    // trigger connection to organisation
    // update model to show state
    // show link to next connection
    fetchConnection: function(event) {
      console.log('fetching!');
      event.preventDefault();
      this.savedValue.toggle();
    },
    formConnection: function(event) {
      event.preventDefault();
      var ev = jQuery(event.currentTarget);
      var data = ev.serializeArray();
      console.log(data);
      event.preventDefault();
      // this.savedValue.toggle();
    },
    // clears the active pane going back to the initial prompt
    clearPane: function(event) {
      event.preventDefault();
      app.pubsub.trigger('activated', null);
      // clear the active state on the connection list
      app.pubsub.trigger('cleared_items');

    },
    // trigger connection to organisation
    // update model to show state
    // show link to next connection
    fetchCode: function(event) {
      event.preventDefault();
      var ev = jQuery(event.currentTarget);
      var data = ev.serializeArray();
      _.each(data, function(d) {
        var kv = _.values(d);
        this.model.set(kv[0], kv[1]);
      }, this);
    },

    // show either the instructions for adding connections
    // or, the forms needed for creating them
    render: function () {
      var val = this.savedValue;

      if (val) {
        this.$el.empty();

        switch(val.attributes.machine_name) {
        case 'MobileProvider':
          var view = new app.MobilePaneView({ model: val });
          $('.activity-pane').html(view.render().el);
          break;
        case 'DVLA':
          var view = new app.DVLAPaneView({ model: val });
          $('.activity-pane').html(view.render().el);
          break;
        case 'PassportAgency':
          var view = new app.PassportAgencyPaneView({ model: val });
          $('.activity-pane').html(view.render().el);
          break;
        case 'Bank':
          var view = new app.BankPaneView({ model: val });
          $('.activity-pane').html(view.render().el);
          break;
        case 'Utility':
          var view = new app.UtilityPaneView({ model: val });
          $('.activity-pane').html(view.render().el);
          break;

        }

        var completed = app.ConnectionList.completed().length;
        var remaining = app.ConnectionList.remaining().length;

        if (completed >= app.ConnectionList.requiredConnections) {
          $('.activity-pane').template('sites/all/modules/custom/mydex_idp_wizard/html/idp-link-template.html', {
            completed: completed,
            remaining: remaining
          });
        };
      }
      else {
        // If nothing is there, we default back to our normal 'empty pane' copy
        $('.activity-pane').html('<div class="connection-prompt"><h2>Choose an organisation you have an existing relationship with to collect your data.</h2><h2>You will then use this data as proof of identity when creating your government ID.</h2></div>');
      }
      return this;
    },
  });
})(jQuery);


