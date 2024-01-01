// ***** 1. FRUITS API *****
// https://www.fruityvice.com/api/fruit/fat?min=10&max=1000
// calories/fat/protein/carbohydrates/sugar
// const config2 = { header: { "Access-Control-Allow-Origin": "*" } };

// https://www.fruityvice.com/api/fruit/calories?min=2max=92

// ***** 1. Image API *****
// https://api.unsplash.com/search/photos/
// Accept-Version:v1
// client_id:WOZ2iILAWFD2Uryby15FTZU14RecQov4WzysJkkvK1g
// query:q
// https://api.unsplash.com/search/photos?client_id=WOZ2iILAWFD2Uryby15FTZU14RecQov4WzysJkkvK1g&query=apricot

// unsplash api
const auth = "client_id=WOZ2iILAWFD2Uryby15FTZU14RecQov4WzysJkkvK1g";
const q = "query=apricot";
const config = { header: { "Accept-Version": "v1" } };
// const pic = axios
//   .get(`https://api.unsplash.com/search/photos?${auth}&${q}`, config)
//   .then((response) => {
//     console.log(response);
//   });

// fruits api
const fruits = axios.get(
  `https://www.fruityvice.com/api/fruit/fat?min=10&max=1000`
);
const fruitBaseUrl = "https://www.fruityvice.com/api/fruit/";

const form = document.querySelector("#form");
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
  fruitArr.forEach((element) => {
    let card = createCard(element);
    appendChildHere("container", card);
  });
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

const createCard = (obj) => {
  console.log(obj.name);
  const cardName = createElementContent("span", obj.name);
  const { calories, fat, sugar, carbohydrates, protein } = obj.nutritions;
  const cardCal = createElementContent("p", `Calories : ${calories} Kcal`);
  const cardFat = createElementContent("p", `Fat :${fat} grams`);
  const cardSugar = createElementContent("p", `Sugar :${sugar} grams`);
  const cardCarb = createElementContent(
    "p",
    `Carbohydrates :${carbohydrates} grams`
  );
  const cardProt = createElementContent("p", `Protein :${protein} grams`);
  return [cardName, cardCal, cardFat, cardSugar, cardCarb, cardProt];
};
// return [cardName, cardCal, cardFat, cardSugar, cardCarb, cardProt]
// find a way to refactor

const createElementContent = (ele, inner) => {
  const newEle = document.createElement(ele);
  newEle.innerHTML = inner;
  return newEle;
};
