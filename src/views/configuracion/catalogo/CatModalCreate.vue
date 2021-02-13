<template>
<div>
 <CButton v-b-modal.modal color="info" title="Agregar" class="p-2 m-0"><b-icon icon="plus-circle" class="h3 p-0 m-0"></b-icon></CButton>
  <b-modal id="modal" title="REGISTRAR CATÁLOGO" content-class="shadow" body-class="p-0 m-0" header-bg-variant="info" header-class="p-2" hide-backdrop scrollable hide-footer>
  <CatCreateFields/>
  </b-modal>
</div>
</template>

<script>
import CatCreateFields from './CatCreateFields'

export default {
  name: 'CatModalCreate',
  components: {
    CatCreateFields
  },
}
</script>
