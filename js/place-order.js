//<script language="JavaScript" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

let items=[];
let customers = [];

const loadData = () => {

    let temp = JSON.parse(localStorage.getItem('customers'));
    if (temp !== null) {
        customers = temp;
        let customerOption = '';
        customers.forEach(response => {
            customerOption += `<option value="${response.id}" >${response.id}</option>`;
        });
        $('#customer-id').append(customerOption);
        loadCustomerData();
    }

    let tempData = JSON.parse(localStorage.getItem('items'));
    if (tempData !== null) {
        items = tempData;
        let itemOption = '';
        items.forEach(response => {
            itemOption += `<option value="${response.code}" >${response.code}</option>`
        });
        $('#item-code').append(itemOption);
        loadItemData();
    }


    $('#customer-id').change(() => {
        loadCustomerData();
    });

    $('#item-code').change(() => {
        loadItemData();
    });
}
function loadCustomerData(){
    let temId = $('#customer-id').val();
    let customer = customers.find(response=>response.id==temId);
    $('#name').val(customer.name);
    $('#address').val(customer.address);
    $('#salary').val(customer.salary);
}
function loadItemData(){
    let tempCode = $('#item-code').val();
    let item = items.find(response=>response.code==tempCode);
    $('#description').val(item.description);
    $('#unit-price').val(item.unitPrice);
    $('#qty-on-hand').val(item.qtyOnHand);
}