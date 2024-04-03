import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: []
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
        return next();
    }
});

export default router;