<template>
 <!--Esta vista es para registrar un credito al cliente-->
  <CRow>
  <CCol sm="12">
  <CCard>
    <CCardHeader class="p-1">
      <NvoCliente :credito="true" />
      </CCardHeader>
      <CForm @submit.prevent="store()" method="POST">
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
        label="Días de crédito *"
        placeholder="Días de crédito"
        :value.sync="form.dias" 
      >
      <template #prepend-content><CIcon name="cil-dollar"/></template>
      </CInput>
      </CCol>
  <CCol sm="">
      <CInput
      label="Límite de Crédito *"
      placeholder="Límite de crédito"
      :value.sync="form.credito" 
      >
      <template #prepend-content><CIcon name="cil-dollar"/></template>
      </CInput>
  </CCol>
  </CRow>
  </CCardBody>
  <CCardFooter>
    <CRow>
      <CCol>
       <div class="d-grid gap-2 d-md-block">
        <button 
        type="submit"
         class="btn btn-light "
        >
        Cancelar
        </button>
        </div>
        </CCol>
      <CCol>
        <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton 
        class="mr-5"
         color="info" 
         type="submit" 
         :hidden="submitted"
         >Agregar
         </CButton>
        </div>
      </CCol>
      </CRow>
     </CCardFooter>
    </CForm>
   </CCard>
  </CCol>
 </CRow>
</template>

<script> 
import axios from 'axios'
import alert from '@/repositories/global/alert'
import { required} from "vuelidate/lib/validators"
import NvoCliente from './NvoCliente'
export default {
   name: 'credito',
  components: {
    NvoCliente,
  },
   data () {
    return {
      submitted: false,
      form: this.getEmptyForm(),
      message: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false
    }
   },
   validations: {
    form: {
      dias: { required },
      credito: { required },
    },
   },
   methods: {
    getEmptyForm() {
      return {
        dias: '',
        credito: '',
      }
    },
    //limpia los datos del formulario
    clearForm() {
      let self = this;
      self.form.dias = ''
      self.form.credito = ''
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
  //Realiza el registro del credito asignado   
   store() {
      let self = this;
      self.submitted = true
      self.errors = []
      axios.post(this.$apiAdress+'/api/credito/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
        self.message = 'registrado exitosamente.';
            self.showAlert();
      console.log(response)
        self.clearForm()
        self.submitted = false; 
      }).catch(function (error) {
        self.submitted = false;
        self.errors = alert.responseCatch(error, 'Code #1009');
      });
    },
   }
}
</script>