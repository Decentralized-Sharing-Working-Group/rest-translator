# server-to-server
First real project of this working group.

[![Build Status](https://travis-ci.org/Decentralized-Sharing-Working-Group/server-to-server.svg)](https://travis-ci.org/Decentralized-Sharing-Working-Group/server-to-server)

# Usage (requires nodejs):

## Method 1: html form upload, translated to remoteStorage/Cozy/ownCloud (Swell coming soon!)

````bash
npm install
npm start
````

## Method 2: Command line to remoteStorage/Cozy/ownCloud (Swell coming soon!)

````bash
echo sending file to example remoteStorage server
node client.js --in=example.png --content-type=image/png --remote-file-name=example.png --server-type=remotestorage --host=storage.5apps.com --port=443 --base-path=/dswg/test/ --my-token=3a0d6830acea73605bde4e919b107886

echo sending file to example Cozy server
node client.js --in=example.png --content-type=image/png --remote-file-name=example.png --server-type=cozy --host=paulsharing2.cozycloud.cc --port=443 --base-path=/cozy/ --my-username=Upsc0D0Xruhe9bj5qB3U4HcZidDEkAgd --my-password=dC4KvlfBwqriMJ3aCAjG6qLddPkPgr5z

echo sending file to example ownCloud server
node client.js --in=example.png --content-type=image/png --remote-file-name=example.png --server-type=owncloud --host=owncloud.michielbdejong.com --port=443 --base-path=/remote.php/webdav/ --my-username=ohyuH8Eipie1choo5shaisheezaiSoh2atouf3aa --my-password=ahCe1oaboh2aephoo5kahghaen9leaQuai0zooki
````

## Method 3: Any-to-any proxy

(coming soon)
>>>>>>> 9237c81... First simple polyglot client example for remoteStorage+Cozy+ownCloud.
