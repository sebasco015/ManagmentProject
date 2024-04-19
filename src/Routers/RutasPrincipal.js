import { createRouter, createWebHistory } from 'vue-router';
import AgregarProyectos from '@/components/AgregarProyectos.vue';
import AgregarTarea from '@/components/AgregarTarea.vue';
import GestionProyectos from '@/components/GestionProyectos.vue';

const routes = [
 { path: '/', component: GestionProyectos },
 { path: '/agregar-proyecto', name: 'AgregarProyectos', component: AgregarProyectos },
 { path: '/agregar-tarea/:proyectoId?', name: 'AgregarTarea', component: AgregarTarea },
 
   
];

const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes,
});

export default router;
