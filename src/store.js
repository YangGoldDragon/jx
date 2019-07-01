import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: "",
    cartData: [],
    shopCartPosition: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    addCartData(state, cartData) {
      let exit = state.cartData.find(item => {
        return item.name === cartData.name;
      });
      if (exit) {
        exit.count++;
      } else {
        state.cartData.push(cartData);
      }
    },
    reduceCartData(state, cartData) {
      let exit = state.cartData.find(item => {
        return item.name === cartData.name;
      });
      if (cartData.pay) {
        const index = state.cartData.indexOf(exit);
        state.cartData.splice(index, 1);
      } else if (exit && exit.count > 1) {
        exit.count--;
      } else if (exit && exit.count === 1) {
        const index = state.cartData.indexOf(exit);
        state.cartData.splice(index, 1);
      }
    },
    resetCartData(state, cartData) {
      let exit = state.cartData.find(item => {
        return item.name === cartData.name;
      });
      if (exit && exit.count > 1) {
        exit.count = cartData.count;
      } else if (exit && exit.count < 1) {
        const index = state.cartData.indexOf(exit);
        state.cartData.splice(index, 1);
      }
    },
    clearCartData(state) {
      state.cartData = [];
    },
    setShopCartPosition(state, shopCartPosition) {
      state.shopCartPosition = shopCartPosition;
    },
    signout(state) {
      state.token = "";
    }
  },
  actions: {
    setTokenAction(context, token) {
      context.commit("setToken", token);
    },
    addCartData(context, cartData) {
      context.commit("addCartData", cartData);
    },
    reduceCartData(context, cartData) {
      context.commit("reduceCartData", cartData);
    },
    clearCartData(context) {
      context.commit("clearCartData");
    },
    setShopCartPosition(context, shopCartPosition) {
      context.commit("setShopCartPosition", shopCartPosition);
    },
    resetCartData(context, cartData) {
      context.commit("resetCartData", cartData);
    },
    signout(context) {
      context.commit("signout");
    }
  },
  getters: {
    curCartData: state => {
      return state.cartData;
    },
    curToken: state => {
      return state.token
    }
  },
  plugins: [createPersistedState()]
});
