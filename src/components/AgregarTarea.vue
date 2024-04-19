<template>
  <h1>Agregar tarea</h1>
  <div class="container container-border">
      <form @submit.prevent="submitForm">
        <div class="d-flex flex-column">
         <div class="mb-3">
          <input type="text" placeholder="NombreProyecto" class="mt-4 form-control" id="proyecto" name="proyecto" v-model="selectedProyectoNombre" :disabled="isFormDisabled">
         </div>
         <select class="form-select" name="proyecto" id="proyecto" v-model="form.selectedProyectoId" :disabled="isFormDisabled">
            <option value="" disabled>Selecciona un proyecto</option>
            <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
                {{ proyecto.id }}. {{ " " }} {{ proyecto.nombre }}
            </option>
        </select>
        </div>
        <div class="mb-3">
          <input type="text" placeholder="Nombre" class="mt-4 form-control" id="nombre" v-model="form.nombre">
        </div>
        <div class="d-flex flex-column mb-3">
          <div class="mb-3 w-100">
            <textarea placeholder="Agregar Mensaje" class="form-control" id="mensaje" rows="2" v-model="form.mensaje"></textarea>
          </div>
          <select class="form-select" id="estado" v-model="form.estado">
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <button type="submit" class="btn btn-primary mb-3">Enviar</button>
      </form>
  </div>
  <section class="mt-4">
     <ListarTareas :key="componentKey" :tareas="tareas" @editar="editarTarea" @actualizarTareas="actualizarTareas" />
  </section>
  </template>
 
  <script>
 import ListarTareas from './ListarTareas'
 
 export default {
  name: 'AgregarTarea',
  components: {
     ListarTareas
  },
  props: {
      tareaParaEditar: Object
  },
  computed: {
    isFormDisabled() {
        // Si el proyectoId está presente en la ruta, el formulario debe estar deshabilitado
        return !!this.$route.params.proyectoId;
    }
  },
  data() {
     return {
         form: {
             nombre: '',
             mensaje: '',
             estado: 'Pendiente',
             selectedProyectoId: '',
             proyectoId: this.$route.params.proyectoId
         },
         tareas: [],
         errorMessage: '',
         proyectos: [],
         tareaEnEdicion: null,
         componentKey: 0,
         selectedProyectoNombre: '' // Añade esta línea para manejar el nombre del proyecto seleccionado
     };
  },
  created() {
     const savedTareas = localStorage.getItem('listaTareas');
     if (savedTareas) {
         this.tareas = JSON.parse(savedTareas);
     }
 
     const savedProyectos = localStorage.getItem('listaProyectos');
     if (savedProyectos) {
         this.proyectos = JSON.parse(savedProyectos);
     }
 
     if (this.$route.params.proyectoId) {
         const proyectoFiltrado = this.proyectos.find(proyecto => proyecto.id === Number(this.$route.params.proyectoId));
         if (proyectoFiltrado) {
             this.selectedProyectoNombre = proyectoFiltrado.nombre;
             this.form.selectedProyectoId = proyectoFiltrado.id;
         }
     }
  },
  watch: {
    'form.selectedProyectoId': function(newId) {
        const selectedProyecto = this.proyectos.find(proyecto => proyecto.id === newId);
        if (selectedProyecto) {
            this.selectedProyectoNombre = selectedProyecto.nombre;
        }
    },
    selectedProyectoNombre: function(newNombre) {
        const selectedProyecto = this.proyectos.find(proyecto => proyecto.nombre === newNombre);
        if (selectedProyecto) {
            this.form.selectedProyectoId = selectedProyecto.id;
        }
    },
     tareaParaEditar(newTarea) {
         if (newTarea) {
             this.form = { ...newTarea };
         }
     },
     tareas(newTareas) {
         this.localTareas = [...newTareas];
     }
  },
  methods: {
     submitForm() {
         if (!this.form.nombre || !this.form.mensaje) {
             this.errorMessage = 'Por favor, completa todos los campos.';
             return;
         }
 
         if (!this.form.selectedProyectoId) {
             this.errorMessage = 'Por favor, selecciona un proyecto.';
             return;
         }
 
         if (this.tareaEnEdicion) {
             const index = this.tareas.findIndex(tarea => tarea.id === this.tareaEnEdicion.id);
             if (index !== -1) {
                 this.tareas[index] = { ...this.form };
             }
             this.tareaEnEdicion = null;
         } else {
             const id = this.tareas.length > 0 ? this.tareas[this.tareas.length - 1].id + 1 : 0;
             const nuevaTarea = {
                 id: id,
                 nombre: this.form.nombre,
                 mensaje: this.form.mensaje,
                 estado: this.form.estado,
                 proyectoId: this.form.selectedProyectoId
             };
             this.tareas.push(nuevaTarea);
         }
 
         localStorage.setItem('listaTareas', JSON.stringify(this.tareas));
 
         this.form.nombre = '';
         this.form.mensaje = '';
         this.form.estado = 'Pendiente';
         this.errorMessage = '';
 
         console.log("Tarea emitida");
         this.$emit('tareaActualizada');
         this.$emit('actualizarTareas');
 
         this.componentKey++;
     },
     eliminarTarea(id) {
       const index = this.localTareas.findIndex(tarea => tarea.id === id);
       if (index !== -1) {
           this.localTareas.splice(index, 1);
           localStorage.setItem('listaTareas', JSON.stringify(this.localTareas));
       }
     },
     editarTarea(tarea) {
         this.tareaEnEdicion = tarea;
         this.form = { ...tarea };
     },
  }
 }
  </script>
 
 <style>
  .container-border {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 20px; 
  background-color: #dee0e3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}
 </style>
 