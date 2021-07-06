export default function (next,store){
    if (!store.getters.isLogin) {
        next("/")
        store.commit("setLoginModal",true)
    } else {
        next()
    }
}