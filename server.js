var translator = require('./lib/translator'),
    http = require('http'),
    fs = require('fs'),
    formidable = require('formidable'),
    util = require('util'),
    sslRootCAs = require('ssl-root-cas/latest');

function run() {
  sslRootCAs.inject().addFile('./ca.pem');
  http.createServer(function(req, res) {
    var form, stream;
    if (req.method === 'GET') {
      res.writeHead(200);
      fs.createReadStream('index.html').pipe(res);
    } else {
      form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        //todo: use form.onPart to stream this directly instead of via disk:
        stream = fs.createReadStream(files['file-contents'].path);
        translator.send(fields['server-host'], fields['server-port'], fields['base-path'], fields['auth-header'],
            fields['remote-filename'], files['file-contents'].type, stream, fields['server-type'], function (err, data) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end(util.inspect({fields: fields, files: files, err: err, data: data}));
        });
      });
    }
  }).listen(8123);
  console.log('See http://localhost:8123');
}

//...
run();
