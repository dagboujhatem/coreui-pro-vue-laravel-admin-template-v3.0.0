<template>
  <CRow>
   <CCol sm="12">
    <CCard>
      <CCardHeader class="p-1" >
      <NvoCliente :directorio="true" />
      </CCardHeader>
      <CForm inline  @submit.prevent="store()" method="POST" novalidate>
      <CCardBody>    
         <CAlert
            :show.sync="dismissCountDown"
            color="success"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>
      <CRow>
      <CCol sm="">
        
      <CInput 
        placeholder="Ingresa tu nombre"  maxlength="100" :lazy="false" 
        :value.sync="$v.form.nombre.$model" :isValid="checkIfValid('nombre')"
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      <span class="text-danger float-right" v-if="!$v.form.nombre.required">Este campo es obligatorio.</span>
      <span class="text-danger float-right" v-if="!$v.form.nombre.maxLength">Este campo no debe contener más de {{$v.form.nombre.$params.maxLength.max }} caracteres.</span>
    </CCol>
    <CCol sm="">
      <CInput
        placeholder="Puesto" 
         :value.sync="$v.form.puesto.$model"
      >
       <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      </CCol>
      <CCol sm="">


      <CInput type="email"
        placeholder="Correo Electrónico" maxlength="200" 
        :value.sync="$v.form.correo.$model" :isValid="checkIfValid('correo')"
      >
       <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      <span @submit.prevent class="text-danger float-right" v-if="!$v.form.correo.required">Este campo es obligatorio.</span>
      <span class="text-danger float-right" v-if="!$v.form.correo.email"></span>
      <span class="text-danger float-right" v-if="!$v.form.correo.maxLength">Este campo no debe contener más de {{$v.form.correo.$params.maxLength.max }} caracteres.</span>
      </CCol>

      <CCol sm="">
      <CInput
      onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
        placeholder="Teléfono" maxlength="12" 
        :value.sync="$v.form.telefono.$model" :isValid="checkIfValid('telefono')"
      >
      <template #prepend-content><CIcon name="cil-phone"/></template>
      </CInput>
      <span class="text-danger float-right" v-if="!$v.form.telefono.required">Este campo es obligatorio.</span>
      <span class="text-danger float-right" v-if="!$v.form.telefono.maxLength">Este campo no debe contener más de {{$v.form.telefono.$params.maxLength.max }} caracteres.</span>
      </CCol>
      <CCol>
     <CButton class="mr-5" color="info" type="submit" :hidden="submitted">Agregar</CButton>
     </CCol>
    </CRow> 
    <br>
    <br>
    <CDataTable
            :items="items"
            :fields="fields"
            index-column
            hover
            footer
            table-column
            :sorter="{ external: true, resetable: true }"
            :columnFilter="{ external: true, lazy: true }"
          
            :sorter-value.sync="sorter"
            :column-filter-value.sync="columnFilter"
            :table-filter-value.sync="tableFilter"
            :loading="loading"       
          >
          <template #nombre="{item}">
                <td>
                  <strong>{{item.nombre}}</strong>
                </td>
              </template>
              <template #puesto="{item}">
                <td>
                  <strong>{{item.puesto}}</strong>
                </td>
              </template>
              <template #correo="{item}">
                <td>
                  <strong>{{item.correo}}</strong>
                </td>
              </template>
               <template #telefono="{item}">
                <td>
                  <strong>{{item.telefono}}</strong>
                </td>
              </template>
              
            <template #delete="{item}">
                <td class="py-2">
                <CButton 
                color="danger" 
                variant="outline" 
                square 
                size="sm" 
                @click="deleteDir(item.id)"> 
                <CIcon name="cil-trash"/>
                </CButton>
                </td>  
            </template>
        </CDataTable> 
    </CCardBody>
  </CForm>
 
   <CCardFooter>
    <CRow>
      <CCol>
        <div class="d-grid gap-2 d-md-block">
        <button type="submit" class="btn btn-light ">Cancelar</button>
        </div>
      </CCol>
     </CRow>
    </CCardFooter>
    </CCard>
  </CCol>
</CRow>
</template>

<script> 
import axios from 'axios'
import alert from '@/repositories/global/alert'
import { validationMixin } from "vuelidate"
import { required, email, maxLength } from "vuelidate/lib/validators"
import NvoCliente from './NvoCliente'
export default {
   name: 'directorios',
  components: {
    NvoCliente,
  },
  
  data () {
    return {
      submitted: false,
     
       form: this.getEmptyForm(),
      errors: [],
      fields: ['nombre', 'puesto','correo','telefono',
      {
        key:'delete',label:'',
        _style:'width:1%',
        sorter:false,
        filter:false
      }
      ],
      items: [],
      sorter: {column: '', asc: false},
      tableFilter: '',
      columnFilter: {},
      itemsLimit: 10,
      loading: false,

       message: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false
    
    }
  },
   watch: {
    
  	sorter: {
    	handler(){
      	this.getdirectorio();
      },
      deep: true
    },
    tableFilter(){
      this.getdirectorio();
    },
    columnFilter(){
      this.getdirectorio();
    }
  },
  mounted: function(){
    this.getdirectorio();
  },
  computed: {
    isValid() { return !this.$v.form.$invalid },
    isDirty() { return this.$v.form.$anyDirty },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      nombre: { required, maxLength: maxLength(100) },
      puesto: { required },
      correo: { required, email, maxLength: maxLength(200) },
      telefono: {required, maxLength: maxLength(12)}
    },
  },

  methods: {
    getEmptyForm() {
      return {
        nombre: '',
        puesto: '',
        correo: '',
        telefono:'',
      }
    },
    clearForm() {
   
      let self = this;
      self.form.nombre = ''
      self.form.puesto = ''
      self.form.correo = ''
      self.form.telefono = ''
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

      axios.post(this.$apiAdress+'/api/directorio/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
      //  alert.response200('¡Registrado exitosamente!', `<a href="#/users/${response.data.id.toString()}"><b>Ver registro</b></a>`)
        self.message = 'registrado exitosamente.';
            self.showAlert();


      console.log(response)
        self.clearForm()
        self.submitted = false;
        
      }).catch(function (error) {
           self.submitted = false;
     
        self.errors = alert.responseCatch(error, 'Code #1009');
        //self.errors = alert.responseCatch(error, 'Code #1009');
      });
    },
    getdirectorio(){
      this.loading = true
      let self = this;
      this.items = [];
      axios.post( this.$apiAdress + '/api/directorio?token=' + localStorage.getItem("api_token")+'&page=' + self.activePage, 
        {
          sorter:       self.sorter,
          tableFilter:  self.tableFilter,
          columnFilter: self.columnFilter,
          itemsLimit:   self.itemsLimit
        }
       )
      .then(function (response) {
        self.items = self.items.concat(response.data.data);
        self.maxPages = response.data.last_page;
        self.loading = false
        console.log(response)
      }).catch(function (error) {
        self.loading = false
        console.log(error);
      });
    },
    makeFilter(){
      this.getdirectorio();
    },
  
  }, 
}
</script>