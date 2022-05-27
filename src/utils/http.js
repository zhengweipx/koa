const https = require("https");

const http = {
  get: (hostname, path = '/') => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: "GET",
      };
  
      const req = https.request(options, (res) => {
        console.log(`hostname: ${hostname} 状态码: ${res.statusCode}`);
  
        res.on("data", (d) => {
          // process.stdout.write(d);
          resolve(JSON.parse(d))
        });
      });
  
      req.on("error", (error) => {
        console.error(error);
      });
  
      req.end();
    })
  },

  post: (hostname, path = '/', data) => {
    const options = {
      hostname: hostname,
      port: 443,
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      console.log(`hostname: ${hostname} 状态码: ${res.statusCode}`);

      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.write(data);
    req.end();
  },
};

module.exports = http;