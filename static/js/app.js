// Function to filter data based on user input
function filterData() {
  console.log(this);

  // Clear the html table body
  tBody.html("");

  // Grab filter values from web page
  var datetime = dateOptions.property("value");
  console.log("date selection: " + datetime);
  var city = cityOptions.property("value");
  console.log("city selection: "+ city);
  var state = stateOptions.property("value");
  console.log("state selection: " + state);
  var country = countryOptions.property("value");
  console.log("coutry selection: " + country);
  var shape = shapeOptions.property("value");
  console.log("shape selection: " + shape);
      
  // Define an object to hold filter key/values
  var filtercondition = {};
  if ( datetime !== 'All') { filtercondition.datetime = datetime;}
  if ( city !== 'All') { filtercondition.city = city;}
  if ( state !== 'All') { filtercondition.state = state;}
  if ( country !== 'All') { filtercondition.country = country;}
  if ( shape !== 'All') { filtercondition.shape = shape};

  // Use the filtercondition object to perform requested filter on data
  filteredData = data.filter(function(sighting) {
    for (var key in filtercondition) {
        // if condition not met return false
        if (sighting[key] !== filtercondition[key]) { return false; } 
    }
    return true;
  });
  console.log(filteredData);

  // Loop through the data and populate EVERYTHING in the html table
  filteredData.forEach(function(input) {
      var row = tBody.append("tr");
      Object.entries(input).forEach(function([key, value]) {
      // Append a cell to the row for each value
      var cell = row.append("td");
      cell.text(value);
      });
  });

}

// Function to populate all data on the web page 
function populateAll(){
  clear();
  // All filter drop downs will default to blank ('All), meaning no filters on data set
  filterData();
}

// Function to clear/reset web page
function clear(){
  var elements = document.getElementsByTagName('select');
  for (var i = 0; i < elements.length; i++)
  {
      elements[i].selectedIndex = 0;
  }
  tBody.html("");

}

// Define lists to populate dropdowns from data.js
dateList = [...new Set(data.map(row => row.datetime))];
cityList = [...new Set(data.map(row => row.city))].sort();
stateList = [...new Set(data.map(row => row.state))].sort();
countryList = [...new Set(data.map(row => row.country))].sort();
shapeList = [...new Set(data.map(row => row.shape))].sort();


// Sort my list of dates - pad the day of the month with a leading zero if necessary for comparison
dateList.sort(function(a,b) {
  a = a.split('/');
  if (a[1].length < 2){
    a[1] = '0' + a[1];
  }
  a = a.reverse().join('');
  b = b.split('/');
  if (b[1].length < 2){
    b[1] = '0' + b[1];
  }
  b = b.reverse().join('');
  return a > b ? 1 : a < b ? -1 : 0;
});
console.log(dateList);

// Use D3 to select the table body and button
var tBody = d3.select("tbody");
var btn_clear = d3.select("#filter-btn");
var btn_all = d3.select("#all-btn");

// Use D3 to select the drop down for the date list
var dateDropDown = d3.select("#date-container");
dateDropDown.append("select").attr("id", "date-time");
// Use D3 to select and define the html options in the dropdown list of dates
var dateOptions = d3.select("#date-time");
dateOptions.selectAll("option").data(dateList).enter().append("option").attr("value", function (d) { return d; }).text(function (d) { return d; });
// Add a blank drop down option to the top of the drop down; allows user to not filter on this item
dateOptions.append("option").attr("value", "All").text("").lower();

// Use D3 to select the drop down for the city list
var cityDropDown = d3.select("#city-container");
cityDropDown.append("select").attr("id", "city-dd");
// Use D3 to select and define the html options in the dropdown list of cities
var cityOptions = d3.select("#city-dd");
cityOptions.selectAll("option").data(cityList).enter().append("option").attr("value", function (d) { return d; }).text(function (d) { return d; });
// Add a blank drop down option to the top of the drop down; allows user to not filter on this item
cityOptions.append("option").attr("value", "All").text("").lower();

// Use D3 to select the drop down for the state list
var stateDropDown = d3.select("#state-container");
stateDropDown.append("select").attr("id", "state-dd");
// Use D3 to select and define the html options in the dropdown list of states
var stateOptions = d3.select("#state-dd");
stateOptions.selectAll("option").data(stateList).enter().append("option").attr("value", function (d) { return d; }).text(function (d) { return d; });
// Add a blank drop down option to the top of the drop down; allows user to not filter on this item
stateOptions.append("option").attr("value", "All").text("").lower();

// Use D3 to select the drop down values for countries
var countryDropDown = d3.select("#country-container");
countryDropDown.append("select").attr("id", "country-dd");
// Use D3 to select and define the html options in the dropdown list of countries
var countryOptions = d3.select("#country-dd");
countryOptions.selectAll("option").data(countryList).enter().append("option").attr("value", function (d) { return d; }).text(function (d) { return d; });
// Add a blank drop down option to the top of the drop down; allows user to not filter on this item
countryOptions.append("option").attr("value", "All").text("").lower();

// Use D3 to select the drop down values for shapes
var shapeDropDown = d3.select("#shape-container");
shapeDropDown.append("select").attr("id", "shape-dd");
// Use D3 to select and define the html options in the dropdown list of shapes
var shapeOptions = d3.select("#shape-dd");
shapeOptions.selectAll("option").data(shapeList).enter().append("option").attr("value", function (d) { return d; }).text(function (d) { return d; });
// Add a blank drop down option to the top of the drop down; allows user to not filter on this item
shapeOptions.append("option").attr("value", "All").text("").lower();

clear();

// Event listeners
btn_all.on('click', populateAll);
btn_clear.on('click', clear);
dateDropDown.on("change", filterData);
cityDropDown.on("change", filterData);
stateDropDown.on("change", filterData);
countryDropDown.on("change", filterData);
shapeDropDown.on("change", filterData);