<template>
<div id="formulario-directorio"> 
  <CForm inline  @submit.prevent="enviarFormulario">
      <CCardBody>    
      <CRow>
      <CCol sm="">
        
      <CInput 
        placeholder="Ingresa tu nombre"  maxlength="100"
        v-model="directorio.nombredir"
      >
      <template #prepend-content><CIcon name="cilUser"/></template>
      </CInput>
    </CCol>
    <CCol sm="">
      <CInput
        placeholder="Puesto" 
         v-model="directorio.puesto"
      >
       <template #prepend-content><CIcon name="cilBook"/></template>
      </CInput>
      </CCol>

      <CCol sm="">
      <CInput type="email"
        label=""
        placeholder="Ingresa tu Correo"  maxlength="75" autocomplete="username email"
        v-model="directorio.correodir">

        <template #prepend-content><CIcon name="cilContact"/></template>
      </CInput>
    </CCol>


      <CCol sm="">
          <CFormGroup
            wrapperClasses="input-group"
            description="ex. (999) 999-9999"
          >  
            <template #prepend-content>
              <CIcon name="cil-phone"/>
            </template>
            <template #input>
              <masked-input
              placeholder="Teléfono"
                type="tel"
                name="phone" 
                :value.sync="directorio.telefonodir" 
                class="form-control"
                v-model="directorio.telefonodir"
                :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                :guide="true"
                placeholderChar="#"
              />
            </template>
          </CFormGroup>
              </CCol>

      <CCol>
     <CButton class="mr-5" type="submit" color="info">Agregar</CButton>
     </CCol>
    </CRow> 
    
    </CCardBody>
  </CForm>
  </div>
</template>
<script>
import MaskedInput from 'vue-text-mask'
export default {
  name:'formulario-directorio',
  components:{
    MaskedInput
  },
data(){
  return{

directorio:{
          nombredir:'',
          puesto: '',
          correodir:'',
          telefonodir:''
      },
  }
},
methods: {
    


    //botón enviar datos a la tabla de directorios
      enviarFormulario(){
          this.$emit('add-directorio', this.directorio);

this.directorio={
        nombredir : '',
      puesto : '',
      correodir : '',
      telefonodir : ''
      }
    
         },
       /*   clearForm() {
   
      let self = this;
      self.directorio.nombredir = ''
      self.directorio.puesto = ''
      self.directorio.correodir = ''
      self.directorio.telefonodir = ''
          }*/


      
}
}
</script>