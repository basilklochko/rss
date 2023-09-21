function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.cookie = "user=" + JSON.stringify({ _id: '', email: profile.getEmail(), isGoogle: true, googleImageUrl: profile.getImageUrl() });
    window.location.replace('/login');
}

function signOut() {
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: $('meta[name="google-signin-client_id"').attr('content')
        }).then(function () {
            gapi.auth2.getAuthInstance().signOut().then(function () {
                window.location.replace('/logout');
            });
        });
    });
}