#node_to_drupal

####This module is not functionally useful at all, and is intended only as an example.

Node_to_drupal is an example module to demonstrate the [nodejs integration module](http://drupal.org/project/nodejs)'s ability to send a message from a node server extension back to Drupal.  This functionality is demonstrated by generating a simple form page using standard Drupal procedures.  This page loads a bit of client side JavaScript that will emit a simple message to the node server upon form submission.  A server extension then listens for this message and forwards it on to Drupal. From here, Drupal makes a simple watchdog entry stating the message was received and relates the same back to the node server.

For a more detailed description on this demonstration module, check out [_Talking to Drupal with NodeJS_](http://theoleschool.com/blog/talking-drupal-nodejs).  The example code in that post is taken directly from this module.

##Installation

+ You will of course need the [nodejs module](http://drupal.org/project/nodejs) installed configured and enabled.
+ As an added bonus enable nodejs_notify (included with the nodejs module) to allow client side notifications upon success.

####When configuring nodejs module be sure to have these settings as follows:
	clientsCanWriteToClients: true
	extensions: ['../node_to_drupal/node_to_drupal.server.extension.js']
