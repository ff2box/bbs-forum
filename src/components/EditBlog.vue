<template>
  <div class="container container-small" id="edit-blog">
    <h4>
      修改主题
    </h4>
    <form>
      <div class="form-group">
        <label style="color: #343a40">主题</label>
        <input
          type="text"
          class="form-control"
          v-model="blog.title"
          :placeholder="blog.title"
        >
      </div>
      <div class="form-group">
        <label style="color: #343a40">内容</label>
        <textarea
          class="form-control"
          rows="10"
          v-model="blog.content"
          :placeholder="blog.content"
        >
        </textarea>
      </div>
      <div class="form-group">
        <div class="btn btn-primary btn-block" @click.prevent="editBlog">重新发布</div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditBlog',
  data () {
    return {
      blog: {
        title: '编辑标题',
        content: '编辑内容'
      }
    }
  },
  methods: {
    editBlog () {
      // 如果标题或者内容为空 则弹出提示组件
      if (this.blog.title.length === 0 || this.blog.content.length === 0) {
        this.$store.commit('handleEmptyPost', true)
        this.$store.commit('handleShowPopup', true)
      } else {
      // 修改后put 修改数据库数据
        this.$store.commit('handleLoading', true)
        axios.put('/api/edit-blog/' + this.$route.params.id, this.blog)
          .then(res => {
            setTimeout(() => {
              this.$store.commit('handleLoading', false)
              this.$router.push('/')
            }, 100)
          })
      }
    }
  },
  // 一进入编辑页面就请求 需要编辑的贴子的数据，初始化
  created () {
    this.$store.commit('handleLoading', true)
    axios.get('/api/post/' + this.$route.params.id)
      .then(res => {
        res = res.data
        this.blog = res.post
        this.$store.commit('handleLoading', false)
      })
  }
}
</script>

<style lang='stylus' scoped>
  #edit-blog
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
