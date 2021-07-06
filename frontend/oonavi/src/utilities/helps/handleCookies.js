import Cookies from "js-cookie";
function handleCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

//get value tooken
function getTokenFromCookie(name){
    const cookie = Cookies.get(name)
    if(cookie){
        return cookie
    }else{
        return ''
    }
}

export  {
    handleCookies,
    getTokenFromCookie
}