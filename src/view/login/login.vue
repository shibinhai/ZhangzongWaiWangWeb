<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.contant{
  text-align: center;
  width: 100vw;
  height: 100vh;
  .bgimg{
    width: 100vw;
    height: 100vh;
    position: absolute;
    margin: 0 auto;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .title{
    padding-top: 60px;
    font-family: Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;
    color: #000000;
    font-weight: bold;
    font-size: 35px;
    text-align: center;
    width: 100%;
    margin-bottom: 5rem;
    span{
      display: block;
      color: #1ab394;
      font-weight: bold;
      font-size: 35px;
      text-align: center;
    }
  }
  .loginBox{
    width: 22vw;
    max-width: 540px!important;
    margin: 0 auto;
    padding-top: 45vh;
    .inputLogin{
      margin-bottom: 0px!important;
    }
    input{
      background-color: #FFF;
      border: 1px solid #e5e6e7;
      border-radius: 1px;
      display: block;
      padding: 6px 12px;
      -webkit-transition: border-color .15s ease-in-out 0s,box-shadow .15s ease-in-out 0s;
      transition: border-color .15s ease-in-out 0s,box-shadow .15s ease-in-out 0s;
      width: 100%;
      font-size: 14px;
    }
    input:focus{
      border-style:solid;
      border-color: #17B194;
      outline:none;
    }
    .loginInputUser{
      height: 2.5rem;
      -webkit-border-top-left-radius: 5px;
      -moz-border-top-left-radius: 5px;
      border-top-left-radius: 5px;
      -webkit-border-top-right-radius: 5px;
      -moz-border-top-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    .loginInputPassword{
      height: 2.5rem;
      -webkit-border-bottom-left-radius: 5px;
      -moz-border-bottom-left-radius: 5px;
      border-bottom-left-radius: 5px;
      -webkit-border-bottom-right-radius: 5px;
      -moz-border-bottom-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .register{
      display: block;
      position: relative;
      top: -20px;
    }
    .login-btn{
      display: block;
      margin-top: 1rem;
      height: 2.7rem;
      line-height: 2.7rem;
      width: 100%;
      background-color: #1ab394;
      border-color: #1ab394;
      color: #FFF;
      border-radius: 3px;
      font-size: 18px;
    }
  }
  .login-font{
    font-size: 12px;
    font-family: "wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;
    width: 100%;
    color: white;
    text-align: center;
    padding: 20px 0;
    padding-top: 5rem;
  }
}
</style>

<template>
  <div class="contant">
    <img src="../../../static/shouye.jpg" class="bgimg" alt="">
    <div class="loginBox">
      <div class="inputLogin">
        <input class="loginInputUser" v-model="ADABFFBDD"  placeholder="用户名" />
      </div>
      <div class="inputLogin">
        <input class="loginInputPassword" v-model="AABEFAAEBB" placeholder="密码" @keyup.enter="login" type="password"/>
      </div>
      <a class="login-btn" type="primary" style="background-color: #2B3949" @click="login()">登录</a>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'login',
  data () {
    return {
      ADABFFBDD: '',
      AABEFAAEBB: ''
    }
  },
  mounted () {
  },
  methods: {
    login () {
      let Base64 = require('js-base64').Base64
      let data = {
        ADABFFBDD: Base64.encode(this.ADABFFBDD),
        AABEFAAEBB: Base64.encode(this.AABEFAAEBB)
      }
      data = qs.stringify(data)
      this.$post('/emrqs/admin/login', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.clearconsole()
        if (retVal[0].id === '密码错误') {
          this.$Message.warning(retVal[0].id)
        } else {
          this.$router.push('/cese')
          console.log('success')
        }
      }).catch(retVal => {
        this.$router.push('/')
      })
    },
    clearconsole () {
      console.log(window.console)
      if (window.console) {
        console.clear()
      }
    }
  }
}
</script>
