<template>
 <div>
      <CRow sm="12">
     <CCol sm="" type="submit"  @click="newCotizacion()">
        <CCard >
          <CCardHeader class="iconos" >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="40" height="40"
            viewBox="0 0 172 172"
           style=" fill:#000000;"><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#43b2c6"></path><g fill="#ffffff"><path d="M55.18333,29.38333c-7.1122,0 -12.9,5.7878 -12.9,12.9v88.86667c0,7.1122 5.7878,12.9 12.9,12.9h37.66979c-6.44713,-6.70227 -10.43646,-15.78673 -10.43646,-25.8h-12.928c-2.3736,0 -4.3,-1.9264 -4.3,-4.3c0,-2.1758 1.61931,-3.97701 3.71771,-4.26081l0.58229,-0.03919h13.9694c0.98613,-4.1452 2.64889,-7.98367 4.89349,-11.46667h-18.86289c-2.3736,0 -4.3,-1.96559 -4.3,-4.33919c0,-2.1758 1.61931,-3.97701 3.71771,-4.26081l0.58229,-0.03919h26.46068c6.45,-5.34347 14.72118,-8.56081 23.73398,-8.56081c5.07687,0 9.91867,1.03173 14.33333,2.87786v-8.6112h-32.96667c-7.1122,0 -12.9,-5.7878 -12.9,-12.9v-32.96667zM96.75,31.90286v30.44714c0,2.37073 1.92927,4.3 4.3,4.3h30.44714zM119.68333,86.71667c-17.415,0 -31.53333,14.11833 -31.53333,31.53333c0,17.415 14.11833,31.53333 31.53333,31.53333c17.415,0 31.53333,-14.11833 31.53333,-31.53333c0,-17.415 -14.11833,-31.53333 -31.53333,-31.53333zM119.68333,95.31667c1.5824,0 2.86667,1.28427 2.86667,2.86667v17.2h17.2c1.5824,0 2.86667,1.28427 2.86667,2.86667c0,1.5824 -1.28427,2.86667 -2.86667,2.86667h-17.2v17.2c0,1.5824 -1.28427,2.86667 -2.86667,2.86667c-1.5824,0 -2.86667,-1.28427 -2.86667,-2.86667v-17.2h-17.2c-1.5824,0 -2.86667,-1.28427 -2.86667,-2.86667c0,-1.5824 1.28427,-2.86667 2.86667,-2.86667h17.2v-17.2c0,-1.5824 1.28427,-2.86667 2.86667,-2.86667z"></path></g></svg>
        Nueva Cotización
          </CCardHeader>
        </CCard>
     </Ccol>

        <CCol sm="" type="submit"  @click="newRecepcion()">
        <CCard >
          <CCardHeader class="iconos">
       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="40" height="40"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#43b2c6"></path><g fill="#ffffff"><path d="M64.19332,34.41531c-8.51806,0 -15.97788,5.86895 -17.97773,14.14878l-2.08397,8.61375h-5.07933c-1.53918,-0.02177 -2.97086,0.78691 -3.7468,2.11637c-0.77594,1.32946 -0.77594,2.97374 0,4.3032c0.77594,1.32946 2.20762,2.13814 3.7468,2.11637h3.01759l-1.15591,4.77368c-3.66108,2.25605 -6.12965,6.26931 -6.12965,10.87555v36.9891v9.9586c0,3.14407 2.54656,5.69063 5.69063,5.69063h5.69063c3.14407,0 5.69063,-2.54656 5.69063,-5.69063v-5.69063h68.28757v5.69063c0,3.14407 2.54656,5.69063 5.69063,5.69063h5.69063c3.14407,0 5.69063,-2.54656 5.69063,-5.69063v-9.9586v-36.9891c0,-4.60624 -2.46857,-8.6195 -6.12965,-10.87555l-1.15591,-4.77368h3.01759c1.53918,0.02177 2.97086,-0.78691 3.7468,-2.11637c0.77594,-1.32946 0.77594,-2.97374 0,-4.3032c-0.77594,-1.32946 -2.20762,-2.13814 -3.7468,-2.11637h-5.07933l-2.08397,-8.61375c-1.99985,-8.27982 -9.45967,-14.14878 -17.97773,-14.14878zM64.19332,42.95126h43.61335c4.62161,0 8.59627,3.12905 9.68074,7.619l4.34578,17.98884h-71.66639l4.34578,-17.98884c1.08447,-4.48995 5.05913,-7.619 9.68074,-7.619zM57.54684,85.63099c3.14407,0 5.69063,2.54656 5.69063,5.69063c0,3.14407 -2.54656,5.69063 -5.69063,5.69063c-3.14407,0 -5.69063,-2.54656 -5.69063,-5.69063c0,-3.14407 2.54656,-5.69063 5.69063,-5.69063zM114.45316,85.63099c3.14407,0 5.69063,2.54656 5.69063,5.69063c0,3.14407 -2.54656,5.69063 -5.69063,5.69063c-3.14407,0 -5.69063,-2.54656 -5.69063,-5.69063c0,-3.14407 2.54656,-5.69063 5.69063,-5.69063zM76.0414,97.01225h19.91721c2.35877,0 4.26797,1.90921 4.26797,4.26797c0,2.35877 -1.90921,4.26797 -4.26797,4.26797h-19.91721c-2.35877,0 -4.26797,-1.90921 -4.26797,-4.26797c0,-2.35877 1.90921,-4.26797 4.26797,-4.26797z"></path></g></g></svg>
         Recepción de Vehículo
          </CCardHeader>
        </CCard>
     </Ccol>


     <CCol sm="" type="submit"  @click="newRecordatorio()">
        <CCard >
          <CCardHeader class="iconos">
        
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="40" height="40"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#43b2c6"></path><g fill="#ffffff"><path d="M77.4,28.66667v12.58646c-14.83108,3.82289 -25.8,17.2544 -25.8,33.28021v34.4l-11.46667,11.46667v5.73333h91.73333v-5.73333l-11.46667,-11.46667v-34.4c0,-16.02581 -10.96892,-29.45732 -25.8,-33.28021v-12.58646zM74.53333,131.86667c0,6.30667 5.16,11.46667 11.46667,11.46667c6.30667,0 11.46667,-5.16 11.46667,-11.46667z"></path></g></g></svg>
          Recordatorios
          </CCardHeader>
        </CCard>
     </Ccol>


     <CCol sm="" type="submit"  @click="newCotizacion()">
        <CCard >
          <CCardHeader class="iconos">
        <img src="https://img.icons8.com/cotton/40/000000/star.png"/>
         Calificación de mi taller
          </CCardHeader>
        </CCard>
     </Ccol>
   </CRow>

    <CRow sm="12">
      <CCol sm="">
        <CCard class="card text-white bg-info mb-3" style="max-width: 18rem;">
          <CCardHeader>
            <CIcon size="xl" name="cil-people"/>
               Clientes
          </CCardHeader>
          <CCardBody>
            <CRow>
            <CCol lg>
                <CLink class="text-white" @click="newCliente()" >
                <strong>Nuevo Cliente</strong>
                </CLink>
            </CCol>
            <CCol lg>
                <CLink class="text-white" @click="showCliente()" >
                <strong>Ver Clientes</strong>
                </CLink>
            </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>

        <CCol sm="">
        <CCard class="card text-white bg-danger mb-3" style="max-width: 18rem;">
          <CCardHeader>
            <CIcon size="xl" name="cil-settings"/>
            Servicios
          </CCardHeader>
          <CCardBody>
            <CCol lg class="text-center">
                <CLink class="text-white" @click="showServicios()" >
                <strong>Ver servicios</strong>
                </CLink>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="">
        <CCard class="card text-white bg-warning mb-3" style="max-width: 18rem;">
          <CCardHeader>
              
            <CIcon size="lg" name="cil-dollar"/>
           Balance
          </CCardHeader>

          <CCardBody>
            <CCol lg class="text-center">
                <CLink class="text-white" @click="showBalance()" >
                <strong>Ver balance</strong>
                </CLink>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="">
        <CCard class="card text-white bg-dark mb-3" style="max-width: 18rem;">
          <CCardHeader>
            <CIcon  name="cil-speedometer" size="lg"/>
            Vehículos
          </CCardHeader>
           <CCardBody>
            <CCol lg class="text-center">
                <CLink class="text-white" @click="showVehiculos()" >
                <strong>Ver en piso</strong>
                </CLink>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

     <div>
    <CRow>
      <CCol sm="">
        <CCard>

          <CCardHeader>  
            <h4 class="text-info">Citas</h4> 
            
            
              
          </CCardHeader>
          
           
          <CCardBody>
            


          </CCardBody>
          <CCardFooter>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
         <CButton type="button" class="btn btn-pill btn-info" @click="nvocita = true">
              <CIcon  name="cil-Paper-Plane" size="xl"/>
              NUEVA
          </CButton>
           <CModal 
      size="lg"
      title="Nueva Citas y Recordatorios"
      color="dark"
      :show.sync="nvocita"
    > 
    <NvoCita/>
     <template #footer>
        <CButton   @click="nvocita= false"><CIcon name="cilArrowThickToLeft"/> Cancelar</CButton>
        <CButton @click="nvoVehiculo = false" color="success"> Guardar</CButton>
      </template>
    </CModal>
            </div>
          </CCardFooter>
        </CCard>
      </CCol>

        <CCol sm="">
        <CCard>

          <CCardHeader>  
            <div class="text-info me-md-2">
            <h4>Servicios y ventas</h4> 
            
            <button type="button" class="btn btn-pill btn-sm btn-outline-dark"><CIcon  name="cil-calendar" size="sm"/> Cambiar fechas</button>
              
              </div>
          </CCardHeader>
          


          <CCardBody>
            


          </CCardBody>
          <CCardFooter>
            
          </CCardFooter>
        </CCard>
      </CCol>

    </CRow>
      </div>
  </div>

</template>

<script>
import axios from 'axios'
import NvoCita from '../citas/NvoCita'

export default { 
  components: {
    NvoCita,
  },
   data: function () {
      return {
        nvocita: false,
      }
   },
  methods:{
    newCliente() {
      this.$router.push({path: '/registros'});
  },
  nvocita(){
    this.$router.push({path: '/nvocita'});
      },
  showCliente(){
    this.$router.push({path: '/clientes'});
  },
  newCotizacion(){
    this.$router.push({path: '/nvacotizacion'});
  },
  showServicios(){
    this.$router.push({path: '/cotizacion'});
  },
  showBalance(){
    this.$router.push({path: '/balance'});
  },
  showVehiculos(){
    this.$router.push({path: '/piso'});
  },
  newRecepcion(){
    this.$router.push({path: '/recepcion'});
  },
  newRecordatorio(){
    this.$router.push({path: '/Recordatorios'});
  }
  
    
  }
}
</script>

<style>
.iconos{ max-width: 30rem; 
 width: 300px; }



</style>
