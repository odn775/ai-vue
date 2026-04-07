import service from '../untils/request'


export const register = (data) => {
    return service.post('/user/add',data)
}

export const startSession = (data) => {
    return service.post('/psychological-chat/session/start',data)
}

export const getSessionList = (params) => {
    return service.get('/psychological-chat/sessions',{params})
}

export const deleteSession = (sessionId) => {
    return service.delete(`/psychological-chat/sessions/${sessionId}`)
}

export const getSessionDetail = (sessionId) => {
    return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

export const getSessionEmotion = (sessionId) => {
    return service.get(`/psychological-chat/session/${sessionId}/emotion`)
}

export const addEmotionDiary = (data) => {
    return service.post('/emotion-diary',data)
}

export const getKnowledgeList = (params) => {
    return service.get('/knowledge/article/page',{params})
}

export const getKnowledgeDetail = (id) => {
    return service.get(`/knowledge/article/${id}`)
}