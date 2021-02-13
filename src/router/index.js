/*
import Vue from 'vue'
import Router from 'vue-router'
import check from '@/repositories/global/check'
import configRoutes from './configRoutes'


Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  mode: 'history', // Quita el "#" de las rutas URL
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes() // En esta seccion se importan todas las rutas
})


router.beforeEach((to, from, next) => {
  check.getUserAutenticado(to, next);

  let roles = localStorage.getItem("roles");
  if(roles != null){
    roles = roles.split(',')
  }

  if(to.matched.some(record => record.meta.requiresAdmin)) { // Verifica si la ruta a la que se quiere acceder pide acceso de administrador
    if(roles != null && roles.indexOf('admin') >= 0 ){
      if(check.permiso(to.meta.permissions)) {
        next()
      } else {
        next({ path: '/Page500', params: { nextUrl: to.fullPath } })
      }
    }else{
      next({ path: '/login', params: { nextUrl: to.fullPath } })
    }
  } else{
    next() // Si la ruta solicitada no esta protegida por administrador deja avanzar
  }
})

export default router

*/

import Vue from 'vue'
import Router from 'vue-router'
import check from '@/repositories/global/check'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/pages/Register')

// Sucursales
const SucIndex = () => import('@/views/sucursal/SucIndex')
const SucCreate = () => import('@/views/sucursal/SucCreate')
const SucShow = () => import('@/views/sucursal/SucShow')
const SucEdit = () => import('@/views/sucursal/SucEdit')


// Catálogos
const CatIndex = () => import('@/views/configuracion/catalogo/CatIndex')
const CatCreate = () => import('@/views/configuracion/catalogo/CatCreate')
const CatShow = () => import('@/views/configuracion/catalogo/CatShow')
const CatEdit = () => import('@/views/configuracion/catalogo/CatEdit')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const EditUser = () => import('@/views/users/EditUser')

//Notes
const Notes = () => import('@/views/notes/Notes')
const Note = () => import('@/views/notes/Note')
const EditNote = () => import('@/views/notes/EditNote')
const CreateNote = () => import('@/views/notes/CreateNote')

//Roles
const Roles = () => import('@/views/roles/Roles')
const Role = () => import('@/views/roles/Role')
const EditRole = () => import('@/views/roles/EditRole')
const CreateRole = () => import('@/views/roles/CreateRole')

//Email
const Emails        = () => import('@/views/email/Emails')
const CreateEmail  = () => import('@/views/email/CreateEmail')
const EditEmail    = () => import('@/views/email/EditEmail')
const ShowEmail     = () => import('@/views/email/ShowEmail')
const SendEmail     = () => import('@/views/email/SendEmail')


//Perfil
const Recordatorio    = () => import('@/views/perfil/recordatorio/Index')
const Tablero         = () => import('@/views/perfil/recordatorio/Index')
const PerfilDetalles  = () => import('@/views/perfil/recordatorio/Index')
const PerfilEditar    = () => import('@/views/perfil/recordatorio/Index')

Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  mode: 'history', // Quita el "#" de las rutas URL
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})


router.beforeEach((to, from, next) => {
  check.getUserAutenticado(to, next);

  let roles = localStorage.getItem("roles");
  if(roles != null){
    roles = roles.split(',')
  }

  if(to.matched.some(record => record.meta.requiresAdmin)) { // Verifica si la ruta a la que se quiere acceder pide acceso de administrador
    if(roles != null && roles.indexOf('admin') >= 0 ){
      if(check.permiso(to.meta.permissions)) {
        next()
      } else {
        next({ path: '/Page500', params: { nextUrl: to.fullPath } })
      }
    }else{
      next({ path: '/login', params: { nextUrl: to.fullPath } })
    }
  } else{
    next() // Si la ruta solicitada no esta protegida por administrador deja avanzar
  }
})

