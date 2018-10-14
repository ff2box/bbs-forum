<template>
  <transition name="logout-fade">
    <div id="logout-alert">
      <div id="cover">
        <div>
          确定退出登录？
        </div>
        <button @click="yes">确定</button>
        <button @click="no">取消</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LogoutAlert',
  methods: {
    yes () {
      // 出发父组件的确定删除事件
      this.$emit('logoutSure')
      this.$store.commit('handlelogoutAlert', false)
    },
    no () {
      this.$store.commit('handlelogoutAlert', false)
    }
  }
}
</script>

<style lang='stylus'>
  .logout-fade-enter-active, .logout-fade-leave-active
    transition opacity .3s ease
  .logout-fade-enter, .logout-fade-leave-to
    opacity 0
  #logout-alert
    display flex
    align-items center
    #cover
      display flex
      justify-content space-around
      align-items center
      background-color #fff
      width 20rem
      height 7rem
      padding .7rem 1rem
      border 1px solid #f8f9fa
      border-radius .6rem
      margin 0 auto
      button
        border 1px solid
        border-radius .4rem
        background-color #fff
</style>
