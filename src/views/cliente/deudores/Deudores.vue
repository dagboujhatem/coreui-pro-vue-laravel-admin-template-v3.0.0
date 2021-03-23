<template>
    <CRow>
   <CCol sm="12">
    <CCard>
      <CCardHeader class="p-1">
        <CRow>
          <CCol>
          <h5 class="text-info ml-2 m-2"> Clientes deudores </h5>
          </CCol>
          <CCol>
            <CButton style="float: right;" size="sm" @click="Clientes()" class="mb-2" shape='pill' color="danger"><CIcon name="cil-list" /> Todos los clientes
          </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
    </CCard>
    <CButton size="md" @click="newCliente()"  shape='pill' color="success"><CIcon name="cil-plus" /> Nuevo 
    </CButton>
    <CCard>
    <CCardBody>
  <!--Trae los datos de la tabla de Cliente y Vehiculos realiza la busqueda filtrada -->
  
    <CRow>
      <CCol sm="">
        <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
        <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
            { key: 'id_cliente', label: 'NOMBRE' },
            { key: 'usuario', label: 'RFC' },
            { key: 'telefono', label: 'SERVICIOS' },
            { key: 'placas', label: 'CRÉDITO' },
            { key: 'vin', label: 'COBRADO' },
            { key: 'editar', label: 'PAGADO' },
            { key: 'option', label: 'ACCIONES'},
           
            ]"
            :noItemsView="{ 
            noResults: 'No hay resultados de filtrado disponibles', 
            noItems: 'No hay registros disponibles',
            }"
            :items-per-page-select="{ label: 'Registros por pagina:', values: ['15','30','50','100'] }"
            :table-filter="{ external: true, lazy: true, placeholder: 'Filtrar', label: 'Filtrar:' }"
            :sorter="{ external: true, resetable: true }"
            :columnFilter="{ external: true, lazy: true }"
            @pagination-change="changeItemsLimit"
            :sorter-value.sync="sorter"
            >
          <template #usuario="{item}">
            <td>
              <CLink v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.usuario" />
              <span v-else v-text="item.usuario" />
            </td>
          </template>
          <template #placas="{item}">
            <td>
             <CLink v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.placas" />
              <span v-else v-text="item.placas" />
            </td>
          </template>
          <template #editar="{item}">
            <td>
              <CLink :hidden="permisos(['clientev.edit'])" @click="editRegistro(item.id)" class="btn btn-light"><CIcon name="cilPencil"/></CLink>
            </td>
          </template>
          <template #eliminar="{item}">
            <td>
              <CLink :hidden="permisos(['users.destroy'])" @click="deleteRegistro(item.id_cliente)" class="btn btn-danger"><CIcon name="cilTrash"/></CLink>
            </td>
          </template>
          <template #option="{item}">
            <td>
                <CDropdown
              size="sm"
              toggler-text="Opciones"
              color="link"
              class="m-0 d-inline-block"
              menu-class="h-10"
            >
            <div class="dropdown-menu-sm">
                <CDropdownItem>Editar cliente</CDropdownItem>
                <CDropdownItem>Editar vehículo</CDropdownItem>
                <CDropdownItem>Crear vehículo</CDropdownItem>
                <CDropdownItem>Programar cita</CDropdownItem>
                <CDropdownItem>Eliminar vehículo</CDropdownItem>
                <CDropdownItem>Eliminar cliente</CDropdownItem>
                </div>
              </CDropdown>
            </td>
          </template>
        </CDataTable>
      </perfect-scrollbar>
      </CCol>
   </CRow>
  <CPagination :pages="maxPages" :active-page.sync="activePage" style="float:right;"  />
  <p v-text="texto" />

  </CCardBody>
    </CCard>
   </CCol>
    </CRow>
</template>  

<script>
import axios from 'axios'
export default {

   methods:{
     newCliente() {
      this.$router.push({path: '/regcliente'});
  },
  Clientes() {
      this.$router.push({path: '/clientes'});
  },
   }
  
}
</script>

 