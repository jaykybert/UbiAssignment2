/**
 * TODO
 * @param {*} isbn
 */
export async function GetBookByISBN(isbn) {
  try {
    let response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    let data = await response.json();

    console.log(data);

    bookData = {
      title: data["title"],
      firstSentence: data.hasOwnProperty("first_sentence")
        ? data["first_sentence"]["value"]
        : "",
      publisher: data["publishers"][0],
      pages: data["number_of_pages"],
      published: data["publish_date"],
      authorKey: data["authors"][0]["key"],
      workKey: data["works"][0]["key"],
      cover: data.hasOwnProperty("covers")
        ? `https://covers.openlibrary.org/b/id/${data["covers"][0]}-M.jpg`
        : "",
    };
    return bookData;
  } catch (e) {
    //console.warn(e);
    return { error: "Invalid request" };
  }
}

/**
 * TODO
 * @param {*} authorKey
 * @returns
 */
export async function GetAuthorByKey(authorKey) {
  try {
    let response = await fetch(`https://openlibrary.org${authorKey}.json`);
    let data = await response.json();

    return data;
  } catch (e) {
    console.warn(e);
    return { error: "Invalid request" };
  }
}

/**
 * TODO
 * @param {*} authorId
 * @returns
 */
export async function GetAuthorWorksByKey(authorKey) {
  try {
    let response = await fetch(
      `https://openlibrary.org${authorKey}/works.json?limit=20`
    );
    let data = await response.json();

    authorWorks = [];

    for (let i = 0; i < data["entries"].length; i++) {
      // Title
      work = {
        title: data["entries"][i]["title"],
        key: data["entries"][i]["key"],
        recommendationReason: "author",
      };

      // Cover
      let coverUrl = "";
      if (data["entries"][i].hasOwnProperty("covers")) {
        coverUrl = `https://covers.openlibrary.org/b/id/${data["entries"][i]["covers"][0]}-M.jpg`;
      }

      work["cover"] = coverUrl;

      // Publish Date
      if (data["entries"][i].hasOwnProperty("first_publish_date")) {
        work["published"] = data["entries"][i]["first_publish_date"];
      } else {
        work["published"] = "Publication date unavailable.";
      }

      // Description
      if (data["entries"][i].hasOwnProperty("description")) {
        // Returned as a string.
        if (typeof data["entries"][i]["description"] === "string") {
          work["description"] = data["entries"][i]["description"];
        }
        // Returned as an object.
        else {
          work["description"] = data["entries"][i]["description"]["value"];
        }
      }
      // No Description
      else {
        work["description"] = "No description provided.";
      }

      authorWorks.push(work);

      if (i === 2) {
        break;
      }
    }
    return authorWorks;
  } catch (e) {
    console.warn(e);
    return {};
  }
}

/**
 * TODO
 * @param {*} workKey
 * @returns
 */
export async function GetSubjectsByKey(workKey) {
  try {
    let response = await fetch(`https://openlibrary.org${workKey}.json`);
    let data = await response.json();

    subjectData = {
      description: data["description"],
      subjects: [],
    };

    // Get first two subjects.
    for (let i = 0; i < data["subjects"].length; i++) {
      subjectData["subjects"].push(data["subjects"][i].toLowerCase());
      if (i === 2) {
        break;
      }
    }
    return subjectData;
  } catch (e) {
    console.warn(e);
    return {};
  }
}

/**
 * TODO
 * @param {*} subjects
 * @returns
 */
export async function GetBooksBySubject(subjects) {
  // Book Subject Requests

  works = [];

  for (let i = 0; i < subjects["subjects"].length; i++) {
    let response = await fetch(
      `https://openlibrary.org/subjects/${subjects["subjects"][i]}.json?limit=20`
    );

    let data = await response.json();

    // Iterate through suggested works.
    for (let j = 0; j < data["works"].length; j++) {
      let work = {
        title: data["works"][j]["title"],
        author: data["works"][j]["authors"][0]["name"],
        subjects: data["works"][j]["subject"].slice(0, 5),
        lookupSubject: subjects["subjects"][i],
        recommendationReason: "subject",
        key: data["works"][j]["key"],
      };
      let coverUrl = `https://covers.openlibrary.org/b/id/${data["works"][j]["cover_id"]}-M.jpg`;
      work["cover"] = coverUrl;

      works.push(work);

      if (j === 3) {
        break;
      }
    }
  }
  return works;
}
