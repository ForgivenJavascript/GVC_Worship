import { createRouter, routerKey, createWebHashHistory } from 'vue-router';
import { AuthService } from '@/apis';
import { PageBlacklists } from '../constants';
import store from '../store';

const routes = [
    /*{
        path: '/',
        name: 'Home',
        component: () => import('../../modules/Home.vue'),
        meta: {
            title: 'Home'
        },
        beforeEnter: async (to, from, next) => {
            await routerCheck(to, from, next);
        },
        children: [
            {
                path: '/journals',
                name: 'Journals',
                component: () => import('../../modules/journal/Journals.vue'),
                meta: {
                    title: 'Journals'
                },
                beforeEnter: async (to, from, next) => {
                    await routerCheck(to, from, next);
                }
            },
            {
                path: '/editJournal/:mode?',
                name: 'EditJournal',
                component: () => import('../../modules/journal/EditJournal.vue'),
                meta: {
                    title: 'EditJournal'
                },
                beforeEnter: async (to, from, next) => {
                    await routerCheck(to, from, next);
                }
            },
            {
                path: '/farms',
                name: 'Farms',
                component: () => import('../../modules/farms/Farms.vue'),
                meta: {
                    title: 'Farms'
                },
                beforeEnter: async (to, from, next) => {
                    await routerCheck(to, from, next);
                }
            },
            {
                path: '/grasslands',
                name: 'Grasslands',
                component: () => import('../../modules/grasslands/Grasslands.vue'),
                meta: {
                    title: 'Grasslands'
                },
                beforeEnter: async (to, from, next) => {
                    await routerCheck(to, from, next);
                }
            },
            {
                path: '/users',
                name: 'Users',
                component: () => import('../../modules/users/Users.vue'),
                meta: {
                    title: 'Users'
                },
                beforeEnter: async (to, from, next) => {
                    await routerCheck(to, from, next);
                }
            },
            {
                path: '/edituser',
                name: 'EditUser',
                component: () => import('../../modules/users/EditUser.vue'),
                meta: {
                    title: 'EditUser'
                },
                beforeEnter: async (to, from, next) => {
                    await routerCheck(to, from, next);
                }
            },
        ]
    },*/
    {
        path: '/login',
        name: 'Login',
        component: () => import('../../modules/authentication/Login.vue'),
        meta: {
            title: 'Login'
        },
        beforeEnter: async (to, from, next) => {
            if(AuthService.getCurrentUser) {
                await AuthService.logout();
            }
            await checkInternet(to, from, next);
        }
    },
    {
        path: '/noInternet',
        name: 'NoInternet',
        component: () => import('../../modules/NoInternet.vue'),
        meta: {
            title: 'NoInternet'
        }
    }, 
    {
        path: '/noAccess',
        name: 'NoAccess',
        component: () => import('../../modules/NoAccess.vue'),
        meta: {
            title: 'NoAccess'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../../modules/authentication/Register.vue'),
        meta: {
            title: 'Register'
        },
        beforeEnter: async (to, from, next) => {
            await checkInternet(to, from, next);
        }
    }
]

async function checkInternet(to, from, next) {
    if (!navigator.onLine) {
        next('/noInternet');
    } else {
        next();
    }
}

async function routerCheck(to, from, next) {
    if (!navigator.onLine) {
        next('/noInternet');
    } else if( AuthService.getCurrentUser() ) {
        const userInfo = store.getters.getServerUserInfo;
        if(userInfo.farm_id || userInfo.grassland_id || userInfo.role < 2) {
            if( PageBlacklists[userInfo.role].indexOf(to.path) != -1) {
                next('/');
            } 
            next();
        } else {
            next('/noAccess');
        }
        
    } else {
        next('/login');
    }
}

const router = createRouter({
    history: createWebHashHistory('/login'),
    routes
});

export default router;