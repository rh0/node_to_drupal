/**
 * Example server extension for nodejs
 *
 * With this extension loaded, a message is written to the console when a client
 * connects, is authenticated, sends a message, or disconnects.
 *
 * If you have the nodejs_notify module enabled, users are also shown a message
 * when they connect, are authenticated, or send a message.
 */

var publishMessageToClient;
var sendMessageToBackend;

exports.setup = function (config) {
  publishMessageToClient = config.publishMessageToClient;
  sendMessageToBackend = config.sendMessageToBackend;

  process.on('client-connection', function (sessionId) {
    console.log('Example extension got connection event for session ' + sessionId);
  })
  .on('client-authenticated', function (sessionId, authData) {
    console.log('Example extension got authenticated event for session ' + sessionId + ' (user ' + authData.uid + ')');
    publishMessageToClient(sessionId, {data: {subject: 'Example extension', body: 'Welcome, you are authenticated.'}});
  })
  .on('client-message', function (sessionId, message) {
    message.messageType = 'nodeToDrupal';
    console.log('Example extension got message event for session ' + sessionId);
    console.log(message);
    sendMessageToBackend(message, function(error, responce, body) {
      if(error) {
        console.log('Error sending message to backend.', error);
        return;
      }
      console.log('Responce from drupal ', body);
    });
  })
  .on('client-disconnect', function (sessionId) {
    console.log('Example extension got disconnect event for session ' + sessionId);
  });
};

