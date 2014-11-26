process.env.NODE_ENV = 'test';

var chai = require('chai'),
    expect = chai.expect,
    net = require('net'),
    tls = require('tls'),
    fs = require('fs'),
    winston = require('winston');
// elastics = require('elastics');

chai.config.includeStack = true;

require('../lib/winston-logstash');

describe('winston-logstash integration test', function() {
    // var es = new elastics({host: 'dockerhost' });

    var createLogger = function(port, extraOptions) {
        var transportsConfiguration = {
            port: port,
            node_name: 'test',
            host: 'dockerhost',
            pid: 12345,
            ssl_enable: false,
        };

        if (extraOptions && typeof extraOptions === 'object') {
            transportsConfiguration = mergeObject(transportsConfiguration, extraOptions);
        }

        return new(winston.Logger)({
            transports: [
                new(winston.transports.Logstash)(transportsConfiguration)
            ]
        });
    }

    it('send logs over TCP as valid json', function(done) {
        var test_server, port = 28777;
        var logger = createLogger(port);
        var message = {
            "stream": "sample",
            "level": "info",
            "message": "",
            "metaType": "delimiter",
            "stylesArray": [
                ["l"]
            ],
            "finalStyles": {},
            "positionInfo": {}
        };

        var messageAsObject = {
            "metaType": "delimiter",
            "stylesArray": [
                ["l"]
            ],
            "finalStyles": {},
            "positionInfo": {}
        };

        logger.transports.logstash.on('error', function(err) {
            console.log("ERROR: ", err);
            done();
        });

        logger.log('info', messageAsObject, {});
        logger.log('info', "Hello world", message);

        setInterval(function() {
            done();
        }, 5000);
    });

});
