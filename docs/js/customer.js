// getting selected option
var selected = document.getElementById("provCode");
//function to validate user input
function validateInputData() {
    // initially setting to true
    isValidated = true;
    // checking the fields are empty or not
    if (document.getElementById("firstname").value == "" || 
        document.getElementById("lastname").value == "" ||
        document.getElementById("phone").value == "" ||
        document.getElementById("address").value == "" ||
        selected.options[selected.selectedIndex].value == "default" ||
        document.getElementById("postal").value == "") {
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
    userData["firstname"] = document.getElementById("firstname").value;
    userData["lastname"] = document.getElementById("lastname").value;
    userData["phone"] = document.getElementById("phone").value;
    userData["address"] = document.getElementById("address").value;
    userData["provCode"] = selected.options[selected.selectedIndex].value;
    userData["postal"] = document.getElementById("postal").value;
    return userData;
}

// getting current record and inializing as null
var currentRecord = null;

//function to perform action on Add button
function addCustomer() {
    // first validating entered data
    if (validateInputData()) {
        // getting user inputs for each field
        var data = getUserData();
        // if current record is null
        if (currentRecord == null)
            // will create new customer
            createCustomer(data);
        else
            // will update current customer record
            updateCurrentCustomer(data);
        // clearing the fields
        clear();
    }
}
var detail = document.getElementById("custDetails");

var span = document.getElementsByClassName("close")[0];
var addr;
var provcode;
var postalcode;

// function to create or insert new customer
function createCustomer(data) {
    // getting the table by its id
    var custTable = document.getElementById("customers").getElementsByTagName('tbody')[0];
    // getting the record to insert
    var record = custTable.insertRow(custTable.length);
    // now inserting the record into the table cells
    custFirst = record.insertCell(0);
    custFirst.innerHTML = data.firstname;
    custLast = record.insertCell(1);
    custLast.innerHTML = data.lastname;
    custPhone = record.insertCell(2);
    custPhone.innerHTML = data.phone;
    addr = data.address;
    provcode = data.provCode;
    postalcode = data.postal;
    
    custDetails = record.insertCell(3);
    custDetails.innerHTML = `<a onClick="DisplayCustomer()">See Details</a>`;
    // creating edit and delete actions
    custAction = record.insertCell(4);
    custAction.innerHTML = `<a onClick="editCurrentCustomer(this)">Edit</a>
    <a onClick="deleteCurrentCustomer(this)">Delete</a>`;
    closeForm();
    // giving appropriate message to user
    alert("New Customer added successfully!!");
}

function DisplayCustomer(){
    document.getElementById("details").innerHTML = "<b>Address</b> : "+ addr+ "<br><b>Province Code</b> : "+provcode +"<br><b>Postal Code</b> : "+postalcode;
    detail.style.display = "block";
}
span.onclick = function() {
    detail.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == detail) {
        detail.style.display = "none";
    }
}
// function to edit the existing customer
function editCurrentCustomer(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = addr;
    selected.options[selected.selectedIndex].value = provcode;
    document.getElementById("postal").value = postalcode;
}

// function to delete the existing customer
function deleteCurrentCustomer(customer) {
    // first of all asking the user for the confirmation
    if (confirm('You are about delete this customer, please confirm')) {
        // getting currently or existed record the user wants to delete
        existCustomer = customer.parentElement.parentElement;
        // deleting the current customer details
        document.getElementById("customers").deleteRow(existCustomer.rowIndex);
        // giving appropriate message to user
        alert("Customer deleted successfully!!");
        // clearing the fields
        clear();
    }
}

// function to update current record of the customer
function updateCurrentCustomer(customer) {
    // updating values in currenlty selected customer
    currentRecord.cells[0].innerHTML = customer.firstname;
    currentRecord.cells[1].innerHTML = customer.lastname;
    currentRecord.cells[2].innerHTML = customer.phone;
    addr = customer.address;
    provcode = customer.provCode;
    postalcode = customer.postal;
    closeForm();
    // giving appropriate message to user
    alert("Customer details updated successfully!!");
}

// function to clear form
function clear() {
    // clearing inputed values in the form
    document.getElementById("customerForm").reset();
    // setting current record to null
    currentRecord = null;
}

// function to open the form on button click
function openForm() {
    document.getElementById("custForm").style.display = "block";
    HideTable();
}

// function to close the form on button click
function closeForm() {
    document.getElementById("custForm").style.display = "none";
    ShowTable();
}
function ShowTable() {
    document.getElementById("custTable").style.display = "block";
}
function HideTable() {
    document.getElementById("custTable").style.display = "none";
}