export default router

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/login',
    //  name: '',
      component: TheContainer,
      children: [
        {
          path: 'inicio',
          name: 'Inicio',
          component: Dashboard,
          meta:{
            requiresAdmin: true,
            permissions : ['global']
          }
        },







        {
          path: 'sucursales',
          meta: { label: 'Sucursales'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: SucIndex,
              meta:{
                requiresAdmin: true,
                permissions : ['sucursal.create','sucursal.show','sucursal.edit', 'sucursal.destroy']
              }
            },
            {
              path: 'registrar',
              meta: { label: 'Registrar Sucursal' },
              name: 'Registrar Sucursal',
              component: SucCreate,
              meta:{
                requiresAdmin: true,
                permissions : ['sucursal.create']
              }
            },
            {
              path: 'detalles/:id',
              meta: { label: 'Detalles Sucursal'},
              name: 'Detalles Sucursal',
              component: SucShow,
              meta:{
                requiresAdmin: true,
                permissions : ['sucursal.show']
              }
            },
            {
              path: 'editar/:id',
              meta: { label: 'Editar Sucursal' },
              name: 'Editar Sucursal',
              component: SucEdit,
              meta:{
                requiresAdmin: true,
                permissions : ['sucursal.edit']
              }
            },
          ]
        },







        
        {
          path: 'catalogos',
          meta: { label: 'Catálogos'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: CatIndex,
              meta:{
                requiresAdmin: true,
                permissions : ['catalogo.create','catalogo.show','catalogo.edit', 'catalogo.destroy']
              }
            },
            {
              path: 'registrar',
              meta: { label: 'Registrar Catálogo' },
              name: 'Registrar Catálogo',
              component: CatCreate,
              meta:{
                requiresAdmin: true,
                permissions : ['catalogo.create']
              }
            },
            {
              path: 'detalles/:id',
              meta: { label: 'Detalles Catálogo'},
              name: 'Detalles Catálogo',
              component: CatShow,
              meta:{
                requiresAdmin: true,
                permissions : ['catalogo.show']
              }
            },
            {
              path: 'editar/:id',
              meta: { label: 'Editar Catálogo' },
              name: 'Editar Catálogo',
              component: CatEdit,
              meta:{
                requiresAdmin: true,
                permissions : ['catalogo.edit']
              }
            },
          ]
        },







        {
          path: 'perfil',
          meta: { label: 'Perfil'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'recordatorios',
              meta: { label: 'Recordatorios' },
              name: 'Recordatorios',
              component: Recordatorio,
              meta:{
                requiresAdmin: true,
                permissions : ['global']
              }
            },
            {
              path: 'tablero',
              meta: { label: 'Tablero' },
              name: 'PerfilTablero',
              component: Tablero,
              meta:{
                requiresAdmin: true,
                permissions : ['global']
              }
            },
            {
              path: 'detalles',
              meta: { label: 'Detalles' },
              name: 'Detalles',
              component: PerfilDetalles,
              meta:{
                requiresAdmin: true,
                permissions : ['global']
              }
            },
            {
              path: 'editar',
              meta: { label: 'Editar' },
              name: 'Editar',
              component: PerfilEditar,
              meta:{
                requiresAdmin: true,
                permissions : ['global']
              }
            },
          ]
        },
        {
          path: 'usuarios',
          meta: { label: 'Usuarios'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit User' },
              name: 'EditUser',
              component: EditUser,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
          ]
        },
        {
          path: 'notes',
          meta: { label: 'Notes'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Notes,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Note' },
              name: 'CreateNote',
              component: CreateNote,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id',
              meta: { label: 'Note Details'},
              name: 'Note',
              component: Note,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Note' },
              name: 'EditNote',
              component: EditNote,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
          ]
        },
        {
          path: 'roles',
          meta: { label: 'Roles'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Roles,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Role' },
              name: 'Create Note',
              component: CreateRole,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id',
              meta: { label: 'Role Details'},
              name: 'Role',
              component: Role,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Role' },
              name: 'Edit Role',
              component: EditRole,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
          ]
        },
        {
          path: 'email',
          meta: { label: 'Emails'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Emails,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Email Template' },
              name: 'Create Email Template',
              component: CreateEmail,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id',
              meta: { label: 'Show Email Template'},
              name: 'Show Email Tempalte',
              component: ShowEmail,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Email Tempalate' },
              name: 'Edit Email Template',
              component: EditEmail,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
            {
              path: ':id/sendEmail',
              meta: { label: 'Send Email' },
              name: 'Send Email',
              component: SendEmail,
              meta:{
                requiresAdmin: true,
                permissions : []
              }
            },
          ]
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    },
    {
      path: '/',
      redirect: '/login',
      name: 'Auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
        {
          path: 'password-restablecer',
          name: 'Restablecer',
          component: Register
        },
      ]
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
}
