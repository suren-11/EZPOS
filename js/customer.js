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
        customers = tempData;
        console.log(tempData);
        setTableData();
    }
}

function setTableData(){
    let htmlData = '';
    customers.forEach(data => {
        htmlData += `<tr>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.address}</td>
    <td>${data.salary}</td>
    <td>
    <button class="btn btn-success btn-sm" >Update</button> |
    <button class="btn btn-danger btn-sm" >Delete</button>
</td>
</tr>`;
    });
    $('#table-body').html(htmlData);
}

const launchModel = (type, message) => {
    //document.getElementById('success-model').click();
    $('#exampleModalLabel').html(type);
    $('#modal-body').html(message);

    $('#success-model').click();
}

function saveCustomer() {
    let customer = new Customer(
        $('#customerId').val(),
        $('#customerName').val(),
        $('#customerAddress').val(),
        Number($('#customerSalary').val())
    );

    if (customers.find(data => data.id == customer.id) === undefined) {
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        clearFields();
        launchModel('success!', 'Customer Saved');
    } else {
        launchModel('warning!', 'Already exists');
    }
}

const clearFields = () => {
    $('#customerId').val('');
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#customerSalary').val('');
}