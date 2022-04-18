<template>
  <div class="home-container">
    <div class="home-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import { getName, getToken } from '@/utils/auth'


export default {
  name: 'Home',
  data() {
    return {
      name: getName()
    }
  },
  mounted() {
    // getInfo({phoneNumber: '15168331790'}).then(res => {
    //   console.log('res---', res)
    // })
    const token = getToken()
    // console.log('token--111', token)
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
