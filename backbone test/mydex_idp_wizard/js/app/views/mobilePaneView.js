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
  app.MobilePaneView = app.ActivityPaneView.extend({

    events: {
      'submit #mobile-provider-form': 'fetchCode',
      'submit #code-confirm-form': 'fetchCode',
      'click .cancel-pane': 'clearPane',
      'click .resend-sms': 'resendSMS'
    },

    // we want to track the active model, so we use the app.pubsub bus
    // to track what's being clicked, then change the
    // activity pane accordingly
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    // clear number to let a user try sending their an SMS again
    resendSMS: function(event) {
      event.preventDefault();
      // clear the number
      // remove the code box
      this.model.set('smsSent', false);
    },

    render: function () {

      this.$el.empty().template('sites/all/modules/custom/mydex_idp_wizard/html/mobile-pane-template.html', this.model.toJSON());

      return this;
    }
  });
})(jQuery);


