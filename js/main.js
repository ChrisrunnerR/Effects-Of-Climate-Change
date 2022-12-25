Promise.all([
  d3.csv("data/Temperature_change_Data.csv"),
  d3.csv("data/1970-2021_DISASTERS.csv"),
]).then(([tempChangeData, disastersData]) => {
  /**
   * Process data
   */
  tempChangeData = tempChangeData
    .filter((d) => d["Country Code"] === "USA") // Only keep US data
    .map((d) => ({
      year: +d["year"],
      tempChange: +d["tem_change"],
    }));
  console.log("tempChangeData", tempChangeData);

  disastersData = disastersData
    .filter((d) => d["ISO"] === "USA") // Only keep US data
    .map((d) => ({
      year: +d["Year"],
      disasterType: d["Disaster Subgroup"],
      deaths: d["Total Deaths"] ? +d["Total Deaths"] : null,
      damages: d["Total Damages ('000 US$)"]
        ? +d["Total Damages ('000 US$)"] * 1000
        : null,
    }));
  console.log("disastersData", disastersData);

  drawUSTemperatureChangeLineGraph(
    d3.select("#usTemperatureChange"),
    tempChangeData
  );

  drawUSNaturalDisastersDeathsStackedAreaGraph(
    d3.select("#usNaturalDisasterDeaths"),
    disastersData
  );

  drawUSNaturalDisastersDamagesScatterPlot(
    d3.select("#usNaturalDisasterDamages"),
    disastersData
  );
});

// global variables
let data;
let readyData;
let height;
let width;
let svg;

let nodes;
let nodes_draw;
let nodes_labels;
let lowFire = [];
let midFire = [];
let highFire = [];

let current_year = 1992;
let min_year = 1992;
let max_year = 2015;

// for scrollytelling
let div_list = [];
let text_list = [];

let state_codes = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
             'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
             'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
             'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
             'SD', 'TN', 'TX', 'UT', 'VT',' VA', 'WA', 'WV', 'WI', 'WY'];

let y_loc = 400;
let centres = [{x: 260, y: y_loc}, {x: 640, y: y_loc}, {x: 1020, y: y_loc}];
let radius_ = 25;

let simulation = d3.forceSimulation()
                  //.alphaMin(0.9)
                  //.alphaTarget(0.899999)  
                  .velocityDecay(0.4)
                  .force("x", d3.forceX().x(function(d) {
                      return centres[getFireStatus(d.State)].x;
                  }))
                  .force("y", d3.forceY().y(function(d) {
                      return centres[getFireStatus(d.State)].y;
                  }))
                  //.force("y", d3.forceY().strength(0.002))
                  .force('collision', d3.forceCollide().radius(d => d.radius+1).iterations(2))
                  .on('tick', ticked);


