import axios from 'axios'
import {jsonp} from '@/assets/js/jsonp'
import { commonParams , options } from './config'

export function getSongLyric(mid) {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    '-': 'MusicJsonCallback_lrc',
    songmid: mid,
    platform: 'yqq.json',
    hostUin: 0,
    notice: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json',
    loginUin: 11529215046
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
      callback: 'musicJsonCallback',
      loginUin: 3051522991,
      format: 'jsonp',
      platform: 'yqq',
      needNewCode: 0,
      cid: 205361747,
      uin: 3051522991,
      guid: 5931742855,
      songmid: songmid,
      filename: `C400${songmid}.m4a`
  })

  return jsonp(url, data)
}