
//function to validate user input
function validateInputData() {
    // initially setting to true
    isValidated = true;
    // checking the fields are empty or not
    if (document.getElementById("name").value == "" || 
        document.getElementById("items").value == "" ||
        document.getElementById("address").value == "" ) {
            isValidated = false;
    } 
    else {
        isValidated = true;
    }
    return isValidated;
}

// function to get user entered data
function getUserData() {
    var userData = {};
    userData["name"] = document.getElementById("name").value;
    userData["items"] = document.getElementById("items").value;
    userData["address"] = document.getElementById("address").value;
    return userData;
}

// getting current record and inializing as null
var currentRecord = null;

//function to perform action on Add button
function addSupplier() {
    // first validating entered data
    if (validateInputData()) {
        // getting user inputs for each field
        var data = getUserData();
        // if current record is null
        if (currentRecord == null)
            // will create new supplier
            createSupplier(data);
        else
            // will update current supplier record
            updateCurrentSupplier(data);
        // clearing the fields
        clear();
    }
}

// function to create or insert new supplier
function createSupplier(data) {
    // getting the table by its id
    var supplierTable = document.getElementById("suppliers").getElementsByTagName('tbody')[0];
    // getting the record to insert
    var record = supplierTable.insertRow(supplierTable.length);
    // now inserting the record into the table cells
    supplierName = record.insertCell(0);
    supplierName.innerHTML = data.name;
    supplierItems = record.insertCell(1);
    supplierItems.innerHTML = data.items;
    supplierAdd = record.insertCell(2);
    supplierAdd.innerHTML = data.address;
    // creating edit and delete actions
    supplierAction = record.insertCell(3);
    supplierAction.innerHTML = `<a onClick="editCurrentSupplier(this)">Edit</a>
    <a onClick="deleteCurrentSupplier(this)">Delete</a>`;
    closeForm();
    // giving appropriate message to user
    alert("New supplier added successfully!!");
}

// function to edit the existing supplier
function editCurrentSupplier(supplier) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = supplier.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("name").value = currentRecord.cells[0].innerHTML;
    document.getElementById("items").value = currentRecord.cells[1].innerHTML;
    document.getElementById("address").value = currentRecord.cells[2].innerHTML;
}

// function to delete the existing supplier
function deleteCurrentSupplier(supplier) {
    // first of all asking the user for the confirmation
    if (confirm('You are about delete this supplier, please confirm')) {
        // getting currently or existed record the user wants to delete
        existSupplier = supplier.parentElement.parentElement;
        // deleting the current supplier details
        document.getElementById("suppliers").deleteRow(existSupplier.rowIndex);
        // giving appropriate message to user
        alert("Supplier deleted successfully!!");
        // clearing the fields
        clear();
    }
}

// function to update current record of the supplier
function updateCurrentSupplier(supplier) {
    // updating values in currenlty selected supplier
    currentRecord.cells[0].innerHTML = supplier.name;
    currentRecord.cells[1].innerHTML = supplier.items;
    currentRecord.cells[2].innerHTML = supplier.address;
    closeForm();
    // giving appropriate message to user
    alert("Supplier details updated successfully!!");
}

// function to clear form
function clear() {
    // clearing inputed values in the form
    document.getElementById("supplierForm").reset();
    // setting current record to null
    currentRecord = null;
}

// function to open the form on button click
function openForm() {
    document.getElementById("suppForm").style.display = "block";
    HideTable();
}

// function to close the form on button click
function closeForm() {
    document.getElementById("suppForm").style.display = "none";
    ShowTable();
}
function ShowTable() {
    document.getElementById("suppTable").style.display = "block";
}
function HideTable() {
    document.getElementById("suppTable").style.display = "none";
}
// function to search supplier by their name
function searchSupplier() {
    // declaring variables to work with
    var name, filterSearch, table, tr, td, i, nameValue;
    // getting user input
    name = document.getElementById("searchName");
    // converting the name in upper case
    filterSearch = name.value.toUpperCase();
    // getting table by its id
    table = document.getElementById("suppliers");
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
    document.getElementById("name").value = "Nic's Company";
    document.getElementById("items").value = "Key";
    document.getElementById("address").value = "236 Charles Dr, Welland";
}