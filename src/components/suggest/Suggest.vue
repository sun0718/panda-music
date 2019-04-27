<template>
  <scroll
    ref="suggest"
    class="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li
        @click="selectItem(item)"
        class="suggest-item"
        v-for="(item , index) in result"
        :key="index"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import Loading from "@/components/common/loading/Loading";
import NoResult from "@/components/common/no-result/NoResult";
import { searchSong } from "@/api/search";
import {createSong} from '@/assets/js/song'
import { mapMutations, mapActions } from "vuex";
import Singer from "@/assets/js/singer";
import { getSongVkey } from "@/api/song";
import { setTimeout } from 'timers';

const TYPE_SINGER = "singer";
const perpage = 20;

export default {
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      page: 1,
      pullup: true,
      beforeScroll: true,
      hasMore: true,
      result: [],
      searchSongList: [],
    };
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh();
    },
    search() {
      this.page = 1;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      this.searchSongList=[],
      searchSong(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === 0) {
          this._genResult(res.data,0);
          this._checkMore(res.data);
          this.hasMore = false;
        }
      });
    },
    searchMore() {
      if (!this.hasMore || this.searchSongList.length<perpage) {
        return;
      }
      this.page++;
      searchSong(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === 0) {
          this._genResult(res.data,1);
          this._checkMore(res.data);
          this.hasMore = false;
        }
      });
    },
    listScroll() {
      this.$emit("listScroll");
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        });
        this.$router.push({
          path: `/search/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }
      this.$emit("select", item);
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name}-${item.singer}`;
      }
    },
    getIconCls(item) {
      console.log
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else {
        return "icon-music";
      }
    },
    _genResult(data,isMore) {
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) {
        this._normalizeSongs(data.song.list)
        setTimeout(()=>{
          if(isMore){
            this.result = this.result.concat(this.searchSongList)
          }
          this.result = this.searchSongList
          console.log(this.result)
        },1000)
      }
    },
     _normalizeSongs(list) {
      Promise.all(list.map(item=>getSongVkey(item.songmid))).then(res => {
          list.map((item,index) =>{
            const vkey = res[index].data.items.length>0 ? res[index].data.items[0].vkey : '';
            if (item.songmid && item.albummid && vkey) {
              this.searchSongList.push(createSong(item, vkey));
            }
          })
      });
    },
    _checkMore(data) {
      const song = data.song;
      if (
        !song.list.length ||
        song.curnum + song.curpage * perpage > song.totalnum
      ) {
        this.hasMore = false;
      }
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions(["insertSong"])
  },
  watch: {
    query(newQuery) {
      this.search(newQuery);
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variable.scss";
@import "@/assets/styles/mixin.scss";

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>