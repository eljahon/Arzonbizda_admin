
<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <!--                <el-col :span="6" :xs="24">-->
        <!--                  <user-card :user="user" />-->
        <!--                </el-col>-->

        <el-col :span="24" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Информация об аккаунте" name="Информация об аккаунте">
                <account class="prifil-setting" />

              </el-tab-pane>
              <el-tab-pane label="Информация о безопасности" name="Информация о безопасности">
                <ProfileSetting class="prifil-setting" />

              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ProfileSetting from './components/profilSetting'
import Account from './components/Account'
export default {
  name: 'Profile',
  components: { ProfileSetting, Account },
  data() {
    return {
      activeTab: 'Информация об аккаунте'
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles'])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    }
  }
}
</script>
<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <!--                <el-col :span="6" :xs="24">-->
        <!--                  <user-card :user="user" />-->
        <!--                </el-col>-->

        <el-col :span="24" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                class="tab__section__style"
                label="Информация об аккаунте"
                name="Информация об аккаунте"
              >
                <account class="prifil-setting" :user="user" />
              </el-tab-pane>
              <el-tab-pane
                class="tab__section__style"
                label="Информация о безопасности"
                name="Информация о безопасности"
              >
                <ProfileSetting class="prifil-setting" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped lang="scss">
.prifil-setting {
  margin-top: 60px;
  margin-left: 60px;
}
.tab__section__style {
  font-family: "Yandex Sans Display";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #242625;
}
@media (max-width: 624px) {
  .prifil-setting {
    margin-top: 20px;
    margin-left: 0;
  }
}
</style>
