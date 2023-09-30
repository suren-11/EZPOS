loadUserDetails=()=>{
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

