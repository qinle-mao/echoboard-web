import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path:'/',
        redirect: '/board?id=0',
        name:'index',
        component: () => import('../views/IndexView.vue'),
        children: [
            {
                path: '/board',
                component: () => import('../views/BoardView.vue'),
            }
        ],
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router