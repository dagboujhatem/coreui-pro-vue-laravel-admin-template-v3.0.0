<template>
<b-overlay :show="showForm" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm" opacity="0.27">
      <fieldset disabled>
        <CRow>
          <CCol sm=""><h4 class="text-info text-center">Generales</h4>
          <br>
            <CRow>
              
              <CCol sm="6">

                <CInput label="Creado" type="text" placeholder="Creado" v-model="form.created_at">
                  <template #prepend-content><CIcon name="cilCalendar"/></template>
                </CInput>
              </CCol>
              <CCol sm="6">
                <CInput label="Nombre" type="text" placeholder="Nombre" v-model="form.name">
                  <template #prepend-content><CIcon name="cilUser"/></template>
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput label="Apellidos" type="text" placeholder="Apellidos" v-model="form.apell">
                  <template #prepend-content><CIcon name="cilUser"/></template>
                </CInput>
              </CCol>
            <CCol sm="6">
                <CInput label="Correo Electrónico" type="text" placeholder="Correo Electrónico" v-model="form.email">
                  <template #prepend-content><CIcon name="cil-envelope-open"/></template>
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              
                <CCol sm="">
                <CInput label="Empresa" type="text" placeholder="Empresa" v-model="form.emp">
                  <template #prepend-content><CIcon name="cilInstitution"/></template>
                </CInput>
              </CCol>
              <CCol sm="">
                <CInput label="Celular " type="text" placeholder="Celular" v-model="form.tel_mov">
                  <template #prepend-content><CIcon name="cilPhone"/></template>
                </CInput>
              </CCol>
              <CCol sm="">
                <CInput label="Sucursal" type="text" placeholder="Sucursal" v-model="form.id_suc_act">
                  <template #prepend-content><CIcon name="cilInstitution"/></template>
                </CInput>
              </CCol>
            </CRow>
           <br>
          </CCol>
        </CRow>
      </fieldset>

        <fieldset disabled>

        <CRow>
          <CCol sm=""><h4 class="text-info text-center">Facturación</h4>
          <br>
            <CRow>
              
              <CCol sm="6">

                <CInput label="Persona" type="text" placeholder="Persona" v-model="form.tip">
                  <template #prepend-content><CIcon name="cilUser"/></template>
                </CInput>
              </CCol>
              <CCol sm="6">
                <CInput label="RFC" type="text" placeholder="RFC" v-model="form.rfc">
                  <template #prepend-content><CIcon name="cil-envelope-open"/></template>
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="">
                <CInput label="Calle" type="text" placeholder="Calle" v-model="form.calle">
                  <template #prepend-content><CIcon name="cilText"/></template>
                </CInput>
              </CCol>
              <CCol sm="">
                <CInput label="No.Ext." type="text" placeholder="No.Ext." v-model="form.n_ext">
                  <template #prepend-content><CIcon name="cilText"/></template>
                </CInput>
              </CCol>
              <CCol sm="">
                <CInput label="C.P" type="text" placeholder="C.P" v-model="form.cp">
                  <template #prepend-content><CIcon name="cilText"/></template>
                </CInput>
              </CCol>
            </CRow>
      
            <CRow>
              <CCol sm="6">
                <CInput label="Colonia" type="text" placeholder="Colonia" v-model="form.col">
                  <template #prepend-content><CIcon name="cilText"/></template>
                </CInput>
              </CCol>
              <CCol sm="6">
                <CInput label="Estado " type="text" placeholder="Estado" v-model="form.est">
                  <template #prepend-content><CIcon name="cilText"/></template>
                 
                </CInput>
              </CCol>
            </CRow> <br>
          </CCol>
        </CRow>
        
      </fieldset>
        <fieldset disabled>
        <CRow>
          <CCol sm=""><h4 class="text-info text-center">Crédito</h4> 
          <br>
            <CRow>
              
              <CCol sm="6">

                <CInput label="Crédito" type="text" placeholder="Crédito" v-model="form.dias">
                  <template #prepend-content><CIcon name="cil-dollar"/></template>
                </CInput>
              </CCol>
              <CCol sm="6">
                <CInput label="Límite de crédito" type="text" placeholder="Límite de crédito" v-model="form.l_credito">
                  <template #prepend-content><CIcon name="cil-dollar"/></template>
                </CInput>
              </CCol>
            </CRow>
          </CCol>
        </CRow> 
      </fieldset>
</b-overlay>
</template>

<script>
import Repositories from '../cliente/Repositories'
import check from '@/repositories/global/check'

export default {
  name: 'Detalles',
  data: () => {
    return {
      showForm: true,
      form: [],
      sistema: JSON.parse(localStorage.getItem("sistema")),
    }
  },
  mounted: function() {
    this.getRegistro()
   
  },
  methods: {
    goBack() { this.$router.go(-1) },
    permisos(permisos) {
      return check.permiso(permisos)
    },
    async getRegistro() {
      let self      = this;
      self.form     = await Repositories.getRegistro(self);
      self.showForm = false
    },
  }
}
</script> 
