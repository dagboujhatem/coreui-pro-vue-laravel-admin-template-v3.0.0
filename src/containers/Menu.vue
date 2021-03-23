<template>
	<CSidebarNav class="nav-item">
    
  <CSidebarNavItem name="Dashboard" to="/iniciodash" icon="cil-speedometer"></CSidebarNavItem>
  <CSidebarNavItem name="Órdenes y Cotizaciones" to="/cotizacion" icon="cil-notes" ></CSidebarNavItem>
  <CSidebarNavItem name="Clientes y Vehículos " to="/clientes" icon="cil-people" ></CSidebarNavItem>
  


  <CSidebarNavItem name="Citas y Recordatorios" to="/citas" icon="cil-calendar" ></CSidebarNavItem>
  
  <CSidebarNavDropdown name="Inventario" to="/" icon="cilLayers" >
  <CSidebarNavItem name="Refacciones" to="/Regpartidos" icon="cil-puzzle" :hidden="permisos([])" ></CSidebarNavItem>
  </CSidebarNavDropdown>
  
  <CSidebarNavDropdown name="Administración" to="/" icon="cil-dollar" >
  <CSidebarNavItem name="Balance" to="/Balance" icon="cilChartPie" ></CSidebarNavItem>
  <CSidebarNavItem name="Gastos de compra" to="/" icon="cilCreditCard" ></CSidebarNavItem>
  </CSidebarNavDropdown>

  <CSidebarNavItem name="Detalles de la empresa" to="/Empresa" icon="cil-settings" ></CSidebarNavItem> 
  

		<CSidebarNavDropdown name="Configuración" to="/configuracion" icon="cilSettings" :hidden="permisos([])">
			<CSidebarNavItem :name="sistema.emp_abrev" to="/sistema" icon="cilGlobeAlt" :hidden="permisos(['sistema.edit','sistema.show'])"></CSidebarNavItem>
      
			
			<CSidebarNavDropdown name="Tutoriales" to="/tutoriales" icon="cibYoutube" :hidden="permisos(['tutotial.create','tutotial.show','tutotial.edit','tutotial.destroy'])">
				<CSidebarNavItem name="Lista de tutoriales" to="/tutoriales" icon="cilList" :hidden="permisos(['tutotial.create','tutotial.show','tutotial.edit','tutotial.destroy'])"></CSidebarNavItem>
				<CSidebarNavItem name="Registrar tutorial" to="/tutoriales/registrar" icon="cilPlus" :hidden="permisos(['tutotial.create'])"></CSidebarNavItem>
			</CSidebarNavDropdown>


			<CSidebarNavDropdown name="Catálogos" to="/catalogos" icon="cilBook" :hidden="permisos(['catalogo.create','catalogo.show','catalogo.edit','catalogo.destroy'])">
				<CSidebarNavItem name="Lista de catálogos" to="/catalogos" icon="cilList" :hidden="permisos(['catalogo.create','catalogo.show','catalogo.edit','catalogo.destroy'])"></CSidebarNavItem>
				<CSidebarNavItem name="Registrar catálogo" to="/catalogos/registrar" icon="cilPlus" :hidden="permisos(['catalogo.create'])"></CSidebarNavItem>
			</CSidebarNavDropdown>


		</CSidebarNavDropdown>
		<CSidebarNavDropdown name="Sucursales" to="/sucursales" icon="cilBuilding" :hidden="permisos(['sucursal.create','sucursal.show','sucursal.edit','sistema.destroy'])">
			<CSidebarNavItem name="Lista de sucursales" to="/sucursales" icon="cilList" :hidden="permisos(['sucursal.create','sucursal.show','sucursal.edit','sistema.destroy'])"></CSidebarNavItem>
			<CSidebarNavItem name="Registrar sucursal" to="/sucursales/registrar" icon="cilPlus" :hidden="permisos(['sucursal.create'])"></CSidebarNavItem>
		</CSidebarNavDropdown>
		<CSidebarNavDropdown name="Usuarios" to="/usuarios" icon="cilUser" :hidden="permisos(['usuario.index','usuario.create','usuario.show','usuario.edit'])">
			<CSidebarNavItem name="Lista de usuarios" to="/usuarios" icon="cilList" :hidden="permisos(['usuario.index','usuario.create','usuario.show','usuario.edit'])"></CSidebarNavItem>
			<CSidebarNavItem name="Registrar usuario" to="/usuarios/registrar" icon="cilPlus" :hidden="permisos(['usuario.create'])"></CSidebarNavItem>
		</CSidebarNavDropdown>
	</CSidebarNav>
</template>

<script>
import check from '@/repositories/global/check'

export default {
	name: 'Menu',
	data() {
		return {
      sistema: JSON.parse(localStorage.getItem("sistema")),
    }
	},
  methods: {
     permisos(permisos) {
      return !check.permiso(permisos)
    }
  },
}
</script>

<style >
  .nav-item{
  font-family: sans-serif;
  font-size: 15px;
 }
</style>
