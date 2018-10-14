<template>
  <transition name="popup-fade">
    <div id="popup-box">
      <div id="addCommentAlert" class="boxItem" v-if="emptyComment">
        <div>
          评论内容不能为空
        </div>
        <button @click="no">好的</button>
      </div>

      <div id="loginAlert" class="boxItem" v-if="!logstatus">
        <div>
          您还没有登录
        </div>
        <button @click="no">哦</button>
      </div>

      <div id="addPostAlert" class="boxItem" v-if="emptyPost">
        <div>
          您写点儿字再发吧
        </div>
        <button @click="no">好的</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupBox',
  computed: {
    emptyComment () {
      return this.$store.state.emptyComment
    },
    logstatus () {
      return this.$store.state.logstatus
    },
    emptyPost () {
      return this.$store.state.emptyPost
    }
  },
  methods: {
    no () {
      this.$store.commit('handleEmptyComment', false)
      this.$store.commit('handleEmptyPost', false)
      this.$store.commit('handleShowPopup', false)
    }
  }
}
</script>

<style lang='stylus'>
  .popup-fade-enter-active, .popup-fade-leave-active
    transition opacity .3s ease
  .popup-fade-enter, .popup-fade-leave-to
    opacity 0
  #popup-box
    display flex
    align-items center
    .boxItem
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
