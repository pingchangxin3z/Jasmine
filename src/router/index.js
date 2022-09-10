import Vue from 'vue';
import VueRouter from 'vue-router';

import Activate from '@/views/Activate';
import Metronome from '@/views/Metronome';
import Layout from '@/views/Layout';
import Person from '@/views/Person';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/activate'
    },
    {
        path: '/layout',
        redirect: '/layout/metronome',
        component: Layout,
        children: [{
                path: 'metronome',
                component: Metronome,
            },
            {
                path: 'person',
                component: Person,
            }
        ]
    },
    {
        path: '/activate',
        component: Activate,
    },

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('TOKEN');
    if (!token || token == 'undefined') {
        if (to.path !== '/activate') {
            window.location.href = "http://kaoyan.since88.cn/wechat/authorize?returnUrl=jasmine";
            return next(false);
        }
    }
    next();
})

export default router;