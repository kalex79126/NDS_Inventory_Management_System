var selected = document.getElementById("Item");

//function to validate user input
function validateData() {
    // initially setting to true
    isValidated = true;
    // checking the fields are empty or not
    if ( 
        selected.options[selected.selectedIndex].value == "default" ||
        document.getElementById("Quantity").value == "" ||
        document.getElementById("UnitPrice").value == ""  ||
        document.getElementById("Subtotal").value == "") {
            isValidated = false;
    } 
    else {
        isValidated = true;
    }
    return isValidated;
}

// function to get user entered data
function getData() {
    var userData = {};
    userData["Item"] = selected.options[selected.selectedIndex].value;
    userData["Quantity"] = document.getElementById("Quantity").value;
    userData["UnitPrice"] = document.getElementById("UnitPrice").value;
    userData["Subtotal"] = document.getElementById("Subtotal").value;
    return userData;
}

// getting current record and inializing as null
var currentRecord = null;

//function to perform action on Add button
function addSale() {
    // first validating entered data
    if (validateData()) {
        // getting user inputs for each field
        var data = getData();
        // if current record is null
        if (currentRecord == null)
            // will create new order
            InsertSale(data);
        else
            // will update current order record
            updateCurrentSale(data);
        // clearing the fields
        clear();
    }
}

// function to create or insert new order
function InsertSale(data) {
    // getting the table by its id
    var saleTable = document.getElementById("sale").getElementsByTagName('tbody')[0];
    // getting the record to insert
    var record = saleTable.insertRow(saleTable.length);
    // now inserting the record into the table cells
    item = record.insertCell(0);
    item.innerHTML = data.Item
    itemQty = record.insertCell(1);
    itemQty.innerHTML = data.Quantity;
    unitPrice = record.insertCell(2);
    unitPrice.innerHTML = data.UnitPrice;
    subtotal = record.insertCell(3);
    subtotal.innerHTML = data.Subtotal;
    // creating edit and delete actions
    saleAction = record.insertCell(4);
    saleAction.innerHTML = `<a onClick="editCurrentSale(this)">Edit</a>
    <a onClick="deleteCurrentSale(this)">Delete</a>`;
    closeForm();
    // giving appropriate message to user
    alert("New Sale added successfully!!");
}

// function to edit the existing item
function editCurrentSale(sale) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = sale.parentElement.parentElement;
    // editing the item details with the given values in respective cells
    selected.options[selected.selectedIndex].value = currentRecord.cells[0].innerHTML;
    document.getElementById("Quantity").value = currentRecord.cells[1].innerHTML;
    document.getElementById("UnitPrice").value = currentRecord.cells[2].innerHTML;
    document.getElementById("Subtotal").value = currentRecord.cells[3].innerHTML;
}

// function to delete the existing item
function deleteCurrentSale(sale) {
    // first of all asking the user for the confirmation
    if (confirm('You are about delete this item, please confirm')) {
        // getting currently or existed record the user wants to delete
        existSale = sale.parentElement.parentElement;
        // deleting the current item details
        document.getElementById("sale").deleteRow(existSale.rowIndex);
        // giving appropriate message to user
        alert("Sale deleted successfully!!");
        // clearing the fields
        clear();
    }
}

// function to update current record of the Item
function updateCurrentSale(sale) {
    // updating values in currenlty selected item
    currentRecord.cells[0].innerHTML = sale.Item;
    currentRecord.cells[1].innerHTML = sale.Quantity;
    currentRecord.cells[2].innerHTML = sale.UnitPrice;
    currentRecord.cells[3].innerHTML = sale.Subtotal;
    closeForm();
    // giving appropriate message to user
    alert("Sale details updated successfully!!");
}

// function to clear form
function clear() {
    // clearing inputed values in the form
    document.getElementById("saleForm").reset();
    // setting current record to null
    currentRecord = null;
}

// function to open the form on button click
function openForm() {
    document.getElementById("sleForm").style.display = "block";
    HideTable();
}

// function to close the form on button click
function closeForm() {
    document.getElementById("sleForm").style.display = "none";
    ShowTable();
}
function ShowTable() {
    document.getElementById("saleTable").style.display = "block";
}
function HideTable() {
    document.getElementById("saleTable").style.display = "none";
}

// function to search orders by item name
function searchSale() {
    // declaring variables to work with
    var name, filterSearch, table, tr, td, i, nameValue;
    // getting user input
    name = document.getElementById("searchName");
    // converting the name in upper case
    filterSearch = name.value.toUpperCase();
    // getting table by its id
    table = document.getElementById("sale");
    // getting row of cell
    tr = table.getElementsByTagName("tr");
    // looping through number of rows
    for (i = 0; i < tr.length; i++) {
        // getting data cell by which we are goona search
      td = tr[i].getElementsByTagName("td")[0];
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

function FillData() {
    selected.options[selected.selectedIndex].value = "Blade";
    document.getElementById("Quantity").value = "10";
    document.getElementById("UnitPrice").value = "12";
    document.getElementById("Subtotal").value = "120";
}
