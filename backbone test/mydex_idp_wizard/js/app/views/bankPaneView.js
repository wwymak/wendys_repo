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
  app.BankPaneView = app.ActivityPaneView.extend({

    events: {
      'submit #bank-login-form': 'fetchCode',
      'click .cancel-pane': 'clearPane'
    },

    // we want to track the active model, so we use the app.pubsub bus
    // to track what's being clicked, then change the
    // activity pane accordingly
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      // fetch the template at remote url, and re-render
      // using the data defined in payload above
      this.$el.empty().template('sites/all/modules/custom/mydex_idp_wizard/html/bank-pane-template.html',
        this.model.toJSON()
      );

      return this;
    }
  });
})(jQuery);


