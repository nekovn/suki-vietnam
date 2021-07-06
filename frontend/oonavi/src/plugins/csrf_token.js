import Cookies from "js-cookie";
const CSRF_TOKEN = Cookies.get("csrftoken");
export default CSRF_TOKEN;
