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
    <button class="btn btn-success btn-sm" onclick="loadUpdateModel('${data.id}','${data.name}','${data.address}','${data.salary}');" >Update</button> |
    <button class="btn btn-danger btn-sm" onclick="deleteModel('${data.id}')"; >Delete</button>
</td>
</tr>`;
    });
    $('#table-body').html(htmlData);
}

function deleteModel(id){
   if (confirm('are you sure?')){
       for (let tempId=0; tempId<customers.length; tempId++){
           if (customers[tempId].id === id){
               customers.splice(tempId,1);
               localStorage.setItem('customers', JSON.stringify(customers));
               launchModel('deleted!', 'Customer deleted');
               setTableData();
           }
       }
   }
}

const launchModel = (type, message) => {
    //document.getElementById('success-model').click();
    $('#saveExampleModalLabel').html(type);
    $('#save-data-modal-body').html(message);

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
        setTableData();
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
let tempCId = 0;
const loadUpdateModel=(id,name,address,salary)=>{
    tempCId = id;
    $('#update-customer-id').val(id);
    $('#update-customer-name').val(name);
    $('#update-customer-address').val(address);
    $('#update-customer-salary').val(salary);

    $('#update-model').click();
}

function updateCustomer(){
    for (let tempId=0; tempId<customers.length; tempId++){
        if (customers[tempId].id === tempCId){
            customers[tempId].name=$('#update-customer-name').val();
            customers[tempId].address=$('#update-customer-address').val();
            customers[tempId].salary=Number($('#update-customer-salary').val());
            localStorage.setItem('customers', JSON.stringify(customers));
            $('#update-close').click();
            launchModel('updated!', 'Customer updated');
            setTableData();
        }
    }
}
