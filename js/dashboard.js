loadUserDetails=()=>{
    let userDetails =
    JSON.parse(localStorage.getItem('user'));
    $('#userName').html(userDetails.name);
    $('#avatar').attr('src',userDetails.avatar);
}

setUi=(address)=>{
    if (address==='customer.html'){
        initializeCustomers();
    }
    $('#container').load(address);
}