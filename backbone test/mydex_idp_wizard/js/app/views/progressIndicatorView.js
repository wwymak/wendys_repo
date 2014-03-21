/*global Backbone, jQuery, _*/
/*jshint indent:2 */
var app = app || {};

(function($) {
  'use strict';
  // Progress Indicator View
  // This shows the progress bar, which updates
  // as connections are completed, and selected for use
  // when creating a government ID
  // --------------

  // The DOM element for a todo item...
  app.ProgressIndicatorView = Backbone.View.extend({

    initialize: function() {

      // update progress indicator when connections are updated
      app.pubsub.on('enabled', function() {
        this.render();
      }, this);
    },
    render: function() {

        var progress = { percent : this.calculatePercentageComplete() };

        this.$el.empty().template('sites/all/modules/custom/mydex_idp_wizard/html/progress-indicator-template.html', { progress: progress });
        // return this to allow us to call methods on it in other views
        return this;
    },
    // calculate percentage of connections complete
    calculatePercentageComplete: function() {
      var percentage = ( (app.ConnectionList.completed().length / app.ConnectionList.length) * 100);
      // coerce NaN to zero, so we always have a number to pass into the progress bar css
      percentage = percentage || 0;
      return percentage;
    }
  });
})(jQuery);