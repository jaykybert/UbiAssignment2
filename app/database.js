import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.books");

/*
 * * ---------- Lookup Table Queries ----------
 */

export function createLookup() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS lookup(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, sentence TEXT, description TEXT, cover TEXT, pages INTEGER, publisher TEXT, published TEXT, date TEXT)",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function deleteTableLookup() {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE lookup",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function insertLookup(book, callback) {
  let now = new Date();
  let lookupDate = `${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()}`;

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO lookup(title, sentence, description, cover, pages, publisher, published, date) VALUES (?,?,?,?,?,?,?,?)",
      [
        book["title"],
        book["firstSentence"],
        book["description"],
        book["cover"],
        book["pages"],
        book["publisher"],
        book["published"],
        lookupDate,
      ],
      // Success.
      (txObj, data) => {
        callback(data.insertId);
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function selectLookup() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM lookup",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

/*
 * ---------- Recommendations By Author Table Queries ----------
 */

export function createRecommendationsByAuthor() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS recsByAuthor(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, lookupId INTEGER, key TEXT, title TEXT, author TEXT, cover TEXT, published TEXT, description TEXT, favourited BOOLEAN, FOREIGN KEY(lookupId) REFERENCES lookup(id))",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function deleteTableRecommendationsByAuthor() {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE recsByAuthor",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function deleteRecommendationByAuthor(id, onBookDeleted) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM recsByAuthor WHERE id = ?",
      [id],
      // Success
      (txObj, data) => {
        onBookDeleted();
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function insertRecommendationByAuthor(book, lookupId) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recsByAuthor(lookupId, key, title, author, cover, published, description, favourited) VALUES (?,?,?,?,?,?,?,?)",
      [
        lookupId,
        book["key"],
        book["title"],
        book["author"],
        book["cover"],
        book["published"],
        book["description"],
        book["favourited"],
      ],
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function selectRecommendationsByAuthor(onRecommendationsRetrieved) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recsByAuthor",
      null,
      // Success
      (txObj, data) => {
        console.log("AUTHOR RECS - Selected.");
        onRecommendationsRetrieved(data.rows._array);
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function selectFavouritedRecommendationsByAuthor(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recsByAuthor WHERE favourited=1",
      null,
      // Success
      (txObj, data) => {
        callback(data.rows._array);
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

/*
 * ---------- Recommendations By Subject Table Queries ----------
 */

// TODO: remember to include foreign key!

export function createRecommendationsBySubject() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS recsBySubject(id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " lookupId INTEGER, key TEXT, title TEXT, author TEXT, cover TEXT, lookupSubject TEXT, subjects TEXT, favourited BOOLEAN, FOREIGN KEY(lookupId) REFERENCES lookup(id))",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function deleteTableRecommendationsBySubject() {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE recsBySubject",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function deleteRecommendationBySubject(id, onBookDeleted) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM recsBySubject WHERE id=?",
      [id],
      // Success
      (txObj, data) => {
        onBookDeleted();
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function insertRecommendationBySubject(book, lookupId) {
  let tags = book["subjects"].join(", ");
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recsBySubject(lookupId, key, title, author, cover, lookupSubject, subjects, favourited) VALUES(?,?,?,?,?,?,?,?)",
      [
        lookupId,
        book["key"],
        book["title"],
        book["author"],
        book["cover"],
        book["lookupSubject"],
        tags,
        book["favourited"],
      ],
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function selectRecommendationsBySubject() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recsBySubject",
      null,
      // Success
      (txObj, data) => {},
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

export function selectFavouritedRecommendationsBySubject(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recsBySubject WHERE favourited=1",
      null,
      // Success
      (txObj, data) => {
        callback(data.rows._array);
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}
