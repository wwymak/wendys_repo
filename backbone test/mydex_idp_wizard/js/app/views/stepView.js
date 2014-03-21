/*global Backbone, jQuery, _*/
/*jshint indent:2 */
var app = app || {};

(function($) {
  'use strict';
  // Step View
  // This shows the form pertaining to data
  // associated with a given connection
  // --------------

  // The DOM element for a todo item...
  app.stepView = Backbone.View.extend({

    initialize: function() {

      // default step
      // this.step = 1;

      app.pubsub.on('step', function(step) {
        // console.log('step change');
        // console.log(this);
        // console.log(step)
        this.step = step;
        this.render();
      }, this);
    },
    render: function() {

      var payload = { step: this.step };

      this.$el.empty().template('sites/all/modules/custom/mydex_idp_wizard/html/step-template.html', payload);
      // return this to allow us to call methods on it in other views
      return this;
    }


  });


})(jQuery);