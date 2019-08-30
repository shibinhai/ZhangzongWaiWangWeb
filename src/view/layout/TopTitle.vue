<style type="text/scss" lang="scss" scoped>
.topMenu{
  min-width: 1024px;
  .leftTitle{
    .refresh{
      font-size: 14px;
      z-index: 11;
      position: absolute;
      right: 250px;
      top: 14px;
      border: none;
    }
    .refresh1{
      font-size: 14px;
      z-index: 11;
      position: absolute;
      right: 120px;
      top: 14px;
      border: none;
    }
    .exit{
      font-size: 14px;
      z-index: 11;
      position: absolute;
      right: 20px;
      top: 14px;
      border: none;
      background-color: #515a6e;
      color: #ffffff;
    }
    .exit:hover{
      background-color: #17233d!important;
    }
  }
  .left-menu{
    background-color: transparent;
  }
  .layout{
    position: relative;
    top: -27px;
    width: 430px;
    margin: 0 auto;
  }
  .top-img{
    text-align: center;
    width: 100%;
    min-width: 1024px;
  }
  .logo-text{
    line-height: 60px;
    font-size: 17px;
    margin-left: 50px;

  }
}
.title{
  font-size: 17px;
  line-height: 25px;
  margin: 10px 0;
}
.text{
  font-size: 15px;
}
</style>
<style>
  .ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu{
    padding: 0 15px;
  }
</style>
<template>
  <div class="topMenu">
    <div class="layout clearfix">
    </div>
    <div style="width: 100%;height: 1px;background-color: #DCDEE2;position: relative;top:-28px"></div>
    <div class="leftTitle fr">
      <Button class="exit" @click="exit">退出登录</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-title',
  data () {
    return {
      isCollapsed: false,
      menu: {
        menuUrl: ''
      },
      list: {
        menuUrl: ''
      }
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted () {
    this.menuInit()
  },
  methods: {
    refresh () {
      this.$router.go(0)
    },
    menuInit () {
      this.axios.post('/emrqs/role/menu').then(retVal => {
        this.menu = retVal.data
        this.menu.menuUrl = retVal.data.menuUrl
        this.list = retVal.data
        this.list.menuUrl = retVal.data.menuUrl
        alert(this.list.menuUrl)
      }).catch(retVal => {
        this.$router.push('/')
        this.$Message.error('请登录！')
      })
    },
    exit () {
      this.axios.post('/emrqs/admin/quit').then(retVal => {
        console.log(retVal)
        this.$router.push('/')
      })
    },
    ok () {
    },
    cancel () {
    }
  }
}
</script>
