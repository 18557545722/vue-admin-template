<template>
  <div class="sign-up-page">
    <el-form class="sign-up-form" ref="signForm" :model="signForm" :rules="signRules" label-width="120px" status-icon size="small">
      <el-form-item label="花名" prop="nickName">
        <el-input v-model="signForm.nickName" placeholder="请输入花名"/>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="signForm.phone" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="signForm.password" show-password placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="signForm.checkPass" show-password placeholder="请再次输入密码"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="signForm.remark" type="textarea" placeholder="请输入备注"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    var validateNickName = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入花名'))
            this.hasError = true
        } else {
            callback()
        }
    }
    var validatePhone = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入手机号'))
            this.hasError = true
        } else {
            const reg_tel = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/; //手机号正则
            if (!(reg_tel.test(this.signForm.phone))) {
                callback(new Error('请输入正确的手机号'))
                this.hasError = true
            }
            callback()
        }
    }
    var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'))
            this.hasError = true
        } else {
            if (this.signForm.checkPass !== '') {
                this.$refs.signForm.validateField('checkPass')
            }
            callback()
        }
    }
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'))
            this.hasError = true
        } else if (value !== this.signForm.password) {
            callback(new Error('两次输入密码不一致!'))
            this.hasError = true
        } else {
            callback()
        }
    }
    return {
        hasError: true, //页面是否存在错误信息
        signForm: {
            nickName: '',
            phone: '',
            password: '',
            remark: ''
        },
        signRules: {
            nickName: [
                { required: true, validator: validateNickName, trigger: 'blur' }
            ],
            phone: [
                { required: true, validator: validatePhone, trigger: 'blur' }
            ],
            password: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { required: true, validator: validatePass2, trigger: 'blur' }
            ]
        }
    }
  },
  methods: {
    onSubmit() {
        if (this.hasError) {
            this.$message({
                message: '请将信息填写规范!',
                type: 'warning'
            })
        } else {
            this.$message('submit!')
        }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>
<style scoped>
.sign-up-form >>> .el-form-item__content{
    width: 200px;
}
</style>

