<template>
  <div id="tabla-directorios" >
    <div v-if="!directorios.length" class="alert alert-info" role="alert"> El directorio esta vacio</div>
    <table class="table" sm="" >
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Puesto</th>
          <th>Correo Electrónico</th>
          <th>Teléfono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="directorio in directorios" :key="directorio.id">
          <td>{{ directorio.nombredir}}</td>
          <td>{{ directorio.puesto}}</td>
          <td>{{ directorio.correodir}}</td>
          <td>{{ directorio.telefonodir}}</td>
          <td>
            <button class="btn btn-danger" @click="$emit('delete-directorio', directorio.id)"><CIcon name="cilTrash"/></button>
          </td>
        </tr>
      </tbody>
    </table>
   
  </div>

</template>
  
<script>
export default {
  name: 'tabla-directorios',
  props:{
    directorios:Array,
  },
}
</script>
<style scoped></style>