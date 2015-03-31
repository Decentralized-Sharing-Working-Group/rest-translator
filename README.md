# server-to-server
First real project of this working group.

[![Build Status](https://travis-ci.org/Decentralized-Sharing-Working-Group/server-to-server.svg)](https://travis-ci.org/Decentralized-Sharing-Working-Group/server-to-server)

# Usage (requires nodejs):

First, run:

````bash
npm install
````

## Creating token

However you use this tool, whether as a webform, a CLI client, or a proxy, you will need access to the server it
is connecting to. This means you need its whereabouts (host, port, URL base path), and token.

All requests use a http authorization that starts with either 'Bearer ' or 'Basic ', and is followed by a token.
The token usually looks like base64 hash, but it can be any string.
For a remoteStorage server, you can use https://creds.5apps.com/ to get a token.
For any of the other server types, create a user with username and password on the server, and run this tool to
get your token:

````bash
TOKEN=`node makeToken.js --username=dswg --password=dswgdswg`
echo Token is \"$TOKEN\"
node readToken.js --hash=$TOKEN
````

## Method 1: html form upload, translated to remoteStorage/Cozy/ownCloud/Swell, with or without proxy

````bash
./startall.sh
````

## Method 2: Command line to remoteStorage/Cozy/ownCloud/Swell

First create your token as explained above; then run this in the terminal to pick a remote filename:

````bash
REMOTE_FILENAME=`date +%s%N`
````

You can now upload example.png to all test servers. If you get a 412 or 409 response, re-run the previous command, to pick
a new remote filename and avoid clashes.

```bash
echo sending file to example remoteStorage server
node client.js --operation=create --in=example.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=remotestorage --host=storage.5apps.com --port=443 --base-path=/dswg/test/ --token=3a0d6830acea73605bde4e919b107886

echo sending file to example Cozy server
node client.js --operation=create --in=example.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=cozy --host=paulsharing2.cozycloud.cc --port=443 --base-path=/cozy/ --token=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo=

echo sending file to example ownCloud server
node client.js --operation=create --in=example.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=owncloud --host=owncloud.michielbdejong.com --port=443 --base-path=/remote.php/webdav/ --token=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp

echo sending file to example Swell server
node client.js --operation=create --in=example.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=swell --host=wave.p2pvalue.eu --port=443 --base-path=/shared/ --token=YXVzZXJuYW1lOmFwYXNzd29yZA==
````

* The response will be visible on the terminal console. Find the "ETag" response header, and if it's for instance `etag: '"asdfasdfasdf"'`, then run `EXISTING_ETAG=asdfasdfasdf` (so without the single and double quotes)
* For servers that have self-signed certificates, set the `--tls-conf=allow-self-signed` option.
* For servers that run http instead of https, set the `--tls-conf=http` option.
* If you see zero bytes files appearing on your server, check if your webserver [supports chunked transfer encoding](http://sabre.io/dav/0bytes/) (lighttpd is known to violate the http/1.1 spec here).

For a 'READ' operation, do:

````bash
echo reading file from example remoteStorage server
node client.js --operation=read --out=remotestorage-read.png --remote-file-name=$REMOTE_FILENAME --server-type=remotestorage --host=storage.5apps.com --port=443 --base-path=/dswg/test/ --token=3a0d6830acea73605bde4e919b107886

echo reading file from example Cozy server
node client.js --operation=read --out=cozy-read.png --remote-file-name=$REMOTE_FILENAME --server-type=cozy --host=paulsharing2.cozycloud.cc --port=443 --base-path=/cozy/ --token=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo=

echo reading file from example ownCloud server
node client.js --operation=read --out=owncloud-read.png --remote-file-name=$REMOTE_FILENAME --server-type=owncloud --host=owncloud.michielbdejong.com --port=443 --base-path=/remote.php/webdav/ --token=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp

# Coming soon, see https://github.com/Decentralized-Sharing-Working-Group/server-to-server/issues/24
#
# echo reading file from example Swell server
# node client.js --operation=read --out=swell-read.png --remote-file-name=$REMOTE_FILENAME --server-type=swell --host=wave.p2pvalue.eu --port=443 --base-path=/shared/ --token=YXVzZXJuYW1lOmFwYXNzd29yZA==
````

If you followed the instructions before, the `$REMOTE_FILENAME` and `$EXISTING_ETAG` variables will now be defined, for the server that you are testing against. To check this, run:

```bash
echo Remote filename "$REMOTE_FILENAME", existing ETag "$EXISTING_ETAG"
```

If this looked correct, then for an 'UPDATE' operation, do:

````bash
echo updating file on example remoteStorage server
node client.js --operation=update --in=remotestorage-read.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=remotestorage --host=storage.5apps.com --port=443 --base-path=/dswg/test/ --existing-etag=$EXISTING_ETAG --token=3a0d6830acea73605bde4e919b107886

echo updating file on example Cozy server
node client.js --operation=update --in=cozy-read.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=cozy --host=paulsharing2.cozycloud.cc --port=443 --base-path=/cozy/ --existing-etag=$EXISTING_ETAG --token=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo=

echo updating file on example ownCloud server
node client.js --operation=update --in=owncloud-read.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=owncloud --host=owncloud.michielbdejong.com --port=443 --base-path=/remote.php/webdav/ --existing-etag=$EXISTING_ETAG --token=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp

# Coming soon, see https://github.com/Decentralized-Sharing-Working-Group/server-to-server/issues/24
#
# echo updating file on example Swell server
# node client.js --operation=update --in=swell-read.png --content-type=image/png --remote-file-name=$REMOTE_FILENAME --server-type=swell --host=wave.p2pvalue.eu --port=443 --base-path=/shared/ --existing-etag=$EXISTING_ETAG --token=YXVzZXJuYW1lOmFwYXNzd29yZA==


Update your `EXISTING_ETAG` variable from the update response, and now you can try out the 'DELETE' operation:

````bash
echo deleting file from example remoteStorage server
node client.js --operation=delete --remote-file-name=$REMOTE_FILENAME --server-type=remotestorage --host=storage.5apps.com --port=443 --base-path=/dswg/test/ --existing-etag=$EXISTING_ETAG --token=3a0d6830acea73605bde4e919b107886

echo deleting file from example Cozy server
node client.js --operation=delete --remote-file-name=$REMOTE_FILENAME --server-type=cozy --host=paulsharing2.cozycloud.cc --port=443 --base-path=/cozy/ --existing-etag=$EXISTING_ETAG --token=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo=

echo deleting file from example ownCloud server
node client.js --operation=delete --remote-file-name=$REMOTE_FILENAME --server-type=owncloud --host=owncloud.michielbdejong.com --port=443 --base-path=/remote.php/webdav/ --existing-etag=$EXISTING_ETAG --token=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp

# Coming soon, see https://github.com/Decentralized-Sharing-Working-Group/server-to-server/issues/24
#
# echo deleting file from example Swell server
# node client.js --operation=delete --remote-file-name=$REMOTE_FILENAME --server-type=swell --host=wave.p2pvalue.eu --port=443 --base-path=/shared/ --existing-etag=$EXISTING_ETAG --token=YXVzZXJuYW1lOmFwYXNzd29yZA==

````

## Method 3: Any-to-any proxy

Sixteen proxy examples (put this in front of your remoteStorage server to get a Cozy API to it for free):

````bash
node translator --server-type-front=remotestorage --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8211
node translator --server-type-front=cozy --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8212
node translator --server-type-front=owncloud --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8213
node translator --server-type-front=swell --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8214

node translator --server-type-front=remotestorage --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8221
node translator --server-type-front=cozy --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8222
node translator --server-type-front=owncloud --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8223
node translator --server-type-front=swell --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8224

node translator --server-type-front=remotestorage --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8231
node translator --server-type-front=cozy --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8232
node translator --server-type-front=owncloud --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8233
node translator --server-type-front=swell --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8234

node translator --server-type-front=remotestorage --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8241
node translator --server-type-front=cozy --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8242
node translator --server-type-front=owncloud --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8243
node translator --server-type-front=swell --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8244
````

# Method 4: Starting everything on server-to-server.michielbdejong.com

Run:

````bash
npm install -g forever
./startall.sh
````
