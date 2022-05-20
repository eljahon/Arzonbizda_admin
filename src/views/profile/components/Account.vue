
<template>
  <el-form>
    <el-row>
      <el-col><Upload /></el-col>
      <el-col :lg="10">
        <el-row>
          <el-col :lg="24">
            <el-form-item label="Имя">
              <el-input v-model.trim="user.first_name" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item label="Фамилия">
              <el-input v-model.trim="user.last_name" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item label="Адрес электронной почты">
              <el-input v-model.trim="user.email" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-row>
              <el-form-item>
                <div class="buttuns-warapper">
                  <el-col :span="16">
                    <el-button icon="el-icon-document" type="primary" @click="submit">Сохранить изменения</el-button>
                  </el-col>
                  <el-col :lg="8">
                    <el-button style="float: right" icon="el-icon-circle-close" type="danger">Отмена</el-button>
                  </el-col>
                </div>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import Upload from '../../components-demo/avatar-upload'
import { userPersolnData } from '@/api/userInfo'
export default {
  components: {
    Upload
  },
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: ''
      }
    }
  },
  mounted() {
    this.userPersolnData()
      .then(res => {
        this.user = res.admin
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  },
  methods: {
    userPersolnData,
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

