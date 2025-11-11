import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import NewsEvents from '../pages/NewsEvents.vue'
import Programs from '../pages/Programs.vue'
// Example if the file is named ChccPage.vue
import ChccPage from '../pages/ChccPage.vue'
import Gallery from '../pages/Gallery.vue'
const Login = () => import('../components/Login.vue')
const Signup = () => import('../components/Signup.vue')
const ForgotPassword = () => import('../components/ForgotPassword.vue')
import CreatePost from '../components/CreatePost.vue'

const routes = [
  
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/news', name: 'NewsEvents', component: NewsEvents },
  { path: '/programs', name: 'Programs', component: Programs },
  { path: '/chccpage', name: 'ChccPage', component: ChccPage },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/create-post', name: 'CreatePost', component: CreatePost }
]

const router = createRouter({
  // 🚨 CRITICAL FIX: Base path updated to the current repository name 🚨
  history: createWebHistory('/CHCC-website-with-github/'), 
  routes
})

export default router