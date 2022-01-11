/**
 * @file SearchISBN.js
 *
 * Contains the SerachISBN component.
 */

// React
import React, { useState } from "react";
import { AlertIOS, Modal, Platform, ToastAndroid, View } from "react-native";
// Components
import ModalStarted from "../components/modal-views/ModalStarted.js";
import ModalGotBook from "../components/modal-views/ModalGotBook";
import ModalGotAuthor from "../components/modal-views/ModalGotAuthor";
import ModalGotSubjects from "../components/modal-views/ModalGotSubjects";
import ModalGotAuthorWorks from "../components/modal-views/ModalGotAuthorWorks";
import ModalGotRecommendedBooks from "../components/modal-views/ModalGotRecommendedBooks";
import ModalError from "../components/modal-views/ModalError";
import InputISBN from "../components/InputISBN.js";
import ScanISBN from "../components/ScanISBN";
// Styles
import { controller, container } from "../styles.js";
// API Calls
import {
  getAuthorByKey,
  getAuthorWorksByKey,
  getBookByISBN,
  getBooksBySubject,
  getSubjectsByKey,
} from "../scripts/bookApiCalls";

/**
 * @function SearchISBN
 *
 * Main logic component for searching for book recommendations.
 * Always in one of the following states, which determines what function
 * is called next, and what component is returned:
 *    > NOT_STARTED
 *    > STARTED
 *    > GOT_BOOK
 *    > GOT_AUTHOR
 *    > GOT_SUBJECTS
 *    > GOT_AUTHOR_WORKS
 *    > GOT_RECOMMENDED_BOOKS
 *    > ERROR
 *
 * Follows the above order linearly.
 * When one API call returns, update the state along with the retrieved data.
 */
const SearchISBN = ({ isbn }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [recommendations, setRecommendations] = useState({
    state: "NOT_STARTED",
    isbn: isbn,
    authorWorks: [],
    recommendedWorks: [],
  });
  console.log(recommendations["state"]);

  /**
   * @function lookupBook
   *
   * Asynchronous function, called in STARTED state.
   * Awaits API call, updates state to GOT_BOOK.
   */
  const lookupBook = async () => {
    let book = await getBookByISBN(recommendations["isbn"]);

    if (book.hasOwnProperty("error")) {
      setRecommendations({ state: "ERROR" });
    } else {
      // Note: Can't set recCopy = recommendations. Can't reference same obj, otherwise won't re-render.
      let recCopy = JSON.parse(JSON.stringify(recommendations));
      recCopy["book"] = book;
      recCopy["state"] = "GOT_BOOK";
      setRecommendations(recCopy);
    }
  };

  /**
   * @function lookupAuthor
   *
   * Asynchronous function, called in GOT_BOOK state.
   * Awaits API call, updates state to GOT_AUTHOR.
   */
  const lookupAuthor = async () => {
    let author = await getAuthorByKey(recommendations["book"]["authorKey"]);

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["book"]["author"] = author["name"];
    recCopy["state"] = "GOT_AUTHOR";

    setRecommendations(recCopy);
  };

  /**
   * @function lookupSubjects
   *
   * Asynchronous function, called in GOT_AUTHOR state.
   * Awaits API call, updates state to GOT_SUBJECTS.
   */
  const lookupSubjects = async () => {
    let subjects = await getSubjectsByKey(recommendations["book"]["workKey"]);

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["subjects"] = subjects;
    recCopy["state"] = "GOT_SUBJECTS";

    setRecommendations(recCopy);
  };

  /**
   * @function lookupAuthorWorks
   *
   * Asynchronous function, called in GOT_SUBJECTS state.
   * Awaits API call, updates state to GOT_AUTHOR_WORKS.
   */
  const lookupAuthorWorks = async () => {
    let works = await getAuthorWorksByKey(recommendations["book"]["authorKey"]);

    // Add Author name to each work.
    for (let i = 0; i < works.length; i++) {
      works[i]["author"] = recommendations["book"]["author"];
    }

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["state"] = "GOT_AUTHOR_WORKS";
    recCopy["authorWorks"] = works;

    setRecommendations(recCopy);
  };

  /**
   * @function lookupRecommendedBooks
   *
   * Asynchronous function, called in GOT_AUTHOR_WORKS state.
   * Awaits API call, updates state to GOT_RECOMMENDED_BOOKS.
   */
  const lookupRecommendedBooks = async () => {
    let books = await getBooksBySubject(
      recommendations["subjects"]["subjects"]
    );

    let recCopy = JSON.parse(JSON.stringify(recommendations));
    recCopy["state"] = "GOT_RECOMMENDED_BOOKS";
    recCopy["recommendedWorks"] = books;

    setRecommendations(recCopy);
  };

  // Return Not Started Modal
  if (recommendations["state"] === "NOT_STARTED") {
    return (
      <View style={container.container}>
        <InputISBN
          recommendations={recommendations}
          setRecommendations={setRecommendations}
        />
        <ScanISBN
          recommendations={recommendations}
          setRecommendations={setRecommendations}
        />
      </View>
    );
  }

  // Return Started Modal
  else if (recommendations["state"] === "STARTED") {
    lookupBook();
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalStarted isbn={recommendations["isbn"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Book Modal
  else if (recommendations["state"] === "GOT_BOOK") {
    lookupAuthor();
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotBook book={recommendations["book"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Author Modal
  else if (recommendations["state"] === "GOT_AUTHOR") {
    lookupSubjects();
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotAuthor book={recommendations["book"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Subjects Modal
  else if (recommendations["state"] === "GOT_SUBJECTS") {
    lookupAuthorWorks();
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotSubjects book={recommendations["book"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Author Works Modal
  else if (recommendations["state"] === "GOT_AUTHOR_WORKS") {
    lookupRecommendedBooks();
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotAuthorWorks book={recommendations["book"]} />
        </Modal>
      </View>
    );
  }

  // Return Got Recommended Books Modal
  else if (recommendations["state"] === "GOT_RECOMMENDED_BOOKS") {
    let lookupBook = recommendations["book"];
    lookupBook["description"] = recommendations["subjects"]["description"];

    let recBooks = recommendations["authorWorks"].concat(
      recommendations["recommendedWorks"]
    );

    // Code to remove duplicates found here:
    // https://stackoverflow.com/questions/32634736/javascript-object-array-removing-objects-with-duplicate-properties
    recBooks = recBooks.reduce(function (prev, current) {
      if (
        !prev.some(function (element) {
          return element.key === current.key;
        })
      )
        prev.push(current);
      return prev;
    }, []);

    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalGotRecommendedBooks
            recBooks={recBooks}
            lookupBook={lookupBook}
            setRecommendations={setRecommendations}
          />
        </Modal>
      </View>
    );
  }

  // Lookup Complete - reset state.
  else if (recommendations["state"] === "LOOKUP_COMPLETE") {
    if (Platform.OS === "android") {
      ToastAndroid.show("Saved Wishlist!", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("Saved Wishlist!");
    }
    setRecommendations({
      state: "NOT_STARTED",
      isbn: "",
      authorWorks: [],
      recommendedWorks: [],
    });
  }

  // Return Error Modal
  else if (recommendations["state"] === "ERROR") {
    return (
      <View style={controller.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setRecommendations({
              state: "NOT_STARTED",
              isbn: "",
              authorWorks: [],
              recommendedWorks: [],
            });
          }}
        >
          <ModalError />
        </Modal>
      </View>
    );
  }
};

export default SearchISBN;
