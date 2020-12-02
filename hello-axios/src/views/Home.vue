<template>
  <div class="home">
    <button @click="getHandle">发送get请求</button>
    <button @click="getMyHandle">发送封装get请求</button>

    <button  @click="postHandle">发送post请求</button>
    <button  @click="postMyHandle">发送封装post请求</button>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import {get, post} from '../utils/request'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    getHandle() {
      axios.get('https://api.cat-shop.penkuoer.com/api/v1/products', {
        params: {
          page: 3,
          per: 2
        },
        headers: {

        }
      }).then(res => console.log(res))

    },
    getMyHandle() {
      get('/api/v1/products', {
      }).then(res => console.log(res))
    },
    postHandle() {
      axios.post('https://api.cat-shop.penkuoer.com/api/v1/auth/login',
        {
          username: 'xiaoming',
          password: '111111'
        },
        {
          params: {
            a: 123,
            b: 'hh'
          }
        }).then(res => console.log(res))
        .catch(err => console.log(err))
    },
    postMyHandle() {

    },
    putHandle() {
      axios.put('', {}, {})

    },
    deleteHandle() {
      axios.delete('', {}, {})
    }
  }
}
</script>
