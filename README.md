# panda-music

> Vue.js 音乐播放器

## 项目介绍
1 本项目是仿的QQ音乐，所有接口为QQ音乐的网页版接口，相当于完整版的手机WEB版QQ音乐（QQ音乐官网好多歌是必须要登陆或者下载客户端的）       
2 技术栈是vue-cli 3.0、使用的预处理语言是scss,项目有使用vue-x做全局的数据管理，没有使用eventBus

## 项目结构
```
.
├── README.md
├── babel.config.js
├── package.json
├── vue.config.js
├── postcss.config.js
├── src
│   ├── App.vue
│   ├── main.js
│   ├── api
│   │   ├── config.js
│   │   ├── rank.js
│   │   ├── recommend.js
│   │   ├── search.js
│   │   ├── singer.js
│   │   └── song.js
│   ├── components
│   │   ├──common
│   │   │   ├──
│   │   │   ├── confirm
│   │   │   │   └── Confirm.vue
│   │   │   ├── listview
│   │   │   │   └── listview.vue
│   │   │   ├── loading
│   │   │   │   ├── loading.gif
│   │   │   │   └── Loading.vue
│   │   │   ├── no-result
│   │   │   │   ├── NoResult.vue
│   │   │   │   ├── no-result@2x.png
│   │   │   │   └── no-result@3x.png
│   │   │   ├── progress-bar
│   │   │   │   └── ProgressBar.vue
│   │   │   ├── progress-circle
│   │   │   │   └── ProgressCircle.vue
│   │   │   ├── scroll
│   │   │   │   └── Scroll.vue
│   │   │   ├── search-box
│   │   │   │   └── SearchBox.vue
│   │   │   ├── search-list
│   │   │   │   └── SearchList.vue
│   │   │   ├── slider
│   │   │   │   └── Slider.vue
│   │   │   ├── song-list
│   │   │   │   ├── first@2x.png
│   │   │   │   ├── first@3x.png
│   │   │   │   ├── second@2x.png
│   │   │   │   ├── second@3x.png
│   │   │   │   ├── SongList.vue
│   │   │   │   ├── third@2x.png
│   │   │   │   └── third@3x.png
│   │   │   ├── switches
│   │   │   │   └── Switches.vue
│   │   │   └── top-tip
│   │   │       └── TopTip.vue
│   │   ├── add-song
│   │   │   └── AddSong.vue
│   │   ├── disc
│   │   │   └── Disc.vue
│   │   ├── music-header
│   │   │   ├── logo.png
│   │   │   └── MusicHeader.vue
│   │   ├── music-list
│   │   │   └── MusicList.vue
│   │   ├── player
│   │   │   └── Player.vue
│   │   ├── play-list
│   │   │   └── Playlist.vue
│   │   ├── rank
│   │   │   └── Rank.vue
│   │   ├── recommend
│   │   │   └── Recommend.vue
│   │   ├── search
│   │   │   └── Search.vue
│   │   ├── singer
│   │   │   └── Singer.vue
│   │   ├── singer-detail
│   │   │   └── Singer-detail.vue
│   │   ├── suggest
│   │   │   └── Suggest.vue
│   │   ├── tab
│   │   │   └── Tab.vue
│   │   ├── top-list
│   │   │   └── Top-list.vue
│   │   └── user-center
│   │       └── UserCenter.vue
│   ├── assets
│   │   ├── fonts
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── images
│   │   │   └── default.png
│   │   ├── js
│   │   │   ├── cache.js
│   │   │   ├── config.js
│   │   │   ├── dom.js
│   │   │   ├── jsonp.js
│   │   │   ├── mixin.js
│   │   │   ├── singer.js
│   │   │   ├── song.js
│   │   │   └── util.js
│   │   └── styles
│   │       ├── base.scss
│   │       ├── icon.scss
│   │       ├── index.scss
│   │       ├── mixin.scss
│   │       ├── reset.scss
│   │       └── variable.scss
│   ├── main.js
│   ├── router
│   │   └── index.js
│   └── store
│       ├── actions.js
│       ├── getters.js
│       ├── index.js
│       ├── mutation-types.js
│       ├── mutations.js
│       └── state.js
└── public
    ├── index.html
    └── favicon.ico

```

## 项目截图

#### 就不放了
![image]()


### 安装与运行

```
git clone https://github.com/sun0718/panda-music.git

cd panda-music

npm install

npm run serve //服务端运行 访问 http://localhost:8080

npm run build 项目打包 

