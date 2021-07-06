export default {

    isLogin(authState) {
        if (authState.currentUser){
            return  true;
        }
        return  false;
    },
    isAdmin(authState) {
        if (authState.currentUser && authState.roles){
            return  true;
        }
        return  false;
    },
    getCurrentUser(authState){
        return authState.currentUser
    },

    avatar(authState){
        if(!authState.currentUser){
            return  '';
        }
        if(authState.currentUser.simple_local_avatar){
            return  authState.currentUser.simple_local_avatar.full;
        }

        const userId = authState.currentUser.id;
        return `/assets/images/avatar${userId % 4 + 1}.jpg`;
    }


}