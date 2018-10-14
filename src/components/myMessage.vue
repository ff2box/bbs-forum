<template>
  <transition name="center-fade">
    <div id="my-message">
      <div id="my-center" class="iconfont border-bottom" @click="hideShowMy">
        &#xe608;
        <router-link :to="'/user-message/' + userId">
          {{username}} 个人中心
        </router-link>
      </div>
      <div @click="logout" id="logoutBtn" class="iconfont">
        &#xe682;
        登出
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyMessage',
  computed: {
    userId () {
      return this.$store.state.user.id
    },
    username () {
      return this.$store.state.user.name
    }
  },
  methods: {
    hideShowMy () {
      this.$store.commit('handleShowMy', false)
    },
    logout () {
      this.$store.commit('handleShowMy', false)
      this.$store.commit('handlelogoutAlert', true)
    },
    logoutSure () {
      axios.get('/api/logout')
        .then(res => {
          this.$store.commit('logout')
          this.$router.push('/')
        })
    }
  }
}
</script>

<style lang='stylus' scoped>
  .center-fade-enter-active
    transition all .3s ease
  .center-fade-leave-active
    transition all 0s ease
  .center-fade-enter, .center-fade-leave-to
    opacity 0
  #my-message
    // border 1px solid
    box-shadow: -1px 4px 10px 0px #00000055
    width 50%
    height 5rem
    position fixed
    background-color #fff
    z-index 999
    top 3rem
    right 0
    display flex
    flex-direction column
    justify-content space-around
    #my-center, #logoutBtn
      margin 0 .3rem
      padding .2rem .3rem
    #my-center, #my-center a
      color #919191
    #logoutBtn
      color #17a2b8
</style>
