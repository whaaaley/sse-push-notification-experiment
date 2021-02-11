
# push-notificaton-demo

## Generate Certificates

From node.js documentation
https://nodejs.org/api/http2.html#http2_server_side_example

```sh
openssl req -nodes -sha256 -x509 \
  -newkey rsa:2048 \
  -subj '/CN=localhost' \
  -keyout localhost-key.pem \
  -out localhost-cert.pem
```

From Let's Encrypt
https://letsencrypt.org/docs/certificates-for-localhost/

```sh
openssl req -nodes -sha256 -x509 \
  -newkey rsa:2048 \
  -subj '/CN=localhost' \
  -keyout localhost.key \
  -out localhost.crt \
  -extensions EXT -config <( \
    printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

Human readable version of the extensions config:

```sh
[dn]
CN=localhost

[req]
distinguished_name = dn

[EXT]
subjectAltName=DNS:localhost
keyUsage=digitalSignature
extendedKeyUsage=serverAuth
```
