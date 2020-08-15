// getting UFO data from data.js
const tableData = data;

// initializing html table as d3 object
const tbody = d3.select("tbody");

// traversing through the data arrary, formatting string and plotting on the table
data.forEach((ufoReport) => {
  let row = tbody.append("tr");
  Object.entries(ufoReport).forEach(([key, value]) => {
    let cell = row.append("td");
    let cellValue = value
    if ((key==="state") || (key==="country")){
      cellValue = value.toUpperCase()
    } else if ((key==="city") || (key==="shape")) {
      cellValue = value.replace(/\w\S*/g, ((value) => (value.charAt(0).toUpperCase() + value.substr(1).toLowerCase())));    
    }
    cell.text(cellValue);
  });
});
  
// capturing button click event and filtering the table
// Select the button and form
var button = d3.select("#filter-btn");
var form = d3.select("#search-form");

// Create event handlers 
button.on("click", searchTable);
form.on("submit", searchTable);

// search table function  for multiple fields
function searchTable() {
  // creating input list
  const inputArr = []
  inputArr[0] = d3.select("#datetime").property("value").trim().toUpperCase()
  inputArr[1] = d3.select("#city").property("value").trim().toUpperCase()
  inputArr[2] = d3.select("#state").property("value").trim().toUpperCase()
  inputArr[3] = d3.select("#country").property("value").trim().toUpperCase()
  inputArr[4] = d3.select("#shape").property("value").trim().toUpperCase()
  
  // grabbing DOM elements and looping through the table
  const table = document.getElementById("ufo-table");
  const tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    allTD = tr[i].getElementsByTagName("td")
    hideFlag = false
    showFlag = [true, true, true, true, true]
    for (j=0; j < allTD.length; j++){
      td = allTD[j];
      if (j < 5) {
        const filter = inputArr[j]
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (filter !== "") {
            if (txtValue.toUpperCase().indexOf(filter) < 0) {
              showFlag[j] = false
            }
          }
        }
      }
    }
    hideFlag = showFlag[0] && showFlag[1] &&showFlag[2] &&showFlag[3] &&showFlag[4]
    tr[i].style.display = hideFlag ? "" : "none"
  }
}

