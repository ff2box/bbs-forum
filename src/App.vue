<template>
  <div id="app" @click="hideShowMy(), hideShowAside()">
    <!-- 头部导航 -->
    <top-bar></top-bar>
    <!-- 登陆组件 -->
    <Login v-if="showLogin"></Login>
    <!-- 注册组件 -->
    <Register v-if="showRegister"></Register>
    <!-- 个人中心组件 -->
    <my-message v-show="showMy"></my-message>
    <!-- 侧边栏组件 -->
    <aside-nav v-show='showAside'></aside-nav>
    <!-- 弹出框组件 -->
    <popup-box id="popup-box" v-if="showPopup"></popup-box>
    <!-- loading动图 -->
    <div id="loading" v-if="loading">
      <div>
        <img src="@/assets/loading.gif" alt="loading">
      </div>
    </div>
    <!-- 路由 -->
    <router-view/>
    <!-- sticky footer -->
    <footer class="footer">
      <div class="container">
        <span class="text-muted">NO CAN NO BB. by xuedafei</span>
      </div>
    </footer>
  </div>
</template>

<script>
import TopBar from './components/common/TopBar'
import PopupBox from './components/common/PopupBox'
import FooterBar from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import MyMessage from './components/MyMessage'
import AsideNav from './components/AsideNav'
export default {
  name: 'App',
  components: {
    TopBar,
    FooterBar,
    PopupBox,
    Login,
    Register,
    MyMessage,
    AsideNav
  },
  computed: {
    showLogin () {
      return this.$store.state.showLogin
    },
    showRegister () {
      return this.$store.state.showRegister
    },
    showMy () {
      return this.$store.state.showMy
    },
    showAside () {
      return this.$store.state.showAside
    },
    showPopup () {
      return this.$store.state.showPopup
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    hideShowMy () {
      this.$store.commit('handleShowMy', false)
    },
    hideShowAside () {
      this.$store.commit('handleShowAside', false)
    }
  }
}
</script>

<style lang='stylus'>
  html
    position: relative
    min-height: 100%
    body
      margin-top 3rem
      margin-bottom 2.9rem
    #app
      #popup-box
        position fixed
        z-index 999
        top 0
        left 0
        right 0
        bottom 0
        padding 2rem
        background-color rgba(0, 0, 0, .8)
      #loading
        background-color #fff
        // border 1px solid
        position fixed
        z-index 999
        left 0
        top 3rem
        right 0
        bottom 0
        display flex
        justify-content center
        align-items center
      .footer
        position: absolute
        bottom: 0
        width: 100%
        height: 2.8rem
        line-height: 2.8rem
        text-align center
        font-size 1rem
        font-style italic
        background-color: #f5f5f5
</style>
