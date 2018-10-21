import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddBlog from '@/components/AddBlog'
import Register from '@/components/Register'
import Login from '@/components/Login'
import SinglePost from '@/components/SinglePost'
import UserMessage from '@/components/UserMessage'
import EditBlog from '@/components/EditBlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/addBlog',
      name: 'AddBlog',
      component: AddBlog
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/single-post/:id',
      name: 'SinglePost',
      component: SinglePost
    }, {
      path: '/user-message/:id',
      name: 'UserMessage',
      component: UserMessage
    }, {
      path: '/editBlog/:id',
      name: 'EditBlog',
      component: EditBlog
    }
  ]
})
