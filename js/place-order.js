let items=[];
let customers = [];

const loadData = () => {

    let temp = JSON.parse(localStorage.getItem('customers'));
    if (temp !== null) {
        customers = temp;
        console.log(temp);
        let customerOption = '';
        customers.forEach(response=>{
           customerOption+=`<option value="${response.id}" >${response.id}</option>`;
        });
        $('#customer-id').append(customerOption);
    }

    let tempData = JSON.parse(localStorage.getItem('items'));
    if (tempData !== null) {
        items = tempData;
        console.log(tempData);
        let itemOption = '';
        items.forEach(response=>{
            itemOption+= `<option value="${response.code}" >${response.code}</option>`
        });
        $('#item-code').append(itemOption);
    }
}