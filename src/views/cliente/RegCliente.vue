<template>
  <div>
    <CRow>
        <CCol sm="" >
        <CCard>        
           
  <div class="m-3">
         <h4 class="text-info" v-if="cliente"> Nueva Flotilla </h4>
    <h4 class="text-info" v-else-if="flotilla"> Nuevo Cliente</h4>
    <h4 v-else>Nuevo Cliente </h4>
  </div>
<div >
  <CButton class="float-right mr-5" color="ligth" @click="cliente = true" :value="flotilla">Flotilla</CButton>
  <CButton class="float-right " color="ligth" @click="cliente= false" :value="cliente">Cliente</CButton>
  </div>

        <CCardBody>
          <h5 class="bold">Por favor completa los siguientes campos: </h5>
          <br>
          <br>
          <CTabs add-tab-classes="mt-1">
          <CTab active>
            <template slot="title">
            <CIcon name="cil-calculator"/> {{tabs[0]}}
            </template>
            <CForm  @submit.prevent="store()" method="POST" novalidate>
        <CCardBody>
        
        <CCol lg="6">
        <CCard :class="`bg-${submitted ? 'info' : 'secondary' }`">
        <pre>{{formString}}</pre>
        </CCard>
        </CCol>
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
          label="Nombre(s) *"
          placeholder="Ingresa tu nombre"  maxlength="40" :lazy="false" 
          :value.sync="$v.form.nombre.$model" :isValid="checkIfValid('nombre')" >
          <template #prepend-content><CIcon name="cilUser"/></template>
        </CInput>
          <span class="text-danger float-right" v-if="!$v.form.nombre.required">Este campo es obligatorio</span>
          <span class="text-danger float-right" v-if="!$v.form.nombre.maxLength">Este campo no debe contener más de {{$v.form.nombre.$params.maxLength.max }} caracteres.</span>
      </CCol>

    <CCol sm="">
      <CInput
        label="Apellidos *"
        placeholder="Ingresa tus apellidos"  maxlength="40" :lazy="false" 
        :value.sync="$v.form.apellidos.$model" :isValid="checkIfValid('apellidos')">
        <template #prepend-content><CIcon name="cilUser"/></template>
      </CInput>
        <span class="text-danger float-right" v-if="!$v.form.apellidos.required">Este campo es obligatorio</span>
        <span class="text-danger float-right" v-if="!$v.form.apellidos.maxLength">Este campo no debe contener más de {{$v.form.apellidos.$params.maxLength.max }} caracteres.</span>
     </CCol>
    </CRow>

    <CRow sm="">
     <CCol sm="">
      <CInput type="email"
        label="Correo Electrónico *"
        placeholder="Ingresa tu Correo"  maxlength="75" :lazy="false"  autocomplete="username email"
        :value.sync="$v.form.correo.$model" :isValid="checkIfValid('correo')">
        <template #prepend-content><CIcon name="cilContact"/></template>
      </CInput>
        <span class="text-danger float-right" v-if="!$v.form.correo.required">Este campo es obligatorio</span>
        <span class="text-danger float-right" v-if="!$v.form.correo.email">Este campo debe ser una dirección de correo electrónico válida.</span>
    </CCol>


    <CCol sm="">
     <CInput type="email"
        label="Correo Electrónico Secundario"
        placeholder="Ingresa tu Correo"  maxlength="75" :lazy="false" 
        :value.sync="form.correo_secundario">
        <template #prepend-content><CIcon name="cilContact"/></template>
      </CInput>
    </CCol>
  </CRow>

  <CRow>
    <CCol md="6">
                  <CInput
                  :isValid="checkIfValid('contraseña')"
                  :value.sync="$v.form.contraseña.$model"
                  label="Contraseña *"
                  type="password"
                  placeholder="**********"
                  autocomplete="new-password"
                  invalidFeedback="Contraseña requerida que contenga al menos: número, letra mayúscula y minúscula, 8 caracteres"
                />
                <span class="text-danger float-right" v-if="!$v.form.contraseña.required">Este campo es obligatorio</span>
              </CCol>
              <CCol md="6">
                <CInput
                  :isValid="checkIfValid('confirmPassword')"
                  :value.sync="$v.form.confirmPassword.$model"
                  label="Confirmar Contraseña *"
                  type="password"
                  placeholder="**********"
                  autocomplete="new-password"
                  invalidFeedback="Las contraseñas deben coincidir"
                />
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
              Teléfono fijo
            </template>
            <template #input>
              <masked-input
                type="tel"
                name="phone" :value.sync="form.telefono_fijo"
                class="form-control"
                v-model="form.telefono_fijo"
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
              Teléfono movil *
            </template>
            <template #input>
              <masked-input
                type="tel"
                name="phone" 
                :value.sync="$v.form.telefono_movil.$model" 
                :isValid="checkIfValid('telefono_movil')"
                class="form-control"
                v-model="form.telefono_movil"
                :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                :guide="true"
                placeholderChar="#"
              />
            </template>
          </CFormGroup>
           <span class="text-danger float-right" v-if="!$v.form.sucursal.required">Este campo es obligatorio</span>
              </CCol>
       
      <CCol sm="">
        <CInput
          label="Nombre de la empresa"
          placeholder="Nombre de la Empresa"  maxlength="100" :lazy="false" 
          :value.sync="form.empresa">
          <template #prepend-content><CIcon name="cilText"/></template>
        </CInput>
      </CCol>
      </CRow>

      <br>
      <CRow>
       <CCol sm="6">
              <CFormGroup wrapperClasses="input-group pt-2">
                <template #prepend-content><CIcon name="cilList"/></template>
                <template #append><CButton color="secondary" @click="getSucursal()" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
                <template #label>Sucursal *</template>
                <template #input>
                  <multiselect
                    v-model="$v.form.sucursal.$model"
                    :options="sucursal"
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
                    :isValid="checkIfValid('sucursal')"
                  />
                </template>
              </CFormGroup>
              <span class="text-danger float-right" v-if="!$v.form.sucursal.required">Este campo es obligatorio</span>
            </CCol>

                <CCol sm="6">
              <CFormGroup wrapperClasses="input-group pt-2">
                <template #prepend-content><CIcon name="cilList"/></template>
                <template #append><CButton color="secondary" @click="getAcceso()" title="Recargar"><CIcon name="cilLoop"/></CButton></template>
                <template #label>Acceso a seguimiento de servicios *</template>
                <template #input>
                  <multiselect
                    v-model="$v.form.acceso.$model"
                    :options="acceso"
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
                    :isValid="checkIfValid('acceso')"
                  />
                </template>
              </CFormGroup>

              <span class="text-danger float-right" v-if="!$v.form.acceso.required">Este campo es obligatorio</span>
            </CCol>
            </CRow>
          <br>
          <h6>Enviar correo de bienvenida</h6>  
           
    <template v-for="(mode, index) in modes">
      <div class="d-flex justify-content-between my-4" :key="index">
        <CSwitch
          :isValid="checkIfValid('notificacion')"
          :checked.sync="$v.form.notificacion.$model"
          :key="key"
          :color="color"
          v-bind="mode"
          v-for="(color, key) in colors"
        >
        </CSwitch> 
      </div>
    </template>
    </CCardBody>

      <CCardFooter>
          <CRow>
        <CCol>
          <div class="d-grid gap-2 d-md-block">
        <button type="submit" class="btn btn-light w-50"  @click="goBack"><CIcon name="cilArrowThickToLeft"/> Cancelar</button>
          </div>
        </CCol>
        <CCol>
        <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton type="submit" class="btn btn-success w-50" :disabled="!isValid || submitted" :hidden="submitted"><CIcon name="cilSave"/> Guardar</CButton>  
        </div></CCol>
      </CRow>
      </CCardFooter>
   </CForm>
  </CTab>


    <CTab>
      <template slot="title">
        <CIcon name="cil-basket"/> {{tabs[1]}}
      </template>
      <FormDirectorios  @add-directorio="agregarDirectorio"/>
      <ListaDirectorios :directorios="directorios" @delete-directorio="eliminarDirectorio" :hidden="submitted" method="POST"/>
         <CCol lg="6">
        <CCard :class="`bg-${submitted ? 'info' : 'secondary' }`" > 
        <pre>{{tablaString}}</pre>
        </CCard>
        </CCol>

      <CCardFooter>
          <CRow>
        <CCol>
          <div class="d-grid gap-2 d-md-block">
        <button type="submit" class="btn btn-light w-50"  @click="goBack"><CIcon name="cilArrowThickToLeft"/> Cancelar</button>
          </div>
        </CCol>

        <CCol>
        <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton type="submit" class="btn btn-success w-50" :disabled="!isValid || submitted"  @click="store(directorios)" ><CIcon name="cilSave"/> Guardar</CButton> 
        </div></CCol>
      </CRow>
      </CCardFooter>
              </CTab>

              
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> {{tabs[2]}}
                </template>
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
        <button type="submit" class="btn btn-light w-50"  @click="goBack"><CIcon name="cilArrowThickToLeft"/> Cancelar</button>
          </div>
        </CCol>
        <CCol>
        <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton type="submit" class="btn btn-success w-50" :disabled="!isValid || submitted" :hidden="submitted"><CIcon name="cilSave"/> Guardar</CButton>  
        </div></CCol>
      </CRow>
      </CCardFooter>
   </CForm>
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> {{tabs[3]}}
                </template>
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
        label="Días de crédito"
        placeholder="Días de crédito"
        :value.sync="form.dias" 
      >
      <template #prepend-content><CIcon name="cil-dollar"/></template>
      </CInput>
      </CCol>
  <CCol sm="">
      <CInput
      label="Límite de Crédito"
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
        <button type="submit" class="btn btn-light w-50"  @click="goBack"><CIcon name="cilArrowThickToLeft"/> Cancelar</button>
          </div>
        </CCol>
        <CCol>
        <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton type="submit" class="btn btn-success w-50" :disabled="!isValid || submitted" :hidden="submitted"><CIcon name="cilSave"/> Guardar</CButton>  
        </div></CCol>
      </CRow>
      </CCardFooter>
    </CForm>
              </CTab>
              
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from 'axios'
import MaskedInput from 'vue-text-mask'
import alert from '@/repositories/global/alert'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { validationMixin } from "vuelidate"
import { required, email, sameAs,  minLength, maxLength,  helpers  } from "vuelidate/lib/validators"
import NvoCliente from './NvoCliente'
import ListaDirectorios from './ListaDirectorios'
import FormDirectorios from './directorios/FormDirectorios'

