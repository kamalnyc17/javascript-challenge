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

// search table function
function searchTable() {
  const input = d3.select("#datetime")
  const filter = input.property("value")
  const table = document.getElementById("ufo-table");
  const tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

