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
  app.ConnectionBuilderView = Backbone.View.extend({

    // we want our form view to reflect changes made to
    // the state, when a connection is enabled
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    events: {},

    // collect all the attributes from the connections, then add them to the builder
    render: function () {

      var mappedModels = {};

      // filter the models to only use active connections
      _.each(app.ConnectionList.completed(), function(model) {
          mappedModels[model.attributes.machine_name] = model.attributes;
      });
      // add methods here to check for existence of bank

      this.$el.empty().template('sites/all/modules/custom/mydex_idp_wizard/html/builder-template.html',
        { mappedModels: mappedModels,
          initialConnectionNames: this.listConnections()[0],
          lastConnectionName: this.listConnections()[1]
         } );

      return this;
    },

    // return list of connections names to generate sentence like:
    // "O2, Virgin, DVLA, and HSBC"
    listConnections: function() {
      var lastConnectionName;
      var initialCompletedConnections = _.initial(app.ConnectionList.completed());
      var lastCompletedConnection = _.last(app.ConnectionList.completed());

      var initialConnectionNames = _.map(initialCompletedConnections, function(model) {
        return model.attributes.title;
      });

      if (lastCompletedConnection){
        lastConnectionName  = lastCompletedConnection.attributes.title || '';
      }

      return [initialConnectionNames, lastConnectionName];

    }

  });

})(jQuery);