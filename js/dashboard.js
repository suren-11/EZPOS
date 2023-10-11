loadUserDetails=()=>{
    // $('#item').hide();
    // $('#order').hide();
    // $('#placeOrder').hide();
    try{
        let userDetails =
            JSON.parse(localStorage.getItem('user'));
        $('#userName').html(userDetails.name);
        $('#avatar').attr('src', userDetails.avatar);

    }catch (e) {
        alert('something is wrong navigate to login page');
        window.location.replace('../index.html');
    }
}

function setUi(location){
    $('#frame').attr('src',location);

    // $('#customer').fadeOut(1000);
    // $('#item').fadeOut(1000);
    // $('#order').fadeOut(1000);
    // $('#placeOrder').fadeOut(1000);

    /*switch (id) {
        case "customer":$('#frame').attr('src','../pages/customer.html');break;
        case "item":$('#frame').attr('src','../pages/item.html');break;
        case "order":$('#frame').attr('src','../pages/orders.html');break;
        case "placeOrder":$('#frame').attr('src','../pages/place-order.html');break;
    }*/
}