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
      () => {
        // Success Callback
        console.log("LOOKUP - Created.");
      },
      () => {
        // Error Callback
        console.log("LOOKUP - Failed to create.");
      }
    );
  });
}

export function deleteLookup() {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE lookup",
      null,
      () => {
        // Success Callback
        console.log("Sucessfully deleted 'lookup'.");
      },
      () => {
        // Error Callback
        console.log("Failed to delete 'lookup'.");
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
      (txObj, data) => {
        // Success.
        console.log("LOOKUP - Inserted.");
        callback(data.insertId);
      },
      (txObj, error) => {
        // Error
        console.log("LOOKUP - Error inserting.");
        console.warn(error);
      }
    );
  });
}

export function selectLookup() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id, title FROM lookup",
      null,
      (txObj, data) => {
        console.log("Selected from lookup.");
        console.log(data.rows._array);
      },
      () => {
        console.log("Error selecting from lookup.");
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
      () => {
        // Success Callback
        console.log("AUTHOR RECS - Created.");
      },
      () => {
        // Error Callback
        console.log("AUTHOR RECS - Failed to create.");
      }
    );
  });
}

export function deleteRecommendationsByAuthor() {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE recsByAuthor",
      null,
      () => {
        // Success Callback
        console.log("AUTHOR RECS - Deleted.");
      },
      () => {
        // Error Callback
        console.log("AUTHOR RECS - Failed to delete.");
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
      (txObj, data) => {
        console.log("AUTHOR RECS - Inserted.");
      },
      (txObj, error) => {
        console.log("AUTHOR RECS - Failed to insert.");
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
      (txObj, data) => {
        console.log("AUTHOR RECS - Selected.");
        onRecommendationsRetrieved(data.rows._array);
      },
      () => {
        console.log("AUTHOR RECS - Failed to select.");
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
      (txObj, data) => {
        console.log("SUBJECTS - Created.");
      },
      (txObj, error) => {
        console.log("SUBJECTS - Could not create.");
        console.warn(error);
      }
    );
  });
}

export function deleteRecommendationsBySubject() {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE recsBySubject",
      null,
      (txObj, data) => {
        console.log("SUBJECTS - Deleted.");
      },
      () => {
        console.log("SUBJECTS - Couldn't delete.");
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
      (txObj, data) => {
        // Success
        console.log("SUBJECT - Inserted.");
      },
      (txObj, error) => {
        // Error
        console.log("SUBJECT - Failed to insert.");
        console.warn(error);
      }
    );
  });
}

export function selectRecommendationsBySubject() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recsBySubject",
      [],
      (txObj, data) => {
        // Success
        console.log("SUBJECTS - Selected.");
        console.log(data.rows._array);
      },
      (txObj, error) => {
        console.log("SUBJECTS - Failed to select.");
        console.warn(error);
      }
    );
  });
}
