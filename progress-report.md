# Basic CRUD translator

The translator can be a proxy in between a client and a server, and translate between the following protocols:

* WebDAV
* CouchDB
* remoteStorage
* Swell (under construction; so far, it only fakes the CREATE operation)

Now the question is - what can we do with this? Basically, you can use this translator in two ways:

* Ship it with a server, to give that server more interfaces. This is not realistic for servers that are not shipped either
as full OS-level applications, or as nodejes applications. For ownCloud (which is shipped as a lamp app) and Swell (which is
shipped as a java .jar archive, afaik), it is not very practical to include this translator, unless we write it again in php,
and again in java (which is a possibility, if there is a demand for that).

* Ship it with a client, to give that client more polyglot power. The way to do this would probably as a library, and not as a
proxy. Again, with the current translator this would only make sense for clients writen in nodejs, unless we port it to other
languages, or compile it to native.

# But what about server-to-server?

Right, we said we are interested in server-to-server sharing, not client-to-server sharing. As it turns out, sending a file from
one server to another is possible with ownCloud, but it does not use WebDAV. It is also possible between two Swell servers, although
again, it does not use the REST interface for it. This means that the original plan will not work.

The new short-term plan is to translate ownCloud OCS to Cozy Files App. I will try to demo that soon.
