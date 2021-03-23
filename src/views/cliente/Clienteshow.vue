<template>
   <div>
   
        <CCard>
          <CCardHeader >
            <CRow >
            <CCol class="float-right">
            <h4>Cliente: </h4>
            
                <CButton style="float: right;" class="ml-2" size="sm" @click="goBack()" shape='pill' color="secondary" v-c-tooltip.hover="{
                              content: `Volver`}">
                            <CIcon name="cil-arrow-circle-left" />
                </CButton>
                <CButton style="float: right;" class="ml-2" size="sm" @click="vehiculos()" shape='square' color="secondary" v-c-tooltip.hover="{
                              content: `Editar`}">
                  <CIcon name="cil-pencil"/> 
                </CButton>
                <CButton style="float: right;" class="ml-2" size="sm" @click="vehiculos()" shape='square' color="info"><CIcon name="cil-plus" /> Pago
                </CButton>
                <CButton style="float: right;" class="ml-2" size="sm"    @click="newCotizacion()"  shape='square' color="info"><CIcon name="cil-plus" /> Cotización
                </CButton>
                <CModal 
                    size="lg"
                    title="Nueva Citas y Recordatorios"
                    color="dark"
                    :show.sync="nvocita"
                  > 
                  <NvoCita/>
                  <template #footer>
                      <CButton  @click="nvocita= false" ><CIcon name="cilArrowThickToLeft"/> Cancelar</CButton>
                      <CButton  color="success"> Guardar</CButton>
                    </template>
                  </CModal>
                <CButton style="float: right;" class="ml-2" size="sm"@click="nvocita = true" shape='square' color="info"><CIcon name="cil-calendar" /> Agendar cita
                </CButton>
            </CCol>
            </CRow>
            <br>
            <br>
            <CCard>
              <div class="bg-secondary text-dark">
              Total cotizado 
              </div>
            </CCard>
          </CCardHeader>
        </CCard>

        
         <CCard >
           <CCardHeader>
            <CTabs>
              <CTab title="Servicios" active>
                <CButton style="float: right;" class="m-3 " size="sm" @click="vehiculos()" shape='square' color="success"><CIcon name="cil-plus" /> Orden de servicio
                </CButton>
                
                
  <!--Trae los datos de la tabla de Cliente y Vehiculos realiza la busqueda filtrada -->
      
        <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
        <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
            { key: 'id_cliente', label: 'Tipo' },
            { key: 'usuario', label: 'Vehículo' },
            { key: 'telefono', label: 'Deuda' },
            { key: 'placas', label: 'Status' },
            { key: 'vin', label: 'Creado' },
            { key: 'orden', label: 'Acciones' },
           
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
              <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.usuario" />
              <span v-else v-text="item.usuario" />
            </td>
          </template>
          <template #placas="{item}">
            <td>
             <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.placas" />
              <span v-else v-text="item.placas" />
            </td>
          </template>
          <template #eliminar="{item}">
            <td>
              <CLink :hidden="permisos(['users.destroy'])" @click="deleteRegistro(item.id_cliente)" class="btn-sm btn-danger"><CIcon class="align-content-sm-center" name="cil-user-unfollow"/></CLink>
            </td>
          </template>
        </CDataTable>
      </perfect-scrollbar>
      
  <CPagination :pages="maxPages" :active-page.sync="activePage" style="float:right;"  />

              </CTab>
              <CTab title=Vehículos>
                <CButton style="float: right;" class="m-3 " size="sm" @click="vehiculos()" shape='square' color="success"><CIcon name="cil-plus" /> Vehículo
                </CButton>

                   <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
        <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
            { key: 'id_cliente', label: 'Marca' },
            { key: 'usuario', label: 'Kilómetros' },
            { key: 'telefono', label: 'Placas' },
            { key: 'placas', label: 'Año' },
            { key: 'orden', label: 'Acciones' },
           
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
              <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.usuario" />
              <span v-else v-text="item.usuario" />
            </td>
          </template>
          <template #placas="{item}">
            <td>
             <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.placas" />
              <span v-else v-text="item.placas" />
            </td>
          </template>
          <template #eliminar="{item}">
            <td>
              <CLink :hidden="permisos(['users.destroy'])" @click="deleteRegistro(item.id_cliente)" class="btn-sm btn-danger"><CIcon class="align-content-sm-center" name="cil-user-unfollow"/></CLink>
            </td>
          </template>
        </CDataTable>
      </perfect-scrollbar>
      
  <CPagination :pages="maxPages" :active-page.sync="activePage" style="float:right;"  />

              </CTab>
              <CTab title="Citas" >
                <br>
                <h2 class="text-info text-center">Próximamente <CIcon size="xl" name="cil-calendar"/></h2>
              </CTab>
              <CTab title="Detalle" >
                <br>
              <Detalles/>
              </CTab>
              <CTab title="Directorio" >
               <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
        <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
            { key: 'id_cliente', label: 'Nombre' },
            { key: 'usuario', label: 'Puesto' },
            { key: 'telefono', label: 'Email' },
            { key: 'placas', label: 'Teléfono' },
           
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
              <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.usuario" />
              <span v-else v-text="item.usuario" />
            </td>
          </template>
          <template #placas="{item}">
            <td>
             <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.placas" />
              <span v-else v-text="item.placas" />
            </td>
          </template>
          <template #eliminar="{item}">
            <td>
              <CLink :hidden="permisos(['users.destroy'])" @click="deleteRegistro(item.id_cliente)" class="btn-sm btn-danger"><CIcon class="align-content-sm-center" name="cil-user-unfollow"/></CLink>
            </td>
          </template>
        </CDataTable>
      </perfect-scrollbar>
              </CTab>
              <CTab title="Notas de crédito" >
               <perfect-scrollbar style="height:40em;width:100%;margin:0px 0px 1% 0px">
        <CDataTable :items="items" :column-filter-value.sync="columnFilter" :table-filter-value.sync="tableFilter" :loading="loading" :itemsPerPage="itemsLimit" index-column hover footer fixed striped responsive outlined table-column
            :fields="[ 
            { key: 'id_cliente', label: 'Fecha' },
            { key: 'usuario', label: 'Monto' },
            { key: 'telefono', label: 'Pagado' },
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
              <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.usuario" />
              <span v-else v-text="item.usuario" />
            </td>
          </template>
          <template #placas="{item}">
            <td>
             <CLink class="text-info" v-if="!permisos(['clientev.show'])" :hidden="permisos(['clientev.show'])" @click="showRegistro(item.id_cliente)" v-text="item.placas" />
              <span v-else v-text="item.placas" />
            </td>
          </template>
          <template #eliminar="{item}">
            <td>
              <CLink :hidden="permisos(['users.destroy'])" @click="deleteRegistro(item.id_cliente)" class="btn-sm btn-danger"><CIcon class="align-content-sm-center" name="cil-user-unfollow"/></CLink>
            </td>
          </template>
        </CDataTable>
      </perfect-scrollbar>
              </CTab>
            </CTabs>
           </CCardHeader>
         
         </CCard>
      
  </div>
</template>

<script>
import NvoCita from '../citas/NvoCita'
import Detalles from '../cliente/Detalles'
export default {
  components:{
    Detalles,
    NvoCita,
  },
  data () {
    return {
      nvocita: false,
      activeTab: 0,
      items: [],
      activePage: 1,
      maxPages: 1,
      sorter: {column: '', asc: false},
      tableFilter: '',
      columnFilter: {},
      itemsLimit: 50,
      loading: false,
      texto: null,
    
       message: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
}
  },
  methods:{
    newCotizacion(){
    this.$router.push({path: '/nvacotizacion'});
  },
    
    goBack() { this.$router.go(-1) },  
  }
}
</script>