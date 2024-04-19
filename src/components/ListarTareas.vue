<template>
    <h1>Listar Tareas</h1>
    <div :key="componentKey" class="container mx-auto">
       <input type="text" v-model="filtroNombre" placeholder="Filtrar por nombre" class="form-control mb-3 mx-1 ">
       <div class="d-flex gap-2">
            <select v-model="filtroEstado" class="form-select mb-3 mx-1">
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
            </select>
            <select v-model="filtroProyecto" class="form-select mb-3 mx-1">
                <option value="">Todos los proyectos</option>
                <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
                    {{ proyecto.nombre }}
                </option>
            </select>
       </div>

       <ul class="list-group flex-column overflow-y-auto h-300 overflow-hidden">
        <li class="list-group-item" v-for="tarea in tareasFiltradas" :key="tarea.id">
           <div class="d-flex flex-column">
                <span><strong>Nombre de Proyecto:</strong>{{ tarea.proyectoId }} {{ " " }} {{ tarea.proyecto }}</span>
                <span><strong>Nombre de tarea:</strong> {{ tarea.nombre }}</span>
           </div>
           <div class="w-100 d-flex justify-content-between">
                <div class="d-flex flex-column text-start">
                    <div class="w-100 max-h">
                        <strong>Mensaje:</strong> {{ tarea.mensaje }}
                    </div>
                    <div class="">
                        <strong>Estado:</strong> 
                        <span v-if="tarea.estado === 'Pendiente'">Pendiente</span>
                        <span v-else-if="tarea.estado === 'En progreso'">En progreso</span>
                        <span v-else>Completada</span>
                    </div>
                </div>
                <div class="d-flex flex-column gap-2">
                    <button class="btn btn-primary py-0" @click="editarTarea(tarea.id)">Editar</button>
                    <button class="btn btn-danger py-0" @click="eliminarTarea(tarea.id)">Eliminar</button>
                </div>
           </div>
         </li>
       </ul>
    </div>
</template>

<script>
export default {
    name: 'ListarTareas',
    props: {
        tareas: Array
    },
    data() {
        return {
            localTareas: [...this.tareas], // Corrección aquí
            filtroNombre: '', // Propiedad para el filtro de nombre
            filtroProyecto: '',
            filtroEstado: '', // Propiedad para el filtro de estado
            componentKey: 0, // Clave para forzar la recarga del componente

            proyectos: [],
            proyectosMap: {},
        };
    },
    created() {
        const savedProyectos = localStorage.getItem('listaProyectos');
        if (savedProyectos) {
            this.proyectos = JSON.parse(savedProyectos);
            // Actualiza el mapa de proyectos
            this.proyectos.forEach(proyecto => {
                this.proyectosMap[proyecto.id] = proyecto.nombre;
            });
        }
    },
    computed: {
    tareasFiltradas() {
        let tareasFiltradas = this.localTareas;
        if (this.filtroNombre) {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()));
        }
        if (this.filtroEstado) {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.estado === this.filtroEstado);
        }
        if (this.filtroProyecto) {
            // Usa el mapa para encontrar el nombre del proyecto
            const nombreProyecto = this.proyectosMap[this.filtroProyecto];
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.proyecto === nombreProyecto);
        }
        return tareasFiltradas;
    }
    },
    watch: {
        tareas(newTareas) {
        this.localTareas = newTareas;
        }
    },
    methods: {
        editarTarea(id) {
            const tarea = this.localTareas.find(tarea => tarea.id === id);
            console.log("Emite")
            console.log(tarea)
            if (tarea) {
                this.$emit('editar', tarea);
            } else {
                console.error('Tarea no encontrada');
            }
        },
        eliminarTarea(id) {
            const index = this.localTareas.findIndex(tarea => tarea.id === id);
            if (index !== -1) {
                this.localTareas.splice(index, 1);
                this.localTareas = [...this.localTareas]; // Aseguramos la reactividad
                localStorage.setItem('listaTareas', JSON.stringify(this.localTareas));
                this.componentKey++; // Incrementa la clave para forzar la recarga del componente
            } else {
                console.error('Tarea no encontrada');
            }
        },
        actualizarTareas() {
            const savedTareas = localStorage.getItem('listaTareas');
            if (savedTareas) {
                this.localTareas = JSON.parse(savedTareas);
            }
            console.log("Tarea actualizada")
            this.cargarTareas();
            this.componentKey++; // Incrementa la clave para forzar la recarga del componente
        },
        handleStorageChange(event) {
            if (event.key === 'listaTareas') {
                this.cargarTareas();
                this.componentKey++; // Incrementa la clave para forzar la recarga del componente
            }
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