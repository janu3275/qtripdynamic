import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  console.log(search);
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  console.log(params.get('adventure'));
  let id = params.get('adventure');

  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  console.log(adventureId);
  console.log(config);
  try{
  const detailsdata = await fetch(config.backendEndpoint+ "/adventures/detail/?adventure=" + adventureId)
  let ddata = await detailsdata.json();
  console.log(ddata);
  return ddata;
  }
  catch(err){
    console.log(err);
    return null;
  }
  // console.log(ddata);

  

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let heading = document.getElementById("adventure-name");
  heading.innerHTML = adventure["name"];
  let subtitle = document.getElementById("adventure-subtitle");
  subtitle.innerHTML = adventure["subtitle"];
  let imgsection  = document.getElementById("photo-gallery");
  let imgdiv = document.createElement("div");
  imgdiv.id = "crouselgallery";
  
  
  for(let i = 0;i<adventure["images"].length;i++){
  let img = document.createElement("img");
  img.className = "activity-card-image";
  img.src = adventure["images"][i];
  img.style.objectFit = "cover";
  // console.log(i);
  imgdiv.appendChild(img);
}
imgsection.append(imgdiv);

let content = document.getElementById("adventure-content");
content.innerHTML = adventure["content"];


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // let gallerydiv = document.getElementById("crouselgallery");
  let pgallerydiv = document.getElementById("photo-gallery");  
  let innnerdiv = document.createElement("div");
  innnerdiv.className = "carousel-inner";
  for(let i=0;i<images.length;i++){
  let galimg = document.createElement("img");
  let galdiv = document.createElement("div");
  if(i===0){
   galdiv.className = "carousel-item active"
}else{
  galdiv.className = `carousel-item `;
}
  galimg.className = "d-block w-100 activity-card-image";
  galimg.src = images[i];
  galimg.alt = "none";
  galdiv.appendChild(galimg);
  innnerdiv.append(galdiv);

}
console.log(innnerdiv);
let sacrificediv = document.createElement("div");
sacrificediv.append(innnerdiv);
  
  
  //  let gallerydiv = document.createElement("div");
  pgallerydiv.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>` + sacrificediv.innerHTML +
  
  


  `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

// let activeelement = document.getElementById("0");
// activeelement.className = "active";

 
// pgallerydiv.append(gallerydiv);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  
console.log(adventure);
if(adventure["available"]){
  document.getElementById("reservation-panel-sold-out").style.display = "none";
  document.getElementById("reservation-panel-available").style.display = "block";
  document.getElementById("reservation-person-cost").innerHTML = adventure["costPerHead"];
}else{
  document.getElementById("reservation-panel-available").style.display = "none";
  document.getElementById("reservation-panel-sold-out").style.display = "block";
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = adventure["costPerHead"]*persons;
  document.getElementById("reservation-cost").innerHTML = cost;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById("myForm").addEventListener("submit",(e)=>{
    // const data = { username: 'example' };
    e.preventDefault();
    console.log(document.getElementById("myForm").elements["name"].value);
    let data = {
      name: document.getElementById("myForm").elements["name"].value,
      date: document.getElementById("myForm").elements["date"].value,
      person: document.getElementById("myForm").elements["person"].value,
      adventure: adventure["id"]
    };

fetch((config.backendEndpoint + '/reservations/new'), {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success!', data);
  alert("Success!");
  window.location.reload();
  
})
.catch((error) => {
  console.error('Failed!', error);
});

  });
  
    

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure["reserved"]){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
      document.getElementById("reserved-banner").style.display = "none";
    }
    
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
// console.log(innnerdiv.innerHTML)
  
  //  <div class="carousel-inner">
  
    // <div class="carousel-item active">
    //   <img src=${images[0]} class="d-block w-100 activity-card-image" objectFit="cover" alt="...">
    // </div>
    // <div class="carousel-item">
    //   <img src=${images[1]} class="d-block w-100 activity-card-image" objectFit="cover" alt="...">
    // </div>
    // <div class="carousel-item">
    //   <img src=${images[2]} class="d-block w-100 activity-card-image" objectFit="cover"  alt="...">
    // </div> 
     
  // </div>