window.onscroll = function change() {
  position = Math.floor(window.scrollY/200)
  console.log(Math.floor(window.scrollY/200))
  if (position >= 0 && position <= 5)
  {
      changeDivDisplay("#intro_area");
      changeTextDisplay(".empty_div");
  }
  else if (position > 5 && position <= 10)
  {
      changeDivDisplay("#intro_area2")
      changeTextDisplay(".empty_div");
  }
  else if (position > 10 && position <= 15)
  {
      changeDivDisplay("#intro_area3")
      changeTextDisplay(".empty_div");
  }
  else if (position > 15 && position <= 20)
  {
      changeDivDisplay("#usTemperatureChangeOuter")
      changeTextDisplay(".text_area3");
  }
  else if (position > 20 && position <= 25)
  {
      changeDivDisplay("#usNaturalDisasterDamagesOuter")
      changeTextDisplay(".text_area4");
  }
  else if (position > 25 && position <= 30)
  {
      changeDivDisplay("#usNaturalDisasterDamagesOuter")
      changeTextDisplay(".text_area5")
  }
  else if (position > 30 && position <= 35)
  {
      changeDivDisplay("#usNaturalDisasterDeathsOuter")
      changeTextDisplay(".text_area6")
  }
  else if (position > 35 && position <= 40)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(1992);
      changeTextDisplay(".text_area1")
  }
  else if (position > 40 && position <= 41)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(1993);
      changeTextDisplay(".text_area1")
  }
  else if (position > 41 && position <= 42)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(1994);
      changeTextDisplay(".text_area1")
  }
  else if (position > 42 && position <= 43)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(1995);
      changeTextDisplay(".text_area1")
  }
  else if (position > 43 && position <= 44)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(1996);
      changeTextDisplay(".text_area1")
  }
  else if (position > 44 && position <= 45)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(1997);
      changeTextDisplay(".text_area1")
  }
  else if (position > 45 && position <= 46)
  {
    changeDivDisplay(".myContainer1")
      changeYearByInput(1998);
      changeTextDisplay(".text_area1")
  }
  else if (position > 46 && position <= 47)
  {
    changeDivDisplay(".myContainer1")
      changeYearByInput(1999);
      changeTextDisplay(".text_area1")
  }
  else if (position > 47 && position <= 48)
  {
    changeDivDisplay(".myContainer1")
      changeYearByInput(2000);
      changeTextDisplay(".text_area1")
  }
  else if (position > 48 && position <= 49)
  {
    changeDivDisplay(".myContainer1")
      changeYearByInput(2001);
      changeTextDisplay(".text_area1")
  }
  else if (position > 49 && position <= 50)
  {
    changeDivDisplay(".myContainer1")
      changeYearByInput(2002);
      changeTextDisplay(".text_area1")
  }
  else if (position > 50 && position <= 51)
  {
    changeDivDisplay(".myContainer1")
      changeYearByInput(2003);
      changeTextDisplay(".text_area1")
  }
  else if (position > 51 && position <= 52)
  {
    changeDivDisplay(".myContainer1")
      changeYearByInput(2004);
      changeTextDisplay(".text_area1")
  }
  else if (position > 52 && position <= 53)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2005);
      changeTextDisplay(".text_area1")
  }
  else if (position > 53 && position <= 54)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2006);
      changeTextDisplay(".text_area1")
  }
  else if (position > 54 && position <= 55)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2007);
      changeTextDisplay(".text_area1")
  }
  else if (position > 55 && position <= 56)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2008);
      changeTextDisplay(".text_area1")
  }
  else if (position > 56 && position <= 57)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2009);
      changeTextDisplay(".text_area1")
  }
  else if (position > 57 && position <= 58)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2010);
      changeTextDisplay(".text_area1")
  }
  else if (position > 58 && position <= 59)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2011);
      changeTextDisplay(".text_area1")
  }
  else if (position > 59 && position <= 60)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2012);
      changeTextDisplay(".text_area2")
  }
  else if (position > 60 && position <= 61)
  {
      changeDivDisplay(".myContainer1") 
      changeYearByInput(2013);
      changeTextDisplay(".text_area2")
  }
  else if (position > 61 && position <= 62)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2014);
      changeTextDisplay(".text_area2")
  }
  else if (position > 62 && position <= 65)
  {
      changeDivDisplay(".myContainer1")
      changeYearByInput(2015);
      changeTextDisplay(".text_area2")
  }
  else if (position > 65 && position <= 70)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(0);
  }
  else if (position > 70 && position <= 71)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(1);
  }
  else if (position > 71 && position <= 72)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(2);
  }
  else if (position > 72 && position <= 73)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(3);
  }
  else if (position > 73 && position <= 74)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(4);
  }
  else if (position > 74 && position <= 75)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(5);
  }
  else if (position > 75 && position <= 76)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(6);
  }
  else if (position > 76 && position <= 77)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(7);
  }
  else if (position > 77 && position <= 78)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(8);
  }
  else if (position > 78 && position <= 79)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(9);
  }
  else if (position > 79 && position <= 80)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(10);
  }
  else if (position > 80 && position <= 81)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(11);
  }
  else if (position > 81 && position <= 85)
  {
      changeDivDisplay("#container");
      changeTextDisplay(".text_area7");
      changySpecific(12);
  }
  else if (position > 85 && position <= 87)
  {
      changeDivDisplay('.hurricaneOuter')
      if(currentHurricaneDataIndex != 0){
        currentHurricaneDataIndex = 0;
        hurricaneMapPlot();
      }
      
      changeTextDisplay(".text_area8");
  }
  else if (position > 87 && position <= 89)
  {
      changeDivDisplay('.hurricaneOuter')
      if(currentHurricaneDataIndex != 1){
        currentHurricaneDataIndex = 1;
        hurricaneMapPlot();
      }
      changeTextDisplay(".text_area8");
  }
  else if (position > 89 && position <= 91)
  {
      changeDivDisplay('.hurricaneOuter')
      if(currentHurricaneDataIndex != 2){
        currentHurricaneDataIndex = 2;
        hurricaneMapPlot();
      }
      changeTextDisplay(".text_area8");
  }
  else if (position > 91 && position <= 93)
  {
      changeDivDisplay('.hurricaneOuter')
      if(currentHurricaneDataIndex != 3){
        currentHurricaneDataIndex = 3;
        hurricaneMapPlot();
      }
      changeTextDisplay(".text_area8");
  }
  else if (position > 93 && position <= 95)
  {
      changeDivDisplay('.hurricaneOuter')
      if(currentHurricaneDataIndex != 4){
        currentHurricaneDataIndex = 4;
        hurricaneMapPlot();
      }
      changeTextDisplay(".text_area8");
  }
  else if (position > 95 && position <= 97)
  {
      changeDivDisplay('.hurricaneOuter')
      if(currentHurricaneDataIndex != 5){
        currentHurricaneDataIndex = 5;
        hurricaneMapPlot();
      }
      changeTextDisplay(".text_area8");
  }
  else if (position > 97)
  {
      changeDivDisplay("#exit_area");
      changeTextDisplay(".empty_div")
  }

  //if (position > 23)
  //{
      //changeYearByInput(min_year+position-23);
      //changeDivDisplay("#usTemperatureChangeOuter")
      //changeTextDisplay(".text_area3");
  //}
}

