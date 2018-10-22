<template>
  <transition name="aside-fade">
    <div id="aside-nav">
      <div id="about">
        <router-link to="/single-post/150">关于</router-link>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AsideNav'
}
</script>

<style lang='stylus' scoped>
  .aside-fade-enter-active, .aside-fade-leave-active
    transition opacity .3s ease
  .aside-fade-enter, .aside-fade-leave-to
    opacity 0
  #aside-nav
    box-shadow: -1px 2px 10px 0px #00000055
    width 50%
    max-width 300px
    position fixed
    background-color #fff
    z-index 999
    top 3rem
    right 0
    #about
      background-color #fff
      padding .8rem .5rem
      text-align center
      a
        color #6c757d
</style>
