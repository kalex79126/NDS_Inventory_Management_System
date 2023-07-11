var selected = document.getElementById("Payment");

//function to validate user input
function validateData() {
    // initially setting to true
    isValidated = true;
    // checking the fields are empty or not
    if ( 
        document.getElementById("ItemName").value == "" ||
        document.getElementById("Quantity").value == "" ||
        document.getElementById("Size").value == "" ||
        selected.options[selected.selectedIndex].value == "default" ||
        document.getElementById("TotalAmount").value == ""  ||
        document.getElementById("AmountTendered").value == "") {
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
    userData["ItemName"] = document.getElementById("ItemName").value;
    userData["Size"] = document.getElementById("Size").value;
    userData["Quantity"] = document.getElementById("Quantity").value;
    userData["Payment"] = selected.options[selected.selectedIndex].value;
    userData["TotalAmount"] = document.getElementById("TotalAmount").value;
    userData["AmountTendered"] = document.getElementById("AmountTendered").value;
    return userData;
}

// getting current record and inializing as null
var currentRecord = null;

//function to perform action on Add button
function addOrder() {
    // first validating entered data
    if (validateData()) {
        // getting user inputs for each field
        var data = getData();
        // if current record is null
        if (currentRecord == null)
            // will create new order
            InsertOrder(data);
        else
            // will update current order record
            updateCurrentOrder(data);
        // clearing the fields
        clear();
    }
}

// function to create or insert new order
function InsertOrder(data) {
    // getting the table by its id
    var orderTable = document.getElementById("order").getElementsByTagName('tbody')[0];
    // getting the record to insert
    var record = orderTable.insertRow(orderTable.length);
    // now inserting the record into the table cells
    itemName = record.insertCell(0);
    itemName.innerHTML = data.ItemName;
    itemSize = record.insertCell(1);
    itemSize.innerHTML = data.Size;
    itemQty = record.insertCell(2);
    itemQty.innerHTML = data.Quantity;
    payment = record.insertCell(3);
    payment.innerHTML = data.Payment;
    totalAmount = record.insertCell(4);
    totalAmount.innerHTML = data.TotalAmount
    amountTendered = record.insertCell(5);
    amountTendered.innerHTML = data.AmountTendered;
    // creating edit and delete actions
    orderAction = record.insertCell(6);
    orderAction.innerHTML = `<a onClick="editCurrentOrder(this)">Edit</a>
    <a onClick="deleteCurrentOrder(this)">Delete</a>`;
    closeForm();
    // giving appropriate message to user
    alert("New Order added successfully!!");
}

// function to edit the existing item
function editCurrentOrder(order) {
    openForm();
    // getting currently or existed record the user wants to update
    currentRecord = order.parentElement.parentElement;
    // editing the item details with the given values in respective cells
    document.getElementById("ItemName").value = currentRecord.cells[0].innerHTML;
    document.getElementById("Size").value = currentRecord.cells[1].innerHTML;
    document.getElementById("Quantity").value = currentRecord.cells[2].innerHTML;
    selected.options[selected.selectedIndex].innerHTML = currentRecord.cells[3].innerHTML;
    document.getElementById("TotalAmount").value = currentRecord.cells[4].innerHTML;
    document.getElementById("AmountTendered").value = currentRecord.cells[5].innerHTML;
}

// function to delete the existing item
function deleteCurrentOrder(order) {
    // first of all asking the user for the confirmation
    if (confirm('You are about delete this item, please confirm')) {
        // getting currently or existed record the user wants to delete
        existOrder = order.parentElement.parentElement;
        // deleting the current item details
        document.getElementById("order").deleteRow(existOrder.rowIndex);
        // giving appropriate message to user
        alert("Order deleted successfully!!");
        // clearing the fields
        clear();
    }
}

// function to update current record of the Item
function updateCurrentOrder(order) {
    // updating values in currenlty selected item
    currentRecord.cells[0].innerHTML = order.ItemName;
    currentRecord.cells[1].innerHTML = order.Size;
    currentRecord.cells[2].innerHTML = order.Quantity;
    currentRecord.cells[3].innerHTML = order.Payment;
    currentRecord.cells[4].innerHTML = order.TotalAmount;
    currentRecord.cells[5].innerHTML = order.AmountTendered;
    closeForm();
    // giving appropriate message to user
    alert("Item details updated successfully!!");
}

// function to clear form
function clear() {
    // clearing inputed values in the form
    document.getElementById("orderForm").reset();
    // setting current record to null
    currentRecord = null;
}

// function to open the form on button click
function openForm() {
    document.getElementById("ordForm").style.display = "block";
    HideTable();
}

// function to close the form on button click
function closeForm() {
    document.getElementById("ordForm").style.display = "none";
    ShowTable();
}
function ShowTable() {
    document.getElementById("ordTable").style.display = "block";
}
function HideTable() {
    document.getElementById("ordTable").style.display = "none";
}
// function to search orders by item name
function searchOrder() {
    // declaring variables to work with
    var name, filterSearch, table, tr, td, i, nameValue;
    // getting user input
    name = document.getElementById("searchName");
    // converting the name in upper case
    filterSearch = name.value.toUpperCase();
    // getting table by its id
    table = document.getElementById("order");
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
