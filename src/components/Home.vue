<template>
  <div id="home">
    <!-- 分类 -->
    <div id='categary'>
      <input type="radio" id="all" name="categary" checked="checked">
      <label for="all" @click="showAll">全部</label>
      <input type="radio" id="hot" name="categary">
      <label for="hot" @click="showHot">热门</label>
      <input type="radio" id="new" name="categary">
      <label for="new" @click="showNew">最新</label>
      <span class="addpost">
        <router-link to="/addBlog"><span class="iconfont" style="fontWeight: 800">&#xe61e;</span> 发新主题</router-link>
      </span>
    </div>
    <!-- 某分类没有帖子时 显示暂无主题 -->
    <span v-if="!blogs.length" style="paddingLeft: 1rem">暂无主题!</span>
    <ul class="blogs">
      <li
        v-for="blog in blogs"
        :key="blog.id"
        class="item"
        is="router-link"
        :to="'/single-post/' + blog.id"
        v-rainbow
      >
        <div class="header">
          <!-- 头像 -->
          <div class="avatar">
            <router-link :to="'/user-message/' + blog.userId">
              <img :src="avatar(blog.avatar)" alt="avatar">
            </router-link>
          </div>
          <!--标题 link to 查看详情页面 -->
          <div class="head-content">
            <h1 class="title">{{blog.title | snippetTitle}}</h1>
            <span class="blogInfo">
              {{time(blog.timestamp)}}
              <router-link :to="'/user-message/' + blog.userId" class="author">
                by {{blog.name}}
              </router-link>
            </span>
            <span class="commentsNum">{{commentsNum(blog.id)}}</span>
          </div>
        </div>
        <p class="content" :ref='blog.id'>
          {{blog.content | snippet}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      blogs: [],
      allBlogs: [],
      hotBlogs: [],
      newBLogs: [],
      comments: []
    }
  },
  methods: {
    time (timestamp) {
      return new Date(timestamp).toLocaleDateString()
    },
    // 计算对应帖子的评论数
    commentsNum (postid) {
      var nums = this.comments.filter(it => {
        return it.postId === postid
      })
      return nums.length
    },
    avatar (avatar) {
      if (avatar) {
        return window.atob(avatar)
      }
    },
    // 显示全部帖子
    showAll () {
      this.blogs = this.allBlogs
    },
    // 显示热门帖子
    showHot () {
      this.blogs = this.allBlogs.filter(it => {
        return this.commentsNum(it.id) > 2
      })
      // 冒泡排序 按回复数排序
      function swap (arr, i, j) {
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      function bubbleSort (arr, compar) {
        var len = arr.length
        for (var i = len - 1; i >= 0; i--) {
          var swaped = false
          for (var j = 0; j < i; j++) {
            if (compar(arr[j], arr[j + 1]) > 0) {
              swap(arr, j, j + 1)
              swaped = true
            }
          }
          if (!swaped) {
            return arr
          }
        }
        return arr
      }
      bubbleSort(this.blogs, (a, b) => {
        return this.commentsNum(b.id) - this.commentsNum(a.id)
      })
    },
    // 显示最新一天的帖子
    showNew () {
      this.blogs = this.allBlogs.filter(it => {
        return Date.now() - it.timestamp <= 86400000
      })
    }
  },
  // 过滤器 当文字过多时显示'...'
  filters: {
    snippet (val) {
      val = String(val)
      if (val.length > 100) {
        return val.slice(0, 100) + '...'
      } else {
        return val
      }
    },
    snippetTitle (val) {
      val = String(val)
      if (val.length > 20) {
        return val.slice(0, 20) + '...'
      } else {
        return val
      }
    }
  },
  mounted () {
    this.$store.commit('handleLoading', true)
    axios.get('/api/')
      .then((res) => {
        this.$store.commit('handleLoading', false)
        var posts = res.data.posts
        var comments = res.data.comments
        this.allBlogs = posts.reverse()
        this.allBlogs.sort((a, b) => {
          return b.timestamp - a.timestamp
        })
        this.blogs = this.allBlogs
        this.comments = comments
      })
  }
}
</script>

<style lang='stylus' scoped>
  #home
    max-width 900px
    margin 0 auto
    #categary
      padding 1rem
      input
        display none
      input + label
        padding .2rem .4rem
        margin 0
        margin-right .4rem
        background-color #e9e9e9
        color #000
        cursor pointer
      input:checked + label
        background-color #17a2b8
        color #fff
      .addpost
        float right
        padding .2rem .4rem
        background-color #e9e9e9
        a
          color #000
          text-decoration none
    .blogs
      padding 0 .5rem 0 .2rem
      .item:last-child
        border-bottom .05rem solid #f5f5f5!important
    .blogs .item
        border-top .05rem solid #f5f5f5!important
        border-left .4rem solid
        padding: .5rem .7rem
        min-height 4rem
        list-style none
        display block
        color black
        text-decoration none
      .header
        display flex
        .avatar img
          float left
          width 3rem
          height 3.2rem
          margin-right .5rem
        .head-content
          flex-grow 1
          position relative
          // background-color pink
          .title
            margin-right 2rem
            font-size 1rem
            font-weight 700
          a h1
            color #dc3545
            margin-bottom 0
          .blogInfo
            display inline-block
            color gray
            font-size .8rem
            a.author
              color #17a2b8
              font-weight 700
          .commentsNum
            // display inline-block
            position absolute
            top 0
            right 0
            width 1.2rem
            height 1.2rem
            line-height 1.2rem
            border-radius 100%
            font-size .6rem
            background-color rgba(0, 0, 0, .1)
            color #fff
            text-align center
      .content
        background-color #fff
        // line-height .42rem
        text-align justify
        padding 0 1rem
        margin-top 1rem
        // border 1px solid red
        word-break break-all
</style>
