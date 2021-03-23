<template>
        <div>
        <CCard sm="6">
          <CCardHeader>
            <h2 class="text-info">Ordenes y Cotizaciones</h2>
      <div class="float-right">
      <CButton 
       size="sm"
       class="m-2" 
       color="warning"
       @click="newCliente()"
       >
       <CIcon 
        name="cilLibrary-add"
       />
       Tareas
       <!--para ponerle un icono al boton-->
       
       </CButton>
      <!--Boton que realiza el registro de una nueva recepcion-->
      <CButton
      size="sm"
      class="m-2"        
      color="success"
      @click="nvoVehiculo = true"  
      > 
       <CIcon 
       name="cilSpeedometer"
       /> 
      Recepción
      </CButton>
      <!--Boton que realiza el registro de una nueva cotización-->
      <CButton
      size="sm"       
      @click="newCotizacion()" 
      color="info"
      > 
      <CIcon 
       name="cil-plus"
       /> 
      Cotización
      </CButton>
      </div>
          </CCardHeader>
          <CCardBody>
            
          </CCardBody>
          <CCardFooter>
           
          </CCardFooter>
        </CCard>
     
  </div>
      
  
</template>

<script>
  
  import { ref } from 'vue'
  import axios from 'axios'


  export default {
     name: 'cotizacion',
     
  methods:{
  newCotizacion(){
    this.$router.push({path: '/nvacotizacion'});
  },
  }
  }
</script>