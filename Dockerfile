FROM node
COPY . /app
EXPOSE 80
CMD cd /app && node translator --server-type-front=owncloud --server-type-back=cozy --host-back=paulsharing2.cozycloud.cc --port-back=443 --base-path-back=/cozy/ --port-front=80
