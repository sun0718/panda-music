<template>
  <div class="rank" ref="ranks">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(items )" class="item" v-for="(items,indexs) in topList" :key="indexs">
          <div class="icon">
            <img width="100" height="100" v-lazy="items.picUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in items.songList" :key="index">
              <span>{{index + 1}}&emsp;</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import Loading from "@/components/common/loading/Loading";
import { getTopList } from "@/api/rank";
import { playlistMixin } from "@/assets/js/mixin.js";
import { mapMutations } from "vuex";
import { debug } from "util";

export default {
  mixins: [playlistMixin],
  created() {
    this._getTopList();
    console.log(111)
  },
  data() {
    return {
      topList: []
    };
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.ranks.style.bottom = bottom;
      this.$refs.toplist.refresh();
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      });
      this.setTopList(item);
    },
    _getTopList() {
      var _that = this;
      getTopList().then(res => {
        if (res.code === 0) {
          _that.topList = res.data.topList;
        }
      });
    },
    ...mapMutations({
      setTopList: "SET_TOP_LIST"
    })
  },
  watch: {
    topList() {
      setTimeout(() => {
        this.$Lazyload.lazyLoadHandler();
      }, 20);
    }
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variable.scss";
@import "@/assets/styles/mixin.scss";

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        text-align: left;
        .song {
          // no-wrap()
          line-height: 26px;
          overflow: hidden;
          white-space:nowrap;
          text-overflow: ellipsis;
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