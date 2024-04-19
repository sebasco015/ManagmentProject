<template>
<nav class=" position-fixed top-0 w-100 bg-body-secondary">
    <ul class="nav gap-2">
        <li class="nav-item mx-1">
        <router-link to="/agregar-proyecto" class="nav-link dropdown-item">Agregar Proyecto</router-link>
        </li>
        <li class="nav-item">
        <router-link to="/agregar-tarea" class="nav-link dropdown-item ">Asignar Tareas</router-link>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
name: 'PrincipalMenu'
}
</script>

<style scoped>
.nav {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  background-color: #f8f9fa; 
  padding: 10px 0; 
}

.nav-item {
  margin: 0 10px; 
}

.nav-link {
  text-decoration: none;
  font-size: 16px;
  color: #333; 
  padding: 5px 10px; 
  border-radius: 5px; 
  transition: background-color 0.3s; 
}

.nav-link:hover {
  background-color: #e9ecef; 
}
</style>
   