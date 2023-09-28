const users = [{
    user: 'nimal',
    password: '123',
    avatar: 'https://img.freepik.com/free-vector/mysterious-gangster-character_23-2148483453.jpg?w=740&t=st=1695889491~exp=1695890091~hmac=f11b2d1e590bb34ee799c096e0c1822cb5eda2c718f070dca83bed5842939b05'
}, {
        user: 'kamal',
        password: '123',
        avatar: 'https://img.freepik.com/free-photo/view-3d-businessman-taking-selfie_23-2150709934.jpg?t=st=1695889547~exp=1695893147~hmac=12245e4dc2facdd33a7a8d16ad67b900eb10a65cd520fcba93d6ffb03127ea15&w=740'
    }];

const login = () => {
    let userName = $('#userName').val();
    let password = $('#password').val();
    if (userName.trim().length !== 0 || password.trim().length !== 0) {
        for (const tempUser of users) {
            if (tempUser.user === userName) {
                console.log(tempUser.user);
                if (tempUser.password === password) {
                    localStorage.setItem('user', JSON.stringify({name: userName, avatar: tempUser.avatar}));
                    window.location.href='pages/dashboard.html';
                    return;
                } else {
                    alert('password is incorrect');
                    return;
                }
            }
        }
    }
    else{
        alert('username or password is required!');
    }
}