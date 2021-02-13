<template>
<CRow>
  <CCol sm="12">
    <CCard>
      <CCardHeader class="p-1">
        <CatMenu :actCC="true" />
      </CCardHeader>
      <CatCreateFields/>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
import CatCreateFields from './CatCreateFields'
import CatMenu from './CatMenu'

export default {
  name: 'CatCreate',
  components: {
    CatCreateFields,
    CatMenu
  },
}
</script>
