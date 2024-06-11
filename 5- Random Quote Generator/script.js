// [1] Get the elements
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const quoteAuthor = document.querySelector(".author .name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

// [2] Fetch the API and display the quote
function randomQuote() {
  // change the button text to loading
  quoteBtn.innerText = "Loading Quote...";
  quoteBtn.classList.add("loading");
  // fetch the API and display the quote and author
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      quoteText.textContent = data.content;
      quoteAuthor.textContent = data.author;
      // change the button text back to new quote
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
    });
}

// [3] Event listeners for the buttons

// sound button
soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.textContent} by ${quoteAuthor.textContent}`
  );
  speechSynthesis.speak(utterance);
});

// twitter button
twitterBtn.addEventListener("click", () => {
    
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}`;

  window.open(twitterUrl, "_blank");
});

// copy button
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerHTML);
  alert("Quote copied to clipboard");
});

// [4] Event listener for the new quote button
quoteBtn.addEventListener("click", randomQuote);
