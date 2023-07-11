// getting selected option
var selected = document.getElementById("suppliername");

//function to validate user input
function validateData() {
    // initially setting to true
    isValidated = true;
    // checking the fields are empty or not
    if (document.getElementById("name").value == "" || 
        document.getElementById("size").value == "" ||
        document.getElementById("qtyperpack").value == "" ||
        selected.options[selected.selectedIndex].value == "default" ||
        document.getElementById("upc").value == "") {
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
    userData["name"] = document.getElementById("name").value;
    userData["size"] = document.getElementById("size").value;
    userData["qtyperpack"] = document.getElementById("qtyperpack").value;
    userData["suppliername"] = selected.options[selected.selectedIndex].value;
    userData["upc"] = document.getElementById("upc").value;
    return userData;
}

// getting current record and inializing as null
var currentRecord = null;

//function to perform action on Add button
function addItem() {
    // first validating entered data
    if (validateData()) {
        // getting user inputs for each field
        var data = getData();
        // if current record is null
        if (currentRecord == null)
            // will create new item
            InsertItem(data);
        else
            // will update current item record
            updateCurrentItem(data);
        // clearing the fields
        clear();
    }
}

// function to create or insert new item
function InsertItem(data) {
    // getting the table by its id
    var inventoryTable = document.getElementById("inventory").getElementsByTagName('tbody')[0];
    // getting the record to insert
    var record = inventoryTable.insertRow(inventoryTable.length);
    // now inserting the record into the table cells
    itemName = record.insertCell(0);
    itemName.innerHTML = data.name;
    itemSize = record.insertCell(1);
    itemSize.innerHTML = data.size;
    itemQty = record.insertCell(2);
    itemQty.innerHTML = data.qtyperpack;
    itemSupplier = record.insertCell(3);
    itemSupplier.innerHTML = data.suppliername;
    itemUpc = record.insertCell(4);
    itemUpc.innerHTML = data.upc;
    // creating edit and delete actions
    itemAction = record.insertCell(5);
    itemAction.innerHTML = `<a onClick="editCurrentItem(this)">Edit</a>
    <a onClick="deleteCurrentItem(this)">Delete</a>`;
    closeForm();
    // giving appropriate message to user
    alert("New Item added successfully!!");
}

// function to edit the existing item
function editCurrentItem(item) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = item.parentElement.parentElement;
    // editing the item details with the given values in respective cells
    document.getElementById("name").value = currentRecord.cells[0].innerHTML;
    document.getElementById("size").value = currentRecord.cells[1].innerHTML;
    document.getElementById("qtyperpack").value = currentRecord.cells[2].innerHTML;
    selected.options[selected.selectedIndex].innerHTML = currentRecord.cells[3].innerHTML;
    document.getElementById("upc").value = currentRecord.cells[4].innerHTML;
}

// function to delete the existing item
function deleteCurrentItem(item) {
    // first of all asking the user for the confirmation
    if (confirm('You are about delete this item, please confirm')) {
        // getting currently or existed record the user wants to delete
        existItem = item.parentElement.parentElement;
        // deleting the current item details
        document.getElementById("inventory").deleteRow(existItem.rowIndex);
        // giving appropriate message to user
        alert("Item deleted successfully!!");
        // clearing the fields
        clear();
    }
}

// function to update current record of the Item
function updateCurrentItem(item) {
    // updating values in currenlty selected item
    currentRecord.cells[0].innerHTML = item.name;
    currentRecord.cells[1].innerHTML = item.size;
    currentRecord.cells[2].innerHTML = item.qtyperpack;
    currentRecord.cells[3].innerHTML = item.suppliername;
    currentRecord.cells[4].innerHTML = item.upc;
    closeForm();
    // giving appropriate message to user
    alert("Item details updated successfully!!");
}

// function to clear form
function clear() {
    // clearing inputed values in the form
    document.getElementById("inventoryForm").reset();
    // setting current record to null
    currentRecord = null;
}

// function to open the form on button click
function openForm() {
    document.getElementById("inveForm").style.display = "block";
    HideTable();
}

// function to close the form on button click
function closeForm() {
    document.getElementById("inveForm").style.display = "none";
    ShowTable();
}
function ShowTable() {
    document.getElementById("invTable").style.display = "block";
}
function HideTable() {
    document.getElementById("invTable").style.display = "none";
}
// function to search items by their name
function searchItem() {
    // declaring variables to work with
    var name, filterSearch, table, tr, td, i, nameValue;
    // getting user input
    name = document.getElementById("searchName");
    // converting the name in upper case
    filterSearch = name.value.toUpperCase();
    // getting table by its id
    table = document.getElementById("inventory");
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
    document.getElementById("name").value = "Key";
    document.getElementById("size").value ="5";
    document.getElementById("qtyperpack").value = "10";
    selected.options[selected.selectedIndex].value = "Aramco Co.";
    document.getElementById("upc").value = "2651254510";
}