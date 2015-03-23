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

To create a credentials hash from a username and password, run:

````bash
node makeCredentials --username=foo --password=bar
````

````bash
echo sending file to example remoteStorage server
node client.js --in=example.png --content-type=image/png --remote-file-name=`date +%s` --server-type=remotestorage --host=storage.5apps.com --port=443 --base-path=/dswg/test/ --credentials=3a0d6830acea73605bde4e919b107886

echo sending file to example Cozy server
node client.js --in=example.png --content-type=image/png --remote-file-name=`date +%s` --server-type=cozy --host=paulsharing2.cozycloud.cc --port=443 --base-path=/cozy/ --credentials=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo=

echo sending file to example ownCloud server
node client.js --in=example.png --content-type=image/png --remote-file-name=`date +%s` --server-type=owncloud --host=owncloud.michielbdejong.com --port=443 --base-path=/remote.php/webdav/ --credentials=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp
````

## Method 3: Any-to-any proxy

(coming soon)
