<template>
  <div id="top-nav">
    <!-- 退出警告 -->
    <logout-alert
      id="logout-alert"
      @logoutSure='logoutSure'
      v-if="logoutAlert"
    ></logout-alert>
    <div class="header-nav">
      <div
        class="nav-item"
        id="logo"
        is="router-link"
        to="/"
      >BBforum</div>
      <div class="panel">
        <!-- 没登录显示登录按钮 登录后显示头像 -->
        <span id="btn" v-if="!logstatus">
          <button
            class="iconfont"
            id="loginBtn"
            @click='showLogin'
          >
            &#xe608; 登陆
          </button>
        </span>
        <span
          id="avatar"
          @click.stop="showMyToggle(), hideShowAside()"
          v-if="showLoginUser"
        >
          <img :src="avatar(userAvatar)">
        </span>
        <ul class="moreBtn" @click.stop="showAsideToggle(), hideShowMy()">
          <li class="iconfont">&#xe786;</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LogoutAlert from './LogoutAlert'
export default {
  name: 'TopBar',
  components: {
    LogoutAlert
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    logstatus () {
      return this.$store.state.logstatus
    },
    username () {
      return this.$store.state.user.name
    },
    userId () {
      return this.$store.state.user.id
    },
    userAvatar () {
      return this.$store.state.user.avatar
    },
    logoutAlert () {
      return this.$store.state.logoutAlert
    },
    showLoginUser () {
      return this.$store.state.showLoginUser
    }
  },
  methods: {
    avatar (avatar) {
      if (avatar) {
        return window.atob(avatar)
      }
    },
    // 登出提示
    logout () {
      this.$store.commit('handlelogoutAlert', true)
    },
    // 确认登出
    logoutSure () {
      axios.get('/api/logout')
        .then(res => {
          this.$store.commit('logout')
          this.$router.push('/')
        })
    },
    showLogin () {
      this.$store.commit('handleShowLogin', true)
    },
    showMyToggle () {
      this.$store.commit('handleShowMy', !this.$store.state.showMy)
    },
    showAsideToggle () {
      this.$store.commit('handleShowAside', !this.$store.state.showAside)
    },
    hideShowMy () {
      this.$store.commit('handleShowMy', false)
    },
    hideShowAside () {
      this.$store.commit('handleShowAside', false)
    }
  },
  created () {
    axios.get('/api/login')
      .then(res => {
        res = res.data
        if (res === 'nologin') {
          console.log('没登录呢')
        } else {
          this.$store.commit('login')
          this.$store.commit('loginUser', res)
        }
      })
  }
}
</script>

<style lang='stylus' scoped>
  #top-nav
    background-color #fff
    box-shadow 0px 2px 5px 0px rgba(0, 0, 0, .1)
    position fixed
    left 0
    right 0
    top 0
    z-index 888
    height 3rem
    padding-left calc(100vw - 100%)
    .header-nav
      height 3rem
      line-height 3rem
      width 90vw
      margin 0 auto
      overflow hidden
      .nav-item
        // background-color red
      a#logo
        float left
        text-decoration none
        font-weight 800
        font-size 1.5rem
        color #6c757d
      .panel
        float right
        span#btn
          margin-right .4rem
          #loginBtn
            padding 0 .5rem
            border none
            background-color #08c
            height 1.6rem
            line-height 1.6rem
            white-space nowrap
            font-size .6rem
            color #fff
            vertical-align middle
        span#avatar
          // background-color pink
          display inline-block
          img
            width 2rem
            // border 1px solid
            box-shadow  0px 0px 10px 0px rgba(0, 0, 0, .3)
            border-radius 50%
            cursor pointer
        ul.moreBtn
          float right
          padding-left 1rem
          margin 0
          li
            list-style none
            font-size 1.5rem
            cursor pointer
    #logout-alert
      position fixed
      z-index 999
      top 0
      left 0
      right 0
      bottom 0
      padding 2rem
      background-color rgba(0, 0, 0, .8)
</style>
