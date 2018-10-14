<template>
  <transition name="delPost-fade">
    <div id="delete-post-alert">
      <div id="cover">
        <div>
          确定删除主题？
        </div>
        <button @click="yes">确定</button>
        <button @click="no">取消</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'deletePostAlert',
  props: {
    postId: Number
  },
  methods: {
    yes () {
      // 出发父组件的确定删除事件
      if (this.postId) {
        this.$emit('deletePostSure', this.postId)
      }
      this.$store.commit('deletePostAlert', false)
    },
    no () {
      this.$store.commit('deletePostAlert', false)
    }
  }
}
</script>

<style lang='stylus' scoped>
  .delPost-fade-enter-active, .delPost-fade-leave-active
    transition opacity .3s ease
  .delPost-fade-enter, .delPost-fade-leave-to
    opacity 0
  #delete-post-alert
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
