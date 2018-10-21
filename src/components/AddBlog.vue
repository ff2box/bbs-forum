<template>
  <div class="container container-small" id="add-blog">
    <h4>
      发布新主题
    </h4>
    <form>
      <div class="form-group">
        <label style="color: #343a40">主题</label>
        <input
          type="text"
          class="form-control"
          v-model="blog.title"
          placeholder="编辑标题"
        >
      </div>
      <div class="form-group">
        <label style="color: #343a40">内容</label>
        <textarea
          class="form-control"
          rows="10"
          v-model="blog.content"
          placeholder="编辑内容"
        >
        </textarea>
      </div>
      <div class="form-group">
        <div class="btn btn-primary btn-block" @click.prevent="addBlog">发布</div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddBlog',
  data () {
    return {
      blog: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    addBlog () {
      // 显示loading动图 为了防止用户连续点击发布
      this.$store.commit('handleLoading', true)
      axios.post('/api/add-post', this.blog)
        .then(res => {
          res = res.data
          // 如果没有登录 弹出提示组件 提示未登录
          if (res === 'nologin') {
            this.islogin = false
            this.$store.commit('handleLoading', false)
            this.$store.commit('handleShowPopup', true)
          } else {
            this.islogin = true
            // 如果发布内容不全 则弹出提示组件 提示需要写全内容
            if (res === 'posterror') {
              this.$store.commit('handleLoading', false)
              this.$store.commit('handleEmptyPost', true)
              this.$store.commit('handleShowPopup', true)
            } else {
              // 发布成功 跳转首页
              setTimeout(() => {
                this.$store.commit('handleLoading', false)
                this.$router.push('/')
              }, 100)
            }
          }
        })
    }
  }
}
</script>

<style lang='stylus' scoped>
  #add-blog
    max-width 900px
    margin 0 auto
    padding 1rem 1.6rem
    h4
      text-align center
      color #abc
    .alert-warning
      padding .5rem
      border-radius .3rem
    .form-control
      border-color #6c757d
</style>
