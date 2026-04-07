<template>
    <el-dialog
        :title=" isEdit? '编辑文章' : '新增文章' "
        v-model="dialogVisible"
        width="50%"
        @close="handleClose"
    >
        <el-form ref="formRef" :rules="rules" :model="formData" label-width="120px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择所属分类">
                    <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input type="textarea" v-model="formData.summary"  placeholder="请输入文章摘要(可选)" maxlength="1000" show-word-limit :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
                <el-select v-model="formData.tagArray" placeholder="请输入文章标签(多个标签用逗号隔开)" multiple filterable allow-create width="100%">
                    <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面图片">
                <div class="cover-upload">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :before-upload="beforerUpload"
                        :http-request="handleUploadRequest"
                        accept="image/*"
                        :show-file-list="false"
                        >
                        <div class="cover-placeholder" v-if="!imgUrl">
                            <p>点击上传封面</p>
                        </div>
                        <img v-else :src="imgUrl" alt="封面图片" class="cover-image">
                    </el-upload>
                    <div v-if="imgUrl" class="cover-remove">
                        <el-button type="danger" size="mini" @click="handleRemove">移除封面</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <RichTextEditor 
                    v-model:modelValue="formData.content"
                    placeholder="请输入文章内容，支持富文本格式"
                    maxCharCount="5000"
                    @change="handleContentChange"
                    @created="handleEditorCreated"
                    minHeight="400px"
                    />
            </el-form-item>
        </el-form>
        <div v-if="btnPreview">
            <h3>内容预览</h3>
            <div v-html="formData.content"></div>
        </div>
        <template #footer>
            <el-button  @click="btnPreview = !btnPreview">{{btnPreview ? '关闭预览' : '预览效果'}}</el-button>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">{{isEdit? '更新文章' : '创建文章'}}</el-button>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, reactive,computed,nextTick,watch } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '../api/admin'
import { fileBaseUrl } from '../config/index.js'
import RichTextEditor from '../components/RichTextEditor.vue'
import { createArticle,updateArticle } from '../api/admin'


const handleClose = () => {
    formRef.value.resetFields()
    businessId.value = null
    formData.tagArray = []
    handleRemove()
    emit('update:modelValue', false)
}
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array,
        default: () => []
    },
    article: {
        type: Object,
        default: null
    }
})
const emit = defineEmits(['update:modelValue','success'])
const dialogVisible= computed({
    get() {
        return props.modelValue
    },
    set(val){
        emit('update:modelValue', val)
    }
})
const isEdit = computed(() => !! props.article?.id )

//监听编辑数据
watch(() => props.article, (newVal) =>{
    if(newVal){
        nextTick(() =>{
        Object.assign(formData, newVal)
        businessId.value = newVal.id
        imgUrl.value = fileBaseUrl + newVal.coverImage
        })
    }
})

// 表单数据
const formData = reactive({
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": 1,
    "summary": "",
    "tags": "",
    "id": ""
})
const commonTags = [
  '情绪管理', '焦虑', '抑郁', '压力', '睡眠', 
  '冥想', '正念', '放松', '心理健康', '自我成长',
  '人际关系', '工作压力', '学习方法', '生活技巧'
]
const rules = reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择所属分类', trigger: 'change' }
    ],
    content: [
        { required: true, message: '请输入文章内容', trigger: 'blur' },
        { min: 1, max: 5000, message: '长度最多5000个字符', trigger: 'blur' }
    ],
})

// 上传封面图片
const imgUrl = ref('')
const beforerUpload = (file) => {
    const isLt5M = file.size / 1024 / 1024 < 5
    const isImage = file.type.startsWith('image/')
    if(!isImage){
        ElMessage.error('请上传图片文件')
        return false
    }
    if(!isLt5M){
        ElMessage.error('图片大小不能超过5M')
        return false
    }
    return true 
}
const businessId = ref(null)
const handleUploadRequest =async ({file}) =>{
    businessId.value = crypto.randomUUID()
    const fileRes = await uploadFile(file,{
        businessId: businessId.value,
    })
    //拼接图片地址
    imgUrl.value = fileBaseUrl + fileRes.filePath
    formData.coverImage = fileRes.filePath
}
// 移除封面图片
const handleRemove = () => {
    imgUrl.value = ''
    formData.coverImage = ''
}

// 文章内容改变时，更新摘要
const handleContentChange = (data) => {
    formData.content = data.html;
}
const editorInstance = ref(null)
// 富文本编辑器创建时，设置默认值
const handleEditorCreated = (editor) => {
    editorInstance.value = editor
    //编辑
    if(formData.content && editor){
        nextTick(() => {
            editor.setHtml(formData.content)
        })
    }
}
const btnPreview = ref(false)

const loading = ref(false)
const formRef = ref()
const handleSubmit = () => {
    formRef.value.validate((valid,fileds) =>{
        if(valid){
            loading.value = true
        }
        const submitData = {
            ...formData,
            tags: formData.tagArray.join(',')
        }
        delete submitData.tagArray

        if(!isEdit.value){
            submitData.id = businessId.value
        createArticle(submitData).then(res => {
          loading.value = false
          emit('success')
        })
        }else{
            updateArticle(props.article.id,submitData).then(res =>{
                loading.value = false
                emit('success')

            })
        }
        
        
    })
}
</script>
<style lang="scss" scoped>
.cover-placeholder{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 120px;
    color: #999;
    background-color: #f5f5f5;
    flex-direction: column;
}
.cover-image{
    width: 200px;
    height: 120px;
    display: block;
}
</style>