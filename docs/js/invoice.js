function SearchValue(filterName,tableName,columName) {
    // declaring variables to work with
    var name, filterSearch, table, tr, td, i, nameValue;
    // getting user input
    name = document.getElementById(filterName);
    // converting the name in upper case
    filterSearch = name.value.toUpperCase();
    // getting table by its id
    table = document.getElementById(tableName);
    // getting row of cell
    tr = table.getElementsByTagName("tr");
    // looping through number of rows
    for (i = 0; i < tr.length; i++) {
        // getting data cell by which we are goona search
      td = tr[i].getElementsByTagName("td")[columName];
      if (td) {
        nameValue = td.textContent || td.innerText;
        if (nameValue.toUpperCase().indexOf(filterSearch) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

//Check all boxes from header in InvoicePage
function CheckBoxes(page){
  chkboxes = document.getElementsByName('chkBoxInvoice');
  for(var i=0, n=chkboxes.length; i<n;i++){
    chkboxes[i].checked = page.checked;
  }
}


//Print invoice inside invoice document
function printFunc(tagid) {
  var hashid = "#"+ tagid;
            var tagname =  $(hashid).prop("tagName").toLowerCase() ;
            var attributes = ""; 
            var attrs = document.getElementById(tagid).attributes;
              $.each(attrs,function(i,elem){
                attributes +=  " "+  elem.name+" ='"+elem.value+"' " ;
              })
            var divToPrint= $(hashid).html() ;
            var head = "<html><head>"+ $("head").html() + "</head>" ;
            var allcontent = head + "<body  onload='window.print()' >"+ "<" + tagname + attributes + ">" +  divToPrint + "</" + tagname + ">" +  "</body></html>"  ;
            var newWin=window.open('','Print-Window');
            newWin.document.open();
            newWin.document.write(allcontent);
            newWin.document.close();
  }

  //Display and hide div element invoiceFormat         
  function displayDiv(elem) {
    var x = document.getElementById(elem);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  
