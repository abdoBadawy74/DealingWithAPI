// [1] getting the elements
const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");
const translateBTN = document.querySelector("button");
const icons = document.querySelectorAll(".row i");

// [2] countries object that contains the language code and the language name
selectTag.forEach((select, id) => {
  for (const country_code in countries) {
    let selected;
    // check if the language is the default language
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "ar-SA") {
      selected = "selected";
    }
    // create the option tag with the language name and the language code
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    // add the option to the select tag
    select.innerHTML += option;
  }
});

// [3] event listener for the exchange button to exchange the text and the language
exchange.addEventListener("click", () => {
  let tempText = fromText.value;
  let tempLang = selectTag[0].value;

  fromText.value = toText.value;
  toText.value = tempText;

  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

// [4] event listener for the translate button to translate the text
translateBTN.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

  // check if the text is empty or not
  if (text == "") {
    alert("Please enter the text to translate");
    return;
  }
  //   set the placeholder to translating
  toText.setAttribute("placeholder", "Translating...");

  // gettting the API URL with the text and the language
  let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      // set the translated text to the toText input
      // set the placeholder to translated text
      toText.value = data.responseData.translatedText;
      toText.setAttribute("placeholder", "Translated Text");
    });
});

// [5] event listener for the icons to copy the text or to speak the text
icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    // check if the icon is the copy icon
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      let selectedLang;
      if (target.id == "from") {
        selectedLang = selectTag[0].value;
        utterance = new SpeechSynthesisUtterance(fromText.value);
      } else {
        selectedLang = selectTag[1].value;
        utterance = new SpeechSynthesisUtterance(toText.value);
      }

      utterance.lang = selectedLang;

      // Check if the selected language is supported
      let voices = speechSynthesis.getVoices();
      let isLangSupported = voices.some((voice) => voice.lang === selectedLang);

      if (isLangSupported) {
        speechSynthesis.speak(utterance);
      } else {
        alert(`The selected language is not supported `);
      }
    }
  });
});

// Make sure to load voices if they are not loaded yet
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
}
