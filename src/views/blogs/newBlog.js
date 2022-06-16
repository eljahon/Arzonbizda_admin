import { blogCreate, adminDataUpadate } from "@/api/admin";
import { Default } from "@/validators/validators";
import {mapGetters} from "vuex";

export default {
  data() {
    const defaults = Default;
    return {
      blogForm: {
        title: "",
        description: "",
        avatar: "",
      },
      fullscreenLoading: false,
      avatar:'',
      roles: {
        title: [{ required: true, trigger: "change", validator: defaults }],
        description: [
          { required: true, trigger: "change", validator: defaults },
        ],
        avatar: [{ required: true, trigger: "change", validator: defaults }],
      },
    };
  },
  methods: {
    blogCreate,
    adminDataUpadate,
    handlePictureCardPreview(event) {
      this.blogForm.avatar = event.raw;
      this.avatar = '';
      this.$refs.imageUpload.$el.children[1].style.displya = 'none'
    },
    submitForm: function() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.fullscreenLoading = true
        if (this.$route.query.item) {
          this.adminDataUpadate(this.blogForm, this.$route.query.item)
            .then(() => {
              this.$notify({
                title: 'Успех',
                message: "Добавить нового администратора",
                type: 'success',
                // type: 'error',
                duration: 2000
              })
              this.$emit('handleAddRole')
              this.$emit('getBlogAllList')
            }).finally(() => {
            this.fullscreenLoading = false;
            this.dialogVisible = false;
            this.$emit('modalClose', false)
          })
        } else  {
          this.blogCreate(this.blogForm)
            .then(() => {
              this.$message({
                message: "Добавить нового администратора",
                type: 'success'
              })
              this.$emit('handleAddRole')
              this.$emit('getBlogAllList')
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: "Ошибка добавления нового администратора",
                // type: 'success',
                type: 'error'
              })
            })
            .finally(() => {
              this.fullscreenLoading = false;
              this.dialogVisible = false;
              this.$emit('modalClose', false)
            })
        }
        }
    });
},
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    handleRemove() {
      this.$refs.imageUpload.$el.children[1].style.displya = ''
    },
  },
  computed: {
    ...mapGetters(['itemBlog']),
    updateItemData: function () {
      return this.itemBlog
    }
  },
  watch: {
    updateItemData: function (val) {
      console.log(val);
      this.avatar = val.avatar
      this.blogForm = val
    },
  }
}
