const webpack = require('webpack');
const path = require('path')

const axios = require('axios');
module.exports = {
    lintOnSave: true,
    chainWebpack: config=>{
        config.resolve.alias
            .set('public',path.join(__dirname, 'public'))
            .set('assets',path.join(__dirname, 'src/assets'))
    },
    devServer: {
        open: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8080/',  // target host
        //         changeOrigin: true,  // needed for virtual hosted sites
        //         pathRewrite: {
        //             '^/api': '/api'  // rewrite path
        //         }
        //     },
        // },
        // 请求本地数据，测试跨域
        before(app) {
            // http://localhost:8081/api/goods
            app.get('/api/getDiscList', (req, res) => {
                var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            });
            app.get('/api/lyric', (req, res) => {
                var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            });
        }
    }
}

