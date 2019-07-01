# jx

## Vue移动端电商类项目

### 技术栈
es6 stylus vue vue-router vuex vue-cli3 axios cube-ui easy-mock

#### 项目开发中遇到的重点难点
1.购物车数据的实时增删改查。

2.购物车小球动画，小球位置随机需要实时改变，tranform translate的设置使用贝塞尔曲线函数

3.使用keep-alive保存分类页面的滚动条位置，使用keep-alive会将组件缓存至内存中，那么页面数据就会产生混乱，需要在activated和deactivated生命周期中进行操作。

4.使用axios拦截http请求，加入token进行身份验证

5.使用vue-router进行全局路由拦截，在规定的页面需要token令牌才能访问

6.路由使用history模式有坑，需要后端设置，不然打包项目，页面空白。同时baseUrl设置为相对路径"./"。

7.页面刷新，vuex数据丢失，使用插件vuePersistedState保存页面状态到localstorage或者sessionstorage。

8.所有访问接口都使用easy-mock模拟后端数据接口，并通过easy-mock提供的函数功能完成登录和注册页面的逻辑。
