<template>
  <PrincipalMenu />
  <section class="mt-6 pt-2">
    <router-view></router-view>
  </section>
 </template>
 
 <script>
 import PrincipalMenu from './static/PrincipalMenu.vue';
 
 export default {
  name: 'GestionProyectos',
  components: {
     PrincipalMenu
  }
 }
 </script>
 