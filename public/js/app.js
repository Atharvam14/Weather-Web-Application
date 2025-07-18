const address = document.querySelector("input");
const form = document.querySelector("form");
let messageOne = document.querySelector("#messageOne");
let messageTwo = document.querySelector("#messageTwo");
let messageThree = document.querySelector("#messageThree");
let messageFour = document.querySelector("#messageFour");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = address.value;
  messageOne.textContent = "Loading ....";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) return (messageTwo.textContent = data.error);
      else {
        messageOne.textContent = "location :   " + data.location;
        messageTwo.textContent = "weather :   " + data.weather;
        messageThree.textContent = "temperature :   " + data.currentTemperature;
        messageFour.textContent = "humidity :   " + data.humidity;
        console.log(messageOne);
        console.log(messageTwo);
        console.log(messageThree);
        console.log(messageFour);
      }
    });
  });
});
