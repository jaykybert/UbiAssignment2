import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.books");

// ---------- Lookup Table Queries ---------- //

/**
 * @function createLookup
 *
 * Create the lookup table, which holds information about the book
 * that was looked up.
 */
export function createLookup() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS lookup(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, sentence TEXT, description TEXT, cover TEXT, pages INTEGER, publisher TEXT, published TEXT, date TEXT)",
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

/**
 * @function insertLookup
 * @param {object} book - an object containing information about the lookup book.
 * @param {function} callback - a function to be called when the query is successful.
 *
 * Insert the book object into the lookup table. Call the callback function.
 */
export function insertLookup(book, callback) {
  let now = new Date();
  let lookupDate = `${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()}`;

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO lookup(title, author, sentence, description, cover, pages, publisher, published, date) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        book["title"],
        book["author"],
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

/**
 * @function deleteLookupBook
 * @param {number} lookupId - the id of the lookup book to be deleted.
 * @param {function} onLookupBookDeleted - a function to be called when the query is successful.
 *
 * Delete the specified lookup book from the lookup table. Called the provided function.
 */
export function deleteLookupBook(lookupId, onLookupBookDeleted) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM lookup WHERE id=?",
      [lookupId],
      // Success
      (txObj, data) => {
        onLookupBookDeleted();
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

/**
 * @function selectLookupBooks
 * @param {function} onLookupBooksRecieved - a function to be called when the query is successful.
 *
 * Select all entries from the lookup table. Pass the entries into the callback function.
 */
export function selectLookupBooks(onLookupBooksRecieved) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM lookup",
      null,
      // Success
      (txObj, data) => {
        onLookupBooksRecieved(data.rows._array);
      },
      // Failure
      (txObj, error) => {
        console.warn(error);
      }
    );
  });
}

// ---------- Recommendations By Author Table Queries ---------- //

/**
 * @function createRecommendationsByAuthor
 *
 * Create the recsByAuthor table, which holds book recommendations that are written
 * by the same author as the lookup book.
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

/**
 * @function unfavouriteRecommendationByAuthor
 * @param {string} key - the key of the book in recsByAuthor to be deleted.
 * @param {function} onBookDeleted - a function to be called when the query is successful.
 */
export function unfavouriteRecommendationByAuthor(key, onBookDeleted) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recsByAuthor SET favourited=0 WHERE key=?",
      [key],
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

/**
 * @function insertRecommendationByAuthor
 * @param {object} book - an object containing information about the recommended book (from the same author).
 * @param {number} lookupId - the lookup book's id where the recommendation comes from.
 */
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

/**
 * @function selectFavouritedRecommendationsByAuthor
 * @param {function} callback - a function to be called when the query is successful.
 *
 * Get all favourited recommendations by author, and pass them into the callback function.
 */
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

// ---------- Recommendations By Subject Table Queries ---------- //

/**
 * @function createRecommendationsBySubject
 *
 * Create the recsBySubject table, which holds book recommendations that
 * share similar subjects to the lookup book.
 */
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

/**
 * @function unfavouriteRecommendationBySubject
 * @param {string} key - the key of the book in recsBySubject to be updated.
 * @param {function} onBookDeleted - a function to be called when the query is successful.
 */
export function unfavouriteRecommendationBySubject(key, onBookDeleted) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recsBySubject SET favourited=0 WHERE key=?",
      [key],
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

/**
 * @function insertRecommendationBySubject
 * @param {object} book -  an object containing information about the recommended book (from sharing subjects).
 * @param {number} lookupId - the lookup book's id where the recommendation comes from.
 */
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

/**
 * @function selectFavouritedRecommendationsBySubject
 * @param {function} callback - a function to be called when the query is successful.
 *
 * Get all favourited entries from recsBySubject, and pass them to the provided function.
 */
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
