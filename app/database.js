import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.books");

function createDatabase() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS lookup(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, title TEXT, pages INT, sentence TEXT, published TEXT)",
      null,
      () => {
        // Success Callback
      },
      () => {
        // Error Callback
      }
    );
  });
}
