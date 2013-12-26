define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var _ = require("underscore");
  var $ = require("jquery");
  var Backbone = require("backbone");

  // Alias the module for easier identification.
  var app = module.exports;

  // The root path to run the application through.
  app.root = window.location.pathname;


  // Setup layout manager
  var LayoutManager = require("backbone.layoutmanager");

  // Configure LayoutManager with Backbone Boilerplate defaults.
  LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    // Indicate where templates are stored.
    prefix: "app/templates/",

    // This custom fetch method will load pre-compiled templates or fetch them
    // remotely with AJAX.
    fetchTemplate: function(path) {
      // Concatenate the file extension.
      path = path + ".html";

      // Put fetch into `async-mode`.
      var done = this.async();

      // If cached, use the compiled template.
      var JST = this.JST = this.JST || {};
      if (JST[path]) {
        return done(JST[path]);
      }

      // Seek out the template asynchronously.
      $.get(app.root + path, function(contents) {
        // cache and return template
        var tmpl = _.template(contents);
        JST[path] = tmpl;
        done(tmpl);
      }, "text");
    }
  });

  // The application layout handles link hijacking and can be modified to
  // handle other application global actions as well.
  app.layout = new Backbone.Layout({
    el: "#main",
    template: "layouts/layout",
    events: {
      "click a[href]:not([data-bypass])": "hijackLinks"
    },
    hijackLinks: function(ev) {
      // Get the absolute anchor href.
      var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
      // Get the absolute root.
      var root = location.protocol + "//" + location.host + app.root;

      // Ensure the root is part of the anchor href, meaning it's relative.
      if (href.prop.slice(0, root.length) === root) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        ev.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways.  The fragment is sliced from the root.
        Backbone.history.navigate(href.attr, true);
      }
    },
    beforeRender: function() {
      console.log('[app.js] Layout before render');
    },
    afterRender: function() {
      // this.render();
      console.log('[app.js] Layout after render');
    }
  });

});
