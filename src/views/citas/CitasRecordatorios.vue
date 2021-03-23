<template>
    <CNav variant="pills" color="info">
    <CNavItem color="info" :active="citas" to="/citas" :class="citas ? 'text-white ' : ''">
      <CIcon name="cilCalendar"/> Citas
    </CNavItem>
    <CNavItem color="info" :active="recordatorio" to="/recordatorios" :class="recordatorio ? 'text-white' : ''">
       <CIcon name="cilBell"/> Recordatorios
    </CNavItem>
    
  </CNav>
</template>
<script>
  export default {
     name: 'Citas',
  props:{
    citas: Boolean,
    recordatorio: Boolean,
  },
    data() {
      return {
        
      }
    },
    computed: {
      
      }
    }
</script>