function changeDivDisplay(newDiv)
{
  for (let i = 0; i < div_list.length; i++)
  {
      // if the div is not the one to be shown, change opacity to 0
      if (newDiv != div_list[i])
      {
          d3.select(div_list[i]).style('z-index', 0);
          d3.select(div_list[i]).transition().duration(50).style('opacity', 0);
      }
      else 
      {
          d3.select(div_list[i]).style('z-index', 1);
          d3.select(div_list[i]).transition().duration(50).style('opacity', 1);
      }
  }
}

function changeTextDisplay(newDiv)
{
  for (let i = 0; i < text_list.length; i++)
  {
      if (newDiv != text_list[i])
          d3.select(text_list[i]).transition().duration(50).style('opacity', 0)
      else
      d3.select(text_list[i]).transition().duration(50).style('opacity', 1)
  }
}

function printTest()
{
  console.log("button test");
}

// called on page load
document.addEventListener('DOMContentLoaded', async function () {
  
  // appends divs for visualizations
  div_list.push(".myContainer1");
  div_list.push(".myContainer2");
  div_list.push("#container");
  div_list.push("#intro_area");
  div_list.push("#exit_area")
  div_list.push("#intro_area2");
  div_list.push("#intro_area3");
  div_list.push(".hurricaneOuter")
  div_list.push(".empty_div")
  div_list.push("#usTemperatureChangeOuter");
  div_list.push("#usNaturalDisasterDeathsOuter");
  div_list.push("#usNaturalDisasterDamagesOuter");

  // appends text divs
  text_list.push(".empty_div")
  text_list.push(".text_area1")
  text_list.push(".text_area2")
  text_list.push(".text_area3")
  text_list.push(".text_area4")
  text_list.push(".text_area5")
  text_list.push(".text_area6")
  text_list.push(".text_area7")
  text_list.push(".text_area8")

  await Promise.all([d3.csv('data/FireData.csv')])
      .then(function (values) {
          data_initial = values[0];

          data = data_initial.map(element => ({
              Year: +element.Year,
              Size: +element.Size,
              State: element.State
          }));
      });
  
  svg = d3.select("svg#line_svg");
  width = +svg.style('width').replace('px','');
  height = +svg.style('height').replace('px','');
  //nodes_draw = svg.append("g").selectAll("circle");

  yearLabel = svg.append('text').attr('class', 'axis-label')
              .attr('y', '635px')
              .attr('x', '640px')
              .attr('text-anchor', 'middle')
              .text('1992')
              .style('font-size', '50px')
              .attr('class', '_yearLabel')
              .attr('font-weight', '500');
  
  smallFireLabel1 = svg.append('text').attr('class', 'axis-label')
              .attr('y', centres[0].y-260)
              .attr('x', centres[0].x)
              .attr('text-anchor', 'middle')
              .text('Low')
              .style('font-size', '40px')
              .attr('font-weight', '500');

  smallFireLabel2 = svg.append('text').attr('class', 'axis-label')
              .attr('y', centres[0].y-220)
              .attr('x', centres[0].x)
              .attr('text-anchor', 'middle')
              .text('0 - 10000 Acres')
              .style('font-size', '20px')
              .attr('font-weight', '500');

  medFireLabel1 = svg.append('text').attr('class', 'axis-label')
              .attr('y', centres[1].y-260)
              .attr('x', centres[1].x)
              .attr('text-anchor', 'middle')
              .text('Medium')
              .style('font-size', '40px')
              .attr('font-weight', '500');

  medFireLabel2 = svg.append('text').attr('class', 'axis-label')
              .attr('y', centres[1].y-220)
              .attr('x', centres[1].x)
              .attr('text-anchor', 'middle')
              .text('10001 - 100000 Acres')
              .style('font-size', '20px')
              .attr('font-weight', '500');

  largeFireLabel1 = svg.append('text').attr('class', 'axis-label')
              .attr('y', centres[2].y-260)
              .attr('x', centres[2].x)
              .attr('text-anchor', 'middle')
              .text('Large')
              .style('font-size', '40px')
              .attr('font-weight', '500');

  largeFireLabel2 = svg.append('text').attr('class', 'axis-label')
              .attr('y', centres[2].y-220)
              .attr('x', centres[2].x)
              .attr('text-anchor', 'middle')
              .text('100000+ Acres')
              .style('font-size', '20px')
              .attr('font-weight', '500');
  
  
  calcNodes(current_year)
  DrawBasic()
  simulation.nodes(nodes);
});

function changeYearByInput(year)
{
  let currYear = current_year;
  current_year = year;
  if (currYear != current_year)
  {
      simulation.stop();
      calcNodes(current_year)
      //DrawBasic();
      simulation.force("x", d3.forceX().x(function(d) {
          return centres[getFireStatus(d.State)].x;
      }))
      .force("y", d3.forceY().y(function(d) {
          return centres[getFireStatus(d.State)].y;
      }))
      simulation.alphaTarget(0.3).restart();
      
      // change the color of nodes
      d3.selectAll("._wildfire_node").style("fill", d => getColor(getFireStatus(d.State)))

      // edit the year
      d3.select('._yearLabel').text(current_year);
  }
}

