<template>
  <div>
   <!-- <CModal 
      size="lg"
      title="Nueva Citas y Recordatorios"
      color="dark"
      :show.sync="warningModal"
    > 
     <template #footer>
        <CButton  @click="goBack"><CIcon name="cilArrowThickToLeft"/> Cancelar</CButton>
        <CButton @click="nvoVehiculo = false" color="success"> Guardar</CButton>
      </template>
    </CModal> -->

    <CRow sm="">
      <CCol sm="">
        <CForm  @submit.prevent="store()" method="POST" novalidate sm="">
          <CAlert
            :show.sync="dismissCountDown"
            color="success"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>

         <CInput
                label="Fecha"
                type="date"
                horizontal
              />
  <CRow>
    <CCol sm="">
      <CInput 
        label="Nombre"
        placeholder="Nombre de cita"  :lazy="false" 
        :value.sync="form.nombre" :isValid="checkIfValid('nombre')">
       <template #prepend-content><CIcon name="cilCalendar"/></template>
      </CInput>
    </CCol>
    
    <CCol sm="">
      <CInput
        label="Hora"
         :value.sync="form.hora" :isValid="checkIfValid('hora')"
        type="time"
       
        >
      </CInput>
    </CCol>
    
  </CRow>

    <CRow>
    <CCol sm="">
        <label for="exampleFormControlTextarea1"
        class="form-label">Notas para Facturación</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" :value.sync="form.nota" v-model="form.nota"  >     </textarea>
    </CCol>
    </CRow>

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
     </CRow>
          </CForm>
      </CCol>
      <CCol sm="" md="">
      <CCard sm="" color="light">
       <h6 class="text-info m-auto"> 
         <div>
            Crear Recordatorios
         </div>
        </h6> 
         <CRow>
     <CCol>   
     <img src="https://img.icons8.com/fluent/96/000000/calendar.png"/>       
    </CCol>
        </CRow>

     

<CCol>
  <div>
    Enviar Recordatorio al cliente?
  </div>
   <template v-for="(mode, index) in modes">
      <div class="d-flex justify-content-between my-4" :key="index">
        <CSwitch
        :isValid="checkIfValid('recordatorio')"
         :checked.sync="$v.form.recordatorio.$model"
          :key="key"
          :color="color"
          v-bind="mode"
          v-for="(color, key) in colors"
        >
        </CSwitch> 
      </div>
    </template>
</CCol>

<CCol>   
      <template v-for="(name, key) in checkboxNames">
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
              </template>    
    </CCol>



 </CCard>
        </CCol>
        </CRow>


  </div>
</template>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Multiselect from 'vue-multiselect'
import { validationMixin } from "vuelidate"
import check from '@/repositories/global/check'
import alert from '@/repositories/global/alert'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { required,  minLength, maxLength,   } from "vuelidate/lib/validators"


export default {
  name: 'nvocita',
  components: {
   
    Multiselect,
  },
  data () {
    return {
    value: '',
    submitted: false,
    form: this.getEmptyForm(),
    cliente: [],
    options: ['Correo Electrónico', 'SMS'],
    nota: [],
    nombre: [],
     checkboxNames: ['Enviar: '],
      date: '',
      
  
        recordatorio:'',
        message: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,

         modes: [ 
        { shape: 'pill'},
      ],
      colors: ['dark']
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
mixins: [validationMixin],
  validations: {
    form: {   
      cliente: {required,  maxLength: maxLength(150)},
      hora: {required},
      nota: {required},
      nombre: {required},
      recordatorio: {required}
      
    },
  },
 methods:{
   goBack() { this.$router.go(-1) },
   permisos(permisos) {
      return !check.permiso(permisos)
    },
     getEmptyForm() {
      return {
        cliente: '',
        hora:'',
        nota:'',
        nombre:'',
        recordatorio:''
      }
   },
   clearForm() {
      let self = this;
      self.form.cliente = ''
      self.form.hora = ''
      self.form.nota = ''
      self.form.nombre = ''
     
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
     store() {
      let self = this;
      self.submitted = true
      self.errors = []
      self.form.val_ant=self.form.cliente
      self.form.cliente=self.form.cliente.value

      axios.post(this.$apiAdress+'/api/cita/almacenar?token='+localStorage.getItem("api_token"), self.form
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
  },
   
}

</script>