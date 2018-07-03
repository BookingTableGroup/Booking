//路由页面

import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Home from '@/components/Home'
import Book from '@/components/Book'
import Login from '@/components/Login'
import Login_admin from '@/components/Login_admin'
import Register from '@/components/Register'
import Food from '@/components/Food'
import Query from '@/components/Query'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Login_admin
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/food',
      name: 'Food',
      component: Food
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    }
  ]
})
