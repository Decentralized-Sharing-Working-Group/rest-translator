#!/bin/bash

forever start translator.js --server-type-front=remotestorage --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8211 &
forever start translator.js --server-type-front=cozy --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8212 &
forever start translator.js --server-type-front=owncloud --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8213 &
forever start translator.js --server-type-front=swell --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8214 &

forever start translator.js --server-type-front=remotestorage --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8221 &
forever start translator.js --server-type-front=cozy --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8222 &
forever start translator.js --server-type-front=owncloud --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8223 &
forever start translator.js --server-type-front=swell --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8224 &

forever start translator.js --server-type-front=remotestorage --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8231 &
forever start translator.js --server-type-front=cozy --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8232 &
forever start translator.js --server-type-front=owncloud --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8233 &
forever start translator.js --server-type-front=swell --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8234 &

forever start translator.js --server-type-front=remotestorage --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8241 &
forever start translator.js --server-type-front=cozy --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8242 &
forever start translator.js --server-type-front=owncloud --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8243 &
forever start translator.js --server-type-front=swell --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8244 &

sleep 1

forever start server.js
