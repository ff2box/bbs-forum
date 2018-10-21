<template>
  <transition name="register-fade">
    <div id="cover" @click.self="hiddenRegister">
      <div class="container container-small" id="register">
        <h5>
          创建新账号
        </h5>
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="username"
              v-model="user.username"
              placeholder="用户名"
            >
          </div>
          <div class="alert-warning" v-if="usernameAlert">用户名已被占用！</div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="user.password"
              placeholder="密码"
            >
          </div>
          <div class="alert-warning" v-if="passwordAlert">两次密码输入不一致！</div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              v-model="confirmPassword"
              placeholder="确认密码"
            >
          </div>
          <div class="form-group">
            <button
              ref="register"
              disabled='disabled'
              class="btn btn-primary btn-block"
              @click.prevent="register"
            >
              注册并登陆
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      user: {
        username: '',
        password: '',
        avatar: ''
      },
      passwordAlert: false,
      usernameAlert: false,
      confirmPassword: ''
    }
  },
  watch: {
    // 监视confirmPassword 如果两次输入相同则 注册按钮可点击，否则不可点击
    // 并且提示两次输入不一致
    confirmPassword: function () {
      if (this.user.password === this.confirmPassword) {
        this.$refs.register.removeAttribute('disabled')
        this.passwordAlert = false
      } else {
        this.$refs.register.setAttribute('disabled', 'disabled')
        this.passwordAlert = true
      }
    }
  },
  methods: {
    // 点击遮罩触发， 隐藏注册组件
    hiddenRegister () {
      this.$store.commit('handleShowRegister', false)
    },
    register () {
      // 随机分配一个头像 把相对路径转成base64格式存储
      this.user.avatar = window.btoa('../../static/avatar/' + Math.floor(Math.random() * 31 + 1) + '.jpg')
      axios.post('/api/register', this.user)
        .then(res => {
          res = res.data
          // 用户名已被注册 则显示usrname Alert
          if (res === 'username has been registered') {
            this.usernameAlert = true
            this.passwordAlert = false
          } else {
            // 注册成功，自动登录，将登录状态保存在vuex中
            this.usernameAlert = false
            this.passwordAlert = false
            this.$store.commit('login')
            this.$store.commit('loginUser', res.user)
            this.$store.commit('handleShowRegister', false)
            // 显示loading动图 路由到首页
            this.$store.commit('handleLoading', true)
            setTimeout(() => {
              this.$store.commit('handleLoading', false)
              this.$router.push('/')
            }, 1000)
          }
        })
    }
  }
}
</script>

<style lang='stylus' scoped>
  .register-fade-enter-active
    transition opacity 0s ease
  .register-fade-leave-active
    transition opacity .3s ease
  .register-fade-enter, .register-fade-leave-to
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
    #register
      position absolute
      top 1rem
      z-index 1000
      padding 1rem .6rem
      background-color #fff
      .alert-warning
        padding .5rem
        border-radius .3rem
      .form-control
        border-color #343a40
    .container-small
      max-width 500px
</style>
