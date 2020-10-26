// Client-side Script
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;



  fetch(`http://localhost:3000/weather?address=${location}`).then((result) => {
    result.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
        message2.textContent = null;
      } else {
        message1.textContent = data.address;
        message2.textContent = data.forecast;
      }
    }).catch(failedData => {
      message1.textContent = "Request Failed";
    })
  });

});


// async function getWeatherAW() {
//   const result = await fetch(`http://localhost:3000/weather?address=${location}`);
//   const data = await result.json();
//
//   if (data.error) {
//     message1.textContent = data.error;
//     message2.textContent = null;
//   } else {
//     message1.textContent = data.address;
//     message2.textContent = data.forecast;
//   }
// }
//
// getWeatherAW();

