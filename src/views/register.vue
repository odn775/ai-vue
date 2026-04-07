 <template> 
    <div class="container">
      <div class="title">
        <div class="title-text">
          <h2>创建您的用户</h2>
          <p>请填写个人信息以创建您的用户</p>
        </div>
      </div>
      <div class="form-container">
        <el-form label-position="top" :model="formData" :rules="rules" ref="submitFormRef">
            <el-form-item label="用户名" prop="username">
               <el-input v-model="formData.username" placeholder="请输入用户名"size="large"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
               <el-input v-model="formData.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
               <el-input v-model="formData.nickname" placeholder="请输入昵称（可选）" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
               <el-input v-model="formData.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
               <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
               <el-input v-model="formData.confirmPassword" type="password" placeholder="请确认密码" show-password />
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="submitForm(submitFormRef)" class="btn" size="large">注册</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
 </template>
 <script setup>
import { ref,reactive } from 'vue'
import { register } from '../api/frontend'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const formData = reactive({
    "username": "",
    "email": "",
    "nickname": "",
    "phone": "",
    "password": "",
    "confirmPassword": "",
    "gender": 0,
    "userType": 1
})

const rules = reactive({
   username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' }
  ],
})
const router = useRouter()
const submitFormRef = ref(null)
const submitForm = async (formEl) => {
    if(!formEl) {
        return
    }
    formEl.validate(async (valid,fields) => {
      register(formData).then(({data}) => {
         if(!data){
            ElMessage.success('注册成功')
            router.push('/auth/login')
         }else if(data.code ==='BUSINESS_ERROR'){
            ELMessage.error(data.message)
         }
          
      })
})
    
}

</script>
 <style lang="scss" scoped> 
 .container {
    width: 384px;
    .flex-box {
        display: flex;
        align-items: center;
    }
    .title {
        .title-text {
            text-align: center;
            h2 {
                font-size: 36px;
                margin-bottom: 10px;
            }
            p {
                font-size: 18px;
                color: #6b7280;
            }
        }
    }
    .form-container {
        margin-top: 30px;
        .btn {
            margin-top: 40px;
            width: 100%;
        }
        .footer {
            padding: 30px;
            text-align: center;
        }
    }
}
</style>