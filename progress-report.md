# Basic CRUD translator

The translator can be a proxy in between a client and a server, and translate between the following protocols:

* WebDAV
* CouchDB
* remoteStorage
* Swell (under construction; so far, it only fakes the CREATE operation)

Now the question is - what can we do with this? Basically, you can use this translator in two ways:

* Ship it with a server, to give that server more interfaces. This is not realistic for servers that are not shipped either
as full OS-level applications, or as nodejs applications. For ownCloud (which is shipped as a lamp app) and Swell (which is
shipped as a java application), it is not very practical to include this translator, unless we write it again in php,
and again in java (which is a possibility, if there is a demand for that).

* Ship it with a client, to give that client more polyglot power. The way to do this would probably be as a library, and not as a
proxy. Again, with the current translator this would only make sense for clients writen in nodejs, unless we port it to other
languages, or compile it to native.

# But what about server-to-server?

Right, we said we are interested in server-to-server sharing, not client-to-server sharing. As it turns out, sending a file from
one server to another is possible with ownCloud, but it does not use WebDAV. It is also possible between two Swell servers, although
again, it does not use the REST interface for it. This means that the original plan will not work.

# OCS-to-anything

We adapted the translator proxy so that it can receive files via ownCloud OCS, and deliver them to the Cozy Files App. If we put in
some work, we can make this a real feature, to be shipped with Cozy. That would make sharing a file in the direction ownCloud -> Cozy
possible.

It would also not be that hard to add remoteStorage and Swell as destinations for this OCS-receive-dialog.

# Sharing files from any to any server

But what if the person sharing the file is not using ownCloud? On any server there can be a file browser, with a 'share this file'
button, so you can get a share URL. On that share page, there can be a 'view on your own server' button, which redirects to the
appropriate endpoint.

This cannot be solved with a proxy. It would require new functionality in:

* the Cozy Files app
* the Swell graphical user interface
* the remoteStorage file browser (e.g. https://export.5apps.com/)

Is this the way we want to go?
