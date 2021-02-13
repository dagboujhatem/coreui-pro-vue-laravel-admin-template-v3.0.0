<template>
  <CSidebar :minimize="minimize" unfoldable :show="show" @update:show="(value) => $store.commit('set', ['sidebarShow', value])">
    <CSidebarBrand class="d-md-down-none" to="/">
    <b-img v-if="sucursal.log_nom != null" :src="sucursal.log_rut+sucursal.log_nom" class="c-sidebar-brand-full" alt="Logo" height="35" size="custom-size" viewBox="0 0 556 134"/>
    <b-img v-if="sucursal.log_nom != null" :src="sucursal.log_rut+sucursal.log_nom" class="c-sidebar-brand-minimized" alt="Logo" height="35" size="custom-size" viewBox="0 0 110 134"/>
    </CSidebarBrand>
    <Menu/>
    <CSidebarMinimizer class="c-d-md-down-none" @click.native="$store.commit('toggle', 'sidebarMinimize')" />
  </CSidebar>
</template>

<script>
import Menu from './Menu'

export default {
  name: 'TheSidebar',
  components: {
    Menu
  },
  data () {
    return {
      sucursal: JSON.parse(localStorage.getItem("sucursal")),
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  },
  mounted () {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive'
      this.show = sidebarOpened ? false : 'responsive'
    })
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false
      this.show = sidebarClosed ? true : 'responsive'
    })
  }
}
</script>
