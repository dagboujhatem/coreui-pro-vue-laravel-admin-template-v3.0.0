const SucIndex = () => import('@/views/sucursal/SucIndex')
const SucCreate = () => import('@/views/sucursal/SucCreate')
const SucShow = () => import('@/views/sucursal/SucShow')
const SucEdit = () => import('@/views/sucursal/SucEdit')
const TheContainer = () => import('@/containers/TheContainer')

const SucursalRoutes = {
  path: '/sucursales',
  redirect: '/inicio',
  component: TheContainer,
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
  
};

export default SucursalRoutes;