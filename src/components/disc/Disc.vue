<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/music-list/MusicList";
import { getDiscSongList } from "@/api/recommend";
import { mapGetters } from "vuex";
import { createSong } from "@/assets/js/song";
import { getSongVkey } from "@/api/song";

export default {
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapGetters(["disc"])
  },
  data() {
    return {
      songs: []
    };
  },
  created() {
    this._getSongList();
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push("/recommend");
        return;
      }
      getDiscSongList(this.disc.dissid).then(res => {
        if (res.code === 0) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        getSongVkey(musicData.mid).then(res => {
          const vkey = res.data.items[0].vkey;
          if (musicData.mid && musicData.album.mid) {
            var song = {
              songid: musicData.id,
              songmid: musicData.mid,
              singer: musicData.singer,
              songname: musicData.name,
              albumname: musicData.album.name,
              interval: musicData.interval,
              albummid: musicData.album.mid
            }
            ret.push(createSong(song, vkey));
          }
        });
      });
      console.log(ret);
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>