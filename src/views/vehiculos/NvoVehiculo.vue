<template>
   <CCol sm="">
      <CInput
      label="Placas o VIN"
      placeholder="Buscar por VIN o número de placa"    
      >
      </CInput>

      <CButton 
      @click="nvoVehiculo = true"  
      color="info"
      > 
       <CIcon 
       name="cilMagnifyingGlass"
       /> 
      Buscar 
      </CButton>
      <div sm="">
      <!--Nos permite llenar nuestro formulario manualmente-->
      <CLink 
      @click="collapse = !collapse" 
      class="text-info"
      style="float:center;"
      >
      Llenar manualmente
      </CLink>

    <CForm  @submit.prevent="store()" method="POST" novalidate>
      <CAlert
            :show.sync="dismissCountDown"
            color="success"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>

    <CCollapse :show="collapse">
    <p>
    <CRow>
       <CCol sm="">
        <CFormGroup wrapperClasses="input-group pt-2">
          <template #prepend-content><CIcon name="cilUser"/></template>
          <template #append><CButton color="secondary" @click="getCliente()" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
          <template #label>Cliente *</template>
          <template #input>
              <multiselect
                v-model="$v.form.cliente.$model"
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
          <span class="text-danger float-right" v-if="!$v.form.cliente.required">Este campo es obligatorio</span> <!--Valida que el campo es obligatorio-->
          </CCol>


    <CCol sm="">
      <CInput 
        label="Placas *"
        placeholder="Ingresa tus placas"  maxlength="10" :lazy="false" 
        :value.sync="$v.form.placas.$model" :isValid="checkIfValid('placas')">
       <template #prepend-content><CIcon name="cil-italic"/></template>
      </CInput>
       <span class="text-danger float-right" v-if="!$v.form.placas.required">Este campo es obligatorio</span>
     </CCol>
    </CRow>

    <CRow>
      <CCol sm="">
      <CInput 
        label="Vin/No. de chasis"
        placeholder="Ingresa tu Vin/No. de chasis"
        :value.sync="form.n_chasis">
       <template #prepend-content><CIcon name="cil-ListNumbered"/></template>
      </CInput>
     </CCol>

<!--Multiselect estos datos seran consumidos por un api y nos traera los datos de las marcas de carros-->
    <!--  <CCol sm="">
              <CFormGroup wrapperClasses="input-group pt-2">
                <template #prepend-content><CIcon name="cilBookmark"/></template>
                <template #append><CButton color="secondary" @click="getMarca()" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
                <template #label>Marca *</template>
                <template #input>
                  <multiselect
                    v-model="$v.form.marca.$model"
                    :options="marca"
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

              <span class="text-danger float-right" v-if="!$v.form.marca.required">Este campo es obligatorio</span>
            </CCol>  -->

            <CCol sm="">
      <CInput 
        label="Marca *"
        placeholder="Ingresa la marca"  maxlength="10" :lazy="false" 
        :value.sync="$v.form.marca.$model" :isValid="checkIfValid('marca')">
       <template #prepend-content><CIcon name="cil-italic"/></template>
      </CInput>
       <span class="text-danger float-right" v-if="!$v.form.marca.required">Este campo es obligatorio</span>
     </CCol>
    </CRow>

     <CRow>
    
     <!-- <CCol sm="">
         //multiselect dinamico este dependera de la marca del carro que fue elegido
        <CFormGroup wrapperClasses="input-group pt-2">
          <template #prepend-content><CIcon name="cilTags"/></template>
          <template #append><CButton color="secondary" @click="getModelo()" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
          <template #label>Modelo *</template>
          <template #input>
          <multiselect
            v-model="$v.form.modelo.$model"
            :options="modelo"
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
        <span class="text-danger float-right" v-if="!$v.form.modelo.required">Este campo es obligatorio</span>
      </CCol>  -->

      <CCol sm="">
      <CInput 
        label="Modelo *"
        placeholder="Ingresa el modelo"  maxlength="10" 
        :value.sync="$v.form.modelo.$model" :isValid="checkIfValid('modelo')">
       <template #prepend-content><CIcon name="cil-italic"/></template>
      </CInput>
       <span class="text-danger float-right" v-if="!$v.form.modelo.required">Este campo es obligatorio</span>
     </CCol>

      <CCol sm="">          
      <CFormGroup wrapperClasses="input-group pt-2">
       <template #prepend-content><CIcon name="cilList"/></template>
       <template #append><CButton color="secondary" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
       <template #label>Categoria</template>
       <template #input>
          <multiselect
           v-model="form.categoria"
           :options="$options.multiCategoria" 
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

  <CRow>   
    <CCol sm="">
      <CInput 
        label="Año"
        placeholder="Ingresa Año" 
        :value.sync="form.año">
       <template #prepend-content><CIcon name="cilCalendar"/></template>
      </CInput>
    </CCol>
    
    <CCol sm="">
      <CInput 
        label="No. de motor"
        placeholder="Ingresa tu No. de motor" 
        :value.sync="form.n_motor">
       <template #prepend-content><CIcon name="cilListNumbered"/></template>
      </CInput>
    </CCol>
    </CRow>

    <CRow>
     <CCol sm="">
      <CInput 
        label="Color Principal"
        placeholder="Ingresa Color del auto" 
        :value.sync="form.color">
       <template #prepend-content><CIcon name="cilPencil"/></template>
      </CInput>
     </CCol>

     <CCol sm="">          
      <CFormGroup wrapperClasses="input-group pt-2">
       <template #prepend-content><CIcon name="cilLibrary-add"/></template>
       <template #append><CButton color="secondary" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
       <template #label>Engomado *</template>
       <template #input>
          <multiselect
           v-model="form.engomado"
           :options="$options.multiselectOptions" 
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
       <span class="text-danger float-right" v-if="!$v.form.modelo.required">Este campo es obligatorio</span>
    </CCol>
    </CRow>

      <CRow>

        <CCol sm="">
      <CInput 
        label="Marca de motor"
        placeholder="Ingresa Marca de motor"  :lazy="false" 
        :value.sync="form.marca_motor">
       <template #prepend-content><CIcon name="cilBookmark"/></template>
      </CInput>
     </CCol>

      <CCol sm="">          
      <CFormGroup wrapperClasses="input-group pt-2">
       <template #prepend-content><CIcon name="cilSpeedometer"/></template>
       <template #append><CButton color="secondary" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
       <template #label>Transmisión</template>
       <template #input>
          <multiselect
           v-model="form.transmision"
           :options="$options.multiTransmision" 
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
   
        </p>
         <CButton type="submit" class="btn btn-success float-right" :disabled="!isValid || submitted" :hidden="submitted"><CIcon name="cilSave"/> Guardar</CButton>  
        
    </CCollapse>
     </CForm>
    
  </div>
    </CCol>
