const key = "QtmzwxVxdbAe7Ml8ol1NrPDK0jLCLHVV";
const url = `//api.nytimes.com/svc/topstories/v2/home.json?api-key=${key}`;
const storiesContainer = document.querySelector("#app");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const revealArticles = () => {
  document.querySelectorAll(".article").forEach((article, i) => {
    article.style.transitionDelay = `${i * 0.2}s`;
    article.classList.remove("article--hidden");
  });
};
function displayStories(stories, callback) {
  storiesContainer.innerHTML = stories
    .map(
      ({ abstract, byline, published_date, title, short_url, multimedia }) => {
        const html = `<div class="article article--hidden">
     <h2 class="article__title"><a target="_blank" href=${short_url}>${title}</a></h2>
     <div class="article__wrapper">
     <p class="article__date">Published: ${new Intl.DateTimeFormat(
       navigator.language,
       options
     ).format(new Date(published_date))}</p>
     <p class="article__authors">${
       byline ? byline : "Authors not mentioned"
     }</p>
     <a target="_blank" href=${short_url}><img loading="lazy" src=${
          multimedia[3].url
        }></a>
     <p class="article__description">${abstract}</p>
     </div>
     <a class="btn_more" target="_blank" href=${short_url}>Read More</a>
     </div>`;
        return html;
      }
    )
    .join("");
  setTimeout(callback, 0);
}

async function getStories() {
  try {
    const response = await fetch(url);
    const stories = await response.json();
    displayStories(stories.results, revealArticles);
  } catch (err) {
    console.log(err.message);
    storiesContainer.innerHTML = `<p class="error">We can't deliver you latest top stories right now. Please try again later.</p>`;
  }
}

getStories();
