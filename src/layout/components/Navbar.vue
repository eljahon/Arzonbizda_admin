<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <error-log class="errLog-container right-menu-item hover-effect" />

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!--        <el-tooltip content="Global Size" effect="dark" placement="bottom">-->
        <!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--        </el-tooltip>-->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper" @click="showdwonFunction">
          <img :src="avatar" class="user-avatar" alt="this is images">
          <span class="user-name">{{ userData.last_name }}{{ ' '+userData.first_name }}</span>
          <i :class="cravings" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a> -->
          <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Breadcrumb from '@/components/Breadcrumb'
import { getUserName } from '@/utils/auth'
import avatar from '../../assets/users.jpg'

export default {
  components: {
    Hamburger,
    ErrorLog,
    Breadcrumb
  },
  data() {
    return {
      avatar,
      showdwon: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    userData() {
      return JSON.parse(getUserName())
    },
    cravings: function() {
      return this.showdwon ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  mounted() {
    console.log(this.userName)
  },
  methods: {
    showdwonFunction() {
      this.showdwon = !this.showdwon
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      vertical-align: text-bottom;
      color: #242625;
      //&.hover-effect {
      //  cursor: pointer;
      //  transition: background .3s;
      //
      //  &:hover {
      //    background: rgba(0, 0, 0, .025)
      //  }
      //}
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 8px;
        }
.user-name {
  cursor: pointer;
}
        .el-icon-arrow-down {
          cursor: pointer;
          position: absolute;
          right: -20px;
        }
        .el-icon-arrow-up {
          cursor: pointer;
          position: absolute;
          right: -20px;
        }
      }
    }
  }
}
</style>
