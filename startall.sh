#!/bin/bash

node translator --server-type-front=remotestorage --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8211 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf &
node translator --server-type-front=cozy --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8212 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf &
node translator --server-type-front=owncloud --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8213 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf &
node translator --server-type-front=swell --server-type-back=remotestorage --host-back=storage.5apps.com --port-back=443 --base-path-back=/dswg/test/ --port-front=8214 --credentials-back=3a0d6830acea73605bde4e919b107886 --credentials-front=asdf &

node translator --server-type-front=remotestorage --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8221 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf &
node translator --server-type-front=cozy --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8222 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf &
node translator --server-type-front=owncloud --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8223 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf &
node translator --server-type-front=swell --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=8224 --credentials-back=VXBzYzBEMFhydWhlOWJqNXFCM1U0SGNaaWRERWtBZ2Q6ZEM0S3ZsZkJ3cXJpTUozYUNBakc2cUxkZFBrUGdyNXo= --credentials-front=asdf &

node translator --server-type-front=remotestorage --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8231 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf &
node translator --server-type-front=cozy --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8232 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf &
node translator --server-type-front=owncloud --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8233 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf &
node translator --server-type-front=swell --server-type-back=owncloud --host-back=owncloud.michielbdejong.com --port-back=443 --base-path-back=/remote.php/webdav/ --port-front=8234 --credentials-back=b2h5dUg4RWlwaWUxY2hvbzVzaGFpc2hlZXphaVNvaDJhdG91ZjNhYTphaENlMW9hYm9oMmFlcGhvbzVrYWhnaGFlbjlsZWFRdWFpMHpvb2tp --credentials-front=asdf &

node translator --server-type-front=remotestorage --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8241 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf &
node translator --server-type-front=cozy --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8242 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf &
node translator --server-type-front=owncloud --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8243 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf &
node translator --server-type-front=swell --server-type-back=swell --host-back=wave.p2pvalue.eu --port-back=443 --base-path-back=/shared/ --port-front=8244 --credentials-back=YXVzZXJuYW1lOmFwYXNzd29yZA== --credentials-front=asdf &

sleep 1

node server.js
