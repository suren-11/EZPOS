loadUserDetails=()=>{
    try{
        let userDetails =
            JSON.parse(localStorage.getItem('user'));
        $('#userName').html(userDetails.name);
        $('#avatar').attr('src', userDetails.avatar);
        setUi('customer.html');
    }catch (e) {
        alert('something is wrong navigate to login page');
        window.location.replace('../index.html');
    }
}

setUi=(address)=>{
    if (address==='customer.html'){
        initializeCustomers();
    }
    $('#container').load(address);
}