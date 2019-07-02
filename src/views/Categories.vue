<template>
  <div>
    <div class="categories-container">
      <div class="left-scroll-bar">
        <cube-scroll class="left-scroll">
          <cube-tab-bar
            v-model="selectedLabelDefault"
            :data="categories"
            @click="clickHandler"
            @change="changeHandler"
          >
            <cube-tab
              v-for="(item, index) of categories"
              :label="item.name"
              :key="index"
            >
              {{ item.name }}
            </cube-tab>
          </cube-tab-bar>
        </cube-scroll>
      </div>
      <div class="right-scroll-bar">
        <cube-scroll class="right-scroll" ref="scroll">
          <ul class="right-scroll-ul" @click="handleAddCartData($event)">
            <li
              class="right-scroll-li"
              v-for="(item, index) of activeCategories.data"
              :key="index"
            >
              <img
                class="goodsImg"
                :src="item.imgUrl"
                alt=""
                @load.once="loadImg"
              />
              <span class="goodsName"
                >{{ item.name }}
                <i
                  class="cubeic-add"
                  :name="item.name"
                  :imgUrl="item.imgUrl"
                  :price="item.price"
                ></i
              ></span>
              <span class="goodsPrice">￥{{ item.price }} </span>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
    <navbar></navbar>
    <div
      class="balls"
      v-for="(ball, index) of balls"
      :key="index"
      ref="balls"
      v-show="ball.show"
    ></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapState, mapActions } from "vuex";
export default {
  name: "Categories",
  data() {
    return {
      categories: [],
      selectedLabelDefault: "热门推荐",
      activeCategories: {},
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ]
    };
  },
  computed: {
    ...mapState(["shopCartPosition"])
  },
  components: {
    Navbar
  },
  created() {
    //获取分类页数据
    this.axios({
      method: "get",
      url:
        "https://www.easy-mock.com/mock/5cdda667431f897675a3d7bf/jx/categories"
    }).then(res => {
      if (res.data.success) {
        this.categories = res.data.data;
        console.log(res.data.data);
        this.activeCategories = this.categories[0];
      } else {
        console.log("请求数据失败，请重新请求！");
      }
    });
  },
  methods: {
    ...mapActions(["addCartData", "handleOnceRequest"]),
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    changeHandler(label) {
      this.loadImg();
      // if you clicked different tab, this methods can be emitted
      for (let i of this.categories) {
        if (label === i.name) {
          this.activeCategories = i;
        }
      }
    },
    handleAddCartData(e) {
      this.loadImg();
      //获取被点击的dom元素位置,小球动画开始
      const el = e.target;
      if (el.className === "cubeic-add") {
        this.ballAnimation(el);
        let name = el.getAttribute("name");
        let imgUrl = el.getAttribute("imgUrl");
        let price = el.getAttribute("price");
        this.addCartData({
          name: name,
          img: imgUrl,
          count: 1,
          price: price
        });
      }
    },
    loadImg() {
      // reset better-scroll'postion
      this.$refs.scroll.scrollTo(0, 0);
      // you need to caculate scroll-content height when your dom has changed in nextTick
      this.$refs.scroll.refresh();
    },
    ballAnimation(el) {
      //获取小球起点终点
      let { top, left } = el.getBoundingClientRect();
      let endTop = this.shopCartPosition.top - top, //这个地方有问题
        endLeft = this.shopCartPosition.left - left + 40;
      let _this = this;
      //遍历小球
      this.$nextTick(function() {
        for (let i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) {
            //将小球放到起点位置
            this.balls[i].show = true;
            this.$refs.balls[i].style.top = top + "px";
            this.$refs.balls[i].style.left = left + "px";
            //小球移动到终点位置
            setTimeout(function() {
              _this.$refs.balls[
                i
              ].style.transform = `translate3d(${endLeft}px, ${endTop}px, 0)`;
              setTimeout(function() {
                _this.balls[i].show = false;
                //小球回到起点位置
                _this.$refs.balls[i].style.transform = `translate3d(0, 0, 0)`;
              }, 600);
            });

            return;
          }
        }
      });
    }
  },
  activated() {
    this.loadImg();
  }
};
</script>

<style lang="stylus" scoped>
.balls
  position absolute
  bottom 20px
  right 35%
  width 20px
  height 20px
  border-radius 50%
  background orange
  z-index 1000
  transition: transform .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
.categories-container
  display flex
  .right-scroll-bar
    height 80vh
    width 70%
    .right-scroll
      .right-scroll-ul
        display flex
        flex-wrap wrap
        justify-content space-between
        padding 10px 20px
        box-sizing border-box
        .right-scroll-li
          display flex
          flex-direction column
          max-width 45%
          overflow hidden
          margin-bottom 15px
          .goodsImg
            padding-bottom 10px
          .goodsName
            padding-bottom 5px
            padding-left 10px
            font-size 18px
            .cubeic-add
              font-size 22px
              color orange
          .goodsPrice
            font-size 16px
            padding-left 10px
  .left-scroll-bar
    height 80vh
    width 30%
    background-color #f8f8f8
    .left-scroll
      .cube-tab-bar
        display flex
        flex-wrap wrap
        flex-direction column
        .cube-tab
          width 100%
          display flex
          justify-content center
          align-items center
          padding 15px 0
          box-sizing border-box
          font-size 14px
</style>
