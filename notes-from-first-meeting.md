# Notes from first meeting

During the workshop dinner of [floss4p2p](http://p2pvalue.eu/2nd-floss4p2p-workshop) we had the first meeting of our
freshly founded working group.

# Present

* Tristan Nitot (Cozy)
* Paul Tran-Van (Cozy)
* Pablo Ojanguren (Swel)
* Pierre Ozoux (IndieHosters)
* Michiel de Jong (indieHosters / remoteStorage)
* Auli Kutt (OuiShare Labs)

# Conclusions

* We want to make server-to-server sync compatible between three types of servers:

  * Swell (Wave) servers
  * Cozy (CouchDB) servers
  * remoteStorage servers

* We can keep the features supported to a minimum in the first proof-of-concept:
  * only operations supported:
    * create a document
    * update a document
    * delete a document
  * for each of there operations, a proxy can translate http requests:
    * from remoteStorage to CouchDB
    * from remoteStorage to Wave-bot-API
    * from Wave-bot-API to CouchDB
    * from Wave-bot-API to remoteStorage
    * from CouchDB to Wave-bot-API
    * from CouchDB to remoteStorage
  * one person initiates sharing a folder by putting in the following data about each peer:
    * server URL
    * server type (remoteStorage/Swell/Cozy)
    * access token
  * once a folder is shared, the servers can post operations back and forth to each other
  * operations that would result in conflict (file name collision or simultaneous update) simply fail with an error.
