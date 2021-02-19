const key = "QtmzwxVxdbAe7Ml8ol1NrPDK0jLCLHVV";
const storiesContainer = document.querySelector("#app");
const sectionTitle = document.querySelector("#section__title");
const btnsSort = document.querySelectorAll(".btn__sort");
const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

function displayStories(stories) {
  storiesContainer.innerHTML = stories
    .slice(0, 5)
    .map(
      ({ abstract, byline, published_date, title, short_url, multimedia }) => {
        const html = `
     <div class="article">
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
}
function displayCurrentSection(category) {
  btnsSort.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`#${category}`).classList.add("active");
}

async function getStories(category) {
  try {
    const response = await fetch(
      `//api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${key}`
    );
    const stories = await response.json();
    displayStories(stories.results);
    displayCurrentSection(category);
  } catch (err) {
    console.log(err.message);
    storiesContainer.innerHTML = `<p class="error">We can't deliver you latest top stories right now. Please try again later.</p>`;
  }
}

document.addEventListener("click", e => {
  if (e.target.matches(".btn__sort")) getStories(e.target.getAttribute("id"));
});

getStories("arts");
