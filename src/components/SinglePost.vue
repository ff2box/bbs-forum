<template>
  <div id="single-post">
    <deleteComment-alert :commentId="commentId" class="deleteAlert" v-if="deleteCommentAlert" @deleteCommentSure='deleteCommentSure'></deleteComment-alert>
    <div class="post">
      <h1>{{blog.title}}</h1>
      <div class="postInfo">
        <router-link :to="'/user-message/' + blog.userId" class="author">
          {{blog.name}}
        </router-link>
        <span>{{time(blog.timestamp)}}</span>
      </div>
      <div class="content">
        <p v-for="(p, index) in paragraphs" :key="index">
            {{ p }}
        </p>
      </div>
    </div>
    <hr>
    <div class="comments">
      {{comments.length}}条评论
      <ul>
        <li v-for="item in comments" :key="item.id" class="item border-bottom">
          <div class="content">
            <div class="v-avatar">
              <img :src="avatar(item.avatar)" alt="avatar">
            </div>
            <div class="commentInfo">
              <p class="v-content">{{item.content}}</p>
            </div>
          </div>
          <div class="item-footer">
            <router-link :to="'/user-message/' + item.userId" class="v-name">
              <span style="color: #6c757d; font-weight: normal">{{time2(item.timestamp)}}</span> by {{item.name}}
            </router-link>
            <span id="delBtn" class="btn" v-if="deletePermission(item.userId)" @click='deleteComment(item.id, item.userId)'>delete</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="add-comment">
      <strong style="color: #17a2b8">添加一条新回复</strong>
      <form>
        <textarea ref='commentContent' class="form-control textarea" v-model="addComment.content" placeholder="评论一下"></textarea>
        <button class="btn btn-primary btn-block" @click.prevent="addCommend">评论</button>
      </form>
    </div>
    <!-- <div id="back"><img src="@/assets/back.png" alt="back" @click='$router.back(-1)'></div>
    <div id="toTop"><img src="@/assets/top.png" alt="back"></div> -->
  </div>
</template>

<script>
import axios from 'axios'
import DeleteCommentAlert from './common/DeleteCommentAlert'
export default {
  name: 'SinglePost',
  components: {
    DeleteCommentAlert
  },
  data () {
    return {
      blog: {},
      comments: [],
      paragraphs: [],
      addComment: {
        postId: Number(this.$route.params.id),
        content: ''
      },
      commentId: ''
    }
  },
  computed: {
    deleteCommentAlert () {
      return this.$store.state.deleteCommentAlert
    }
  },
  methods: {
    deletePermission (id) {
      // console.log('对比了') 管理员id80 也可以显示删除按钮
      return this.$store.state.user.id === id || this.$store.state.user.id === 80
    },
    deleteComment (commentId, userId) {
      console.log('delete')
      if (this.$store.state.user.id !== userId && this.$store.state.user.id !== 80) {
        console.log('不是本人')
      } else {
        this.$store.commit('deleteCommentAlert', true)
        this.commentId = commentId
      }
    },
    deleteCommentSure (commentId) {
      this.comments = this.comments.filter(it => it.id !== commentId)
      axios.post('/api/deleteComment/' + commentId)
        .then(res => {})
    },
    time (timestamp) {
      return new Date(timestamp).toLocaleDateString()
    },
    time2 (timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    },
    avatar (avatar) {
      if (avatar) {
        return window.atob(avatar)
      }
    },
    addCommend () {
      // 为什么if 和 else 的都log出来了？？？？？
      // if (this.$store.state.user.id) {
      //   console.log('heiheihei', this.$store.state.user)
      // } else {
      //   console.log('你没有登录')
      // }
      // console.log(this.$refs.commentContent.textLength)
      if (this.$store.state.user.id) {
        if (this.$refs.commentContent.textLength === 0) {
          console.log('输入内容不能为空')
          this.$store.commit('handleEmptyComment', true)
          this.$store.commit('handleShowPopup', true)
        } else {
          axios.post('/api/add-comment/' + this.$route.params.id, this.addComment)
            .then(res => {
              res = res.data
              console.log(res)
              // if (res === 'you are not login!') {
              //   console.log('您没有登录')
              // } else
              if (res === 'no') {
                console.log('不能只输入回车')
                this.$store.commit('handleEmptyComment', true)
                this.$store.commit('handleShowPopup', true)
              } else {
                this.comments.push(res)
                this.addComment.content = ''
                // this.$store.commit('showAcAlert', true)
              }
            })
        }
      } else {
        console.log('您没有登录')
        this.$store.commit('handleShowPopup', true)
      }
    }
  },
  created () {
    this.$store.commit('handleLoading', true)
    axios.get('/api/post/' + this.$route.params.id)
      .then(res => {
        this.$store.commit('handleLoading', false)
        this.blog = res.data.post
        this.paragraphs = res.data.post.content.split(/\r|\n/)
        this.comments = res.data.comments
        console.log(this.comments)
      })
  }
}
</script>

<style lang="stylus" scoped>
  #single-post
    padding 1rem 1.5rem 1rem
    .deleteAlert
      position fixed
      z-index 999
      top 0
      left 0
      right 0
      bottom 0
      padding 2rem
      background-color rgba(0, 0, 0, .8)
    .post
      h1
        text-align center
        font-size 1.8rem
        margin-bottom .5rem
      .postInfo
        text-align center
        color #6c757d
        margin-bottom .5rem
        a.author
          color #dc3545
          font-weight 700
      .content
        text-align  justify
    // 评论样式
    .comments
      ul
        padding-left 1rem
        .item
          list-style none
          position relative
          .content
            display flex
            align-items flex-start
            padding 1rem 0
            overflow hidden
            .v-avatar
              margin-right 1rem
              img
                display block
                width 3rem
                height 3rem
            .commentInfo
              flex-grow 1
              .v-content
                margin: 0
                word-break break-all
          .item-footer
            overflow hidden
            #delBtn
              color #aaa
              font-style italic
              float right
            a.v-name
              float right
              color #dc3545
              padding .5rem 0
              font-size .8rem
              font-weight 700
    // 添加评论样式
    .add-comment
      .textarea
        display inline-block
        border-color #6c757d
        margin .3rem 0
      .btn
        border-color #6c757d
        background-color #fff
        color #000
    // #back, #toTop
    //   position fixed
    //   bottom 5rem
    //   right 1.8rem
    //   width 3rem
    //   height 3rem
    //   img
    //     width 3rem
    //     height 3rem
    // #toTop
    //   bottom 1rem
</style>
