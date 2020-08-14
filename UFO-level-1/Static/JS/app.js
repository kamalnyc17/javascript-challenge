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
  
