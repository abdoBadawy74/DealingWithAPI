const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".popup i");
const popupTitle = document.querySelector(".popup h2");
const popupDesc = document.querySelector(".popup p");

let isOnline = true;
let intervalId;
let timer = 10;

const checkConnection = async () => {
  try {
    // Fetching data from a fake API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // If the fetch is successful, the connection is online
    // The status code 200-299 indicates a successful request
    isOnline = response.status >= 200 && response.status < 300;
    console.log(response);
  } catch (e) {
    // If the fetch fails, the connection is offline
    isOnline = false;
  }
  timer = 10;
  clearInterval(intervalId);

  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    wifiIcon.className = "uil uil-wifi";
    popupTitle.textContent = "You are back online";
    popupDesc.textContent = "Hurray! You are back online.";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  } else {
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.textContent = "You are offline";
    popupDesc.innerHTML =
      "your network is unavialable. we will attemp to reconnect you in <b>10</b> second";
    popup.className = "popup show ";
  }

  intervalId = setInterval(() => {
    // Decrease the timer by 1
    timer--;
    if (timer === 0) checkConnection(); // Check the connection again when the timer reaches 0
    popup.querySelector("p b").textContent = timer;
  }, 1000);
};

// only if the connection is online, check the connection every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
