<template>
  <CFooter :fixed="false" class="d-flex justify-content-center">
    <div >
      <strong>
        {{ sistema.emp_abrev }} - Copyright © {{ this.getYearInicio() }} - {{ new Date().getFullYear() }} 
        <span class="pantallaMax985px">
          <a :href="desarrollador.developer_url" target="_blank">{{ desarrollador.developer }}</a> Todos los derechos reservados.
        </span>
      </strong>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter',
  props: ['sistema', 'desarrollador'],
  methods: {
    getYearInicio() {
      return new Date(this.sistema.year_de_ini).getFullYear();
    },
  }
}
</script>