function changeYear(b)
{
  let currYear = current_year;
  if (b == true) // try to move forward a year
  {
      if (current_year + 1 <= max_year)
      {
          current_year++;
          // edit the year
          //d3.select('._yearLabel').text(current_year);
      }
  }
  else if (b == false)
  {
      if (current_year - 1 >= min_year)
      {
          current_year--;
          // edit the year
          //d3.select('._yearLabel').text(current_year);
      }
  }
  if (currYear != current_year)
  {
      simulation.stop();
      calcNodes(current_year)
      //DrawBasic();
      simulation.force("x", d3.forceX().x(function(d) {
          return centres[getFireStatus(d.State)].x;
      }))
      .force("y", d3.forceY().y(function(d) {
          return centres[getFireStatus(d.State)].y;
      }))
      simulation.alphaTarget(0.3).restart();
      
      // change the color of nodes
      d3.selectAll("._wildfire_node").style("fill", d => getColor(getFireStatus(d.State)))

      // edit the year
      d3.select('._yearLabel').text(current_year);
  }
}

function calcNodes(year)
{
  highFire = [];
  midFire = [];
  lowFire = [];

  readyData = CalcYearData(year);
  MathCalc(readyData);

  readyData.forEach(element => {
      if (element.Size > 100000)
          highFire.push(element.State);
      else if (element.Size > 10000)
          midFire.push(element.State);
      else
          lowFire.push(element.State)
  });

  nodes = readyData.map(d => ({
      State: d.State,
      radius: radius_,
      Size: d.Size,
      x: Math.random()+getFireStatus(d.State) * 240 + 340,
      y: Math.random()*180+270
  }));

  
  console.log(highFire);
}

function getFireStatus(state)
{
  if (highFire.includes(state))
      return 2;
  else if (midFire.includes(state))
      return 1;
  else
      return 0;
}

function getColor(num)
{
  if (num == 0)
      return "#edc949";
  else if (num == 1)
      return "#59a14f";
  else if (num == 2)
      return "#e15759";
}

function DrawBasic()
{
  const colorScale = d3.scaleOrdinal()
                       .domain([0, 1, 2])
                       .range(["#edc949", "#59a14f", "#e15759"])

  // const elements = svg.selectAll(".nodes")
  //                     .data(nodes, d => d.State)
  //                     .enter() 
  //                     .append('g')

  nodes_draw = svg.selectAll("circle")
                      .data(nodes, d => d.State)
                      .join("circle")
                          .attr('r', d => d.radius)
                          .attr('fill', d => colorScale(getFireStatus(d.State)))
                          .attr('opacity', 1)
                          .attr('class', '_wildfire_node')
                  
  nodes_labels = svg.selectAll("ntext")
                       .data(nodes)
                       .join("text")
                           .text(d => d.State)
                           .style('text-anchor', 'middle')
                           .style('font-size', 20)
                           .attr('dy', '.3em')

}

function ticked() {
  //console.log("t")
  // nodes.forEach(function(b, i) {
  //     if (b.State == "AZ")
  //     {
  //         console.log("AZ Fire Status: " + getFireStatus("AZ") + " center: " + centres[getFireStatus(b.State)].x);
  //         console.log(centres[getFireStatus(b.State)].x + " - " + b.x + " = " + (centres[getFireStatus(b.State)].x - b.x));  
  //     }
  //     b.y += (centres[getFireStatus(b.State)].y - b.y)*0.05;
  //     b.x += (centres[getFireStatus(b.State)].x - b.x)*0.05;
  // });
  
  nodes_draw
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)

  nodes_labels
    .attr('x', d => d.x)
    .attr('y', d => d.y)
}

function GetYearData(year)
{
  data_filtered = data.filter(function (element) {
      return element.Year == year;
  });
  return data_filtered;
}

// accepts country list with sum values and calculates relevant data
function MathCalc(list)
{
  array = [];
  list.forEach(element => {
      array.push(element.Size)
  });

  // calc standard deviation
  n = array.length
  mean = array.reduce((a, b) => a + b) / n
  stddev = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  
  sum = 0
  list.forEach(element => {
      sum += element.Size;
  });
  avg = sum/list.length;

  console.log("Mean: " + avg + "\nStd Dev: " + stddev);
  return [avg, stddev];
}

function CalcYearData(year)
{
  list = GetYearData(year);
  const calcData = {};
  
  list.forEach(element => {
      if (calcData[element.State] == undefined)
      {
          calcData[element.State] = element.Size
      }
      else
          calcData[element.State] = calcData[element.State] + element.Size
  });

  countryList = Object.keys(calcData);
  newList = [];
  for (i = 0; i < countryList.length; i++)
  {
      if (state_codes.includes(countryList[i]))
      {
          newList.push({
              Year: year,
              State: countryList[i],
              Size: calcData[countryList[i]]
          })
      }
  }
  
  return newList;
}