</template>

<script>

import axios from 'axios'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { validationMixin } from "vuelidate"
import alert from '@/repositories/global/alert'
import { required,  minLength, maxLength,   } from "vuelidate/lib/validators"
import check from '@/repositories/global/check'
import Swal from 'sweetalert2'

 export default {
   name:'NvoVehiculo',
   components:{
     Multiselect,
     
   },
   data(){
    return{
    submitted: false,
    form: this.getEmptyForm(),
    cliente: [],
    marca: [],
    modelo:[],
    categoria:[],
    engomado:[],
    transmision:[],
    nvoVehiculo: false,
    collapse: false,
   innerCollapse: false,
  //alerta 
       message: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
     }
   },
    mounted: function(){
    this.getCliente()
   }, 
   computed: {
    formString () { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
    isDirty() { return this.$v.form.$anyDirty },
  },
  multiselectOptions: [
    { value: 'Amarillo', text: 'Amarillo' },
    { value: 'Azul', text: 'Azul' },
    { value: 'Rosa', text: 'Rosa' },
    { value: 'Rojo', text: 'Rojo' },
    { value: 'Verde', text: 'Verde' },
   ],
   multiTransmision:[
      { value: 'Automática', text: 'Automática' },
      { value: 'Manual', text: 'Manual' },
   ],
    multiCategoria:[
      { value: 'Sedán', text: 'Sedán' },
      { value: 'SUV', text: 'SUV' },
      { value: 'PickUp', text: 'PickUp' },
      { value: 'Van', text: 'Van' },
      { value: 'Hatchback', text: 'Hatchback' },
      { value: 'Convertible', text: 'Convertible' },
   ],
  mixins: [validationMixin],
  validations: {
    form: {
      tipo: { required},
      cliente: {required,  maxLength: maxLength(150)},
      placas: { required, maxLength:maxLength(10)},
      marca: {required, maxLength:maxLength(80)},
      modelo: {required, maxLength:maxLength(80)},
      engomado: {required },
      
      
    },
  },
    methods:{
      goBack() { this.$router.go(-1) },
      permisos(permisos) {
      return !check.permiso(permisos)
    },
     showRegistro(id) {
      this.$router.push({path: `clientes/detalles/${id.toString()}`});
    },
    newCliente() {
      this.$router.push({path: '/regcliente'});
  },
   getEmptyForm() {
      return {
        tipo: 'Auto',
        cliente: '',
        placas: '',
        n_chasis:'',
        marca:'',
        modelo:'',
        categoria:'',
        año:'',
        n_motor:'',
        color:'',
        engomado:'',
        marca_motor: '',
        transmision: '',
      }
   },
   clearForm() {
      let self = this;
      self.form.tipo = ''
      self.form.cliente = ''
      self.form.placas = ''
      self.form.n_chasis = ''
      self.form.marca=''
      self.form.modelo=''
      self.form.categoria=''
      self.form.año=''
      self.form.n_motor = ''
      self.form.color=''
      self.form.engomado=''
      self.form.marca_motor=''
      self.form.trasmision=''
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    checkIfValid (fieldName) {
      const field = this.$v.form[fieldName]
      if (!field.$dirty) {
        return null
      } 
      return !(field.$invalid || field.$model === '')
    },
 //Realiza el registro de un nuevo vehiculo
  store() {
      let self = this;
      self.submitted = true
      self.errors = []
      self.form.val_ant=self.form.cliente
      self.form.cliente=self.form.cliente.value
      self.form.val_ant=self.form.categoria
      self.form.categoria=self.form.categoria.value
      self.form.val_ant=self.form.engomado
      self.form.engomado=self.form.engomado.value
      self.form.val_ant=self.form.transmision
      self.form.transmision=self.form.transmision.value
      axios.post(this.$apiAdress+'/api/vehiculo/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
        self.message = 'registrado exitosamente.';
        self.showAlert();
      console.log(response)
        self.clearForm()
        self.submitted = false;
      })
      .catch(function (error) {
          self.submitted = false;
          self.form.cliente=self.form.val_ant
          self.form.categoria=self.form.categoria
          self.form.engomado=self.form.engomado
          self.form.transmision=self.form.transmision
          self.errors = alert.responseCatch(error, 'Code #1009');
      });
  },
  getCliente() {
      let self = this;
      self.cliente = []
      axios.post(this.$apiAdress+'/api/usuario/getAll?token=' + localStorage.getItem("api_token"), {     
      })
      .then(function (response) {
        console.log(response.data)
        console.log("bien")
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
  
    }
    }
</script>