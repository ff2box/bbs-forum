<template>
  <div id="user-message">
    <deletePost-alert :postId="postId" class="deleteAlert" v-if="deletePostAlert" @deletePostSure='deletePostSure'></deletePost-alert>
    <deleteComment-alert :commentId="commentId" class="deleteAlert" v-if="deleteCommentAlert" @deleteCommentSure='deleteCommentSure'></deleteComment-alert>
    <div id="avatar">
      <img :src="avatar(user.avatar)" alt="avatar">
    </div>
    <h4>
      {{user.name}} 的
      <!-- <a href="#" @click="showPost">主题</a> /
      <a href="#" @click="showComment">评论</a> -->
      <input type="radio" name="zp" id="postBtn" @click="showPost" checked  style="display: none">
      <label for="postBtn">主题</label> /
      <input type="radio" name="zp" id="commentBtn" @click="showComment" style="display: none">
      <label for="commentBtn">评论</label>
    </h4>
    <div class="h-post" v-show="show">
      <div v-if="!hasPost" class="noAnythingAlert">这位大侠很低调，还没发过主题</div>
      <ul v-if="hasPost">
        <li v-rainbow v-for="post in userPosts" :key="post.id" class="item postItem">
          <div class="post-title">
            <router-link :to="'/single-post/' + post.id">
              <h6>{{post.title}}</h6>
            </router-link>
            <span>{{time(post.timestamp)}}</span>
          </div>
          <button class="btn btn-danger" v-if="deletePermission(post.userId)" @click="deletePost(post.id, post.userId)">删除</button>
        </li>
      </ul>
    </div>
    <div class="h-comment" v-show="!show">
      <div v-rainbow v-if="!hasComment" class="noAnythingAlert">他不想做任何评论</div>
      <ul v-if="hasComment">
        <li v-rainbow v-for="comment in userComments" :key="comment.id" class="item">
          <h6>{{comment.postTitle}}</h6>
          <div class="commentItem">
            <div class="commentInfo">
              <div>
                {{comment.content}}
              </div>
              <span>{{time(comment.timestamp)}}</span>
            </div>
            <button class="btn btn-danger" v-if="deletePermission(comment.userId)" @click='deleteComment(comment.id, comment.userId)'>删除</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div ><a id="back" @click='$router.back(-1)' href="#">返回上一页</a></div> -->
  </div>
</template>