// function to search customer by their name
function searchLastCustomer() {
    // declaring variables to work with
    var name, filterSearch, table, tr, td, i, nameValue;
    // getting user input
    name = document.getElementById("searchName");
    // converting the name in upper case
    filterSearch = name.value.toUpperCase();
    // getting table by its id
    table = document.getElementById("customers");
    // getting row of cell
    tr = table.getElementsByTagName("tr");
    // looping through number of rows
    for (i = 0; i < tr.length; i++) {
        // getting data cell by which we are gonna search
      td = tr[i].getElementsByTagName("td")[1];
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

// function to search customer by their phone
function searchPhoneCustomer() {
    // declaring variables to work with
    var name, filterSearch, table, tr, td, i, nameValue;
    // getting user input
    name = document.getElementById("searchPhone");
    filterSearch = name.value;
    // getting table by its id
    table = document.getElementById("customers");
    // getting row of cell
    tr = table.getElementsByTagName("tr");
    // looping through number of rows
    for (i = 0; i < tr.length; i++) {
        // getting data cell by which we are gonna search
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        nameValue = td.textContent || td.innerText;
        if (nameValue.indexOf(filterSearch) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

function DisplayKevin(){
    document.getElementById("details").innerHTML = "<b>Address</b> : 123, Niagara St, Welland <br><b>Province Code</b> : ON <br><b>Postal Code</b> : M3C 6A7";
    detail.style.display = "block";
}
function editKevin(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = "123, Niagara St, Welland";
    selected.options[selected.selectedIndex].innerHTML = "ON";
    document.getElementById("postal").value = "M3C 6A7";
}

function DisplayAlex(){
    document.getElementById("details").innerHTML = "<b>Address</b> : 21, Holland St, Regina <br><b>Province Code</b> : SK <br><b>Postal Code</b> : B6C 5Z9";
    detail.style.display = "block";
}
function editAlex(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = "21, Holland St, Regina";
    selected.options[selected.selectedIndex].innerHTML = "SK";
    document.getElementById("postal").value = "B6C 5Z9";
}

function DisplayAlonso(){
    document.getElementById("details").innerHTML = "<b>Address</b> : 12, Summit Ave, Fonthill <br><b>Province Code</b> : ON <br><b>Postal Code</b> : C5A 6L1";
    detail.style.display = "block";
}
function editAlonso(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = "12, Summit Ave, Fonthill";
    selected.options[selected.selectedIndex].innerHTML = "ON";
    document.getElementById("postal").value = "C5A 6L1";
}
function DisplayZack(){
    document.getElementById("details").innerHTML = "<b>Address</b> : 305, Charles Dr, Montreal <br><b>Province Code</b> : QC <br><b>Postal Code</b> : B5A 3L2";
    detail.style.display = "block";
}
function editZack(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = "305, Charles Dr, Montreal";
    selected.options[selected.selectedIndex].innerHTML = "QC";
    document.getElementById("postal").value = "B5A 3L2";
}
function DisplayMike(){
    document.getElementById("details").innerHTML = "<b>Address</b> : 210, Thorold St, Welland <br><b>Province Code</b> : ON <br><b>Postal Code</b> : L9V 8C4";
    detail.style.display = "block";
}
function editMike(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = "210, Thorold St, Welland";
    selected.options[selected.selectedIndex].innerHTML = "ON";
    document.getElementById("postal").value = "L9V 8C4";
}
function DisplaySergio(){
    document.getElementById("details").innerHTML = "<b>Address</b> : 44, Rolling St, Winnipeg <br><b>Province Code</b> : MB <br><b>Postal Code</b> : B9C 6A4";
    detail.style.display = "block";
}
function editSergio(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = "44, Rolling St, Winnipeg";
    selected.options[selected.selectedIndex].innerHTML = "MB";
    document.getElementById("postal").value = "B9C 6A4";
}
function DisplayCarlos(){
    document.getElementById("details").innerHTML = "<b>Address</b> : 1, Marco Ave, Granby <br><b>Province Code</b> : QC <br><b>Postal Code</b> : L6S 3F7";
    detail.style.display = "block";
}
function editCarlos(customer) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = customer.parentElement.parentElement;
    // editing the supplier details with the given values in respective cells
    document.getElementById("firstname").value = currentRecord.cells[0].innerHTML;
    document.getElementById("lastname").value = currentRecord.cells[1].innerHTML;
    document.getElementById("phone").value = currentRecord.cells[2].innerHTML;
    document.getElementById("address").value = "1, Marco Ave, Granby";
    selected.options[selected.selectedIndex].innerHTML = "QC";
    document.getElementById("postal").value = "L6S 3F7";
}


function FillData() {
    document.getElementById("firstname").value = "Lewis";
    document.getElementById("lastname").value = "Hamilton";
    document.getElementById("phone").value = "6597458540";
    document.getElementById("address").value = "362, Lake View Dr, North York";
    selected.options[selected.selectedIndex].value = "ON";
    document.getElementById("postal").value = "M2B 5S9";
}