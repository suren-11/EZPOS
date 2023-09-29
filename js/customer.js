let customers = [];

function Customer(id, name, address, salary) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.salary = salary;
}

initializeCustomers = () => {
    let tempData = JSON.parse(localStorage.getItem('customers'));
    if (tempData !== null) {
        customers=tempData;
        console.log(tempData);
    }
}

const launchModel = ()=>{
    document.getElementById('success-model').click();
    $('#success-model').click();
}

function saveCustomer() {
    let customer = new Customer(
        $('#customerId').val(),
        $('#customerName').val(),
        $('#customerAddress').val(),
        Number($('#customerSalary').val())
    );

    if (customers.find(data=>data.id==customer.id)===undefined){
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        clearFields();
        launchModel();
    }else {
        alert('Already Exists!');
    }
}

const clearFields = () => {
    $('#customerId').val('');
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#customerSalary').val('');
}