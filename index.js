var cylon = require('cylon');
var RollingSpider = require("rolling-spider");
var config = require('./config.json');

var rollingSpider = new RollingSpider();
rollingSpider.connect(function() {
    rollingSpider.setup(function() {
        rollingSpider.startPing();
    });
});

cylon.robot({
    connections: {
        keyboard: {
            adaptor: 'keyboard'
        }
    },

    devices: {
       keys: {
            driver: 'keyboard'
        }
    },

    work: function (my) {
        my.keys.on('o', function(key) {
            rollingSpider.takeOff();
            rollingSpider.flatTrim();  
       });

        my.keys.on('l', function(key) {
            rollingSpider.land();
        });

        my.keys.on('up', function(key) {
            rollingSpider.up(); 
        });

        my.keys.on('down', function(key) {
            rollingSpider.down(); 
        });
  }
});

cylon.start();

