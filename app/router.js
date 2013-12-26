define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var LayoutManager = require("backbone.layoutmanager");

  // Getting app module
  var app = require("app");

  // Custom modules
  var Foo = require("modules/foo");


  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      console.log("[router.js] Welcome to your / route.");
      app.layout.render().promise().then(function() {
        var view = new Foo.Views.Index();
        view.render();        
      });
    
    }

  });
});
