loadUserDetails=()=>{
    let userDetails =
    JSON.parse(localStorage.getItem('user'));
    $('#userName').html(userDetails.name);
    $('#avatar').attr('src',userDetails.avatar);
}