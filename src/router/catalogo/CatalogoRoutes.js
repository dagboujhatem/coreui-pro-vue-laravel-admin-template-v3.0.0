const CatIndex = () => import('@/views/configuracion/catalogo/CatIndex')
const CatCreate = () => import('@/views/configuracion/catalogo/CatCreateFields')
const CatShow = () => import('@/views/configuracion/catalogo/CatShow')
const CatEdit = () => import('@/views/configuracion/catalogo/CatEdit')

const CatalogoRoutes = {
  path: 'catalogos',
  meta: { label: 'Catalogos'},
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
};

export default CatalogoRoutes;