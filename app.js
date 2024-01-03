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
const config = { header: { "Accept-Version": "v1" } };

// ---------------------------CODE STARTS HERE---------------------------//

const fruits = axios.get(
  `https://www.fruityvice.com/api/fruit/fat?min=10&max=1000`
);
const fruitBaseUrl = "https://www.fruityvice.com/api/fruit/";

const form = document.querySelector("#form");
const selects = document.querySelector("select");
const units = document.querySelectorAll(".unit");
const main = document.querySelector("main");
const amountInput = document.querySelector("#multiplier");
const selected = document.querySelector(".selected");
let multiplier = amountInput.value;

amountInput.addEventListener("change", (num) => {
  console.log(num);
  multiplier = num.target.value;
});

selects.addEventListener("change", (e) => {
  units.forEach((unit) => {
    unit.classList.add("highlighted");
    unit.classList.add("pre-animation");
  });
  if (e.target.value != "calories") {
    units.forEach((unit) => {
      unit.innerHTML = "grams";
    });
  } else {
    units.forEach((unit) => {
      unit.innerHTML = "kcal";
    });
  }
  units.forEach((unit) => {
    setTimeout(function () {
      unit.classList.remove("pre-animation");

      setTimeout(() => {
        unit.classList.remove("highlighted");
      }, 100);
    }, 100);
  });

  selected.innerHTML = e.target.value;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resetParent("container");

  const pathQ = event.target[0].value + "?";
  const minQ = "min=" + event.target[1].value;
  const maxQ = "max=" + event.target[2].value;
  const fruitPath = pathQ;
  const finalUrl = fruitBaseUrl + fruitPath + minQ + "&" + maxQ;
  const response = await axios.get(finalUrl);
  const fruitArr = response.data;

  for (i = 0; i < fruitArr.length; i++) {
    let card = createCardElement();
    let cardContent = createCard(fruitArr[i]);

    appendChildSingle("container", card);
    let allCards = document.querySelectorAll(".card");
    // allCards[i].appendChild(cardContent);
    cardContent.forEach((info) => {
      allCards[i].appendChild(info);
    });
    main.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
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

  // Math.round((nums / 100) * 100) / 10;

  const cardCal = createElementContent(
    "p",
    `Cal ${Math.round(((calories * multiplier) / 100) * 100) / 100} Kcal`
  );
  const cardFat = createElementContent(
    "p",
    `Fat ${Math.round(((fat * multiplier) / 100) * 100) / 100} g`
  );
  const cardSugar = createElementContent(
    "p",
    `Sugar ${Math.round(((sugar * multiplier) / 100) * 100) / 100} g`
  );
  const cardCarb = createElementContent(
    "p",
    `Carb ${Math.round(((carbohydrates * multiplier) / 100) * 100) / 100} g`
  );
  const cardProt = createElementContent(
    "p",
    `Protein ${Math.round(((protein * multiplier) / 100) * 100) / 100} g`
  );
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
