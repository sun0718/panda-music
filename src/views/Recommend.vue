<template>
  <div class="recommend" ref="recommend">
    <Scroll ref="scroll" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl" :data-id="index">
                <!-- needsclick 控制fastClick组件过滤此元素 -->
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item,index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRcommend , getDiscList } from "@/api/recommend.js";
import Slider from "@/components/common/slider/Slider.vue";
import Loading from '@/components/common/loading/Loading.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';
  import {mapMutations} from 'vuex'
export default {
  name: "",
  components: {
    Slider,
    Loading,
    Scroll
  },
  data() {
    return {
      recommends: [],
      discList:[]
    };
  },
  created() {
    this._getRemonmend();
    this._getDiscList();
  },
  methods: {
    _getRemonmend() {
      getRcommend().then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === 0) {
          this.discList = res.data.list;
        }
      });
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    },
    selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
    ...mapMutations({
        setDisc: 'SET_DISC'
      })
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variable.scss";

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          text-align: left;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>