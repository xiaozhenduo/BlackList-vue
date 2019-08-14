<template>
  <div class="app-container">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人信息" name="first">
        <div class="user" style="width: 1200px;">
          <el-form ref="form" :model="user" label-width="80px">




            <el-row :gutter="20">
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">
    
    
     <el-form-item label="登录名">
              <el-input v-model="user.username" />
            </el-form-item>

            <el-form-item label="用户名">
              <el-input v-model="user.name" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="user.note" />
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="user.createTime" />
            </el-form-item>
            <el-form-item label="用户邮箱">
              <el-input v-model="user.email" :disabled="true" />
            </el-form-item>
            <el-form-item label="所属部门">
              <el-input v-model="user.deptId" :disabled="true" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary">提交</el-button>
              
            </el-form-item>
    
    </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>

           
          </el-form>
        </div>

      </el-tab-pane>

      <el-tab-pane label="修改密码" name="second">

        <div style="width: 400px">
          <el-form
            ref="passForm"
            :model="passForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="原密码" prop="oldPass">
              <el-input v-model="passForm.oldPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="newPass">
              <el-input v-model="passForm.newPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="passForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updatePass('passForm')">修改</el-button>
              <el-button @click="resetForm('passForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserInfo, updatePass } from '@/api/user'
export default {
  name: 'Index',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        birth: '',
        city: '',
        createTime: '',
        district: '',
        liveAddress:'',
        picId: '',
        sex: '',
        username: '',
        phone: 0,
        email: '',
        deptName: '',
        jobName: '',
        createTime: ''
      },
      activeName: 'first',
      passForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      mailForm: {
        email: '',
        code: '',
        pass: ''
      },
      buttonName: '发送验证码',
      isDisabled: false,
      codeLoading: false,
      time: 60
    }
  },

  created() {
    this.findUserInfo()
  },

  methods: {
    // parseTime,
    // formatEmail(mail) {
    //   return regEmail(mail)
    // },

    // 加载用户个人信息
    findUserInfo: function() {
      getUserInfo().then((res) => {
        debugger
        this.user = res.data.data
        console.log(this.user)
      })
    },

    // 修改密码
    updatePass: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          params.append('oldPass', this.passForm.oldPass)
          params.append('newPass', this.passForm.newPass)
          params.append('checkPass', this.passForm.checkPass)
          updatePass(params).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.activeName = 'second'
              this.$refs['passForm'].resetFields()
              this.$confirm('修改密码成功，请重新登录?', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
   
    // handleSuccess(response, file, fileList) {
    //   this.$notify({
    //     title: '头像修改成功',
    //     type: 'success',
    //     duration: 2500
    //   })
    //   store.dispatch('GetInfo').then(() => {
    //   })
    // },
    // 监听上传失败
    // handleError(e, file, fileList) {
    //   const msg = JSON.parse(e.message)
    //   this.$notify({
    //     title: msg.message,
    //     type: 'error',
    //     duration: 2500
    //   })
    // },
    refresh() {
      this.ico = 'el-icon-loading'
      this.$refs.log.init()
      setTimeout(() => {
        this.ico = 'el-icon-refresh'
      }, 300)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },

    // handleAvatarSuccess(res, file) {
    //   // this.imageUrl = URL.createObjectURL(file.raw)
    //   const data = new FormData()
    //   data.append('token', '')
    //   data.append('file', file[0])
    //   axiosInstance({
    //     method: 'POST',
    //     url: 'http://up.qiniu.com',
    //     data: data
    //   })
    //     .then(function(res) {
    //       // console.log('res',res)
    //       const { base_url, path } = res.data
    //       // 页面所用字段
    //       self.previewAvatar = `${base_url}${path}?imageView2/1/w/154/h/154`
    //       // 传给后台不完整
    //       self.formData.avatar = `${path}`
    //     })
    //     .catch(function(err) {
    //       console.log('err', err)
    //     })
    // },
   
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

.grid-content {
    border-radius: 20px;
    min-height: 36px;
  }

</style>
