import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  console.log(search);
  const params = new URLSearchParams(search);
  console.log(params.get('city'));
  let ci = params.get('city');
  return ci;

  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it






}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  console.log(config);
  const advdata = await fetch(config.backendEndpoint+ "/adventures?city=" + city)
  .then((res)=>res.json())
  .catch((err)=>null)
  console.log(advdata);

  return advdata;

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i=0; i<adventures.length;i++){
  let advbaap = document.getElementById("data");
  let adva = document.createElement("a");
  adva.className = "activity-card col-lg-3 col-md-6 col-sm-12 mt-4 ";
  adva.id = adventures[i]["id"];
  console.log(adva.id);
  adva.style.border = "0";
  adva.href = "detail/?adventure=" + adventures[i]["id"];
  console.log(adva.href);
  
  
  
  

  let activitycard = document.createElement("div");
  activitycard.className = "activity-card  ";
  activitycard.style.position = "relative";
  activitycard.style.border = "0";
  activitycard.style.width = "100%";
  let advimg = document.createElement("img");
  advimg.src = adventures[i]["image"];
  advimg.className = "activity-card img ";
  advimg.style.objectFit = "cover";
  advimg.style.borderRadius = "0.5rem";
  let advcontent = document.createElement("div");
  let ban = document.createElement("div");
  ban.className = "category-banner";
  ban.innerHTML = adventures[i]["category"];
  let firstl = document.createElement("div");
  firstl.className = "d-flex justify-content-between px-3 mt-2";
  let secondl = document.createElement("div");
  secondl.className = "d-flex justify-content-between px-3 mb-2";
  // advcontent.style.zIndex = "2";
  advcontent.style.backgroundColor = "white";
  advcontent.style.width = "100%";
  advcontent.style.borderColor = "black";
  
  let advname = document.createElement("h4");
  advname.innerHTML = adventures[i]["name"]; 
  let advcharge = document.createElement("p");
  advcharge.innerHTML = "Rs." + adventures[i]["costPerHead"] ;
  let advduration = document.createElement("h4");
  advduration.innerHTML = 'Duration';
  let advtime = document.createElement("p");
  advtime.innerHTML = adventures[i]["duration"] + " " + "Hours";
 
  
  firstl.appendChild(advname);
  secondl.appendChild(advduration);
  secondl.appendChild(advtime);
  
  firstl.appendChild(advcharge);

  adva.appendChild(ban);
  advcontent.style.position = "absolute";
  activitycard.appendChild(advimg);
  activitycard.appendChild(advcontent);
  advbaap.appendChild(adva);
  adva.append(activitycard);
  advcontent.append(firstl);
  advcontent.append(secondl);
  
}}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let glist =[];

     for(let i = 0;i<list.length;i++){
       
       if( list[i]["duration"] >= low && list[i]["duration"] <= high){
         glist.push(list[i]);
         console.log(glist);
       }
     }
     console.log(glist);
    return glist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let flist =[];
  console.log(categoryList);
     for(let i = 0;i<list.length;i++){
       for(let j = 0;j<categoryList.length;j++){
       if(list[i]["category"]=== categoryList[j] ){
         flist.push(list[i]);
         console.log(flist);
       }
     }}
     console.log(flist);
    return flist;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
     let filarr = filters["duration"].split("-");
     console.log(filarr);
   
    
    // let ele = document.getElementById("duration-select");
    // ele.addEventListener("click",(e)=>{
    //    console.log(e.target.value);
    // })
    if(filarr.length != 1 && filters["category"].length!=0){
      console.log("1");
      let onelist = filterByDuration(list,filarr[0],filarr[1]);
      let seclist = filterByCategory(list,filters["category"]);
      
      const filteredArray = onelist.filter(value => seclist.includes(value));
      console.log(filteredArray);
      return filteredArray;
    }
    else if(filarr.length != 1 && filters["category"].length == 0){
      console.log("2");
      console.log(filarr.length);
     let ans = filterByDuration(list,filarr[0],filarr[1]);
     console.log(ans)
     return ans;
    }
    else if(filarr.length == 1 && filters["category"].length !=0){
      console.log("3");
    console.log(list);
    console.log(filters);
      let dlist  = filterByCategory(list,filters["category"]);
      console.log(dlist);
      return dlist;
    }
else{
  console.log("4");
  return list;
}
      

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
    let string = JSON.stringify(filters);
    localStorage.setItem("filters", string);
    console.log(string);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let object = JSON.parse(localStorage.getItem("filters"));
console.log(object);


  // Place holder for functionality to work in the Stubs
  return object;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

console.log("started");
console.log(filters);
let cfilter = filters["category"];
let durationdiv = document.getElementById("duration-select");
durationdiv.value = filters["duration"];

let getdiv = document.getElementById("category-list");
for(let i = 0;i<cfilter.length;i++){
let pilldiv = document.createElement("div");
pilldiv.className = "category-filter";
pilldiv.innerHTML = cfilter[i];
console.log(pilldiv);
getdiv.append(pilldiv); 
}

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
