const { Client } = require("pg");

const client = new Client({
  user: "h4",
  host: "192.168.219.204",
  database: "typescript-test",
  password: "h42020)(",
  port: 5432,
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});
