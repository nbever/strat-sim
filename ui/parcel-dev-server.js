const ParcelProxyServer = require('parcel-proxy-server');
 
// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: './index.html',
  parcelOptions: {
    // provide parcel options here
    // these are directly passed into the
    // parcel bundler
    //
    // More info on supported options are documented at
    // https://parceljs.org/api
    // https: true
  },
  proxies: {
    // add proxies here
    '/graphql': {
      target: 'http://localhost:3000/graphql'
    }
  }
});
 
// the underlying parcel bundler is exposed on the server
// and can be used if needed
server.bundler.on('buildEnd', () => {
  console.log('Build completed!');
});
 
// start up the server
server.listen(1234, () => {
  console.log('Parcel proxy server has started');
});
