/**
 * node_to_drupal server extension for nodejs
 *
 * With this extension loaded, messages from the client will be logged to the console.
 * The message will then attempt to be sent back to Drupal.  Upon success, the drupal 
 * responce will be logged to the console, and if nodejs_notify is enabled, the client
 * will be notified.
 *
 */

exports.setup = function (config) {
  process.on('client-message', function (sessionId, message) {
    // Logging the message to the console.
    console.log('Got a message from the client.  Take a look: ');
    console.log(message);

    // Insuring that messageType is set before passing along.
    message.messageType = message.type;
    // Send the message to Drupal.
    config.sendMessageToBackend(message, function(error, responce, body) {
      if(error) {
        console.log('Error sending message to backend.', error);
        return;
      }
      // Drupal got it! Output the responce.
      console.log('Response from drupal: ', body);
      config.publishMessageToClient(sessionId, {data: {subject: 'Success!', body: body}});
    });
  })
};

