/*
psql -d postgres -U postgres
CREATE ROLE YOUR_DB_USER WITH LOGIN PASSWORD "YOUR_DB_PASS";
CREATE DATABASE rdgUserSaves;
*/

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: "rdgUserSaves",
  password: process.env.DB_PASS,
  port: 5432,
});

pool.query(
  "CREATE TABLE IF NOT EXISTS UserSaves (id VARCHAR UNIQUE , save1 json NOT NULL, save2 json NOT NULL, save3 json NOT NULL)",
  (error, res) => {
    if (error) {
      console.log(error.stack);
    }
  }
);

var jsonValue = (id) => {
  return {
    storeID: id,
    category: "",
    func: "",
    lang: "ru",
    seed: "",
    count: "1",
    params: "",
    outNewLine: true,
    outCommas: false,
    outWrap: false,
  };
};

module.exports = {
  initUser: function (userID) {
    return new Promise(function (resolve, reject) {
      pool.query(
        `SELECT EXISTS(SELECT 1 FROM UserSaves WHERE id = $1) AS "exists"`,
        [userID],
        (error, result) => {
          if (error) {
            console.error("error occurred:", error);
            reject(error);
          }
          const idExists = result.rows[0].exists;

          if (!idExists) {
            // Create a new row with the provided JSON values
            pool.query(
              "INSERT INTO UserSaves (id, save1, save2, save3) VALUES ($1, $2, $3, $4)",
              [userID, jsonValue(2), jsonValue(3), jsonValue(4)],
              (error, result) => {
                if (error) {
                  console.error("error occurred:", error);
                  reject(error);
                } else {
                  console.log("New row created successfully!");
                  resolve({ msg: "New row created successfully!" });
                }
              }
            );
          } else {
            console.log("ID already exists in the table.");
            resolve({ msg: "ID already exists in the table." });
          }
        }
      );
    });
  },
  saveData: function (data, userID) {
    return new Promise(function (resolve, reject) {
      const saveName = "save" + (Number(data.storeID) - 1);
      pool.query(
        `UPDATE UserSaves SET ${saveName} = $1 WHERE id = $2`,
        [data, userID],
        (error, result) => {
          if (error) {
            console.error("error occurred:", error);
            reject(error);
          } else {
            console.log(`${saveName} updated successfully!`);
            resolve({ msg: "success" });
          }
        }
      );
    });
  },
  getData: function (userID) {
    return new Promise(function (resolve, reject) {
      pool.query(
        `SELECT save1, save2, save3 FROM UserSaves WHERE id = $1`,
        [userID],
        (error, result) => {
          if (error) {
            console.error("error occurred:", error);
            reject(error);
          } else {
            const { save1, save2, save3 } = result.rows[0];
            //console.log("save1:", save1);
            //console.log("save2:", save2);
            //console.log("save3:", save3);
            resolve({ save1, save2, save3 });
          }
        }
      );
    });
  },
};
