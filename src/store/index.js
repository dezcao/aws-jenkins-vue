import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    event_id: 105,
    api_url: `http://jejueatsuda.com/api/v1`,
    page_url: `http://jejueatsuda.com/`,
    selected_item: null,
    logo_url: '',
    dummy_image_url: 'https://via.placeholder.com/'
  },
  getters: {
    // usage
    // this.$store.getters.selected_item
    event_id: function (state) {
      return state.event_id;
    },
    api_url: function (state) {
      return state.api_url;
    },
    page_url: function (state) {
      return state.page_url;
    },
    logo_url: function (state) {
      return state.logo_url;
    },
    selected_item: function (state) {
      return state.selected_item;
    },
    dummy_image_url: function (state) {
      // this.$store.getters.dummy_image_url(['600x400', '/aaa/fff']);
      return function (args) {
        return `${state.dummy_image_url}/${args[0]}${args[1]}`;
      }
    },

  },
  mutations: {
    // usage
    // this.$store.commit('increment', {key: '', value: ''})
    event_id(state, payload) {
      state.event_id = payload.event_id;
    },
    logo_url(state, payload) {
      state.logo_url = payload;
    },
    selected_item(state, payload) {
      state.selected_item = payload;
    }
  },
  actions: {
    // usage
    // this.$store.dispatch('increment', {key:'', value:''});
    async actionA({
      commit
    }) {
      // commit('increment', await sometingAPI())
    },
    async increment(context) { // ({dispatch, commit})
      await context.dispatch('actionA') // wait for `actionA` to finish
      context.commit('increment')
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ]

})
