# server-to-server
First real project of this working group.

[![Build Status](https://travis-ci.org/Decentralized-Sharing-Working-Group/server-to-server.svg)](https://travis-ci.org/Decentralized-Sharing-Working-Group/server-to-server)

# Usage (requires nodejs):

## Method 1: html form upload, translated to remoteStorage/Cozy/ownCloud/Swell, with or without proxy

````bash
npm install
npm start
````

## Method 2: Command line to remoteStorage/Cozy/ownCloud/Swell

To create a credentials hash from a username and password, run:

````bash
node makeCredentials --username=foo --password=bar
````

````bash
echo sending file to example remoteStorage server
node client.js --in=example.png --content-type=image/png --remote-file-name=`date +%s%N` --server-type=remotestorage --host=storage.5apps.com --port=443 --base-path=/dswg/test/ --credentials=3a0d6830acea73605bde4e919b107886

echo sending file to example Cozy server
node client.js --in=example.png --content-type=image/png --remote-file-name=`date +%s%N` --server-type=cozy --host=paulsharing2.cozycloud.cc --port=443 --base-path=/cozy/ --credentials=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo=

echo sending file to example ownCloud server
node client.js --in=example.png --content-type=image/png --remote-file-name=`date +%s%N` --server-type=owncloud --host=owncloud.michielbdejong.com --port=443 --base-path=/remote.php/webdav/ --credentials=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp

echo sending file to example Swell server
node client.js --in=example.png --content-type=image/png --remote-file-name=`date +%s%N` --server-type=swell --host=wave.p2pvalue.eu --port=443 --base-path=/shared/ --credentials=YXVzZXJuYW1lOmFwYXNzd29yZA==
````

## Method 3: Any-to-any proxy

Sixteen proxy examples (put this in front of your remoteStorage server to get a Cozy API to it for free):

````bash
node translator --server-type-front=remotestorage --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8211 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf
node translator --server-type-front=cozy --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8212 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf
node translator --server-type-front=owncloud --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8213 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf
node translator --server-type-front=swell --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8214 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf

node translator --server-type-front=remotestorage --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8221 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf
node translator --server-type-front=cozy --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8222 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf
node translator --server-type-front=owncloud --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8223 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf
node translator --server-type-front=swell --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8224 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf

node translator --server-type-front=remotestorage --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8231 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf
node translator --server-type-front=cozy --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8232 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf
node translator --server-type-front=owncloud --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8233 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf
node translator --server-type-front=swell --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8234 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf

node translator --server-type-front=remotestorage --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8241 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf
node translator --server-type-front=cozy --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8242 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf
node translator --server-type-front=owncloud --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8243 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf
node translator --server-type-front=swell --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8244 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf
````

# Method 4: Starting everything on server-to-server.michielbdejong.com

Run:

````bash
npm install -g forever
./startall.sh
````
