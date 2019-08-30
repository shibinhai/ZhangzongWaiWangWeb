<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.contant {
  width: 100vw;
  height: 100vh;
}
.imgshow {
  overflow-x: hidden;
  overflow-y: auto;
}
.bgimg {
  width: 100vw;
  height: 100vh;
  position: absolute;
  margin: 0 auto;
  top: 0;
  left: 0;
  z-index: -1;
}
.upload {
  padding-top: 20px;
}
.uoloadhover:hover {
  text-align: left !important;
  background-color: #17233d !important;
}
.text {
  width: 530px;
  color: #ffffff;
  padding-top: 33vh;
  margin: 0 auto;
  h2 {
    line-height: 2.5;
    font-size: 20px;
  }
  p {
    line-height: 1.5;
    font-size: 14px;
  }
}
.uoloadButton {
  position: absolute;
  top: 30vh;
  left: 25vw;
}
.modal {
  padding-left: 30px;
  span {
    width: 60px;
    display: block;
    float: left;
    line-height: 30px;
  }
  .userinfo {
    width: 120px;
    float: left;
  }
}
</style>

<template>
  <div class="contant">
    <img src="./uploadbg3.jpg" class="bgimg" alt />
    <div class="uoloadButton">
      <!--      <Upload-->
      <!--        class="upload"-->
      <!--        multiple-->
      <!--        action="http://47.93.226.71:9502/emrqs/data/up"-->
      <!--        :on-success="handleSuccess">-->
      <!--        <Button class="uoloadhover"  style="font-size:20px;text-align: left; width:190px;height:60px;background-color: #515a6e;color: #ffffff;border: none" icon="ios-cloud-upload-outline">合成模板</Button>-->
      <!--      </Upload>-->

      <Upload
        class="upload"
        multiple
        action="http://47.93.226.71:9502/emrqs/data/up"
        :on-success="handleSuccess1"
      >
        <Button
          class="uoloadhover"
          style="font-size:20px;text-align: left; width:190px;height:60px;background-color: #515a6e;color: #ffffff;border: none"
          icon="ios-cloud-upload-outline"
        >病案首页检测</Button>
      </Upload>
      <Button
        class="uoloadhover"
        @click="download"
        style="font-size:20px;margin-top: 20px;text-align: left;width:190px;height:60px;background-color: #515a6e;color: #ffffff;border: none"
        icon="ios-download"
      >下 载</Button>
      <Button
        class="uoloadhover"
        @click="getid"
        style="font-size:20px;margin-top: 20px;text-align: left;width:190px;height:60px;background-color: #515a6e;color: #ffffff;border: none"
        icon="ios-build"
      >修改密码</Button>
    </div>
    <Modal v-model="modal1" title="个人信息" width="400">
      <div class="modal">
        <div class="clearfix">
          <span>用户名：</span>
          <span>{{userInfo.name}}</span>
        </div>
        <br />
        <div class="clearfix">
          <span>密&nbsp;&nbsp;&nbsp;码：</span>
          <Input type="password" v-model="AABEFAAEBB" class="userinfo" />
        </div>
        <br />
        <div class="clearfix">
          <span>确认密码：</span>
          <Input type="password" v-model="AABEFAAEBB1" class="userinfo" />
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button @click="ok" type="primary">确认</Button>
      </div>
    </Modal>
    <iframe id="mainContent" width="100%" height="100%" style="position: absolute;bottom: 100vh"></iframe>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "casemanager",
  data() {
    return {
      modal1: false,
      userInfo: {},
      AABEFAAEBB: "",
      AABEFAAEBB1: ""
    };
  },
  mounted() {
    this.clearconsole();
  },
  methods: {
    clearconsole() {
      console.log(window.console);
      if (window.console) {
        console.clear();
      }
    },
    handleSuccess(response, file) {
      console.log(file.name);
      let data = "?path=" + file.name;
      var mainContent = document.getElementById("mainContent");
      mainContent.src = "http://47.93.226.71:9502/emrqs/tran/tran" + data;
    },
    handleSuccess1(response, file) {
      console.log(file.name);
      let data = "?paths=" + file.name;
      var mainContent = document.getElementById("mainContent");
      mainContent.src = "http://47.93.226.71:9502/emrqs/data/dows" + data;
    },
    getid() {
      console.log("success");
      this.axios
        .post("/emrqs/admin/hqid")
        .then(retVal => {
          this.userInfo = retVal.data;
          this.modal1 = true;
          this.AABEFAAEBB = "";
          this.AABEFAAEBB1 = "";
        })
        .catch(retVal => {
          console.log(retVal);
        });
    },
    download() {
      // this.$Spin.show({
      //   render: h => {
      //     return h("div", [
      //       h("Icon", {
      //         class: "demo-spin-icon-load",
      //         props: {
      //           type: "ios-loading",
      //           size: 30
      //         }
      //       }),
      //       h("div", "正在下载...")
      //     ]);
      //   }
      // });
      // setTimeout(() => {
      //   this.$Spin.hide();
      // }, 3000);
    },
    ok() {
      if (this.AABEFAAEBB === this.AABEFAAEBB1 && this.AABEFAAEBB !== "") {
        let passWordStatic = this.AABEFAAEBB.match(
          /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/
        );
        console.log(passWordStatic);
        if (passWordStatic === null) {
          this.$Message.info("密码必须包含字母和数字并长度大于6！");
        } else {
          let Base64 = require("js-base64").Base64;
          let data = {
            uuid: this.userInfo.id,
            AABEFAAEBB: Base64.encode(this.AABEFAAEBB)
          };
          data = qs.stringify(data);
          this.axios.post("/emrqs/admin/resetpwd", data).then(retVal => {
            console.log(retVal);
          });
          this.modal1 = false;
          this.axios.post("/emrqs/admin/quit").then(retVal => {
            console.log(retVal);
            this.$router.push("/");
          });
          this.$Message.success("修改成功！请重新登录！");
        }
      } else {
        this.$Message.error("两次输入的密码不一致！");
        this.modal1 = true;
      }
    },
    cancel() {
      this.modal1 = false;
    }
  }
};
</script>
