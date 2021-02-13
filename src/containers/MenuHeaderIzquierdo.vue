<template>
  <CHeaderNav class="d-md-down-none mr-auto">
    <CHeaderNavItem>
      <CButton to="/inicio" color="info" class="mr-2"><CIcon name="cilHome" /></CButton>
    </CHeaderNavItem>
    <CHeaderNavItem>
      <CButton v-b-modal.modal-no-backdrop color="secondary" class="mr-2"><CIcon name="cilContact" /> Contacto</CButton>
    </CHeaderNavItem>
    <CHeaderNavItem>
      <CButton to="/tutoriales" color="success" class="mr-2"><CIcon name="cibYoutube" /> Tutoriales</CButton>
    </CHeaderNavItem>
    <b-modal id="modal-no-backdrop" title="DATOS DE CONTACTO" content-class="shadow" header-bg-variant="info" size="lg" header-class="p-2" footer-class="p-2" ok-title='Cerrar' hide-backdrop scrollable ok-only>
      <CRow v-if="sucursal.log_nom != null">
        <CCol sm="12">
          <b-img :src="sucursal.log_rut+sucursal.log_nom" alt="Imagen" fluid center />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CInput label="Empresa" type="text" placeholder="Empresa" :disabled="true" v-model="sistema.emp" />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CInput label="Sucursal" type="text" placeholder="Sucursal" :disabled="true" v-model="sucursal.suc" />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12"> 
          <CInput label="Dirección" type="text" placeholder="Dirección" :disabled="true" v-model="sucursal.direc" />
        </CCol>
      </CRow>
      <hr>
      <CRow>
        <CCol sm="12">
          <label>Correos</label> ({{ correos.length}})
          <perfect-scrollbar style="height:10em;width:100%;margin:0px 0px 1% 0px">
            <CDataTable :items="correos" :header="false" :loading="loading" index-column hover fixed striped responsive outlined table-column
              :fields="[
                        { key: 'value' },
                        { key: 'text' },
                      ]"
              :noItemsView="{ 
                        noResults: 'No hay resultados de filtrado disponibles', 
                        noItems: 'No hay registros disponibles',
                      }"
            >
              <template #text="{item}">
                <td> 
                  <CLink :href="`mailto:${item.text}`" v-text="item.text"></CLink>
                </td>
              </template>
            </CDataTable>
          </perfect-scrollbar>
        </CCol>
      </CRow>
      <hr>
      <CRow>
        <CCol sm="12">
          <label>Teléfonos</label> ({{ telefonos.length}})
          <perfect-scrollbar style="height:10em;width:100%;margin:0px 0px 1% 0px">
            <CDataTable :items="telefonos" :header="false" :loading="loading" index-column hover fixed striped responsive outlined table-column
              :fields="[
                        { key: 'value' },
                        { key: 'text' },
                      ]"
              :noItemsView="{ 
                        noResults: 'No hay resultados de filtrado disponibles', 
                        noItems: 'No hay registros disponibles',
                      }"
            >
              <template #text="{item}">
                <td> 
                  <CLink :href="`tel:+${item.text}`" v-text="item.text"></CLink>
                </td>
              </template>
            </CDataTable>
          </perfect-scrollbar>
        </CCol>
      </CRow>
      <hr>
      <CRow>
        <CCol sm="12">
          <label>Redes sociales</label> ({{ redes_sociales.length}})
          <perfect-scrollbar style="height:10em;width:100%;margin:0px 0px 1% 0px">
            <CDataTable :items="redes_sociales" :header="false" :loading="loading" index-column hover fixed striped responsive outlined table-column
              :fields="[
                        { key: 'text' },
                      ]"
              :noItemsView="{ 
                        noResults: 'No hay resultados de filtrado disponibles', 
                        noItems: 'No hay registros disponibles',
                      }"
            >
              <template #text="{item}">
                <td>
                  <CLink :href="item.url" v-text="item.text" target="_blank"></CLink>
                </td>
              </template>
            </CDataTable>
          </perfect-scrollbar>
        </CCol>
      </CRow>
    </b-modal>
  </CHeaderNav>
</template>

<script>
export default {
  name: 'MenuHeaderIzquierdo',
  data() {
    return {
      loading: false,
      sistema: JSON.parse(localStorage.getItem("sistema")),
      sucursal: JSON.parse(localStorage.getItem("sucursal")),
      correos: [],
      telefonos: [],
      redes_sociales: [],
    }
  },
  mounted: function() {
    this.getInfoSucursal()
  },
  methods: {
    getInfoSucursal() {
      let self = this;
      self.loading = true
      let etiq = self.sucursal.etiquetas
      etiq.forEach(function(valor, indice, array) {
        switch (valor.tip) {
          case 'Correo':
            self.correos.push(valor);
            break;
          case 'Teléfono':
            self.telefonos.push(valor);
            break;
          case 'Red social':
            self.redes_sociales.push(valor);
            break;
        }
      });
      self.loading = false;
    }
  }
}
</script>
