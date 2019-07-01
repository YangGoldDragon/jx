<template>
  <div>
    <h6 class="signIn">登录</h6>
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler"
    ></cube-form>
    <div class="signUp">
      <router-link class="noSignUp" to="/signup" tag="a"
        >还未注册？</router-link
      >
    </div>
    <cube-popup type="passwordMistake" :mask="false" ref="passwordMistake">
      密码错误！
    </cube-popup>
    <cube-popup type="usernameMistake" :mask="false" ref="usernameMistake">
      用户名不存在！
    </cube-popup>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名",
              type: "username"
            },
            rules: {
              required: true,
              type: "string",
              min: 3,
              max: 15
            },
            trigger: "blur",
            messages: {
              required: "用户名不能为空!",
              min: "用户名不能少于3个字符！",
              max: "用户名不能大于15个字符！"
            }
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: {
                open: false
              }
            },
            rules: {
              required: true,
              type: "string",
              min: 3,
              max: 15
            },
            trigger: "blur",
            messages: {
              required: "密码不能为空",
              min: "密码不能少于3个字符",
              max: "密码不能大于15个字符"
            }
          },
          {
            type: "submit",
            label: "登陆"
          }
        ]
      }
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();
      try {
        let result = await this.axios({
          method: "get",
          url:
            "https://www.easy-mock.com/mock/5cdda667431f897675a3d7bf/jx/signin",
          params: this.model
        });
        if (result.data.data.signIn.code === 2) {
          let token = result.data.data.signIn.token;
          this.$store.dispatch({
            type: "setTokenAction",
            token: token
          });
          this.$router.push("/my");

          //判断路由是否带参数，如果带参，跳到带参的路由
          /*          if (this.$route.query.redirect) {
            this.$router.replace(`${this.$route.query.redirect}`);
          } else {
            this.$router.replace("/");
          }*/
        } else if (result.data.data.signIn.code === 1) {
          this.showPop("passwordMistake");
        } else if (result.data.data.signIn.code === 0) {
          this.showPop("usernameMistake");
        }
      } catch (err) {
        alert(err);
      }
    },
    showPop(refId) {
      const component = this.$refs[refId];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 1000);
    }
  }
};
</script>

<style lang="stylus" scoped>
>>> .cube-btn
  background orange
>>> .cube-popup-content
  padding 20px
  color #fff
  font-size 24px
  background-color rgba(0,0,0,.8)
.signIn
  font-size 20px
  display flex
  justify-content center
  align-items center
  color orange
  background #f8f8f8
  padding 10px
.cube-form
  margin-top 15px
.signUp
  display flex
  width 100%
  margin-top 10px
  .noSignUp
    margin-left 15px
    font-size 12px
    text-decoration underline
</style>
