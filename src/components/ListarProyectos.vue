<template>
    <h1>Listar Proyectos</h1>
    <div :key="componentKey" class="container mx-auto">
       <input type="text" v-model="filtroNombre" placeholder="Filtrar por nombre" class="form-control mb-3 mx-1 ">
       <select v-model="filtroEstado" class="form-select mb-3 mx-1">
           <option value="">Todos los estados</option>
           <option value="Pendiente">Pendiente</option>
           <option value="En progreso">En progreso</option>
           <option value="Completada">Completada</option>
       </select>
       <ul class="list-group flex-column overflow-y-auto h-300 overflow-hidden">
        <li class="list-group-item" v-for="proyecto in proyectosFiltrados" :key="proyecto.id">
           <div class="w-100 d-flex ">
                <div class="d-flex flex-column w-100">
                    <div class="w-100 d-flex gap-2">
                        <p><strong>Nombre:</strong> {{ proyecto.nombre }}</p> <p class="d-flex gap-2 align-content-center fs-6"><b>{{ proyecto.fechaInicio }}</b> | <b>{{ proyecto.fechaFin }}</b></p> 
                    </div>
                    <div class="w-100 max-h text-start">
                        <strong>Descripción:</strong> {{ proyecto.descripcion }}
                    </div>
                </div>
                <div class="d-flex flex-column gap-2">
                    <button class="btn btn-primary py-0" @click="editarProyecto(proyecto.id)">Editar</button>
                    <button class="btn btn-danger py-0" @click="eliminarProyecto(proyecto.id)">Eliminar</button>
                    <button class="btn btn-primary py-0 white-space-nowrap" @click="crearTarea(proyecto.id)">Crear Tarea</button>
                </div>
           </div>
         </li>
       </ul>
    </div>
</template>

<script>
export default {
    name: 'ListarProyectos',
    props: {
        proyectos: Array
    },
    data() {
       return {
         localProyectos: [...this.proyectos], 
         filtroNombre: '', // Propiedad para el filtro de nombre
         filtroEstado: '', // Propiedad para el filtro de estado
         componentKey: 0 // Clave para forzar la recarga del componente
       };
    },
    computed: {
        proyectosFiltrados() {
            let proyectosFiltrados = this.proyectos;
            if (this.filtroNombre) {
                proyectosFiltrados = proyectosFiltrados.filter(proyecto => proyecto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()));
            }
            if (this.filtroEstado) {
                proyectosFiltrados = proyectosFiltrados.filter(proyecto => proyecto.estado === this.filtroEstado);
            }
            return proyectosFiltrados;
        }
    },
    methods: {
        editarProyecto(id) {
            const proyecto = this.proyectos.find(proyecto => proyecto.id === id);
            if (proyecto) {
                this.$emit('editar', proyecto.id);
            } else {
                console.error('Proyecto no encontrado');
            }
        },
        eliminarProyecto(id) {
            this.$emit('eliminarProyecto', id);
        },
        crearTarea(proyectoId) {
            this.$router.push({ name: 'AgregarTarea', params: { proyectoId: proyectoId } });
        }
    }
}
</script>

<style>
.max-h {
    height: clamp(300px, 40%, 1200px);
    background-color: #dee0e3;
    border: 1px solid #ced4da; 
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.h-300 {
    height: 300px;
    background-color: #dee0e3; 
    border: 1px solid #676b6f; 
    border-radius: 8px; /* Bordes redondeados */
    padding: 10px; /* Espaciado interno */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra */
}

.white-space-nowrap {
    white-space: nowrap;
    background-color: #067aee; 
    border: 1px solid #ced4da; 
    border-radius: 8px; 
    padding: 10px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
