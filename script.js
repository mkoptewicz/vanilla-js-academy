const app = document.querySelector("#app");
const storageID = "pirates";
const validTime = 1000 * 5;

const getEndpoint = function () {
  const endpoint = "https://vanillajsacademy.com/api/";
  const random = Math.random();
  if (random < 0.5) return endpoint + "pirates.json";
  return endpoint + "fail.json";
};

const isDataValid = (saved, validTime) => {
  if (!saved?.data || !saved?.timestamp) return false;
  const difference = new Date().getTime() - saved.timestamp;
  return difference < validTime;
};

const displayNoArticlesMessage = () =>
  (app.innerHTML = `<p>Sorry, we couldn't get you your pirate news right now. Please try again.</p>`);

const renderArticles = data => {
  if (!data?.articles) {
    displayNoArticlesMessage();
    return;
  }
  const html = data.articles
    .map(({ title, article }) => {
      return `<article><h2>${title}</h2>
 <p>${article}</p></article>`;
    })
    .join("");
  app.innerHTML = DOMPurify.sanitize(html);
};

const saveData = data => {
  const cache = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(storageID, JSON.stringify(cache));
};

const getData = (okAPIResponse = true) => {
  let saved = localStorage.getItem(storageID);
  if (!saved) return;
  saved = JSON.parse(saved);

  if (isDataValid(saved, validTime) || !okAPIResponse) {
    console.log(
      `Loaded from cache ${
        isDataValid && okAPIResponse ? "(fresh data)" : "(might be expired)"
      }`
    );
    return saved.data;
  }
};

const fetchArticles = async endpoint => {
  const saved = getData();
  if (saved) {
    renderArticles(saved);
    return;
  }
  try {
    const dataResponse = await fetch(endpoint);
    const data = await dataResponse.json();
    renderArticles(data);
    saveData(data);
    console.log("Loaded from API");
  } catch (err) {
    console.error(err.message);
    renderArticles(getData(false));
  }
};
fetchArticles(getEndpoint());
