<template> 
    <div class="knowledge-container">
        <div class="header-section">
            <div class="header-content">
                <el-image :src="iconUrl" alt="知识库"style="width: 60px; height: 60px;"/>
                <h1>心理健康知识库</h1>
            </div>
        </div>
        <div class="content">
            <!-- 左 -->
            <div class="recommend-section">
                <div class="section-title">推荐文章</div>
                <div class="recommend-list">
                    <div v-for="item in recommendList" :key="item.id" class="recommend-item" @click="goToArticle(item.id)">
                        <h4>{{ item.title }}</h4>
                        <p class="read-count">
                            <el-icon>
                                <Histogram />
                            </el-icon>
                            阅读量: {{ item.readCount }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- 右 -->
            <div class="article-list">
                <div class="article-item" v-for="item in articleList" :key="item.id" @click="goToArticle(item.id)">
                    <el-image :src="getImage(item.coverImage)" alt="文章封面" style="width: 240px; height: 150px;"/>
                    <div class="info">
                        <div class="title">
                            <h3>{{ item.title }}</h3>
                            <el-tag Plain type="primary">{{ item.categoryName }}</el-tag>
                        </div>
                        <div style="margin-top: 10px;">
                            <div class="flex-box">
                                <el-icon>
                                    <Avatar />
                                </el-icon>
                                <span>{{ item.authorName }}</span>
                            </div>
                            <div class="flex-box">
                                <el-icon>
                                    <List />
                                </el-icon>
                                <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
                            </div>
                        </div>
                        <div style="margin-top: 10px;">
                            <div class="flex-box">
                            <el-icon>
                                <Platform />
                            </el-icon>
                            <span>观看人数{{ item.readCount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- 分页 -->
        <div class="pagination-wrapper">
            <el-pagination
                style="margin-top: 25px;"
                layout="prev, pager, next"
                :total="pagination.total"
                :page-size.sync="pagination.size"
                @change="handleChange"
            />
        </div>
    </div>
</template>
<script setup >
import { ref } from 'vue'
import { getKnowledgeList } from '../api/frontend'
import { onMounted } from 'vue'
import {dayjs} from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const iconUrl = new URL('../assets/images/book.png', import.meta.url).href


const recommendList = ref([])

//右侧列表数据
const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
})

const articleList = ref([])
const getPageList = () => { 
    const params = {
        sortField: 'publishedAt',
        sortDirection: 'desc',
        ...pagination.value
    }
    getKnowledgeList(params).then(res=> { 
        articleList.value = res.records
        pagination.value.total = res.total
    })
}
//获取图片
const getImage = (url) => {
    return url ? 'http://159.75.169.224:1235' + url : 'https://file.itndedu.com/psychology_ai.png'
}

// 分页
const handleChange = (page) => {
    pagination.value.currentPage = page
    getPageList()
}
// 跳转文章详情
const goToArticle = (id) => {
    router.push(`/knowledge/article/${id}`)
}



onMounted(() => {
    const params = {
        sortField: 'readCount',
        sortDirection: 'desc',
        currentPage: 1,
        size: 5,
    }
    getPageList()
    getKnowledgeList(params).then((res) => { 
        recommendList.value = res.records
    })
})
</script>
<style lang="scss" scoped>
.knowledge-container {
    background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);
    .flex-box {
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
    .header-section {
        background: linear-gradient(135deg, #f59e0b 0%, #8b5cf6 100%);
        color: white;
        padding: 48px;
        .header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    .content {
        display: flex;
        gap: 20px;
        margin: 0 auto;
        width: 1200px;
        padding: 20px;
        .recommend-section {
            width: 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 15px;
            height: 400px;
            .section-title {
                font-size: 12;
                font-weight: 600;
                color: #374151;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .recommend-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                .recommend-item {
                    border-left: 4px solid #f59e0b;
                    padding-left: 10px;
                    cursor: pointer;
                    .read-count {
                        margin-top: 15px;
                        font-size: 12px;
                        color: #6b7280;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
        .article-list {
            flex: 1;
            .article-item {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                padding: 15px;
                margin-bottom: 20px;
                display: flex;
                .info {
                    margin-left: 20px;
                    .title {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
    }
    .pagination-wrapper {
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
    }
}
</style>