import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log('From init()');
  console.log(config);


  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
   let data = await fetch("https://qtrip-dynamic-jasmeet.herokuapp.com/cities")
   .then((res)=>res.json())
   .then((x)=>x)
   .catch((err)=> null);
   
   console.log(data);
   return data;

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // let containerimage = document.getElementById('c');
  // containerimage.className = "row";

  let tag = document.createElement("a");
  tag.href = "pages/adventures/?city="+id ;
  tag.id = id;
   

  
  let flexdiv = document.createElement('div');
  flexdiv.className = "d-flex justify-content-center col-sm-12 col-md-6 col-lg-3 mt-3";
   flexdiv.id = "img";
   flexdiv.style.position = "relative";
  // let dis = document.getElementById('data');
  let heading = document.createElement('h3');
  heading.style.opacity = "80%";
  let para = document.createElement('p');
  para.style.opacity = "60%";
  heading.innerHTML = city;
  para.innerHTML = description;
  let dis = document.createElement("div");
  dis.style.position = "absolute";
  dis.style.textTransform = "uppercase";
  dis.style.textAlign = "center";
  dis.style.bottom = "20px";

  let content = document.getElementById('data');
  
   let cimage = document.createElement("img");
    cimage.src = image;
    cimage.alt = "none";
    cimage.style.height = "100%";
    cimage.style.width = "100%";
    cimage.style.borderRadius = "0.35rem";

   
    console.log(cimage);
  //  containerimage.append(flexdiv);
  tag.appendChild(cimage);
  flexdiv.appendChild(tag);
  
  content.appendChild(flexdiv);
  flexdiv.appendChild(dis);
  
  dis.append(heading);
  dis.append(para);
   
   
  //  dis.append(para);
  //  dis.append(heading);

}

export { init, fetchCities, addCityToDOM };
