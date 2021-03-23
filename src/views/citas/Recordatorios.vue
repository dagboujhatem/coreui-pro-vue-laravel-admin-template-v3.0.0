<template>
  <CRow>
   <CCol sm="12">
    <CCard>
      <CCardHeader class="p-1">
      <h5 class="text-info ml-2 m-2"> Citas y Recordatorios </h5>
      <br>
      <CitasRecordatorios :recordatorio="true" />
      </CCardHeader>
    </CCard>

    <CCard>

         <CCardBody>
  <!--Trae los datos de la tabla de Cliente y Vehiculos realiza la busqueda filtrada -->
  
    <CRow>
      <CCol sm="">
        <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
        <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
            { key: 'id_cliente', label: 'Concepto' },
            { key: 'usuario', label: 'Expiración' },
            { key: 'telefono', label: 'Servicio' },
            { key: 'placas', label: 'Resuelto' },
            { key: 'vin', label: 'Acciones' },
            { key: 'eliminar', label: '' },
           
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
          <template #eliminar="{item}">
            <td>
              <CLink :hidden="permisos(['users.destroy'])" @click="deleteRegistro(item.id_cliente)" class="btn btn-danger"><CIcon name="cilTrash"/></CLink>
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
import CitasRecordatorios from './CitasRecordatorios'
export default {
  name: 'recordatorio',
  components: {
    CitasRecordatorios,
   }
}
</script>