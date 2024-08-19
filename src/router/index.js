import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path:'/',
        redirect: 'board',
        name:'index',
        component: () => import('../views/IndexView.vue'),
        children: [
            {
                path: 'board',
                component: () => import('../views/MessageBoard.vue'),
            }
        ],
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router