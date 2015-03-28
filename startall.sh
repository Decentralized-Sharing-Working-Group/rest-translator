#!/bin/bash

node translator.js --server-type-front=remotestorage --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8211 &
node translator.js --server-type-front=cozy --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8212 &
node translator.js --server-type-front=owncloud --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8213 &
node translator.js --server-type-front=swell --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8214 &

node translator.js --server-type-front=remotestorage --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8221 &
node translator.js --server-type-front=cozy --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8222 &
node translator.js --server-type-front=owncloud --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8223 &
node translator.js --server-type-front=swell --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8224 &

node translator.js --server-type-front=remotestorage --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8231 &
node translator.js --server-type-front=cozy --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8232 &
node translator.js --server-type-front=owncloud --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8233 &
node translator.js --server-type-front=swell --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8234 &

node translator.js --server-type-front=remotestorage --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8241 &
node translator.js --server-type-front=cozy --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8242 &
node translator.js --server-type-front=owncloud --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8243 &
node translator.js --server-type-front=swell --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8244 &

sleep 1

node server.js
