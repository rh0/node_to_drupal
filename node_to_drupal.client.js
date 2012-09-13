(function ($) {

var message = {
  messageType: 'node_to_drupal',
  body: 'Log to Watchdog',
};

Drupal.behaviors.sendDrupalMessage = {
  attach: function(context, settings) {
    $("#node-to-drupal-form").submit(function() {
      Drupal.Nodejs.socket.emit('message', message);
      return false;
    }); 
  }
}

})(jQuery);
