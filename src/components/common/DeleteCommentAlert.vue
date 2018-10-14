<template>
  <transition name="delComment-fade">
    <div id="delete-comment-alert">
      <div id="cover">
        <div>
          确定删除评论？
        </div>
        <button @click="yes">确定</button>
        <button @click="no">取消</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DeleteCommentAlert',
  props: {
    commentId: Number
  },
  methods: {
    yes () {
      // 出发父组件的确定删除事件
      if (this.commentId) {
        this.$emit('deleteCommentSure', this.commentId)
      }
      this.$store.commit('deleteCommentAlert', false)
    },
    no () {
      this.$store.commit('deleteCommentAlert', false)
    }
  }
}
</script>

<style lang='stylus'>
  .delComment-fade-enter-active, .delComment-fade-leave-active
    transition opacity .3s ease
  .delComment-fade-enter, .delComment-fade-leave-to
    opacity 0
  #delete-comment-alert
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
