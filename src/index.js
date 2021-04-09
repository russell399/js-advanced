// DEFAULT BY WEBPACK

(async () => {
  const response = await fetch("/.netlify/functions/lambda")
  const data = await response.json()
  console.log(data)
})();



// VARIABLES

const container = document.querySelector(".container");
const searchedCity = document.querySelector(".searchedCity");

const colorArray = [
  "#05d48f", //green
  "#fde153", //yellow
  "#f8a858", //orange
  "#f04a73", //red
  "#b147e6", //purple
  "#7a5f66", //brown-ish
  "#797e85", //gray
];

// Update displayed information

function changeDom(information) {
  cleanContainer();
  generateDomElement(information);
}

// Clean the container by removing exhisting children, if any
function cleanContainer() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function generateDomElement(information) {
  // Append more information in the div inside the body
  const city = document.createElement("h1");
  const aqi = document.createElement("p");
  const result = document.createElement("h3");
  const feedback = document.createElement("p");

  // Add newly created element a class
  city.classList.add("searchedCity");
  aqi.classList.add("aqi");
  result.classList.add("result");
  feedback.classList.add("feedback");

  const aqiValue = _.get(information, "data.aqi", "-");
  city.textContent = _.get(information, "data.city.name", "Non disponibile");
  aqi.textContent = `AQI: ${aqiValue}`;

  // Append children to DOM
  container.appendChild(city);
  container.appendChild(aqi);
  container.appendChild(result);
  container.appendChild(feedback);

  // Call another function to style the DOM
  styleContainer(aqiValue, aqi, result, feedback);
}

function styleContainer(aqiValue, aqi, result, feedback) {
  if (aqiValue <= 50) {
    aqi.style.background = colorArray[0];
    result.innerHTML = "Buona";
  } else if (aqiValue <= 100) {
    aqi.style.background = colorArray[1];
    result.innerHTML = "Moderata";
  } else if (aqiValue <= 150) {
    aqi.style.background = colorArray[2];
    result.innerHTML = "Critica per i soggetti sensibili";
  } else if (aqiValue <= 200) {
    aqi.style.background = colorArray[3];
    result.innerHTML = "Critica";
  } else if (aqiValue <= 300) {
    aqi.style.background = colorArray[4];
    result.innerHTML = "Molto critica";
  } else if (aqiValue > 300) {
    aqi.style.background = colorArray[5];
    result.innerHTML = "Pericolosa";
  } else {
    aqi.style.background = colorArray[5];
    result.innerHTML = "Non disponibile";
  }

// EXPORTS
export { container, searchedCity, changeDom, cleanContainer };
