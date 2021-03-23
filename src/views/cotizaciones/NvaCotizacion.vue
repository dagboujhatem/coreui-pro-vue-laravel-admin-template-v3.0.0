<template>
    <div>
    <h5 class="text-info">Nueva Cotización</h5>
        <CCard sm="6">
          <CCardHeader>
            <CRow>
      <!--Nombre del cliente -->
      <CCol sm="4">
         <CFormGroup wrapperClasses="input-group pt-2">
       <template #prepend-content><CIcon name="cilUser"/></template>
       <template #append>
        <CButton color="secondary" @click="getCliente()" title="Recargar"><CIcon name="cilLoop"/></CButton>
        <CButton size="sm" @click="newCotizacion()" color="info"><CIcon name="cil-plus"/>Nuevo</CButton>     
       </template>
       <template #label>Nombre del Cliente</template>
       <template #input>
         <multiselect
                v-model="form.cliente"
                :options="cliente"
                :group-select="true"
                tag-placeholder="Sin coincidencias"
                placeholder="Buscar . . ."
                select-label="Seleccionar"
                selected-label="Seleccionado"
                deselect-label="Quitar selección"
                label="text"
                track-by="value"
                :taggable="true"
                class="form-control border-0 p-0 m-0"
                  />
        
       </template>

      </CFormGroup>
      </CCol>
  <!--Vehiculo -->
    <CCol sm="4">
         <CFormGroup wrapperClasses="input-group pt-2">
       <template #prepend-content><CIcon name="cilUser"/></template>
       <template #append>
         <CButton color="secondary" @click="getVehiculo()" title="Recargar"><CIcon name="cilLoop"/></CButton>
         <CButton size="sm"   @click="nvoVehiculo = true"  color="info"><CIcon name="cil-plus"/>Nuevo</CButton>
         <CModal
      title="Nuevo vehículo"
      color="info"
      size="xl"
      :show.sync="nvoVehiculo" 
      >
      <NvoVehiculo/>
    <!--inicia el formulario para agregar un nuevo vehiculo-->
     
    <template #footer>
        <CButton @click="nvoVehiculo = false" color="light">Cancelar</CButton>
        
      </template>
     </CModal >
         </template>
       <template #label>Vehiculo (Opcional)</template>
       <template #input>
           <multiselect
                v-model="form.vehiculo"
                :options="vehiculo"
                :group-select="true"
                tag-placeholder="Sin coincidencias"
                placeholder="Buscar . . ."
                select-label="Seleccionar"
                selected-label="Seleccionado"
                deselect-label="Quitar selección"
                label="text"
                track-by="value"
                :taggable="true"
                class="form-control border-0 p-0 m-0"
                  />
       </template>
      </CFormGroup>
      </CCol>
      <!--Tipo del Orden -->
      <CCol sm="4">
         <CFormGroup wrapperClasses="input-group pt-2">
       <template #prepend-content><CIcon name="cilUser"/></template>
       <template #append><CButton color="secondary" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
       <template #label>Tipo de Orden</template>
       <template #input>
          <multiselect
           v-model="form.orden"
           :options="$options.multiorden" 
           :group-select="true"
           tag-placeholder="Sin coincidencias"
           placeholder="Buscar . . ."
           select-label="Seleccionar"
           selected-label="Seleccionado"
           deselect-label="Quitar selección"
           label="text"
           track-by="value"
           :taggable="true"
           class="form-control border-0 p-0 m-0"
           selectionType="tags"
           :selection="true"
          />
       </template>
      </CFormGroup>
      </CCol>
      </CRow>
          </CCardHeader>
        
        </CCard>

        <div>
            <CRow>
      <CCol sm="">
        <CCard>
          <CCardHeader>
          
          </CCardHeader>

          <CCardBody>
           
          </CCardBody>
          <CCardFooter>
           
          </CCardFooter>
        </CCard>
      </CCol>
      
    </CRow>





    <CRow>
      <CCol sm="7">
        <CCard>
          <CCardBody>
          <CRow>  
            
           <div class="form-group form-row" :key="name">
              <CCol tag="label" sm="" class="col-form-label">
               {{name}}
              </CCol>
              <CCol sm="9">
              <CInputCheckbox inline
                 v-for="(option, optionIndex) in options"
                 :key="key + option"
                 :label="option"
                 :value="option"
                 :custom="key > 1"     
                 :checked="optionIndex === key"                 
                />
              </CCol>
            </div>
