/**
 * TODO
 * @param {*} isbn
 */
export async function GetBookByISBN(isbn) {
  try {
    let response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    let data = await response.json();
    return data;
  } catch (e) {
    console.warn(e);
    return {};
  }
}

/**
 * TODO
 * @param {*} authorId
 * @returns
 */
export async function GetAuthorsWorksByKey(authorKey) {
  try {
    let response = await fetch(
      `https://openlibrary.org${authorKey}/works.json`
    );
    let data = await response.json();
    return data;
  } catch (e) {
    console.warn(e);
    return {};
  }
}

export async function GetBooksBySubject(workKey) {
  const GetSubjectsByWork = async (workKey) => {
    try {
      let response = await fetch(`https://openlibrary.org${workKey}.json`);
      let data = await response.json();
      console.log("------------------------------------");
      console.log(data);
      return data;
    } catch (e) {
      console.warn(e);
      return {};
    }
  };

  // Get book subjects from the work API.
  let subjects = await GetSubjectsByWork(workKey);
}
