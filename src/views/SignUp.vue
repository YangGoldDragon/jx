<template>
  <div class="container">
    <h6 class="signUp">注册</h6>
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler"
    ></cube-form>
    <div class="signIn">
      <router-link class="toSignIn" to="/signin" tag="a"
        >已有账号？</router-link
      >
    </div>
    <cube-popup type="my-popup" ref="myPopup" :mask="false">
      密码输入不相同，请重新输入！
    </cube-popup>
    <cube-popup type="my-popup" ref="usernameExit" :mask="false">
      用户名已存在，请重新注册！
    </cube-popup>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "SignUp",
  data() {
    return {
      model: {
        username: "",
        password: "",
        confirmPassword: ""
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
            type: "input",
            modelKey: "confirmPassword",
            label: "确认密码",
            props: {
              placeholder: "请确认密码",
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
            label: "注册"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      if (this.model.password !== this.model.confirmPassword) {
        this.showPopup("myPopup");
        return;
      }
      const data = {
        username: this.model.username,
        password: this.model.password
      };
      this.axios({
        method: "post",
        url:
          "https://www.easy-mock.com/mock/5cdda667431f897675a3d7bf/jx/signup",
        data: qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.data.signUp.code === 1) {
            this.showPopup("usernameExit");
          } else if (res.data.data.signUp.code === 0) {
            let token = res.data.data.signUp.token;
            this.$store.dispatch({
              type: "setTokenAction",
              token: token
            });
            this.$router.push("/my");

            //判断路由是否带参数，如果带参，跳到带参的路由
            /*            if (this.$route.query.redirect) {
              this.$router.replace(`${this.$route.query.redirect}`);
            } else {
              this.$router.replace("/");
            }*/
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showPopup(refId) {
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
>>> .cube-popup-content
  padding 20px
  color #fff
  font-size 24px
  background-color rgba(0,0,0,.8)
>>> .cube-btn
  background orange
.container >>> .cube-my-popup
  text-align center

.signUp
  font-size 20px
  display flex
  justify-content center
  align-items center
  color orange
  background #f8f8f8
  padding 10px
.signIn
  display flex
  width 100%
  margin-top 10px
  .toSignIn
    margin-left 15px
    font-size 12px
    text-decoration underline
</style>
