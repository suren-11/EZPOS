loadUserDetails=()=>{
    $('#item').hide();
    $('#order').hide();
    $('#placeOrder').hide();
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

function setUi(id){

    $('#customer').fadeOut(1000);
    $('#item').fadeOut(1000);
    $('#order').fadeOut(1000);
    $('#placeOrder').fadeOut(1000);

    switch (id) {
        case "customer":$('#customer').fadeIn(1000);break;
        case "item":$('#item').fadeIn(1000);break;
        case "order":$('#order').fadeOut(1000);break;
        case "placeOrder":$('#placeOrder').fadeOut(1000);break;
    }
}