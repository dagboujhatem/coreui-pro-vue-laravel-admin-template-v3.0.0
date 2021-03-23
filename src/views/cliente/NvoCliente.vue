<template>
    <CNav variant="pills">
    <CNavItem :active="generales" to="/Registros" :class="generales ? 'text-white ' : ''">
      <CIcon name="cilUser"/> Generales
    </CNavItem>
    <CNavItem :active="directorio" to="/Directorios" :class="directorio ? 'text-white' : ''">
      <b-icon icon="plus-circle"></b-icon> Directorio
    </CNavItem>
    <CNavItem :active="facturas" to="/DatosFactura" :class="facturas ? 'text-white' : ''">
      <b-icon icon="plus-circle"></b-icon> Facturación
    </CNavItem>
    <CNavItem :active="credito" to="/Credito" :class="credito ? 'text-white' : ''">
      <b-icon icon="plus-circle"></b-icon> Crédito
    </CNavItem>
  </CNav>
</template>
<script>
  export default {
     name: 'NvoCliente',
  props:{
    generales: Boolean,
    directorio: Boolean,
    facturas: Boolean,
    credito:Boolean,
  },
    data() {
      return {
      }
    },
    computed: {
      
      }
    }
</script>
