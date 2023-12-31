//<script language="JavaScript" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

let items=[];
let customers = [];
let cart = [];

const loadData = () => {
    generateOrderId();
    let data = new Date().toISOString().split('T')[0];
    $('#date').html(data);
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
    if(qty>Number($('#qty-on-hand').val())){
        alert('Please Enter a Valid Qty');
        return;
    }
    let rowNumber = isExists($('#item-code').val())


    if (rowNumber!=-1){
        let existsTotal = cart[rowNumber].qty+qty;
        if(existsTotal > Number($('#qty-on-hand').val())){
            alert('Please Enter a Valid Qty');
            return;
        }
        cart[rowNumber].qty = existsTotal;
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
}

const setCartData = () =>{
    let rows = ``;
    cart.forEach(response=>{
        rows+=`<tr>
<td>${response.code}</td>
<td>${response.description}</td>
<td>${response.unitPrice}</td>
<td>${response.qty}</td>
<td>${response.total}</td>
<td><button class="btn btn-danger btn-sm" onclick="removeItem('${response.code}');" >Delete</button></td>
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
const generateOrderId=()=>{
    let tempOrderData = JSON.parse(localStorage.getItem('orders'));
    if (tempOrderData == null){
        $('#orderId').html("OD-1");
    }else {
        // let last = tempOrderData[tempOrderData.length-1];
        // let lastId = last.orderId;
        // let splitArrayValue = lastId.toString().split('-');
        // let stringId = splitArrayValue[0];
        // let numId = Number(stringId);
        // let incrementedId = numId++;
        // let finalId = "OD-"+incrementedId;
        // $('#orderId').html(finalId);
        let tempId = Number(tempOrderData[tempOrderData.length-1].orderId.split('-')[1])+1;
        let finalId = "OD-"+tempId;
        $('#orderId').html(finalId);

    }
}
function Order(orderId,date,total,customer,orderItems){
    this.orderId = orderId;
    this.date = date;
    this.total = total;
    this.customer = customer;
    this.orderItems = orderItems;
}
function OrderItems(code,qty,total){
    this.code = code;
    this.qty = qty
    this.total = total;
}
function placeOrder(){
    let tempOrderArr = [];
    let tempOrdersData = JSON.parse(localStorage.getItem('orders'));
    if (tempOrdersData !== null){
        tempOrderArr=tempOrdersData;
    }
    let orderItemsArr=[];
    cart.forEach(response=>{
        let item = new OrderItems(response.code,response.qty,response.total)
        orderItemsArr.push(item);
    });
    let order = new Order($('#orderId').html(),$('#date').html(),$('#total').html(),$('#customer-id').val(),orderItemsArr);
    tempOrderArr.push(order)
    localStorage.setItem('orders',JSON.stringify(tempOrderArr));

    updateItemQty(orderItemsArr);
    generateOrderId()
    cart=[];
    setCartData();
    alert("order placed");
}

const updateItemQty = (details)=>{
    let itemArr = JSON.parse(localStorage.getItem('items'));
    details.forEach(responseData=>{
        if (itemArr !== null){
            for (let i = 0; i < itemArr.length; i++) {
                if (itemArr[i].code === responseData.code){
                    itemArr[i].qtyOnHand = (itemArr[i].qtyOnHand - responseData.qty);
                    break;
                }
            }
        }
    });
    localStorage.setItem('items',JSON.stringify(itemArr));
    loadData();
}

const removeItem=(code)=>{
    if (confirm("are you sure? ")){
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].code === code){
                cart.splice(i,1);
                setCartData();
            }
        }
    }
}