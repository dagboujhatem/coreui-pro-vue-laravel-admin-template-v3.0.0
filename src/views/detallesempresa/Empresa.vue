<template>
  <CCard>
        <CCardHeader>
           <div class="text-info">
         <h5>Detalles de la empresa </h5> 
           </div>
        </CCardHeader>
        <CCardBody>
       
          <ul class="list-group list-group-accent">
            <li class="list-group-item list-group-item-accent-dark">Nombre</li>       
            <li class="list-group-item list-group-item-accent-secondary">Nombre de usuario</li> 
            <li class="list-group-item list-group-item-accent-dark">Correo Electrónico</li> 
            <li class="list-group-item list-group-item-accent-secondary">Nombre de Taller</li> 
            <li class="list-group-item list-group-item-accent-dark">Teléfono</li> 
          </ul>

          <hr>
          <ul class="list-group list-group-accent">
            <li class="list-group-item list-group-item-accent-secondary">Calle y Número</li>       
            <li class="list-group-item list-group-item-accent-dark">Colonia/Localidad</li> 
            <li class="list-group-item list-group-item-accent-secondary">Delegación</li>
            <li class="list-group-item list-group-item-accent-dark">Estado</li>  
            <li class="list-group-item list-group-item-accent-secondary">C.P</li>
          </ul>
      
            <div>
            <div class="d-grid gap-2 col-6 mx-auto">  
    <CButton
      @click="Editarconfig = true"
      color="outline-dark"
    ><CIcon name="cil-pencil"/>
      Editar
    </CButton>
            </div>
    <CModal
      title="Editar Información"
      color="dark"
      :show.sync="Editarconfig"
    >
    <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Usuario</label>
      <input type="email" class="form-control" id="inputEmail4" disabled>
    </div>
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4">
    </div>
    
  </div>
  <div class="form-group">
    <label>Nombre completo</label>
    <input type="text" class="form-control" id="inputAddress">
  </div>
  
  <div class="form-group">
    <label>Mi taller, principalmente, es de: </label>
 </div>

    <div class="form-check form-check-inline">
   <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label class="form-check-label" for="inlineRadio1">Automóviles</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
  <label class="form-check-label" for="inlineRadio2">Motocicletas</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
  <label class="form-check-label" for="inlineRadio3">Vehículos de carga</label>
</div>
 
</form>
    </CModal>
  </div>
             

        </CCardBody>
        
        <c-card-footer> 
        <p>Actualice su contraseña</p>
        <div>
    <CButton
      @click="warningModal = true"
      color="danger"
    >
      CAMBIAR CONTRASEÑA
    </CButton>
    <CModal
      title="Cambio de contraseña"
      color="danger"
      :show.sync="warningModal"
    >
     
  <div>
    <CRow>
      <CCol sm="12">
        <CInput
          type="password"
          label="Contraseña actual"
          placeholder="Contraseña actual"
        />
      </CCol> 
    </CRow>
     <CRow>
      <CCol sm="12">
        <CInput
          type="password"
          label="Nueva contraseña"
          placeholder="Nueva contraseña"
        />
      </CCol>
    </CRow>
     <CRow>
      <CCol sm="12">
        <CInput
          type="password"
          label="Confirme contraseña"
          placeholder="Confirme contraseña"
        />
      </CCol>
    </CRow>
      </div>
    </CModal>
  </div>

        </c-card-footer>
  </CCard>
  
</template>

<script>
export default {
 data(){
   return{
     warningModal: false,
     Editarconfig:false

    }
  } 
 }
</script>