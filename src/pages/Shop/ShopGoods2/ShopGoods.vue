<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="LeftUl">
          <li class="menu-item"
              :class="{current:index === currentIndex}"
              v-for="(good ,index) in goods"
              :key="index"
              @click="clickItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good ,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food ,index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    CartControl组件
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        tops: [],
        scrollY: 0

      }
    },
    computed: {
      ...mapState(['goods']),

      currentIndex () {
        //滑动右边左边颜色跟着跳转
        const {tops, scrollY} = this
        const index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index + 1]
        })
        //滑动右边左边跟着响应的移动
        if (this.index !== index && this.leftScroll) {
          this.index = index
          const li = this.$refs.LeftUl.children[index]
          this.leftScroll.scrollToElement(li, 300)
        }
        return index
      }
    },
    mounted () {
      //等加载完成后在执行异步的滑动
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(() => {
          this._initScroll(),
            this._initTops()
        })
      })
    },
    methods: {
      _initScroll () {
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true
        })
        this.rightScroll = new BScroll('.foods-wrapper', {
          probeType: 1,
          click: true
        })
        //滑动右边左边颜色跟着跳转
        this.rightScroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })

        this.rightScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      },

      clickItem (index) {
        //点击左边，右边跟着滑动
        const y = -this.tops[index]
        this.scrollY = -y
        this.rightScroll.scrollTo(0, y, 500)
      },

      _initTops () {
        //滑动右边左边颜色跟着跳转
        const lis = this.$refs.rightUl.getElementsByClassName('food-list-hook')
        let tops = []
        let top = 0
        tops.push(top)
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops
      }

    }

  }


</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 230px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: #02a774
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

