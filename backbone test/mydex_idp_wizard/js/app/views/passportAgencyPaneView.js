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
  app.PassportAgencyPaneView = app.ActivityPaneView.extend({

    events: {
      'submit form': 'fetchCode',
      'click .unverify': 'startOver',
      'click .cancel-pane': 'clearPane'
    },

    // we want to track the active model, so we use the app.pubsub bus
    // to track what's being clicked, then change the
    // activity pane accordingly
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // we want to clear the verify step here so we can start
    // over
    startOver: function(event) {
      event.preventDefault();
      this.model.set(
        {
          verifying: null,
          completed: false,
          passport_name: null,
          passport_number: null
        }
      );
    },

    render: function () {
      // fetch the template at remote url, and re-render
      // using the data defined payload
      this.$el.empty().template('sites/all/modules/custom/mydex_idp_wizard/html/passport-pane-template.html',
        this.model.toJSON()
      );

      return this;
    }
  });
})(jQuery);


