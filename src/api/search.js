import {jsonp} from '@/assets/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function searchSong(query, page, zhida, perpage) {
  const url = '/api/searchSong'
  const data = Object.assign({}, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    qqmusic_ver: 1298,
    searchid: 67045599193581975,
    aggr: 0,
    remoteplace: 'txt.yqq.song',
    uin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    loginUin: 1152921504691894915,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
