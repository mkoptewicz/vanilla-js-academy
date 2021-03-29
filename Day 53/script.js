"use strict";
const url = "https://vanillajsacademy.com/api/pirates.json";
const createStorageObj = function () {
  const articles = [...document.querySelectorAll("article")];
  const data = articles.reduce((acc, cur, i) => {
    acc[i] = {
      title: cur.querySelector("h2").textContent,
      article: cur.querySelector("p").textContent,
    };
    return acc;
  }, []);
  return { data, timestamp: new Date().getTime() };
};
const saveToLocalStorage = data =>
  localStorage.setItem("data", JSON.stringify(data));
const renderArticles = function (data) {
  console.log(data);
  const html = data
    .map(({ title, article }) => {
      return `<article><h2>${title}</h2>
   <p>${article}</p></article>`;
    })
    .join("");
  document.querySelector("#app").innerHTML = DOMPurify.sanitize(html);
  saveToLocalStorage(createStorageObj());
};

const isDataValid = function (saved, goodFor) {
  if (!saved?.data || !saved.timestamp) return false;
  const difference = new Date().getTime() - saved.timestamp;
  return difference < goodFor;
};
const saved = JSON.parse(localStorage.getItem("data"));
const init = function () {
  if (isDataValid(saved, 1000)) {
    renderArticles(saved.data);
    console.log("local");
    return;
  }
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(data => {
      console.log("API");
      renderArticles(data.articles);
    })
    .catch(err => console.error(err));
};
init();
