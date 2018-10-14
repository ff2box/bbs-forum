<template>
  <transition name="login-fade">
    <div id="cover" @click.self="hiddenLogin">
      <div class="container container-small" id="login">
        <div v-if="loginAlert" class="alert alert-warning">用户名或密码错误！</div>
        <div v-if="captchaAlert" class="alert alert-warning">验证码错误！</div>
        <h5>
          登陆
          <small style="font-size: 16px">
            没有账号?
            <a @click="toRegister(), hiddenLogin()" style="color: #007bff">注册</a>
          </small>
        </h5>
        <form>
          <div class="form-group">
            <!-- <label>用户名/手机/邮箱</label> -->
            <input
              type="text"
              class="form-control"
              name="username"
              v-model="user.username"
              placeholder="用户名"
            >
          </div>
          <div class="form-group">
            <!-- <label>密码</label> -->
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="user.password"
              placeholder="密码"
            >
          </div>
          <!-- 验证码 -->
          <div class="form-group">
            <!-- <label>验证码</label> -->
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                name="captcha"
                v-model='user.captcha'
                placeholder="验证码"
              >
              <div class="input-group-append">
                <span class="input-group-text" id="captcha" @click='changeCaptcha' v-html="captchaData"></span>
              </div>
              <!-- <img :src="captchaData" alt="captcha" @click='changeCaptcha'> -->
            </div>
          </div>
          <div class="form-group">
            <button ref="login" disabled='disabled' class="btn btn-primary btn-block" @click.prevent='login'>登陆</button>
          </div>
          <div class="form-group">
            <a href="#">忘记密码?</a>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: '',
        captcha: ''
      },
      loginAlert: false,
      captchaAlert: false,
      loginSucc: false,
      captchaData: ''
    }
  },
  watch: {
    // captchaData () {
    //   this.captchaData
    // },
    'user.captcha' () {
      if (this.user.username && this.user.password && this.user.captcha) {
        this.$refs.login.removeAttribute('disabled')
      } else {
        this.$refs.login.setAttribute('disabled', 'disabled')
      }
    },
    'user.username' () {
      if (this.user.username && this.user.password && this.user.captcha) {
        this.$refs.login.removeAttribute('disabled')
      } else {
        this.$refs.login.setAttribute('disabled', 'disabled')
      }
    },
    'user.password' () {
      if (this.user.username && this.user.password && this.user.captcha) {
        this.$refs.login.removeAttribute('disabled')
      } else {
        this.$refs.login.setAttribute('disabled', 'disabled')
      }
    }
  },
  methods: {
    hiddenLogin () {
      this.$store.commit('handleShowLogin', false)
    },
    toRegister () {
      this.$store.commit('handleShowRegister', true)
    },
    login () {
      axios.post('/api/login', this.user)
        .then(res => {
          res = res.data
          if (res.login === true) {
            this.$store.commit('login')
            this.$store.commit('loginUser', res.user)
            this.user.username = ''
            this.user.password = ''
            this.loginAlert = false
            this.$store.commit('handleShowLogin', false)
            this.$store.commit('handleLoading', true)
            setTimeout(() => {
              this.$store.commit('handleLoading', false)
              this.$router.push('/')
            }, 1000)
          } else {
            if (res === 'captchaError') {
              this.captchaAlert = true
            } else {
              this.captchaAlert = false
            }
            if (res === 'noCorrect') {
              this.loginAlert = true
            } else {
              this.loginAlert = false
            }
          }
        })
    },
    changeCaptcha () {
      axios.get('/api/captcha')
        .then(res => {
          this.captchaData = res.data
        })
    }
  },
  mounted () {
    axios.get('/api/captcha')
      .then(res => {
        this.captchaData = res.data
      })
  }
}
</script>

<style lang='stylus' scoped>
  .login-fade-enter-active
    transition all .3s ease
  .login-fade-leave-active
    transition all 0s
  .login-fade-enter, .login-fade-leave-to
    opacity 0
  #cover
    background-color rgba(0, 0, 0, .8)
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 999
    #login
      // box-shadow: 0px 4px 12px 0px #00000055
      // border-radius .6rem
      // width 90%
      // border 2px solid
      position absolute
      top 1rem
      z-index 1000
      padding 1rem .6rem
      background-color #fff
      .form-control
        border-color #6c757d
      #captcha
        padding 0
        // border 1px solid
        // height: 3rem
        // margin .2rem 0
      .alert
        padding .5rem
        border-radius .3rem
    .container-small
      max-width 500px
</style>
