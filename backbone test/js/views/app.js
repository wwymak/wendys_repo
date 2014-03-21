var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#ToDoApp',

  events: {
  	'keypress #new-todo': 'createOnEnter',
  	'click #clearCompleted': 'clearCompleted',
  	'click #toggle-all': 'toggleAllComplete'
  }

  initialize: function(){
  	this.allCheckbox = this.$('toggle-all')[0];
  	this.$input = this.$('#new-todo');
  	this.$footer = this.$('#footer');
  	this.$main = this.$('#main');

  	this.listenTo(app.Todos, 'add', this.addOne);
  	this.listenTo(app.Todos, 'reset', this.addAll);

  	this.listenTo(app.Todos, 'change:completed', this.filterOne);
  	this.listenTo(app.Todos, 'filter', this.filterAll);
  	this.listenTo(app.Todos, 'all', this.render);

  	app.Todos.fetch();
  },

  render: function(){
  	var completed = app.Todos.completed().length;
  	var remaining = app.Todos.remaining().length;

    if (app.Todos.length){
    	this.$main.show();
    	this.$footer.show();

    	this.$footer.html(this.stats-template({
    		completed:completed,
    		remaining: remaining
    	}));


    }

    this.allCheckbox.checked = !remaining;
  }

  addOne : function(todo){
  	var view = new app.TodoView({ model: todo});
  	$('#todoList').append( view.render().el);
  },

  addAll: function(){
  	this.$('#todoList').html('');
  	app.Todos.each(this.addOne, this);
  },

  createOnEnter: function(){},

  clearCompleted: function(){},

  toggleAllComplete: function(){}
});

