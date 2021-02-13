<template>
<CRow>
  <CCol sm="12">
    <CCard>
      <CCardHeader class="p-1">
        <SucMenu :actSC="true" />
      </CCardHeader>
      <CForm @submit.prevent="store()" method="POST">

         <CCol lg="6">
          <CCard :class="`bg-${submitted ? 'info' : 'secondary' }`">
            <pre>{{formString}}</pre>
          </CCard>
        </CCol>

        <CCardBody>
          <ul v-if="errors != null"><li class="text-danger" v-for="error in errors">{{ error[0] }}</li></ul>
          <CRow>
            <CCol sm="6">
              <CInput label="Sucursal *" type="text" placeholder="Sucursal" maxlength="50" class="mb-0" :lazy="false" :value.sync="$v.form.sucursal.$model" :isValid="checkIfValid('sucursal')">
                <template #prepend-content><CIcon name="cilText"/></template>
              </CInput>
              <span class="text-danger float-right" v-if="!$v.form.sucursal.required">Este es un campo obligatorio.</span>
              <span class="text-danger float-right" v-if="!$v.form.sucursal.maxLength">Este campo no debe contener más de {{$v.form.sucursal.$params.maxLength.max }} caracteres.</span>
            </CCol>
            <CCol sm="6">
              <CFormGroup wrapperClasses="input-group pt-2">
                <template #prepend-content><CIcon name="cilList"/></template>
                <template #append><CButton color="secondary" @click="getSeries()" title="Recargar"><CIcon name="cilLoop"/></CButton><CatModalCreate/></template>
                <template #label>Serie *</template>
                <template #input>
                  <multiselect
                    v-model="$v.form.serie.$model"
                    :options="series"
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
              <span class="text-danger float-right" v-if="!$v.form.serie.required">Este es un campo obligatorio.</span>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput label="Dirección *" type="text" placeholder="Dirección" maxlength="200" class="mb-0" :lazy="false" :value.sync="$v.form.direccion.$model" :isValid="checkIfValid('direccion')">
                <template #prepend-content><CIcon name="cilText"/></template>
              </CInput>
              <span class="text-danger float-right" v-if="!$v.form.direccion.required">Este es un campo obligatorio.</span>
              <span class="text-danger float-right" v-if="!$v.form.direccion.maxLength">Este campo no debe contener más de {{$v.form.direccion.$params.maxLength.max }} caracteres.</span>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow class="content-center">
            <CCol>
              <CButton color="secondary" class="w-75" @click="goBack"><CIcon name="cilArrowThickToLeft"/> Regresar</CButton>
            </CCol>
            <CCol>
              <b-spinner label="Loading..." variant="primary" :hidden="spinner"></b-spinner>
              <CButton type="submit" color="primary" class="w-100" :disabled="!isValid || submitted" :hidden="submitted"><CIcon name="cilSave"/> Registrar</CButton>
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
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { validationMixin } from "vuelidate"
import { required, maxLength } from "vuelidate/lib/validators"
import SucMenu from './SucMenu'
import CatModalCreate from '../configuracion/catalogo/CatModalCreate'

export default {
  name: 'SucCreate',
  components: {
    SucMenu,
    Multiselect,
    CatModalCreate
  },
  data() {
    return {
      submitted: false,
      spinner: true,
      form: this.getEmptyForm(),
      errors: [],
      series: []
    }
  },
  mounted: function(){
    this.getSeries()
  },
  computed: {
    formString() { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
    isDirty() { return this.$v.form.$anyDirty },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      sucursal: { required, maxLength: maxLength(50) },
      serie: { required },
      direccion: { required, maxLength: maxLength(200) }
    },
  },
  methods: {
    goBack() { this.$router.go(-1) },
    getEmptyForm() {
      return {
        sucursal: '',
        direccion: '',
        serie: '',
      }
    },
    clearForm() {
      let self = this;
      self.form.sucursal = ''
      self.form.direccion = ''
      self.form.serie = ''
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
      self.spinner = false
      self.errors = []

      axios.post(this.$apiAdress+'/api/sucursal/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
      //  alert.response200('¡Registrado exitosamente!', `<a href="#/users/${response.data.id.toString()}"><b>Ver registro</b></a>`)

      console.log(response)
        self.clearForm()
        self.submitted = false;
        self.spinner = true
      }).catch(function (error) {
        self.submitted = false;
        self.spinner = true
        self.errors = alert.responseCatch(error, 'Code #1009');
      });
    },
    getSeries() {
      let self = this;
      self.series = []

      axios.post(this.$apiAdress+'/api/catalogo/getAll?token=' + localStorage.getItem("api_token"), {
        input: 'Cotizaciones (Serie)'
      })
      .then(function (response) {
        console.log(response.data )
        response.data.forEach(function(valor, indice, array) {
          self.series.push({
            value: valor.id,
            text: valor.text
          });
        });
      }).catch(function (error) {
        alert.responseCatch(error, 'Code #1005')  
      });
    }
  }
}
</script>
