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