<script>
import axios from 'axios'
import DeletePostAlert from './common/DeletePostAlert'
import DeleteCommentAlert from './common/DeleteCommentAlert'
export default {
  name: 'UserMessage',
  components: {
    DeletePostAlert,
    DeleteCommentAlert
  },
  data () {
    return {
      user: {},
      userPosts: [{username: '某某'}],
      userComments: [],
      show: true,
      hasComment: true,
      hasPost: true,
      postId: '',
      commentId: ''
    }
  },
  // 监听地址栏id的变化，如果改变则重新加载页面，如果不这样的话 删除键不能显示
  watch: {
    '$route.params.id' () {
      axios.get('/api/user/' + this.$route.params.id)
        .then(res => {
          console.log(res)
          this.user = JSON.parse(res.data[0])
          this.userPosts = JSON.parse(res.data[1])
          this.userComments = JSON.parse(res.data[2])
          if (this.userPosts.length === 0) {
            console.log('没有post')
            this.hasPost = false
          }
          if (this.userComments.length === 0) {
            console.log('没有评论')
            this.hasComment = false
          }
        })
    },
    makesure () {
      console.log('makesure', this.makesure)
    }
  },
  computed: {
    makesure () {
      return this.$store.state.makesure
    },
    deletePostAlert () {
      return this.$store.state.deletePostAlert
    },
    deleteCommentAlert () {
      return this.$store.state.deleteCommentAlert
    }
  },
  methods: {
    avatar (avatar) {
      if (avatar) {
        return window.atob(avatar)
      }
    },
    time (timestamp) {
      return new Date(timestamp).toLocaleDateString()
    },
    deletePermission (id) {
      // console.log('对比了') 管理员id80 也可以显示删除按钮
      return this.$store.state.user.id === id || this.$store.state.user.id === 80
    },
    showPost () {
      this.show = true
    },
    showComment () {
      this.show = false
    },
    deleteComment (commentId, userId) {
      if (this.$store.state.user.id !== userId && this.$store.state.user.id !== 80) {
        console.log('不是本人')
      } else {
        this.$store.commit('deleteCommentAlert', true)
        this.commentId = commentId
      }
    },
    deleteCommentSure (commentId) {
      this.userComments = this.userComments.filter(it => it.id !== commentId)
      axios.post('/api/deleteComment/' + commentId)
        .then(res => {})
    },
    // 点击删除post按键时，显示提示信息，把要删除的postId传值到提示信息子组件，当子组件点击确定时出发确定事件，父组件监听确定事件已确定是否要删除
    deletePost (postId, userId) {
      // console.log(postId)
      if (this.$store.state.user.id !== userId && this.$store.state.user.id !== 80) {
        console.log('不是本人')
      } else {
        this.$store.commit('deletePostAlert', true)
        this.postId = postId
      }
    },
    deletePostSure (postId) {
      // 在前端立即删除该post
      console.log(1)
      this.userPosts = this.userPosts.filter(it => it.id !== postId)
      // 向后端数据库请求删除该post
      axios.post('/api/deletePost/' + postId)
        .then(res => {})
    }
  },
  created () {
    this.$store.commit('handleLoading', true)
    axios.get('/api/user/' + this.$route.params.id)
      .then(res => {
        this.$store.commit('handleLoading', false)
        this.user = JSON.parse(res.data[0])
        this.userPosts = JSON.parse(res.data[1])
        this.userComments = JSON.parse(res.data[2])
        console.log('user', this.user)
        console.log('posts', this.userPosts)
        console.log('comments', this.userComments)
        // 判断是否有历史评论
        if (this.userComments.length === 0) {
          this.hasComment = false
        } else {
          this.hasComment = true
        }
        // 判断是否有历史主题
        if (this.userPosts.length === 0) {
          this.hasPost = false
        } else {
          this.hasPost = true
        }
      })
  }
}
</script>

<style lang='stylus' scoped>
  #user-message
    padding-top 1rem
    .deleteAlert
      position fixed
      z-index 999
      top 0
      left 0
      right 0
      bottom 0
      padding 2rem
      background-color rgba(0, 0, 0, .8)
    #avatar
      width 5rem
      height 5rem
      margin 0 auto 1rem
      img
        box-shadow: 1px 2px 12px 0px #00000055
        border-radius 100%
        width 5rem
        height 5rem
    h4
      text-align center
      input + label
        color: #6c757d
      input:checked + label
        color #28a745
        transition .2s ease-in-out
    .alert-warning
      padding .5rem
      border-radius .3rem
    .h-post, .h-comment
      margin 1rem 0
      margin-bottom .7rem
      // border-radius .9rem
      .noAnythingAlert
        padding 1.5rem 1rem
        text-align center
        border-left .4rem solid
        border-top .05rem solid #f5f5f5!important
        border-bottom .05rem solid #f5f5f5!important
      ul
        // padding .8rem 1.2rem .5rem
        padding 0
        .item:last-child
          border-bottom .05rem solid #f5f5f5!important
        .item
          list-style none
          padding 1rem
          border-top .05rem solid #f5f5f5!important
          border-left .4rem solid
          p .btn
            float right
    .h-post h6, .h-comment h6
      font-size 1.5rem
      color black
    .h-post span, .h-comment span
      color gray
    .h-post
      .postItem
        display flex
        align-items flex-start
        .post-title
          padding: 0 .8rem
          text-align justify
          word-break break-all
          flex-grow 1
    .h-comment
      .commentItem
        display flex
        align-items flex-start
        .commentInfo
          text-align  justify
          word-break break-all
          flex-grow 1
          padding 0 .8rem
</style>
