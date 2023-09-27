import https from "https";
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
  console.log("Get new Query");
  https
    .get(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=random&formatversion=2&grnnamespace=0&grnlimit=${pageQueryAmt}&origin=*`,
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        // Ending the response
        res.on("end", () => {
          console.log("end!");
          wikiQuery = JSON.parse(data).query;
          queryReturnedCallback();
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: ", err);
    });
}

function TitleSanitizer(title) {
  //Cut out everything after a comma or a parenthesis to keep it more vague.
  //This allows for less disambiguation, and the removal of location specifiers.
  return title.split(/[,()]/)[0];
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
    } while (article && article.length < MIN_WORD_COUNT);
    if (article) {
      const sanitizedTitle = TitleSanitizer(article.title);
      arrayPopulator({ title: sanitizedTitle, id: article.pageid });
      pagesIndex++;
    } else i--;
  }
  completionCallback();
}
