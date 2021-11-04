import Vue from 'vue'
import Router from 'vue-router'
import SignupForm from '@/components/SignupForm'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignupForm',
      component: SignupForm
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
