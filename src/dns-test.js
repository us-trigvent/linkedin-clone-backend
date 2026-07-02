const dns = require("dns");

console.log("Servers:", dns.getServers());

dns.resolve4("google.com", (err, records) => {
  console.log("resolve4:");
  console.log(err || records);
});

dns.resolveSrv("_mongodb._tcp.umesh-cluster.sdppjkc.mongodb.net", (err, records) => {
  console.log("resolveSrv:");
  console.log(err || records);
});

dns.lookup("google.com", (err, address) => {
  console.log("lookup:");
  console.log(err || address);
});