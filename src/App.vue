<template>
  <div id="app">
     <GestionProyectos />
  </div>
 </template>
 
 <script>
 import GestionProyectos from './components/GestionProyectos.vue';
 import 'bootstrap/dist/css/bootstrap.min.css';
 
 export default {
  name: 'App',
  components: {
    GestionProyectos
  }
 }
 </script>
 
 <style>
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
 }
 </style>
 