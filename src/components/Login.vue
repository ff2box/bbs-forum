<template>
  <transition name="login-fade">
    <!-- 遮罩 -->
    <div id="cover" @click.self="hiddenLogin">
      <div class="container container-small" id="login">
        <!-- 错误提示 -->
        <div v-if="loginAlert" class="alert alert-warning">用户名或密码错误！</div>
        <div v-if="captchaAlert" class="alert alert-warning">验证码错误！</div>
        <h5>
          登陆
          <small style="font-size: 16px">
            没有账号?
            <!-- 点击注册 隐藏登陆组件 显示注册组件 -->
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
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                name="captcha"
                v-model='user.captcha'
                placeholder="验证码"
              >
              <!-- 点击验证码图片可以切换 -->
              <div class="input-group-append" style="cursor: pointer">
                <span
                  class="input-group-text"
                  id="captcha"
                  @click='changeCaptcha'
                  v-html="captchaData"
                >
                </span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <button
              ref="login"
              disabled='disabled'
              class="btn btn-primary btn-block"
              @click.prevent='login'
            >
              登陆
            </button>
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
  // 监视三个input的输入状态，都输入了登陆btn才可点，否则不可点击
  watch: {
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
    // 点击登陆按钮时 像/api/login发送post请求 传一个user对象过去
    login () {
      axios.post('/api/login', this.user)
        .then(res => {
          res = res.data
          if (res.login === true) {
            // 登陆成功 则改变vuex store里的登陆状态，其他组件可以使用这个状态
            this.$store.commit('login')
            this.$store.commit('loginUser', res.user)
            // 隐藏login组件
            this.$store.commit('handleShowLogin', false)
            // 显示loading图 1s后隐藏，营造一个正在登陆的感觉，不那么突兀
            this.$store.commit('handleLoading', true)
            setTimeout(() => {
              this.$store.commit('handleLoading', false)
            }, 1000)
          } else {
            // 如果登陆不成功， 判断是账号密码错误还是验证码错误 给予提示
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
    // 点击验证码图片的时候重新请求一个验证码并显示
    changeCaptcha () {
      axios.get('/api/captcha')
        .then(res => {
          this.captchaData = res.data
        })
    }
  },
  // 一旦加载就请求一个验证码
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
    display flex
    justify-content center
    #login
      position absolute
      top 1rem
      z-index 1000
      padding 1rem .6rem
      background-color #fff
      .form-control
        border-color #6c757d
      #captcha
        padding 0
      .alert
        padding .5rem
        border-radius .3rem
    .container-small
      max-width 500px
</style>
