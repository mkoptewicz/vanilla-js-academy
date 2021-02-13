const url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
const quoteElement = document.querySelector("#quote");
const buttonGenerateQuote = document.querySelector("#quote-generator");
// const generateQuote = () =>
//   fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         return Promise.reject(response);
//       }
//     })
//     .then(data => (quoteElement.textContent = data))
//     .catch(err => console.warn(err));

async function generateQuote() {
  const response = await fetch(url);
  if (!response.ok) {
    const errMessage = "Could not get you that awsome Ron's quote :(";
    quoteElement.textContent = errMessage;
  }
  const quote = await response.json();
  quoteElement.textContent = quote;
}

document.addEventListener("click", function (e) {
  if (e.target.matches("#quote-generator")) generateQuote();
});
generateQuote();