</CRow>
<CRow>
      <CCol sm="">
      <CInput
        placeholder="IVA"
        :value.sync="form.iva" 
      >
      <template #prepend-content><CIcon name="cil-dollar"/></template>
      </CInput>
      </CCol>

      <CCol sm="">
      <CInput
        type="number"
        placeholder="Descuento"
        :value.sync="form.desc" 
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
    </CCol>
</CRow>
          </CCardBody>
          <CCardFooter>
           <CRow>
        <CCol>
          <div class="">
        <button type="submit" class="btn btn-light w-100"  @click="goBack"><CIcon name="cilArrowThickToLeft"/> Cancelar</button>
          </div>
        </CCol>
        <CCol>
        <div class="">
         <button type="submit" class="btn btn-success w-100"  @click="goBack"><CIcon name="cilSave"/> Guardar</button>
        </div>
        </CCol>
      </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol sm="5">
        <CCard bodyWrapper color="dark">
          
        </CCard>
      </CCol>
    </CRow>
  </div>
  </div>
</template>

<script>
  //Importaciones 
import axios from 'axios'
import NvoVehiculo from '../vehiculos/NvoVehiculo' 
import { required} from "vuelidate/lib/validators"
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
  export default {
     name: 'nvacotizacion',
      props:{
    refaccion: Boolean,
    mano_obra: Boolean,
      },
     components:{
     Multiselect,
     NvoVehiculo
     }, 
   data(){
    return{ 
        nvoVehiculo: false,
      status: 'not_accepted',
    form: this.getEmptyForm(),
    cliente:[],
    options: ['IVA'],
    vehiculo:[],
    orden:[]
    }
   },
    mounted: function(){
    this.getCliente()
    this.getVehiculo()
   },
   multicliente:[],
  multiorden:[{ value: 'Servicio', text: 'Servicio' },
    { value: 'Garantia', text: 'Garantia' },{ value: 'Rescate Vial', text: 'Rescate Vial' }],
  validations: {
    form: {
      cliente: {required}, 
      orden:{required},
      vehiculo:{required}
    },
  },
    methods:{
    newVehiculo(){
    this.$router.push({path: '/cotizacion'});
      },  
    
   getEmptyForm() {
      return {
        cliente: '',
        orden:'',
        vehiculo:'',
      }
      
   },
   getCliente() {
      let self = this;
      self.cliente = []
      axios.post(this.$apiAdress+'/api/usuario/getAll?token=' + localStorage.getItem("api_token"), {     
      })
      .then(function (response) {
        console.log(response.data)
        response.data.forEach(function(valor, indice, array) {
          self.cliente.push({
            value: valor.id,
            text: valor.name
          });
        });
      }).catch(function (error) {
        alert.responseCatch(error, 'Code #1005')  
      });
    },
    getVehiculo() {
      let self = this;
      self.vehiculo = []
      axios.post(this.$apiAdress+'/api/vehiculo/getAll?token=' + localStorage.getItem("api_token"), {     
      })
      .then(function (response) {
        console.log(response.data)
        response.data.forEach(function(valor, indice, array) {
          self.vehiculo.push({
            value: valor.id,
            text: valor.plac
          });
        });
      }).catch(function (error) {
        alert.responseCatch(error, 'Code #1005')  
      });
    },
    }
  }
     </script>
     <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>