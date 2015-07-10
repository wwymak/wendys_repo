/**
 * Routing stuff
 */

//Router.route('/aboutProject');
//Router.route('index.html')

Router.route('/', function () {
    this.render('home');
});
Router.route('/aboutProject');