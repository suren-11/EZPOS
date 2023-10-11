let items = [];

function Item(code, description, unitPrice, qtyOnHand) {
    this.code = code;
    this.description = description;
    this.unitPrice = unitPrice;
    this.qtyOnHand = qtyOnHand;
}

initializeItems = () => {
    let tempData = JSON.parse(localStorage.getItem('items'));
    if (tempData !== null) {
        items = tempData;
        console.log(tempData);
        setTableData();
    }
}

function setTableData(){
    searchText = $('#search').val();
    let htmlData = '';
    items.forEach(data => {
        if (data.description.includes(searchText)){
            htmlData += `<tr>
    <td>${data.code}</td>
    <td>${data.description}</td>
    <td>${data.unitPrice}</td>
    <td>${data.qtyOnHand}</td>
    <td>
    <button class="btn btn-success btn-sm" onclick="loadUpdateModel('${data.code}','${data.description}','${data.unitPrice}','${data.qtyOnHand}');" >Update</button> |
    <button class="btn btn-danger btn-sm" onclick="deleteModel('${data.code}')"; >Delete</button>
</td>
</tr>`;
        }

    });
    $('#table-body').html(htmlData);
}

function deleteModel(code){
    if (confirm('are you sure?')){
        for (let tempId=0; tempId<items.length; tempId++){
            if (items[tempId].code === code){
                items.splice(tempId,1);
                localStorage.setItem('items', JSON.stringify(items));
                launchModel('deleted!', 'Item deleted');
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

function saveItem() {
    let item = new Item(
        $('#itemCode').val(),
        $('#description').val(),
        Number($('#unitPrice').val()),
        Number($('#qtyOnHand').val())
    );

    if (items.find(data => data.code === item.code) === undefined) {
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        clearFields();
        launchModel('success!', 'Item Saved');
        setTableData();
    } else {
        launchModel('warning!', 'Already exists');
    }
}

const clearFields = () => {
    $('#itemCode').val('');
    $('#description').val('');
    $('#unitPrice').val('');
    $('#qtyOnHand').val('');
}
let tempCId = 0;
const loadUpdateModel=(code,description,unitPrice,qtyOnHand)=>{
    tempCId = code;
    $('#update-item-code').val(code);
    $('#update-item-description').val(description);
    $('#update-item-unitPrice').val(unitPrice);
    $('#update-item-qtyOnHand').val(qtyOnHand);

    $('#update-model').click();
}

function updateItem(){
    for (let tempId=0; tempId<items.length; tempId++){
        if (items[tempId].code === tempCId){
            items[tempId].description=$('#update-item-description').val();
            items[tempId].unitPrice=Number($('#update-item-unitPrice').val());
            items[tempId].qtyOnHand=Number($('#update-item-qtyOnHand').val());
            localStorage.setItem('items', JSON.stringify(items));
            $('#update-close').click();
            launchModel('updated!', 'Item updated');
            setTableData();
        }
    }
}
