import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    logstatus: false,
    user: {},
    deletePostAlert: false,
    deleteCommentAlert: false,
    showPopup: false,
    emptyComment: false,
    emptyPost: false,
    logoutAlert: false,
    loading: false,
    showLogin: false,
    showRegister: false,
    showMy: false,
    showAside: false,
    showLoginUser: false,
    addingComment: false,
    addCommentSucc: false
  },
  mutations: {
    login (state) {
      state.logstatus = true
      state.showLoginUser = true
    },
    logout (state) {
      state.logstatus = false
      state.showLoginUser = false
      state.user = {}
    },
    loginUser (state, user) {
      state.user = user
    },
    deletePostAlert (state, status) {
      state.deletePostAlert = status
    },
    deleteCommentAlert (state, status) {
      state.deleteCommentAlert = status
    },
    handleShowPopup (state, status) {
      state.showPopup = status
    },
    handleEmptyComment (state, status) {
      state.emptyComment = status
    },
    handleEmptyPost (state, status) {
      state.emptyPost = status
    },
    handlelogoutAlert (state, status) {
      state.logoutAlert = status
    },
    handleLoading (state, status) {
      state.loading = status
    },
    handleShowLogin (state, status) {
      state.showLogin = status
    },
    handleShowRegister (state, status) {
      state.showRegister = status
    },
    handleShowMy (state, status) {
      state.showMy = status
    },
    handleShowAside (state, status) {
      state.showAside = status
    },
    handleShowLoginUser (state, status) {
      state.showLoginUser = status
    },
    handleAddingComment (state, status) {
      state.addingComment = status
    },
    handleAddCommentSucc (state, status) {
      state.addCommentSucc = status
    }
  }
})
