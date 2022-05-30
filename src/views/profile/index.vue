<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col
          :span="24"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                label="Информация об аккаунте"
                name="Информация об аккаунте"
              >
                <account class="prifil-setting" />
              </el-tab-pane>
              <el-tab-pane
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
<script>
import { mapGetters } from "vuex";
import ProfileSetting from "./components/profilSetting";
import Account from "./components/Account";
export default {
  name: "Profile",
  components: { ProfileSetting, Account },
  data() {
    return {
      activeTab: "Информация об аккаунте",
      userId: "",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    // this.getUser()
  },
  methods: {},
};
</script>
