var wikiQuery = null;
var pagesIndex = 0;
var pageQueryAmt = 500;
var loading = false;

const MIN_WORD_COUNT = 10000;

async function GetNewQuery(queryReturnedCallback) {
  //Reset the query
  pagesIndex = 0;
  wikiQuery = null;
  //get new request
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=random&formatversion=2&grnnamespace=0&grnlimit=${pageQueryAmt}&origin=*`
  );
  request.onload = () => {
    if (!loading) return;
    if (request.status !== 200) {
      console.log("xhr ERROR, bad status");
    } else {
      wikiQuery = JSON.parse(request.response).query;
      queryReturnedCallback();
    }
  };
  request.onerror = (e) => {
    console.log(`xhr ERROR, ${e.type}`);
  };
  request.send(null);
}

export async function FindArticles(amt, arrayPopulator, completionCallback) {
  for (let i = 0; i < amt; i++) {
    if (!wikiQuery || pagesIndex >= pageQueryAmt) {
      //Wait for the new query to finish and continue with populating
      GetNewQuery(() =>
        FindArticles(amt - i, arrayPopulator, completionCallback)
      );
      return;
    }
    var article;
    do {
      article = wikiQuery.pages[pagesIndex++];
    } while (article.length < MIN_WORD_COUNT);
    arrayPopulator({ title: article.title, id: article.id });
    pagesIndex++;
  }
  completionCallback();
}
