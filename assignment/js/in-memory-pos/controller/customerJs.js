initiateUI();

function initiateUI() {
    clearAll();
    $("#dashboard").css("display", "block");

    setTheLastView();
}

function clearAll() {
    $("#dashboard, #customerContent,#itemContent,#orderContent").css('display', 'none');
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "dashboard":
            localStorage.setItem("view", "DASHBOARD");
            break;
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "orderContent":
            localStorage.setItem("view", "ORDER");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "DASHBOARD":
            setView($("#dashboard"));
            break;
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "ORDER":
            setView($("#orderContent"));
            break;
        default:
            setView($("#dashboard"));
    }
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

$("#home").click(function () {
    setView($("#dashboard"));
});

$("#customer").click(function () {
    setView($("#customerContent"));
});

$("#orders").click(function () {
    setView($("#orderContent"));
});

$("#items").click(function () {
    setView($("#itemContent"));
});

/*$("#txtCustomerID").val(generateNewId());*/
$("#save").click(function () {

    saveCustomer();
});

function saveCustomer() {
    let cusId = generateNewId();/*$("#txtCustomerID").val();*/
    if (searchCustomer(cusId.trim()) == undefined) {
        let cusName = $("#txtCustomerName").val();
        let cusAddress = $("#txtCustomerAddress").val();
        let cusContact = $("#txtCustomerContact").val();

        /* var customerObject = {
             id: cusId,
             name: cusName,
             address: cusAddress,
             contact: cusContact

         }*/

        let newCustomer= Object.assign({},customerObject);
        newCustomer.id=cusId;
        newCustomer.name=cusName;
        newCustomer.address=cusAddress;
        newCustomer.contact=cusContact;

        customers.push(newCustomer);

        clearCustomerInputFields();
        loadAllCustomers();
        loadAllCustomerId();
        bindRowClickEvents();

    } else {
        alert("Customer already exits.!");
    }

}

function generateNewId() {
    if (customers.length !== 0) {
        let lastID = customers[customers.length - 1].id;
        let oldValue = lastID.slice(-1);
        let newValue = +oldValue +1;
        return "C00-00" + newValue;
    } else {
        return "C00-001";
    }
}

/*function genarateNewId(){

    if (customers.length){
        let ids=customers
        let newCustomerId=parseInt(ids.replace("C00-",""))+1;
        return String.format("C00-%03d",newCustomerId);
    }else {
        return "C00-001";
    }
}*/


function clearAllDataCustomer() {
    $('#txtCustomerID').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContact').val("");
}



function bindRowClickEvents() {

    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContact').val(contact);

        /* setCusButtonUpdate(2);
         $("#btnUpdate").attr('disabled', false);*/
    });
    /* $("#btnUpdate").attr('disabled', disabled);*/


}

function setCusButtonUpdate(values) {
    if (values > 1) {
        $("#btnUpdate").attr('disabled', true);
    } else {
        $("#btnUpdate").attr('disabled', );
    }
}


function loadAllCustomers() {

    $("#tblCustomer").empty();

    for (var customer of customers) {
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;

        $("#tblCustomer").append(row);
    }
}


$("#btnDelete").click(function () {

    let deleteId = $("#txtCustomerID").val();

    let option = confirm("Do you Sure?" + deleteId);
    if (option) {
        if (deleteCustomer(deleteId)) {
            alert("Customer Successfully Deleted..");
            setTextfieldValues("", "", "", "");
        } else {
            alert("No such customer to delete");
        }
    }
});


$("#btnClear").click(function () {
    clearAllDataCustomer();
});

$("#btnUpdate").click(function () {

    let customerID = $("#txtCustomerID").val();
    let response = updateCustomer(customerID);
    if (response) {
        alert("Customer Updated Successfully");
        setTextfieldValues("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});


$("#txtCustomerID").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtCustomerID").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            setTextfieldValues(customer.id, customer.name, customer.address, customer.contact);
        } else {
            alert("There is no cusotmer available for that " + typedId);
            setTextfieldValues("", "", "", "");
        }
    }
});

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function setTextfieldValues(id, name, address, contact) {
    bindRowClickEvents();
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerContact").val(contact);
}

/*function searchCustomer(id) {
    return customers.find(function (customer) {
        //if the search id match with customer record
        //then return that object
        return customer.id == id;
    });
}*/

function searchCustomer(id) {
    for (let customer of customers) {
        if (customer.id == id) {
            return customer;
        }
    }
    return null;
}

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerID").val();
        customer.name = $("#txtCustomerName").val();
        customer.address = $("#txtCustomerAddress").val();
        customer.contact = $("#txtCustomerContact").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }

}


function trCusSelector() {

    $("#tblCustomer>tr").click(function (){
        let id=$(this).children(':eq(0)').text();
        let name=$(this).children(':eq(1)').text();
        let address=$(this).children(':eq(2)').text();
        let contact=$(this).children(':eq(3)').text();

        console.log(id+"  "+name+"  "+address+" "+contact);

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContact').val(contact);



    });

}

