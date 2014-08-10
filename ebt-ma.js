$(document).ready(function() {
  d3.csv("MA.csv", function(data) {
    window.data = data;
    console.log(data);



  //the columns that we'd like to display
  var columns = ['Store_Name', 'Address', 'City', 'County', 'State'];

  //add data to the html

  d3.select("#number-of-retail").html(data.length);
  var results = d3.select("#results").html(null),
        table = results.append("table")
                  .attr("class", "tblResults")
                  .attr("class", "table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

  // append the header row
  thead.append("tr")
      .selectAll("th")
      .data(columns)
      .enter()
      .append("th")
          .text(function(column) { return column; })
      .on("click", function(d){
        d3.select('#results table tbody')
            .selectAll('tr').sort(function(a, b){
              if (ascending)
                return d3.ascending(a[d], b[d]);
              else
                return d3.descending(a[d], b[d]);
          });
          //flip the bit:
          ascending = !ascending;
        }
      );

  //append some data
    //initialize ascending as true
  var ascending = true;
  //add sort icon to the list
  d3.selectAll('#results table tr th').append('span').html(' <i class="fa fa-sort"></i>')

  // create a row for each object in the data
  var rows = tbody.selectAll("tr")
      .data(data)
      .enter()
      .append("tr");

  // create a cell in each row for each column
  var cells = rows.selectAll("td")
      .data(function(row) {
          return columns.map(function(column) {
              return {column: column, value: row[column]};
          });
      })
      .enter()
      .append("td")
          .text(function(d) { return d.value; });
  });

});
