const csvToJson = require("csvtojson")();
const fs = require("fs-extra");
var admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

async function Migrate() {
  console.log("Migration Started");

  let file = "./file1.csv";
  csvToJson
    .fromFile(file)
    .then(async (data) => {
      // console.log(data)
      try {
        for (let d of data) {
          await db.collection("question-answers").doc().set(d);
        }
      } catch (err) {
        console.log(err);
      }
      console.log("Migrated all data");
    })
    .catch((err) => {
      console.log(err);
    });
}

Migrate();