/**
* US Temperature Change Line Graph
*/
function drawUSTemperatureChangeLineGraph(container, data1) {
  const width = 1082;
  const height = 400;
  const margin = {
    top: 10,
    right: 20,
    bottom: 45,
    left: 80,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const lineWidth = 2;

  const lineColor = d3.schemeSet2[0];

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data1, (d) => d.year))
    .range([0, innerWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data1, (d) => d.tempChange))
    .range([innerHeight, 0])
    .nice();
  const line = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.tempChange));

  const svg1 = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const g = svg1
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("class", "chart");
  const xAxisG = g
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
  const xAxisTitle = g
    .append("text")
    .attr("class", "x-axis-title")
    .attr("transform", `translate(${innerWidth / 2},${innerHeight + 40})`)
    .attr("text-anchor", "middle")
    .attr("fill", "currentColor")
    .text("Year");
  const yAxisG = g
    .append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale).ticks(5));
  const yAxisTitle = g
    .append("text")
    .attr("class", "y-axis-title")
    .attr(
      "transform",
      `translate(${-margin.left + 20},${innerHeight / 2})rotate(-90)`
    )
    .attr("text-anchor", "middle")
    .attr("fill", "currentColor")
    .text("Temperature Change (°C)");
  const zeroLine = g
    .append("line")
    .attr("class", "zero-line")
    .attr("stroke", "currentColor")
    .attr("stroke-dasharray", "4")
    .attr("x1", xScale.range()[0])
    .attr("x2", xScale.range()[1])
    .attr("y1", yScale(0))
    .attr("y2", yScale(0));
  const linePath = g
    .append("path")
    .attr("class", "line-path")
    .attr("fill", "none")
    .attr("stroke-width", lineWidth)
    .attr("stroke", lineColor)
    .attr("d", line(data1));
}

/**
 * US Natural Disasters Deaths Stacked Area Graph
 */
function drawUSNaturalDisastersDeathsStackedAreaGraph(container, data1) {
  // Order disaster types by total deaths
  const deathsByDisasterType = d3
    .rollups(
      data1,
      (v) => d3.sum(v, (d) => d.deaths),
      (d) => d.disasterType
    )
    .sort((a, b) => d3.descending(a[1], b[1]));
  const disasterTypes = deathsByDisasterType.map((d) => d[0]);
  // Transform the data1 to the shape the d3.stack expects
  const years = d3.range(
    d3.min(data1, (d) => d.year),
    d3.max(data1, (d) => d.year) + 1
  );
  const transformedData = [];
  years.forEach((year) => {
    const d = {
      year,
    };
    disasterTypes.forEach((disasterType) => {
      const found = data1.find(
        (e) => e.year === year && e.disasterType === disasterType
      );
      d[disasterType] = found ? found.deaths : 0;
    });
    transformedData.push(d);
  });
  // Compute the stack layout
  const stack = d3
    .stack()
    .keys(disasterTypes)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);
  const stackedData = stack(transformedData);

  const width = 1082;
  const height = 600;
  const margin = {
    top: 10,
    right: 20,
    bottom: 45,
    left: 80,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .paddingInner(0.1)
    .domain(years)
    .range([0, innerWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(stackedData[stackedData.length - 1], (d) => d[1])])
    .range([innerHeight, 0])
    .nice();
  const colorScale = d3
    .scaleOrdinal()
    .domain(disasterTypes)
    .range(d3.schemeSet2);

  const area = d3
    .area()
    .x((d) => xScale(d.data.year))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  const svg1 = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const g = svg1
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("class", "chart");
  const xAxisG = g
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(
      d3.axisBottom(xScale).tickValues(years.filter((year) => year % 5 === 0))
    );
  const xAxisTitle = g
    .append("text")
    .attr("class", "x-axis-title")
    .attr("transform", `translate(${innerWidth / 2},${innerHeight + 40})`)
    .attr("text-anchor", "middle")
    .attr("fill", "currentColor")
    .text("Year");
  const yAxisG = g
    .append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale).ticks(5));
  const yAxisTitle = g
    .append("text")
    .attr("class", "y-axis-title")
    .attr(
      "transform",
      `translate(${-margin.left + 20},${innerHeight / 2})rotate(-90)`
    )
    .attr("text-anchor", "middle")
    .attr("fill", "currentColor")
    .text("Deaths");
  const barRect = g
    .append("g")
    .selectAll(".series-g")
    .data(stackedData)
    .join("g")
    .attr("class", "series-g")
    .attr("fill", (d) => colorScale(d.key))
    .selectAll(".bar-rect")
    .data((d) => d)
    .join("rect")
    .attr("class", "bar-rect")
    .attr("x", (d) => xScale(d.data.year))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]));

  // Color legend
  const legendRow = svg1
    .append("g")
    .attr("transform", `translate(${width - 150},${margin.top})`)
    .selectAll(".legend-row")
    .data(disasterTypes)
    .join("g")
    .attr("class", "legend-row")
    .attr("transform", (d, i) => `translate(0, ${(i + 0.5) * 25})`);

  legendRow
    .append("rect")
    .attr("y", -10)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", (d) => colorScale(d));

  legendRow
    .append("text")
    .attr("fill", "currentColor")
    .attr("x", 25)
    .attr("dy", "0.32em")
    .text((d) => d);
}

