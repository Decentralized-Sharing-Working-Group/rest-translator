var translator = require('./lib/translator'),
    https = require('https'),
    http = require('http'),
    fs = require('fs'),
    formidable = require('formidable'),
    util = require('util'),
    sslRootCAs = require('ssl-root-cas/latest');

function handler(req, res) {
  var form, stream;
  if (req.method === 'GET') {
    res.writeHead(200);
    fs.createReadStream('index.html').pipe(res);
  } else {
    form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      //todo: use form.onPart to stream this directly instead of via disk:
      stream = fs.createReadStream(files['file-contents'].path);
      var serverType = fields['proxy-front'];
      if (serverType === 'no-proxy') {
        serverType = fields['server-type'];
      }
      translator.send(fields['server-host'], fields['server-port'], fields['base-path'], fields.credentials,
          fields['remote-filename'], files['file-contents'].type, stream, serverType, fields['disable-tls'],
          function (err, data) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files, err: err, data: data}));
      });
    });
  }
}

function run() {
  sslRootCAs.inject().addFile('./ca.pem');
  if (fs.existsSync('./server.pfx')) {
    https.createServer({ pfx: fs.readFileSync('./server.pfx') }, handler).listen(8123);
    console.log('See https://<domain.com>:8123/ for a web interface!');
  } else {
    http.createServer(handler).listen(8123);
    console.log('See http://localhost:8123/ for a web interface!');
  }
}

//...
run();
