<script>
import img from "@/assets/baseIcon.png";
import title from "@/assets/arzonbizda.svg";
export default {
  name: "Login",
  data: function () {
    const validateEmail = (rule, value, callback) => {
      if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        callback();
      } else {
        callback(new Error("электронная почта"));
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length) {
        callback();
      } else {
        callback(new Error("Пароль не может быть меньше"));
      }
    };
    return {
      title: "arzoni bizda",
      logo: img,
      titleImg: title,
      showLogo: true,
      isCollapse: true,
      loginForm: {
        email: "",
        password: "",
      },
      loginRules: {
        email: [{ required: true, trigger: "change", validator: validateEmail }],
        password: [
          { required: true, trigger: "change", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.email === "") {
      this.$refs.email.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // console.log(this.loginForm)
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    refReshInpurtValue() {
      this.$refs.loginForm.resetFields();
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>
<template>
  <div class="login-container">
    <!--    <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>-->
    <div
      id="container"
      class="container"
    >
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <!-- <h1>Hello, Friend!</h1> -->
            <div
              class="sidebar-logo-container"
              :class="{ collapse: true }"
            >
              <transition name="sidebarLogoFade">
                <router-link
                  key="expand"
                  class="sidebar-logo-link"
                  to="/login"
                >
                  <img
                    :src="logo"
                    class="sidebar-logo"
                  >
                  <h1 class="sidebar-title">
                    <span
                      class="sidebar-title-text"
                    ><img
                      :src="titleImg"
                      alt=""
                    ></span>
                  </h1>
                </router-link>
              </transition>
            </div>
            <!--            <p>Enter your personal details and start journey with us</p>-->
          </div>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <router-link
          key="expand"
          class="sidebar-logo-link inputbar__logo"
          to="/login"
        >
          <img
            :src="logo"
            class="sidebar-logo"
          >
          <h1 class="sidebar-title">
            <span
              class="sidebar-title-text"
            ><img
              :src="titleImg"
              alt=""
            ></span>
          </h1>
        </router-link>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <h1 class="admin__word">
            Admin
          </h1>
          <div class="social-container">
            <a class="social"><i class="fab fa-facebook-f" /></a>
            <a class="social"><i class="fab fa-google-plus-g" /></a>
            <a class="social"><i class="fab fa-linkedin-in" /></a>
          </div>
          <span style="margin-bottom: 15px">or use your account</span>
          <el-form-item
            prop="email"
            style="width: 100%"
          >
            <el-input
              ref="email"
              v-model="loginForm.email"
              placeholder="email"
              name="email"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            style="width: 100%"
          >
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              autocomplete="on"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <a href="#">Forgot your password?</a>
          <div class="button-warapper">
            <el-button
              :loading="loading"
              class="sigin-in"
              @keyup.enter.native="handleLogin"
              @click="handleLogin"
            >
              Login
            </el-button>
            <el-button
              class="sigin-up"
              @click="refReshInpurtValue"
            >
              Sign In
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}
.sidebar-logo-link {
  display: flex;
  gap: 10px;
}
.button-warapper {
  display: flex;
  gap: 5px;
  .sigin-in {
    border-radius: 20px;
    border: 1px solid;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    background-color: blue;
  }
}
body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  // margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.sigin-up {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 27px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  right: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
.inputbar__logo {
  display: none;
}
//$bg:#2d3a4b;
//$dark_gray:#889aa4;
//$light_gray:#eee;
//
//.login-container {
//  min-height: 100%;
//  width: 100%;
//  background-color: $bg;
//  overflow: hidden;
//
//  .login-form {
//    position: relative;
//    width: 520px;
//    max-width: 100%;
//    padding: 160px 35px 0;
//    margin: 0 auto;
//    overflow: hidden;
//  }
//
//  .tips {
//    font-size: 14px;
//    color: #fff;
//    margin-bottom: 10px;
//
//    span {
//      &:first-of-type {
//        margin-right: 16px;
//      }
//    }
//  }
//
//  .svg-container {
//    padding: 6px 5px 6px 15px;
//    color: $dark_gray;
//    vertical-align: middle;
//    width: 30px;
//    display: inline-block;
//  }
//
//  .title-container {
//    position: relative;
//
//    .title {
//      font-size: 26px;
//      color: $light_gray;
//      margin: 0 auto 40px auto;
//      text-align: center;
//      font-weight: bold;
//    }
//  }
//
//  .show-pwd {
//    position: absolute;
//    right: 10px;
//    top: 7px;
//    font-size: 16px;
//    color: $dark_gray;
//    cursor: pointer;
//    user-select: none;
//  }
//
//  .thirdparty-button {
//    position: absolute;
//    right: 0;
//    bottom: 6px;
//  }
//
@media (max-width: 800px) {
  .admin__word {
    margin-top: -140px;
  }
  .inputbar__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .container {
    width: 500px;
  }
  .overlay-container {
    display: none;
  }
  .form-container {
    width: 100%;
  }
}
@media (max-width: 580px) {
  .container {
    width: 400px;
  }
}
@media (max-width: 452px) {
  .container {
    width: 300px;
  }
  .sigin-in {
    border-radius: 20px;
    border: 1px solid;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 8px 30px !important;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    background-color: green;
  }
  .sigin-up {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 10px 30px !important;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }
}
@media (max-width: 332px) {
  .container {
    width: 280px;
  }
  .sigin-in {
    border-radius: 14px;
    padding: 10px 28px !important;
  }
  .sigin-up {
    border-radius: 14px;
    padding: 10px 28px !important;
  }
}
</style>
