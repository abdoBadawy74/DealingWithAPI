// [1] getting the required elements

const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const input = form.querySelector("input");
const infoText = form.querySelector("p");
const copyBtn = wrapper.querySelector(".copy");
const closeBtn = wrapper.querySelector(".close");

// [2] using the FormData API to send the file
function fetchRequest(formData, file) {
  infoText.innerText = "Scanning QR Code...";

  // sending post request to qr code server api with
  // the form data as body and getting the response
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // getting the data from the response
      data = data[0]["symbol"][0].data;
      // setting the textarea value with the data

      // If data is null then show error message
      if (!data) {
        infoText.innerText = "No QR Code found. Please try again.";
        infoText.style.color = "red";
        return;
      }

      wrapper.querySelector("textarea").innerHTML = data;
      // changing the info text to some other text and
      infoText.innerText = "Upload QR Code to Scan";
      // changing the image to the uploaded file
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    });
}

input.addEventListener("change", (e) => {
  // getting the file selected by the user
  let file = e.target.files[0];
  // creating a FormData object to send the file
  let formData = new FormData();
  // appending the file to the FormData object
  formData.append("file", file);

  // sending the file to the server
  fetchRequest(formData, file);
});

// [3] copying the text to clipboard
copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").innerText;
  // if the text area is empty then don't do anything
  navigator.clipboard.writeText(text).then(() => {
    // create a new element to show the copied text
    let copied = document.createElement("div");
    copied.append(document.createElement("span"));
    document.body.appendChild(copied);
    copied.className = "copied";
    copied.querySelector("span").innerText = "Text Copied!";
    // remove the "copied" element after 2 seconds
    setTimeout(() => {
      copied.remove();
    }, 2000);
  });
});

// [4] closing the wrapper
closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// [5] clicking the form to select a file
form.addEventListener("click", () => input.click());
