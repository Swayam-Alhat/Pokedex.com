// buttons for event delegation
const sortButton = document.getElementById("sort-wrapper-button");
const sortOptions = document.getElementById("sort-option-wrapper");
const filterButton = document.getElementById("filter-wrapper-button");
const filterOptions = document.getElementById("filter-options-wrapper");

// using event delegation
document.addEventListener("click", (event) => {
  if (
    event.target.matches("#filter-wrapper-button") ||
    event.target.matches("#filter-icon") ||
    event.target.matches("#filter-toggle-button")
  ) {
    filterOptions.classList.toggle("hidden");
    sortOptions.classList.add("hidden");
    return; // to avoid next execution.
  }
  if (
    event.target.matches("#sort-wrapper-button") ||
    event.target.matches("#sort-icon") ||
    event.target.matches("#sort-visible-btn")
  ) {
    sortOptions.classList.toggle("hidden");
    filterOptions.classList.add("hidden");
    return;
  }
  // in case clicks somewhere all menu bar will hidden
  sortOptions.classList.add("hidden");
  filterOptions.classList.add("hidden");
});

// the whole main code

const mainContainer = document.getElementById("main-container");
// const firstColumn = document.getElementById("first-column-div");
// const secondColumn = document.getElementById("second-column-div");
// const thirdColumn = document.getElementById("third-column-div");
// const fourthColumn = document.getElementById("fourth-column-div");
// const fifthColumn = document.getElementById("fifth-column-div");
let columnNumber;
if (window.innerWidth < 640) {
  mainContainer.classList.add("w-full", "grid-cols-2", "gap-4");
  columnNumber = 2;
} else if (window.innerWidth >= 640 && window.innerWidth < 768) {
  mainContainer.classList.add("w-full", "grid-cols-3", "gap-4");
  columnNumber = 3;
} else if (window.innerWidth >= 768 && window.innerWidth < 1284) {
  mainContainer.classList.add("w-full", "grid-cols-4", "gap-4");
  columnNumber = 4;
} else if (window.innerWidth >= 1284) {
  mainContainer.classList.add("w-full", "grid-cols-5", "gap-4");
  columnNumber = 5;
}

// create column div and insert in container
for (let i = 0; i < columnNumber; i++) {
  let columnDiv = document.createElement("div");
  columnDiv.classList.add("flex", "flex-col");
  mainContainer.appendChild(columnDiv);
}

// Select all column divs (e.g., columns)
const columns = mainContainer.children;

// column counts
let columnIndex = 0;
//pokemon ID
let pokemonId = 1;

// function for inserting image in columns cyclically
function insertImage(objArray) {
  objArray.forEach((element) => {
    if (columnIndex == columns.length) {
      columnIndex = 0;
    }
    const image = document.createElement("img");
    image.src = element.imageURL;
    image.alt = element.name;
    image.setAttribute("loading", "lazy");
    image.classList.add("w-full", "px-4", "py-4", "text-white");
    //creates para for id
    let pokemonIdPara = document.createElement("p");
    pokemonIdPara.innerText = pokemonId;
    pokemonIdPara.classList.add(
      "text-white",
      "sm:text-2xl",
      "w-full",
      "flex",
      "justify-center",
      "item-center",
      "font-bungee",
      "text-[18px]"
    );
    // creates para for pokemon name
    let namePara = document.createElement("p");
    namePara.innerText = element.name.toUpperCase();
    namePara.classList.add(
      "w-full",
      "flex",
      "justify-center",
      "item-center",
      "sm:text-[20px]",
      "xs:text-[19px]",
      "text-white",
      "pb-2",
      "font-bungee",
      "text-[16px]"
    );
    // the div card
    const cardDiv = document.createElement("div");
    cardDiv.id = "card";
    cardDiv.classList.add(
      "w-full",
      "bg-[#010101]",
      "border-white",
      "border-2",
      "rounded-xl",
      "mt-4",
      "cursor-pointer"
    );
    // appending in carddiv
    cardDiv.appendChild(image);
    cardDiv.appendChild(pokemonIdPara);
    cardDiv.appendChild(namePara);
    //append in each column
    columns[columnIndex].appendChild(cardDiv);
    // increase column index and pokemonId
    columnIndex++;
    pokemonId++;
  });
}

// array for main object

let svgCount = 1;

// assigning svgs to each obj
function createMainObject(fiftyObjects) {
  let objArray = [];

  for (const obj of fiftyObjects) {
    obj.imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/3523482c5365843799c8acf5fcad7cccd57fea9d/sprites/pokemon/other/dream-world/${svgCount}.svg`;
    svgCount++;
    objArray.push(obj);
  }

  // calling function for inserting this in columns
  insertImage(objArray); // before it was objArray
}

//

async function fetchingNext(nextURL) {
  try {
    let response = await fetch(nextURL);
    let data = await response.json();

    // calling the splitData function
    splitData(data);
  } catch (error) {
    alert(`Error occurred: ${error.message}`);
  }
}

// next Function

function nextURLButton(nextURL) {
  const nextButton = document.getElementById("load-button");
  const newButton = nextButton.cloneNode(true); // Create a fresh copy of the button
  nextButton.replaceWith(newButton); // Replace the old button with the new one
  newButton.addEventListener("click", () => {
    fetchingNext(nextURL);
  });
}

// splitData function
function splitData(data) {
  // get the next URL
  let nextURL = data.next;
  let fiftyObjects = data.results;
  // calling next button function
  nextURLButton(nextURL);
  // calling the function for assigning the svgs to each obj
  createMainObject(fiftyObjects);
}

// fetching 50 pokemon
async function getData() {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=50");
    let data = await response.json();
    // calling the splitData function
    splitData(data);
  } catch (error) {
    alert(`Error occurred: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getData();
});

//add event listener to cards

// mainContainer.addEventListener("click", (event) => {
//   if (event.target.parentElement.matches("#card")) {
//     const clickedCard = event.target.parentElement;
//     const clickedCardId = clickedCard.children[1].innerText;
//     window.location.href = `details.html?id=${clickedCardId}`;
//     // console.log(clickedCard);
//     // console.log(clickedCardId);
//   } else {
//     return;
//   }
// });

/////////// to reload
