define(
  [
    // load via "text" plugin
    // could not use directly because of r.js build failure
    'text!../client.json'
  ],
  function(clientJSON) {
    return clientJSON;
  }
);