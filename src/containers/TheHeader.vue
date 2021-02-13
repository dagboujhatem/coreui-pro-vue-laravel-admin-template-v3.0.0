<template>
  <CHeader with-subheader>
    <CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')" />
    <CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')" />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <b-img v-if="sucursal.log_nom != null" :src="sucursal.log_rut+sucursal.log_nom" alt="Logo" height="48"/>
    </CHeaderBrand>
    <MenuHeaderIzquierdo/>
    <MenuHeaderDerecho/>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import MenuHeaderIzquierdo from './MenuHeaderIzquierdo'
import MenuHeaderDerecho from './MenuHeaderDerecho'

export default {
  name: 'TheHeader',
  components: {
    MenuHeaderIzquierdo,
    MenuHeaderDerecho
  },
  data() {
    return {
      sucursal: JSON.parse(localStorage.getItem("sucursal")),
    }
  }
}
</script>
