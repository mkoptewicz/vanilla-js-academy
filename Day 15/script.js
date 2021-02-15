const url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
const quoteElement = document.querySelector("#quote");
const buttonGenerateQuote = document.querySelector("#quote-generator");
const arrQuotes = [];

function checkQuote(quote) {
  if (arrQuotes.includes(quote)) {
    generateQuote();
    return;
  }
  if (arrQuotes.length >= 50) {
    arrQuotes.shift();
  }
  arrQuotes.push(quote);
  quoteElement.textContent = quote;
}
async function generateQuote() {
  const response = await fetch(url);
  if (!response.ok) {
    const errMessage = "Could not get you that awsome Ron's quote :(";
    quoteElement.textContent = errMessage;
  }
  const quote = await response.json();
  checkQuote(quote[0]);
}

document.addEventListener("click", generateQuote);
generateQuote();
