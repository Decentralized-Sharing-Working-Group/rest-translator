# [remoteStorage](http://tools.ietf.org/html/draft-dejong-remotestorage-04#page-15)

* access token: bearer header
* verb: PUT
* content: raw body

# [CouchDB](https://wiki.apache.org/couchdb/HTTP_Document_API#Standalone_Attachments)

* access token: cookie
* verb: PUT
* content: raw body if attachment, inside JSON if document

# [Wave REST API](http://wave-protocol.googlecode.com/hg/whitepapers/attachments/attachments.html)

* access token: cookie
* verb: POST
* content: inside form body if attachment, inside Blip if Wavelet