/**
 * US Natural Disasters Damages Scatter Plot
 */
function drawUSNaturalDisastersDamagesScatterPlot(container, data1) {
  // Order disaster types by total deaths
  const deathsByDisasterType = d3
    .rollups(
      data1,
      (v) => d3.sum(v, (d) => d.deaths),
      (d) => d.disasterType
    )
    .sort((a, b) => d3.descending(a[1], b[1]));
  const disasterTypes = deathsByDisasterType.map((d) => d[0]);

  // Only keep data with damages
  data1 = data1
    .filter((d) => d.damages)
    .sort((a, b) => d3.descending(a.damages, b.damages));

  const width = 1082;
  const height = 800;
  const margin = {
    top: 40,
    right: 20,
    bottom: 45,
    left: 80,
  };
  const minRadius = 2;
  const maxRadius = 80;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data1, (d) => d.year))
    .range([0, innerWidth])
    .nice();
  const yScale = d3
    .scaleLog()
    .domain(d3.extent(data1, (d) => d.damages))
    .range([innerHeight, 0])
    .nice();
  const rScale = d3
    .scaleSqrt()
    .domain(d3.extent(data1, (d) => d.damages))
    .range([minRadius, maxRadius]);
  const colorScale = d3
    .scaleOrdinal()
    .domain(disasterTypes)
    .range(d3.schemeSet2);

  const svg1 = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const g = svg1
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("class", "chart");
  const xAxisG = g
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
  const xAxisTitle = g
    .append("text")
    .attr("class", "x-axis-title")
    .attr("transform", `translate(${innerWidth / 2},${innerHeight + 40})`)
    .attr("text-anchor", "middle")
    .attr("fill", "currentColor")
    .text("Year");
  const yAxisG = g
    .append("g")
    .attr("class", "y-axis")
    .call(
      d3
        .axisLeft(yScale)
        .ticks(5)
        .tickFormat((d) => d3.format("~s")(d).replace("G", "B")) // d3.format uses "G" instead of "B" for billions
    );
  const yAxisTitle = g
    .append("text")
    .attr("class", "y-axis-title")
    .attr(
      "transform",
      `translate(${-margin.left + 20},${innerHeight / 2})rotate(-90)`
    )
    .attr("text-anchor", "middle")
    .attr("fill", "currentColor")
    .text("Damages ($)");
  const bubble = g
    .append("g")
    .selectAll(".bubble-circle")
    .data(data1)
    .join("circle")
    .attr("class", "bubble-circle")
    .attr("stroke", "#fff")
    .attr("fill", (d) => colorScale(d.disasterType))
    .attr("r", (d) => rScale(d.damages))
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.damages));

  // Color legend
  const legendRow = svg1
    .append("g")
    .attr(
      "transform",
      `translate(${width - 150},${height - margin.bottom - 150})`
    )
    .selectAll(".legend-row")
    .data(disasterTypes)
    .join("g")
    .attr("class", "legend-row")
    .attr("transform", (d, i) => `translate(0, ${(i + 0.5) * 25})`);

  legendRow
    .append("rect")
    .attr("y", -10)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", (d) => colorScale(d));

  legendRow
    .append("text")
    .attr("fill", "currentColor")
    .attr("x", 25)
    .attr("dy", "0.32em")
    .text((d) => d);

  // Size legend
  const legendItem = svg1
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left + maxRadius + 10},${margin.top + maxRadius * 2})`
    )
    .selectAll(".legend-item")
    .data([1e6, 1e9, 1e10, 1e11])
    .join("g")
    .attr("class", "legend-item");

  legendItem
    .append("circle")
    .attr("fill", "none")
    .attr("stroke", "currentColor")
    .attr("cy", (d) => -rScale(d))
    .attr("r", (d) => rScale(d));

  legendItem
    .append("line")
    .attr("stroke", "currentColor")
    .attr("stroke-dasharray", "4")
    .attr("x2", maxRadius)
    .attr("y1", (d) => -rScale(d) * 2)
    .attr("y2", (d) => -rScale(d) * 2);

  legendItem
    .append("text")
    .attr("fill", "currentColor")
    .attr("dy", "0.32em")
    .attr("x", maxRadius + 5)
    .attr("y", (d) => -rScale(d) * 2)
    .text((d) => `$${d3.format("~s")(d).replace("G", "B")}`);
}

// ben's stuff

let TData
let TData1
let yYear1 = 0 // 0 - 12


let canvas = d3.select('#canvas').attr('width', 1000).attr('height', 600)
let tooltip = d3.select('#tooltip')


function color(cat){ // 13 + 17 + 12 + 9
    if (cat === 'HI' || cat === 'AK' || cat === 'CA' || cat === 'OR' || cat === 'WA' || cat === 'ID' || cat === 'NV' || cat === 'AZ' || cat === 'UT' || cat === 'MT' || cat === 'WY' || cat === 'CO' || cat === 'NM'){ return 'orange' } //west
    else if (cat === 'TX' || cat === 'OK' || cat === 'AR' || cat === 'LA' || cat === 'MS' || cat === 'AL' || cat === 'TN' || cat === 'KY' || cat === 'FL' || cat === 'GA' || cat === 'SC' || cat === 'NC' || cat === 'VA' || cat === 'WV' || cat === 'DC' || cat === 'DE' || cat === 'MD'){ return 'blue' } //mid-west
    else if (cat === 'ND' || cat === 'SD' || cat === 'NE' || cat === 'KS' || cat === 'MN' || cat === 'IA' || cat === 'MO' || cat === 'WI' || cat === 'IL' || cat === 'IN' || cat === 'MI' || cat === 'OH' || cat === 'PR'){ return 'green' } //south
    else if (cat === 'PA' || cat === 'NY' || cat === 'NJ' || cat === 'RI' || cat === 'CT' || cat === 'MA' || cat === 'VT' || cat === 'NH' || cat === 'ME'){ return 'red' } //northeast
    else console.log(cat)
}

let drawTreeMap = () => {
    let hierarchy = d3.hierarchy(TData, (node) => {
        //console.log(node['children'])
        return node
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) => {
        return node2['value']-node1['value']
    })
    console.log(hierarchy.leaves())

    let createTreeMap = d3.treemap()
        .size([1000,600])
        //.padding(2) //flag1

    createTreeMap(hierarchy)

    let tornTiles = hierarchy.leaves()
    
    let block = canvas.selectAll('g')
        .data(tornTiles)
        .join('g')
        .attr('transform', (tornado) => {
            return 'translate(' + tornado['x0']+', '+tornado['y0']+')'
        })
        //.padding('2px')
        
        

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (tornado) => {
            let stateC = tornado['data']['state']
            //console.log(stateC)
            return color(stateC)
        })
        .attr('state-', (tornado) => {
            return tornado['data']['state']
        })
        .attr('value-', (tornado) => {
            return tornado['data']['value']
        })
        .attr('year-', (tornado) => {
            return tornado['data']['year']
        })
        .attr('width', (tornado) => {
            return tornado['x1']-tornado['x0']
        })
        .attr('height', (tornado) => {
            return tornado['y1']-tornado['y0']
        })
        .attr('stroke-width', '3')
        .on('mouseover', (e,tornado) => {
            let va = tornado['data']['value']
            let ye = tornado['data']['year']
            tooltip.transition().style('visibility', 'visible')
            tooltip.html("Number of Tornadoes: "+va + '<br>'+ye+'-'+(parseInt(ye)+5).toString())
        })
        .on('mouseout', (tornado) => {
            tooltip.transition().style('visibility', 'hidden')
        })
        .on('click', () =>{// when implementing scrolling, instead of using changy, set y= at each part of the page
            console.log('click')
            changy()
            console.log(yYear1)
            
        })
        


    block.append('text')
        .text((tornado) => {
            return tornado['data']['state']
        })
        .attr('x', 5)
        .attr('y', 20)

    block.append('text')
        .text((tornado) => {
            return tornado['data']['value']
        })
        .attr('x', 5)
        .attr('y', 35)


}

function drawRect(){//flag1
    canvas.append('rect')
        .attr('fill', 'black')
        .attr('width', 1000)
        .attr('height', 600)
}

function changySpecific(input1){ // using this to change data after every key press, will change to scrolling
    yYear1 = input1;
    //drawRect()
    draw()
}

function changy(){ // using this to change data after every key press, will change to scrolling
    if (yYear1 === 12){
        yYear1 = 0
    }
    else {
        yYear1 += 1
    }
    //drawRect()
    draw()
}

function change(year, data){ // change what year of data we look at
    console.log("change-start")
    var d = [52]
    var ii = 0;
    //console.log(data['children'][0]['children'])
    for (var i = year*52; i < 52+year*52; i++){
        d[ii] = data['children'][0]['children'][i]
        ii++;
    }
    console.log(d)
    console.log("change-end")
    return d
}
function draw(){
    d3.json('data/torn3.json').then(
        (data, error) => {
            if(error){
                console.log(error)
            } else {
                // TData1  = data
                // console.log(TData1)
                TData = change(yYear1, data)
                drawTreeMap()
            }
        }
    )
}

// global variables
const yScale = d3.scaleLinear();
const xScale = d3.scaleLinear();
state_codes = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
             'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
             'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
             'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
             'SD', 'TN', 'TX', 'UT', 'VT',' VA', 'WA', 'WV', 'WI', 'WY'];


var hurricaneDatas;
var currentHurricaneData;
var currentHurricaneDataIndex;
var leafletMap;
/*
  hurricane datasets:
  https://ibtracs.unca.edu/index.php?name=v04r00-1970138N12281
  https://ibtracs.unca.edu/index.php?name=v04r00-2021239N17281#idata
  https://ibtracs.unca.edu/index.php?name=v04r00-1985224N18279





*/


const datasets = [
          d3.csv("data/hurricanealma1970.csv"),
          d3.csv("data/hurricanedanny1985.csv"),
          d3.csv("data/hurricaneearl1998.csv"),
          d3.csv("data/hurricanejeanne2004.csv"),
          d3.csv("data/hurricanesally2020.csv"),
          d3.csv("data/hurricaneida2021.csv")
          ];

document.addEventListener('DOMContentLoaded', function () {
  Promise.all(datasets)
  .then(function (values) {
      //innovative visualization (hurricane path)

      hurricaneDatas = Array(6);

      for(var i = 0; i < 6; i++){
          tempHurricaneData = values[i];        // **** make sure d3.csv load order is correct!!!!! *****

          var prevWind = +tempHurricaneData[0]["WMO WIND"];
          tempHurricaneData.forEach((d) =>{
              d["LAT"] = +d["LAT"];
              d["LON"] = +d["LON"];
      
              if(d["WMO WIND"] === ""){
                  d["WMO WIND"] = prevWind;
              }else{
                  d["WMO WIND"] = +d["WMO WIND"];
              }
              
              prevWind = d["WMO WIND"];
              
          });

          hurricaneDatas[i] = tempHurricaneData;
      }
      
      currentHurricaneDataIndex = 0;

      leafletMap = L.map('leaflet-map',{zoomControl: false,minZoom: 5, maxZoom: 5}).setView([28.448, -78.074], 5);
      hurricaneMapPlot();
      

  });

});
function runScroll(){

  
}
function tempbutton(option){
  console.log(option);
  var incremval;
  if(option === "prev"){
      incremval = -1;
  }else{
      // "next"
      incremval = 1;
  }

  currentHurricaneDataIndex = (currentHurricaneDataIndex + incremval) % 6;

  hurricaneMapPlot();
}
function hurricaneMapPlot(){
  
  // Add a tile layer
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(leafletMap);

  currentHurricaneData = hurricaneDatas[currentHurricaneDataIndex];

  d3.select("#hurri-path-svg").remove();

  var svg = d3.select("#leaflet-map").append("svg")
                                          .attr("id","hurri-path-svg")
                                          .attr("class","graph")
                                          .style('z-index', 1);

  var svgBounds = L.latLngBounds(
      L.latLng(90,180),
      L.latLng(-90,-180)
  );


  // const allLat = hurricaneData.map(x => x["LAT"]);
  // const allLng = hurricaneData.map(x => x["LON"]);
  // var maxBounds = L.latLngBounds(L.latLng(d3.max(allLat) + 10,d3.max(allLng) + 10),L.latLng(d3.min(allLat) - 10,d3.min(allLng) - 10));
  // leafletMap.setMaxBounds(maxBounds);

  //L.rectangle(svgBounds).addTo(leafletMap);
  

  svg.select('g').remove();

  const g = svg.append('g');

  const radiusScale = d3.scaleLinear()
                              .domain([0,140])
                              .range([4,20]);
  const intensityScale = d3.scaleSequential(d3.interpolateTurbo)
                              .domain([0,140]);

  
  
  
  var lines = g.append("path")
                      .data([currentHurricaneData])
                      .style("stroke","black")
                      .style("stroke-width","10px")
                      .style("fill","none")
                      .attr("d",d3.line()
                              .x((d) => leafletMap.project(L.latLng(d["LAT"],d["LON"]))["x"])
                              .y((d) => leafletMap.project(L.latLng(d["LAT"],d["LON"]))["y"])
                              .curve(d3.curveCardinal)
                              );

  var circles = g.selectAll('circle')
                      .data(currentHurricaneData)
                      .enter()
                      .append('circle')      
                      .style('fill', d => intensityScale(d["WMO WIND"]))
                      .style("stroke","black")
                      .style("stroke-width","1px")
                      .attr('cx', d => leafletMap.project([d["LAT"],d["LON"]])["x"])
                      .attr('cy', d => leafletMap.project([d["LAT"],d["LON"]])["y"])
                      .transition()
                      .duration(1000)
                      .delay((d,i) => 75 * i)
                      .attr('r', d => radiusScale(d["WMO WIND"]));

  var linelen = lines.node().getTotalLength();

  lines.attr("stroke-dasharray", `${linelen} ${linelen}`)
      .attr("stroke-dashoffset", linelen)
      .transition()
      .duration(6000)
      .ease(d3.easeQuad)
      .attr("stroke-dashoffset", 0);

  var svgOverlay = L.svgOverlay(document.querySelector("#hurri-path-svg"), svgBounds, {
      opacity: 0.9,
      interactive: true
  }).addTo(leafletMap);
}
