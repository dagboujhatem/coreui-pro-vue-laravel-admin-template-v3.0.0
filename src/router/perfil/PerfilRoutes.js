const Recordatorio    = () => import('@/views/perfil/recordatorio/Index')
const Tablero         = () => import('@/views/perfil/recordatorio/Index')
const PerfilDetalles  = () => import('@/views/perfil/recordatorio/Index')
const PerfilEditar    = () => import('@/views/perfil/recordatorio/Index')
const TheContainer = () => import('@/containers/TheContainer')

const PerfilRoutes = {
  path: '/perfil',
  meta: { label: 'Perfil'},
  redirect: '/inicio',
  component: TheContainer,
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
};

export default PerfilRoutes;