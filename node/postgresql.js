const { Client } = require("pg");
const iniparser = require("iniparser");
const config = iniparser.parseSync("./config.ini");

const client = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.post,
});

client.connect((err) => {
  if (err) {
    console.log("Failed to connect db " + err);
  } else {
    console.log("Connect to db done!");
  }
});

const postgres = async (sql) => {
  let result = await client.query(sql);
  console.log(result);
  return result.rows;
};

postgres("SELECT * FROM user");

module.exports = postgres;

// const iniparser = require("iniparser");
// const config = iniparser.parseSync("./config.ini");
// const pg = require("pg");
// const types = pg.types;
// types.setTypeParser(1114, function (stringValue) {
//   return stringValue;
// });

// const { Pool } = require("pg");

// const pool = new Pool({
//   user: config.user,
//   host: config.host,
//   database: config.database,
//   password: config.password,
//   port: config.port,
// });

// const postgres = async (sql) => {
//   let client = await pool.connect();
//   let result = await client.query(sql);
//   client.release();
//   console.log(result.rows);
//   return result.rows;
// };

// postgres("SELECT * FROM user");

// module.exports = postgres;
