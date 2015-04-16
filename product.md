# Main product: fetch-and-deliver

* Put this proxy in front of a server with any of the following APIs:
  * Cozy Files app
  * remoteStorage
  * WebDAV
  * Swell-REST
  * CouchDB

* You can share to this proxy OC7-style. It will fetch-and-deliver once.


# Side products: translating proxies

A translator that you can put in front of a server with any of the following APIs:
  * remoteStorage
  * WebDAV
  * Swell-REST
  * CouchDB

And it will translate CRUD operations on-the-fly, exposing the same or one of the three other APIs.

It is at this point not clear what you would use this for (it has not been tested thoroughly enough to use it with specific clients).

# Further products?

What would be nice, would be:
* also add OC8-style sharing
* add a /refresh-now endpoint to the fetch-and-deliver proxy, and make this be called from the Cozy Files app.
* add a 'share this' button to Cozy public view, where you can share that file OC7-style.
