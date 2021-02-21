let burger = document.querySelector(".burger");

let navigationBar = document.querySelector(".navigation-bar");

burger.addEventListener("click", ()=>{
navigationBar.classList.toggle('active')
});


const DONORS_URL = 'http://localhost:3000/donors';

function constructTableRow(donor) {
  return `<tr><td>${donor.name}</td><td>${donor.phoneNumber}</td><td>${donor.city}</td><td>${donor.bloodType}</td></tr>`
}

async function updateDonorsList() {
  let donors = await fetch(DONORS_URL);
  donors = await donors.json();

  // Build table.
  let html = '';
  for (const donor of donors) {
    html = html + constructTableRow(donor);
  }
  const tableElement = document.getElementById('donorList');
  tableElement.tBodies[0].innerHTML = html;
}

updateDonorsList();

async function saveDonor(donor) {
  // Default options are marked with *
  const response = await fetch(DONORS_URL, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(donor) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function addDonor(event) {
  event.preventDefault();
  const form = document.getElementById('addDonor');
  const nameElement = form.querySelector('input[name="name"]');
  const phoneNumberElement = form.querySelector('input[name="phoneNumber"]');
  const cityElement = form.querySelector('select[name="city"]');
  const bloodTypeElement = form.querySelector('select[name="bloodType"]');
  await saveDonor({name: nameElement.value, phoneNumber: phoneNumberElement.value, city: cityElement.value, bloodType: bloodTypeElement.value})
  // console.log(nameElement.value, phoneNumberElement.value, cityElement.value, bloodTypeElement.value)
  // alert('Form Submitted! Time stamp');
}

const form = document.getElementById('addDonor');
form.addEventListener('submit', addDonor);




