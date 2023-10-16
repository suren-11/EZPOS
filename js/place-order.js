//<script language="JavaScript" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

let items=[];
let customers = [];
let cart = [];

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
function Cart(code,description,unitPrice,qty,total){
    this.code =code;
    this.description =description;
    this.unitPrice =unitPrice;
    this.qty =qty;
    this.total =total;
}

function addToCard(){
    let qty = Number($('#qty').val());
    let unitPrice = Number($('#unit-price').val());
    let total = qty * unitPrice;
    let rowNumber = isExists($('#item-code').val())

    if (rowNumber!=-1){
        cart[rowNumber].qty = cart[rowNumber].qty+qty;
        cart[rowNumber].total = cart[rowNumber].total+total;
    }else {
        let tempCart = new Cart(
            $('#item-code').val(),
            $('#description').val(),
            unitPrice,
            qty,
            total
        );
        cart.push(tempCart);
    }
   setCartData();
};

const setCartData = () =>{
    let rows = ``;
    cart.forEach(response=>{
        rows+=`<tr>
<td>${response.code}</td>
<td>${response.description}</td>
<td>${response.unitPrice}</td>
<td>${response.qty}</td>
<td>${response.total}</td>
<td><button class="btn btn-danger btn-sm" onclick="#" >Delete</button></td>
</tr>`
    });
$('#table').html(rows);
calculateTotal();
}

calculateTotal = () =>{
    let netTotal = 0;
    cart.forEach(response=>{
        netTotal+=response.total;
    });
    $('#total').html(netTotal);
}

const isExists = (code)=>{
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].code === code){
            return i;
        }
    }
    return -1;
}