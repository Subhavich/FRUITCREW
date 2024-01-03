// ---------------------------References---------------------------//
// ***** 1. FRUITS API *****
// https://www.fruityvice.com/api/fruit/fat?min=10&max=1000
// calories/fat/protein/carbohydrates/sugar
// const config2 = { header: { "Access-Control-Allow-Origin": "*" } };

// ***** 2. Image API *****
// https://api.unsplash.com/search/photos/
// Accept-Version:v1
// client_id:WOZ2iILAWFD2Uryby15FTZU14RecQov4WzysJkkvK1g
// query:q
// https://api.unsplash.com/search/photos?client_id=WOZ2iILAWFD2Uryby15FTZU14RecQov4WzysJkkvK1g&query=apricot
const auth = "client_id=WOZ2iILAWFD2Uryby15FTZU14RecQov4WzysJkkvK1g";
// const q = "query=apricot";
const config = { header: { "Accept-Version": "v1" } };

// ---------------------------CODE STARTS HERE---------------------------//

const fruits = axios.get(
  `https://www.fruityvice.com/api/fruit/fat?min=10&max=1000`
);
const fruitBaseUrl = "https://www.fruityvice.com/api/fruit/";

const form = document.querySelector("#form");
const selects = document.querySelector("select");
const units = document.querySelectorAll(".unit");

selects.addEventListener("change", (e) => {
  console.log(e.target.value);
  if (e.target.value != "calories") {
    units.forEach((unit) => {
      unit.innerHTML = "grams";
    });
  } else {
    units.forEach((unit) => {
      unit.innerHTML = "kcal";
    });
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resetParent("container");
  console.log(event.target[0].value);
  const pathQ = event.target[0].value + "?";
  const minQ = "min=" + event.target[1].value;
  const maxQ = "max=" + event.target[2].value;
  const fruitPath = pathQ;
  const finalUrl = fruitBaseUrl + fruitPath + minQ + "&" + maxQ;
  const response = await axios.get(finalUrl);
  const fruitArr = response.data;
  console.log(fruitArr);
  for (i = 0; i < fruitArr.length; i++) {
    let card = createCardElement();
    let cardContent = createCard(fruitArr[i]);
    console.log(cardContent);
    appendChildSingle("container", card);
    let allCards = document.querySelectorAll(".card");
    // allCards[i].appendChild(cardContent);
    cardContent.forEach((info) => {
      allCards[i].appendChild(info);
    });
  }
});

const fakeObject = {
  name: "Persimmon",
  id: 52,
  family: "Ebenaceae",
  order: "Rosales",
  genus: "Diospyros",
  nutritions: {
    calories: 81,
    fat: 0,
    sugar: 18,
    carbohydrates: 18,
    protein: 0,
  },
};

const appendChildSingle = (parentClass, child) => {
  let parent = document.querySelector(`.${parentClass}`);
  parent.appendChild(child);
};
const appendChildHere = (parentClass, childArr) => {
  let parent = document.querySelector(`.${parentClass}`);
  childArr.forEach((child) => {
    parent.appendChild(child);
  });
};

const resetParent = (parentClass) => {
  let parent = document.querySelector(`.${parentClass}`);
  parent.innerHTML = "";
};

const createCardElement = () => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  return cardElement;
};

const createCard = (obj) => {
  const cardName = createElementContent("span", obj.name);
  const cardImg = document.createElement("img");
  createImgContent(cardImg, obj.name);
  //is a promise
  const { calories, fat, sugar, carbohydrates, protein } = obj.nutritions;
  const cardCal = createElementContent("p", `Cal ${calories} Kcal`);
  const cardFat = createElementContent("p", `Fat ${fat} g`);
  const cardSugar = createElementContent("p", `Sugar ${sugar} g`);
  const cardCarb = createElementContent("p", `Carb ${carbohydrates} g`);
  const cardProt = createElementContent("p", `Protein ${protein} g`);
  return [cardName, cardImg, cardCal, cardFat, cardSugar, cardCarb, cardProt];
};
// return [cardName, cardCal, cardFat, cardSugar, cardCarb, cardProt]
// find a way to refactor
const createImgContent = async (ele, q) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?${auth}&query=${q}`,
    config
  );
  const link = response.data.results[0].urls.small;
  ele.src = link;
};

// UNSPLASHCALL
// const pic = axios
//   .get(`https://api.unsplash.com/search/photos?${auth}&${q}`, config)
//   .then((response) => {
//     console.log(response);
//   });

const createElementContent = (ele, inner) => {
  const newEle = document.createElement(ele);
  newEle.innerHTML = inner;
  return newEle;
};
