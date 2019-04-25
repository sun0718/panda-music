import {playMode} from '@/assets/js/config'
import {loadSearch, loadPlay, loadFavorite} from '@/assets/js/cache'

const state = {
  singer: {},
  playing: false,  //默认播放
  fullScreen: false,  //全屏播放
  playlist: [],  //播放列表
  sequenceList: [],  //随机播放
  mode: playMode.sequence,  
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state