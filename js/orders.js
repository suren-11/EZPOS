let orders=[];

const initOrders=()=>{
    let tempData = JSON.parse(localStorage.getItem('orders'));
    if (tempData!==null){
        orders = tempData
        setTableData();
    }
}
function setTableData(){
    let rowData='';
    orders.forEach(responseData=>{
        rowData+=`<tr>
<td>${responseData.orderId}</td>
<td>${responseData.date}</td>
<td>${responseData.total}</td>
<td><button class="btn btn-primary btn-sm" onclick="showDetails('${responseData.orderId}');" >Show Details</button></td>
</tr>`
    });
    $('#table').html(rowData);
}

const showDetails=(id)=>{
    const order = orders.find((e)=>id===e.orderId);
    if(order!==undefined){
        $('#orderId').html(order.orderId);
        $('#orderCost').html(order.total);
        $('#orderDate').html(order.date);
        $('#customerId').html(order.customer);
        let customer = JSON.parse(localStorage.getItem('customers'));
        if(customer!=null){
            let tempCustomer =customer.find(e=>e.id===order.customer);
            $('#customerName').html(tempCustomer.name);
        }
        let itemRow='';
        order.orderItems.forEach(response=>{
            let desc='';
            let unitPrice='';
            let item = JSON.parse(localStorage.getItem('items'));
            if(item!=null){
                let tempItem =item.find(e=>e.code===response.code);
                desc = tempItem.description;
                unitPrice = tempItem.unitPrice;
            }
            itemRow+=`<tr>
<td>${response.code}</td>
<td>${desc}</td>
<td>${unitPrice}</td>
<td>${response.qty}</td>
<td>${response.total}</td>
</tr>`;
        });
        $('#iTable').html(itemRow);
        $('#model-button').click();

    }
}

