// [1] getting the elements
const Wrapper = document.querySelector(".wrapper");
const QRInput = document.querySelector(".form input");
const generateBtn = document.querySelector(".form button");
const QRImg = document.querySelector(".qr-code img");

// [2] adding event listener to the button to generate the QR Code
generateBtn.addEventListener("click", () => {
  // getting the value of the input
  let qrValue = QRInput.value;
  // if the input is empty, we don't want to generate the QR Code
  // so we will show an alert and return from the function
  if (!qrValue) {
    // creating a new div element to show the alert
    let div = document.createElement("div");
    div.append(document.createElement("span"));
    document.body.appendChild(div);
    div.style.cssText =
     `position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      background-color: #f44336;
      color: white;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: top 0.5s ease;`;
    div.querySelector("span").innerText =
      "Please enter a value to generate QR Code";
    // remove the "copied" element after 2 seconds
    setTimeout(() => {
      div.remove();
    }, 2000);

    return;
  }
  // changing the button text to "Generating QR Code..."
  generateBtn.innerHTML = "Generating QR Code...";
  // getting the value of the input and generating the QR Code
  // using the API from qrserver.com
  QRImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

  // when the image is loaded, we want to show the QR Code and remove the form
  QRImg.addEventListener("load", () => {
    Wrapper.classList.add("active");
    // changing the button text back to "Generate QR Code"
    generateBtn.innerHTML = "Generate QR Code";
  });
});

// [3] adding event listener to the input to generate the QR Code when the user presses Enter
QRInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    generateBtn.click();
  }
  // if the input is empty, we don't want to show the QR Code
  if (!QRInput.value) {
    Wrapper.classList.remove("active");
  }
});
