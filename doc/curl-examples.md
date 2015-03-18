# Given a file you want to send:

* `{:filename}` is a unique UTF-8 string (no file with that name had been uploaded before)
* `{:contentType}` is an ASCII string
* `{:fileondisk}` is the local file on disk

# To send this file to a remoteStorage server:

Given the remoteStorage server details:

* `{:databaseURL}` is of the form `https://host.com:port/path/`
* `{:authorizationHeader}` is of the form `Bearer asrtgewrghrereghertgawer==`

curl -vX PUT {:databaseURL}/{:filename}
    --data-binary @{:fileondisk}
    -H "Authorization: {:authorizationHeader}" -H "Content-Type: {:contentType}"

NOTE: here is an example server:

curl -v 'https://109.107.37.164/dswg/`date +%s`' -X PUT -H 'Host: storage.5apps.com'
    -H 'If-None-Match: "*"' -H 'Authorization: Bearer e8368b5e74b7dddc62ed468fdbf13617' --data 'asdf'

# To send this file to a Cozy server:

Given the Cozy server details:

* `{:databaseURL}` is of the form `https://host.com:port/dbname/`
* `{:authorizationHeader}` is of the form `Basic asrtgewrghrereghertgawer==`

Send the file in this way (the string 'raw' is arbitrary here):

curl -vX PUT {:databaseURL}/{:filename}/raw
    --data-binary @{:fileondisk}
    -H "Authorization: {:authorizationHeader}" -H "Content-Type: {:contentType}"
    
Testing with local CouchDB in admin party mode works:
````bash
curl -vX PUT http://localhost:5984/database/doc/attachment --data-binary @/usr/share/doc/nodejs/full-white-stripe.jpg -H "Content-Type: image/jpg"
curl -vX GET http://localhost:5984/database/doc/attachment
````

Here is an actual working example for this cozy : https://paulsharing2.cozycloud.cc
````bash
#Document creation : 
curl -vX POST https://Upsc0D0Xruhe9bj5qB3U4HcZidDEkAgd:dC4KvlfBwqriMJ3aCAjG6qLddPkPgr5z@paulsharing2.cozycloud.cc/cozy/ -H 'Content-Type: application/json'  -d '{"doctest": "mydoctest"}'
#Put the attachment : 
curl -vX PUT https://Upsc0D0Xruhe9bj5qB3U4HcZidDEkAgd:dC4KvlfBwqriMJ3aCAjG6qLddPkPgr5z@paulsharing2.cozycloud.cc/cozy/<doc_id>/attachment?rev=<rev> --data-binary @<image_path> -H "Content-Type: image/jpg"
````

# To send this file to a Swell server:

Given the Swell server details (the string 'shared' is arbitrary and the '/shared/waveId' format still subject to change):

* `{:databaseURL}` is of the form `https://host.com:port/shared/waveId`
* `{:authorizationHeader}` is of the form `Basic asrtgewrghrereghertgawer==`

Send the file in this way:

curl -vX PUT {:databaseURL}/{:filename}
    --data-binary @{:fileondisk}
    -H "Authorization: {:authorizationHeader}" -H "Content-Type: {:contentType}"

NOTE: @pablojan is still adding this functionality to Swell, it requires some changes in the Java code.

Comparison:
* remoteStorage - Swell: the only difference 'Bearer' vs. 'Basic' in the Authorization header
* Swell - Cozy: the only difference is the '/raw' at the end of the URL path.
* Cozy - remoteStorage: 'Basic' and with, versus 'Bearer' and without '/raw' behind the URL path.
