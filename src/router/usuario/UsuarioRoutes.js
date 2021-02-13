
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const EditUser = () => import('@/views/users/EditUser')
const TheContainer = () => import('@/containers/TheContainer')

const UsuarioRoutes = {
  path: '/usuarios',
  meta: { label: 'Usuarios'},
  redirect: '/inicio',
  component: TheContainer,
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
};

export default UsuarioRoutes;