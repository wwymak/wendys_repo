/*global Backbone, jQuery, _*/
/*jshint indent:2 */

var app = app || {};

(function($) {
  'use strict';

  // This wizard manages the DOM on the connection wizard, by tracking
  // changes in the underlying data.
  // This controls:
  // * whether the link to the next page is visible
  // * what the main activity pane shows
  // * which connections appear in the sidebar

  app.ConnectionWizardView = Backbone.View.extend({

    // the DOM element this takes over when initialised
    //
    el: '.connection-wizard',

    events: {
      'click .intro a.button': 'updateStep',
      'click .link_to_idp_connection a.button': 'showBuilder',
      'click .connection_builder a.button': 'showResult'
    },

    // When we set up our app, we cache a few parts of the DOM,
    // and setup listeners for changes in the underlying data.
    initialize: function() {
      // console.log('wiz created');
      this.$connectionList = this.$('#connection-list');
      this.$activityPane = this.$('.activity-pane');
      this.$wizardSteps = this.$('#wizard-steps');
      this.$intro = this.$('.intro');
      this.$stepPages = this.$('.intro, .step1, .step2, .step3');

      // we add a null, to let steps[1] mean step 1
      this.$steps = [ null, this.$('.step1'), this.$('.step2'), this.$('.step3')];


      this.$progressIndicator = this.$('.progress-indicator');

      // and now we add listeners to update the DOM when
      // we add to the connections in our ConnectionList
      // that a user would need to work through
      this.listenTo(app.ConnectionList, 'add', this.addOne);

      // re-render this view when the data changes
      this.listenTo(app.ConnectionList, 'all', this.render);

      this.step = app.pubsub.step;

      // Add the bits needed

      this.addStepList();
      this.addIntro();
      this.addActivityPane();
      this.addProgressIndicator();


      app.pubsub.on('intro', function() {
        // console.log('wiz: intro');
        this.step = 'intro';
        this.render();
      }, this);
      app.pubsub.on('step', function(step) {
        // console.log('wiz: step '  + step);
        this.step = parseInt(step, 10);
        this.render();
      }, this);
      app.pubsub.on('result', function(state) {
      }, this);

      this.render();

    },

    // this determines which parts of the DOM are updated, normally
    // using jQuery's DOM manipulation methods
    render: function() {
      // console.log('wiz: rendering');

      this.$stepPages.hide();

      console.log(this.step);

      // TODO extract this into a function for better named routes
      switch (this.step) {

      case 'intro':
        // console.log('wiz: intro');
        this.$intro.show();
        break;
      case 1:
        // console.log('wiz: render: ' + this.step);
        this.$steps[this.step].show();
        break;
      case 2:
        // add the IDaP connection builder form to the page
        this.addBuilder();
        this.$steps[this.step].show();
        break;
      case 3:
        //
        this.addResult();
        break;
      }
    },
    // Add a single connection to the DOM, appending it
    // to the '#connection-list' ul
    addOne: function(connection) {
      var view = new app.ConnectionItemView({
        model: connection
      });
      this.$connectionList.append(view.render().el);
    },
    // Now add the activity pane
    addActivityPane: function() {
      var pane = new app.ActivityPaneView();
      this.$activityPane.append(pane.render().el);
    },
    addStepList: function() {
      var stepView = new app.stepView();
      // console.log(this.$steps);

      this.$wizardSteps.append(stepView.render().el);
    },
    addIntro: function() {
      this.$intro.empty().template('sites/all/modules/custom/mydex_idp_wizard/html/welcome-template.html');
    },
    addBuilder: function() {
      // create the connection builder model
      app.IDP = new app.IDAPConnection;
      // add it to the View
      var builderView = new app.ConnectionBuilderView({ model: app.IDP });
      this.$steps[2].empty().append(builderView.render().el);
    },
    addResult: function() {

      var tpl = $('<div>').template('sites/all/modules/custom/mydex_idp_wizard/html/result-template.html', {idp: true});
      this.$steps[this.step].html(tpl);
      this.$steps[this.step].show();
    },
    // add the pr
    addProgressIndicator: function() {
      var progressIndicator = new app.ProgressIndicatorView();
      this.$progressIndicator.empty().append(progressIndicator.render().el);
    },
      // TODO these functions below ought to be refactored into a single one;
    updateStep: function(event) {
      // console.log('updateStep: ')
      event.preventDefault();
      app.Router.navigate("retrieve", {trigger: true});
    },
    showBuilder: function(event) {
      event.preventDefault();
      app.Router.navigate("share", {trigger: true});
    },
    showResult: function(event) {
      event.preventDefault();
      app.Router.navigate("access", {trigger: true});
    }
  });
})(jQuery);