export default {
  name: 'registros',
  components: {
    FormDirectorios,
    ListaDirectorios,
    NvoCliente,
    Multiselect,
    MaskedInput,

  },
  data () {
    return {
      cliente : false,
      flotilla: true,
      directorios:[],
      submitted: false,
      agregar: false,
      form: this.getEmptyForm(),
     
      tipo: [],
      errors: [],
      fields: ['nombre', 'puesto','correo','telefono',
      {
        key:'delete',label:'',
        _style:'width:1%',
        sorter:false,
        filter:false
      }
      ],
      sucursal: [],
      acceso:[],

      items: [],
      sorter: {column: '', asc: false},
      tableFilter: '',
      columnFilter: {},
      itemsLimit: 10,
      loading: false,
      
      notificacion: '',
      tip_cliente:['Flotilla', 'Cliente'],
       message: '',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,

       modes: [ 
        { shape: 'pill'},
      ],
      colors: ['dark'],

      tabs: [
        'Generales',
        'Directorio',
        'Facturación',
        'Crédito'
      ],
      activeTab: 0
    }
  },
  multiselectOptions: [
    { value: 'Física', text: 'Física' },
    { value: 'Moral', text: 'Moral' },
   ],
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
    this.getSucursal(),
    this.getAcceso(),
    this.getdirectorio();
  },
  computed: {
    formString () { return JSON.stringify(this.form, null, 4) },
    isValid() { return !this.$v.form.$invalid },
    isDirty() { return this.$v.form.$anyDirty },
    tablaString () { return JSON.stringify(this.directorios, null, 4) }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      nombre: { required, maxLength: maxLength(40) },
      apellidos: { required, maxLength:maxLength(40)},
      correo: { required, email},
     // correo_secundario: {required, email},
      //contraseña: {required},
      //telefono_fijo: {required},
      telefono_movil: {required, maxLength: maxLength(14)},
     // empresa: {required},
      sucursal: {required,  maxLength: maxLength(150)},
      acceso: {required, maxLength: maxLength(150)},
      notificacion: {required},

      contraseña: {
        required,
        minLength: minLength(8),
        strongPass: helpers.regex('strongPass', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("contraseña")
      },
    },
  },
  methods: {
         agregarDirectorio(directorio){
           let id=0;
           if(this.directorios.length > 0){
             id= this.directorios[this.directorios.length - 1].id + 1;
           }

            this.directorios=[...this.directorios,{...directorio, id}];

         //  this.directorios=[this.directorios, directorio];
         },
         eliminarDirectorio(id){
           this.directorios= this.directorios.filter(
             directorio=>directorio.id !==id
           );
         },

     goBack() { this.$router.go(-1) },
    getEmptyForm() {
      return {
        nombre: '',
        apellidos: '',
        correo: '',
        correo_secundario:'',
        contraseña:'',
        telefono_fijo:'',
        telefono_movil:'',
        empresa:'',
        sucursal:'',
        acceso:'',
        notificacion: false,
        tip_cliente:"flotilla",
        confirmPassword: "",

        //Datos para llenar la información de facturación
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

         //Datos para llenar la información de crédito
         dias: '',
         credito: '',

         directorios:'',
      }
    },
    clearForm() {
   
      let self = this;
      self.form.nombre = ''
      self.form.apellidos = ''
      self.form.correo = ''
      self.form.confirmPassword=''
      self.form.correo_secundario = ''
      self.form.contraseña=''
      self.form.telefono_fijo=''
      self.form.telefono_movil=''
      self.form.empresa=''
      self.form.sucursal = ''
      self.form.acceso=''

      //Datos para vaciar la información de facturación
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

      //Datos para vaciar la información de crédito
       self.form.dias = ''
       self.form.credito = ''

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
      self.form.val_ant=self.form.tipo
      self.form.tipo=self.form.tipo.value
      self.form.val_ant=self.form.sucursal
      self.form.sucursal=self.form.sucursal.value
      self.form.val_ant=self.form.acceso
      self.form.acceso=self.form.acceso.value
      axios.post(this.$apiAdress+'/api/general/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
      //  alert.response200('¡Registrado exitosamente!', `<a href="#/users/${response.data.id.toString()}"><b>Ver registro</b></a>`)
        self.message = 'registrado exitosamente.';
            self.showAlert();

      console.log(response)
        self.clearForm()
        self.submitted = false;
      }).catch(function (error) {
          self.submitted = false;
          self.form.tipo=self.form.val_ant
          self.form.sucursal=self.form.val_ant
          self.form.acceso=self.form.val_ant
          self.errors = alert.responseCatch(error, 'Code #1009');
          alert.responseCatch(error, 'Code #422');
        //self.errors = alert.responseCatch(error, 'Code #1009');
      });
  },
  storeDir() {
      let self = this;
      self.agregar = true
     
      self.errors = []

      axios.post(this.$apiAdress+'/api/directorio/almacenar?token='+localStorage.getItem("api_token"), self.form
      ).then(function (response) {
      //  alert.response200('¡Registrado exitosamente!', `<a href="#/users/${response.data.id.toString()}"><b>Ver registro</b></a>`)
        self.message = 'registrado exitosamente.';
            self.showAlert();


      console.log(response)
        self.limpiar()
        self.agregar = false;
        
      }).catch(function (error) {
           self.agregar = false;
           self.errors = alert.responseCatch(error, 'Code #422');
        self.errors = alert.responseCatch(error, 'Code #1009');
        //self.errors = alert.responseCatch(error, 'Code #1009');
      });
    },

  getSucursal() {
      let self = this;
      self.sucursal = []
      axios.post(this.$apiAdress+'/api/sucursal/getAll?token=' + localStorage.getItem("api_token"), {     
      })
      .then(function (response) {
        console.log(response.data)
        response.data.forEach(function(valor, indice, array) {
          self.sucursal.push({
            value: valor.id,
            text: valor.suc
          });
        });
      }).catch(function (error) {
        alert.responseCatch(error, 'Code #1005')  
      });
    },
      getAcceso() {
      let self = this;
      self.acceso = []
      axios.post(this.$apiAdress+'/api/roles/getAllCache?token=' + localStorage.getItem("api_token"), {     
      })
      .then(function (response) {
        console.log(response.data)
        response.data.forEach(function(valor, indice, array) {
          self.acceso.push({
            value: valor.id,
            text: valor.nom
          });
        });
      }).catch(function (error) {
        alert.responseCatch(error, 'Code #1005')  
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


