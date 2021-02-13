const url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
const quoteElement = document.querySelector("#quote");
const buttonGenerateQuote = document.querySelector("#quote-generator");
const generateQuote = () =>
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(data => (quoteElement.textContent = data))
    .catch(err => console.warn(err));
document.addEventListener("click", function (e) {
  if (e.target.matches("#quote-generator")) generateQuote();
});
