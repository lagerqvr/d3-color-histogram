// Color Histogram with D3.js

const imgRead = (data) => {
  if (data.files[0] && data.files) {
    let readImg = new FileReader();

    readImg.onload = (event) => {
      d3.select("#img").attr("src", event.target.result);
    };

    readImg.readAsDataURL(data.files[0]);

    document.getElementById("btn").style.visibility = "visible";
    document.getElementById("rgb-select").style.visibility = "visible";

    /* Delete previous chart if remaining */
    d3.selectAll("#ch > *").remove();
  }
};

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

const clearAll = () => {
  /* d3.selectAll("#ch > *").remove();
  context.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("btn").style.visibility = "hidden";
  document.getElementById("rgb-select").style.visibility = "hidden"; */
  location.reload();
};

const colors = 256;

var img = document.getElementById("img");
var r = [];
var g = [];
var b = [];
2;

img.onload = () => {
  canvas.height = img.height;
  canvas.width = img.width;
  context.drawImage(img, 0, 0);

  let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  let px = imgData.data;

  for (let i = 0; i < colors; i++) {
    r[i] = 0;
    g[i] = 0;
    b[i] = 0;
  }

  for (let i = 0; i < px.length; i += 4) {
    r[px[i]]++;
    g[px[i + 1]]++;
    b[px[i + 2]]++;
  }

  /* Dimensions */

  let height = document.getElementById("img").height;
  let width = document.getElementById("img").width;
  let bWidth = width / colors;
  const rng = 8;

  /* Chart */

  const ch = d3
    .select("#ch")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("border-radius", "5px")
    .style("background", "#ededed");

  let yR = d3
    .scaleLinear()
    .domain([0, d3.max(r)])
    .range([0, height - rng]);
  let yG = d3
    .scaleLinear()
    .domain([0, d3.max(g)])
    .range([0, height - rng]);
  let yB = d3
    .scaleLinear()
    .domain([0, d3.max(b)])
    .range([0, height - rng]);

  /* RED */
  ch.selectAll("red")
    .data(r)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i * bWidth;
    })
    .attr("y", function (d) {
      return height - yR(d);
    })
    .attr("height", function (d) {
      return yR(d);
    })
    .attr("width", bWidth + 0.1)
    .style("opacity", "0.9")
    .style("fill", "#FF0000");

  /* GREEN */
  ch.selectAll("green")
    .data(g)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i * bWidth;
    })
    .attr("y", function (d) {
      return height - yG(d);
    })
    .attr("height", function (d) {
      return yG(d);
    })
    .attr("width", bWidth + 0.1)
    .style("opacity", "0.8")
    .style("fill", "#02B100");

  /* BLUE */
  ch.selectAll("blue")
    .data(b)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i * bWidth;
    })
    .attr("y", function (d) {
      return height - yB(d);
    })
    .attr("height", function (d) {
      return yB(d);
    })
    .attr("width", bWidth + 0.1)
    .style("opacity", "0.8")
    .style("fill", "#0041FF");
};

/* WIP */

const changeChannel = () => {
  var e = document.getElementById("rgb-select");
  if (e.value == "red") {
    console.log(e.value);
  } else if (e.value == "green") {
    console.log(e.value);
  } else if (e.value == "blue") {
    console.log(e.value);
  }
};
