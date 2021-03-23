<template>
  <CRow>
   <CCol sm="12">
    <CCard>
      <CCardHeader class="p-1">
      <NvoCliente :facturas="true" />
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
      <CFormGroup wrapperClasses="input-group pt-2">
       <template #prepend-content><CIcon name="cilList"/></template>
       <template #append><CButton color="secondary" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
       <template #label>Acceso a seguimiento de servicios *</template>
       <template #input>
          <multiselect
           v-model="form.tipo"
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
    </CCol>

    <CCol sm="">
      <CInput
        label="RFC "
        placeholder="RFC"
        :value.sync="form.rfc" 
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
    </CCol>
  </CRow>

  <CRow sm="">
    <CCol sm="">
      <CInput
        label="Razón Social"
        placeholder="Razón social"
        :value.sync="form.razon_social" 
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
    </CCol>

    <CCol sm="">
      <CInput
         label="Calle"
         placeholder="Calle"
         :value.sync="form.calle" 
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
    </CCol>
  </CRow>

  <CRow sm="">
    <CCol sm="">
      <CInput
       label="No. Ext."
       placeholder="No. Ext."
       :value.sync="form.numero_exterior" 
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
    </CCol>

    <CCol sm="">
      <CInput
        type="number"
        label="C.P"
        placeholder="C.P"
        :value.sync="form.codigo_postal" 
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
    </CCol>
  </CRow>

  <CRow sm="">
    <CCol sm="">
      <CInput
        label="Colonia"
        placeholder="Colonia"
        :value.sync="form.colonia" 
      >
      <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      </CCol>


      <CCol sm="">
        <CInput
          label="Localidad"
          placeholder="Localidad"
          :value.sync="form.localidad" 
           >
       <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      </CCol>
    </CRow>

    <CRow sm="">
      <CCol sm="">
        <CInput
          label="Estado"
          placeholder="Estado"
          :value.sync="form.estado" 
          >
       <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
    </CCol>

      <CCol sm="">
        <CInput
          label="Ciudad/Delegación"
          placeholder="Ciudad/Delegación"
          :value.sync="form.ciudad" 
           >
       <template #prepend-content><CIcon name="cilText"/></template>
      </CInput>
      </CCol>
      </CRow>
 
     <CRow sm="">
            <CCol sm="6">
               <CFormGroup
            wrapperClasses="input-group pt-2"
            description="ex. (999) 999-9999"
          >
            <template #prepend-content>
              <CIcon name="cil-phone"/>
            </template>
            <template #label>
              Teléfono 1
            </template>
            <template #input>
              <masked-input
                type="tel"
                name="phone" :value.sync="form.telefono1"
                class="form-control"
                v-model="form.telefono1"
                :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                :guide="true"
                placeholderChar="#"
              />
            </template>
          </CFormGroup>
              </CCol>

          <CCol sm="6">
               <CFormGroup
            wrapperClasses="input-group pt-2"
            description="ex. (999) 999-9999"
          >
             
            <template #prepend-content>
              <CIcon name="cil-phone"/>
            </template>
            <template #label>
              Teléfono 2
            </template>
            <template #input>
              <masked-input
                type="tel"
                name="phone" 
                :value.sync="form.telefono2" 
                class="form-control"
                v-model="form.telefono2"
                :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                :guide="true"
                placeholderChar="#"
              />
            </template>
          </CFormGroup>
           </CCol>
</CRow>
     
<div class="mb-3">
  <label for="exampleFormControlTextarea1"
  
  class="form-label">Notas para Facturación</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :value.sync="form.notas" v-model="form.notas"  >     </textarea>
</div>
  
    </CCardBody>
      <CCardFooter>
          <CRow>
        <CCol>
          <div class="d-grid gap-2 d-md-block">
        <button type="submit" class="btn btn-light ">Cancelar</button>
          </div>
        </CCol>
        <CCol>
      
        <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton type="submit" class="btn btn-success" :hidden="submitted">Guardar</CButton> 
        </div></CCol>
      </CRow>
        </CCardFooter>
   </CForm>
    </CCard>
  </CCol>
</CRow>
</template>

<script> 
import axios from 'axios'
import MaskedInput from 'vue-text-mask'
import alert from '@/repositories/global/alert'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import NvoCliente from './NvoCliente'
import { required} from "vuelidate/lib/validators"
export default {
   name: 'datosfactura',
  components: {
    MaskedInput,
    Multiselect,
    NvoCliente,
  },
   data () {
    return {
      submitted: false,
      form: this.getEmptyForm(),
      tipo: [],
      message: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false
    }
   },
   multiselectOptions: [
    { value: 'Física', text: 'Física' },
    { value: 'Moral', text: 'Moral' },
   ],
   validations: {
    form: {
      tipo: { required },
      rfc: { required },
      razon_social: { required },
      calle: { required },
      numero_exterior: { required },
      codigo_postal: { required },
      colonia: { required },
      localidad: { required },
      estado: { required },
      ciudad: { required },
      telefono1: { required },
      telefono2: { required },
      notas: { required }
    },
   },
   methods: {
    getEmptyForm() {
      return {       
      tipo: '',
      rfc: '',
      razon_social: '',
      calle: '',
      numero_exterior: '',
      codigo_postal: '',
      colonia: '',
      localidad: '',
      estado: '',
      ciudad: '',
      telefono1: '',
      telefono2: '',
      notas:'',
      }
    },
    clearForm() {
      let self = this;
      self.form.tipo = ''
      self.form.rfc= ''
      self.form.razon_social= ''
      self.form.calle= ''
      self.form.numero_exterior= ''
      self.form.codigo_postal= ''
      self.form.colonia= ''
      self.form.localidad= ''
      self.form.estado= ''
      self.form.ciudad= ''
      self.form.telefono1= ''
      self.form.telefono2= ''
      self.form.notas=''
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
   store() {
      let self = this;
      self.submitted = true
      self.errors = []
      self.form.val_ant=self.form.tipo
      self.form.tipo=self.form.tipo.value
      axios.post(this.$apiAdress+'/api/factura/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
        self.message = 'registrado exitosamente.';
            self.showAlert();

      console.log(response)
        self.clearForm()
        self.submitted = false;
        
      }).catch(function (error) {
          self.submitted = false;
          self.form.tipo=self.form.val_ant
          self.errors = alert.responseCatch(error, 'Code #1009');
        });
  },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
