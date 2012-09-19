/**
 * Example server extension for nodejs
 *
 * With this extension loaded, a message is written to the console when a client
 * connects, is authenticated, sends a message, or disconnects.
 *
 * If you have the nodejs_notify module enabled, users are also shown a message
 * when they connect, are authenticated, or send a message.
 */

exports.setup = function (config) {

  process.on('client-message', function (sessionId, message) {
    console.log('Got a message from the client.  Take a look: ');
    console.log(message);

    message.messageType = message.type;
    config.sendMessageToBackend(message, function(error, responce, body) {
      if(error) {
        console.log('Error sending message to backend.', error);
        return;
      }
      console.log('Responce from drupal: ', body);
      config.publishMessageToClient(sessionId, {data: {subject: 'Success!', body: body}});
    });
  })
};

