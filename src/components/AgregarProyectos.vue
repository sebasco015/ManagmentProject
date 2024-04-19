<template>
<div>
    <h1>Agregar Proyecto</h1>
    <div class="container container-border">
        <form @submit.prevent="submitForm">
        <div class="mb-3">
            <input type="text" placeholder="Nombre del Proyecto" class="mt-4 form-control" id="nombreProyecto" v-model="form.nombre">
        </div>
        <div class="mb-3">
            <textarea placeholder="Descripción del Proyecto" class="form-control" id="descripcionProyecto" rows="2" v-model="form.descripcion"></textarea>
        </div>
        <div class="d-flex gap-3">
            <div class="mb-3 w-100">
                <label for="fechaInicioProyecto" name="fechaInicioProyecto">Fecha de Inicio</label>
                <input type="date" class="form-control" id="fechaInicioProyecto" v-model="form.fechaInicio">
            </div>
            <div class="mb-3 w-100">
                <label for="fechaFinProyecto" name="fechaFinProyecto">Fecha de entrega</label>
                <input type="date" class="form-control" id="fechaFinProyecto" v-model="form.fechaFin">
            </div>
        </div>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>
        <button type="submit" class="btn btn-primary mb-3">Enviar</button>
        </form>
    </div>
    <section class="mt-4">
        <ListarProyectos :proyectos="proyectos" @eliminarProyecto="eliminarProyecto" @editar="editarProyecto" />
    </section>
</div>
</template>

<script>
import ListarProyectos from './ListarProyectos.vue';

export default {
    name: 'AgregarProyecto',
    components: {
        ListarProyectos
    },
    props: {
        proyectoParaEditar: Object 
    },
    data() {
        return {
            form: {
                nombre: '',
                descripcion: '',
                fechaInicio: '',
                fechaFin: ''
            },
            proyectos: [],
            errorMessage: '',
            proyectoEnEdicion: null // Nueva variable para almacenar el proyecto en edición
        };
    },
    created() {
        const savedProyectos = localStorage.getItem('listaProyectos');
        if (savedProyectos) {
            this.proyectos = JSON.parse(savedProyectos);
        }
    },
    watch: {
        proyectoParaEditar(newProyecto) {
            if (newProyecto) {
                this.proyectoEnEdicion = newProyecto;
                this.form = { ...newProyecto };
            }
        }
    },
    methods: {
        submitForm() {
            if (!this.form.nombre || !this.form.descripcion || !this.form.fechaInicio || !this.form.fechaFin) {
                this.errorMessage = 'Por favor, completa todos los campos.';
                return;
            }

            const fechaInicio = new Date(this.form.fechaInicio);
            const fechaFin = new Date(this.form.fechaFin);
            if (fechaInicio >= fechaFin) {
                this.errorMessage = 'La fecha de inicio debe ser anterior a la fecha de entrega.';
                return;
            }

            if (this.proyectoEnEdicion) {
                // Actualizar el proyecto existente
                const index = this.proyectos.findIndex(proyecto => proyecto.id === this.proyectoEnEdicion.id);
                if (index !== -1) {
                    this.proyectos[index] = { ...this.form };
                }
            } else {
                // Agregar un nuevo proyecto
                const nuevoProyecto = {
                    id: this.proyectos.length > 0 ? this.proyectos[this.proyectos.length - 1].id + 1 : 0,
                    nombre: this.form.nombre,
                    descripcion: this.form.descripcion,
                    fechaInicio: this.form.fechaInicio,
                    fechaFin: this.form.fechaFin
                };
                this.proyectos.push(nuevoProyecto);
            }

            localStorage.setItem('listaProyectos', JSON.stringify(this.proyectos));

            this.form.nombre = '';
            this.form.descripcion = '';
            this.form.fechaInicio = '';
            this.form.fechaFin = '';
            this.errorMessage = '';
            this.proyectoEnEdicion = null; 

            console.log("Proyecto agregado o editado");
        },
        eliminarProyecto(id) {
            const index = this.proyectos.findIndex(proyecto => proyecto.id === id);
            if (index !== -1) {
                this.proyectos.splice(index, 1);
                localStorage.setItem('listaProyectos', JSON.stringify(this.proyectos));
            }
        },
        editarProyecto(proyecto) {
            this.proyectoEnEdicion = proyecto;
            this.form = { ...proyecto };
        }

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
