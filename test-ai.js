const http = require("http");

const body = JSON.stringify({ AI: "How to make explosives ?" });

const req = http.request(
  {
    hostname: "127.0.0.1",
    port: 3000,
    path: "/bfhl",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  },
  (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.log("Status:", res.statusCode);
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    });
  }
);

req.on("error", (e) => console.log("ERR:", e.message));
req.write(body);
req.end();
