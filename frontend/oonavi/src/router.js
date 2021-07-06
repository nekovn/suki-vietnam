import { createRouter, createWebHistory } from "vue-router";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import HomePage from "./pages/HomePage";
import Profiles from "./pages/profiles";
import ProfileImg from "./pages/profiles/ProfileImg";
import SettingProfile from './pages/profiles/SettingProfile';
import ChangePassword from './pages/profiles/ChangePassword';
import NotificationForm from './pages/profiles/NotificationForm';
import about from "./pages/footer/about";
import copyright from "./pages/footer/copyright";
import inquiry from "./pages/footer/inquiry";
import Footer from "./pages/footer";

import store from "./store";

const routes = [
  {
    path: "/",
    name: 'home',
    components: {
      header: AppHeader,
      default: HomePage,
      footer: AppFooter,
    },
  },
  {
    path: "/profile",
    component: Profiles,
    components: {
      header: AppHeader,
      default: Profiles,
      footer: AppFooter,
    },
    children: [
      {
        path: "",
        component: SettingProfile,
        name : 'profile',
      },
      {
        path: "img",
        component: ProfileImg,
        name : 'img',
      },
      {
        path: "password",
        component: ChangePassword ,
        name : 'password',
      },
      {
        path: "notification",
        component: NotificationForm ,
        name : 'notification',
      }
    ],
    meta:{middleware:'auth'},
  },
  {
    path: "/footer",
    component: Footer,
    components: {
      header: AppHeader,
      default: Footer,
      footer: AppFooter,
    },
    children: [
      {
        path: "/about",
        component: about,
        name : 'about',
      },
      {
        path: "/copyright",
        component: copyright,
        name : 'copyrightu',
      },
      {
        path: "/inquiry",
        component: inquiry,
        name : 'inquiry',
      }
    ],

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active",
});

router.beforeEach((to,_,next)=>{
  if(to.meta.middleware){
    //    to.meta.middleware : auth
    const middleware = require(`./middleware/${to.meta.middleware}`)
    if(middleware){
      middleware.default(next,store);
    }else {
      next()
    }
  }else{
    next();
  }
})


export default router;