import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        amount: localStorage.getItem('amount') ? JSON.parse(localStorage.getItem('amount')).amount : '----',
        phone: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).phone : '未登录',
        nav: JSON.parse(localStorage.getItem('nav')),
        navIdx: 0, //商品列表页导航下标，方便从详情页返回用
    },
    mutations: {
        showLoading(state) {
            state.loading = true;
        },
        closeLoading(state) {
            state.loading = false;
        },
        changeNavIdx(state, param) {
            state.navIdx = param
        },
    },
    actions: {

    }
})