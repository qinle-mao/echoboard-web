import service from '@/utils/axios'

export const getUserIp = () => service.post('/getuserip')
export const insertCard = (data) => service.post('/insertcard', data)
export const findCardPage = (data) => service.post('/findcardpage', data)
export const insertFeedback = (data) => service.post('/insertfeedback', data)
export const insertComment = (data) => service.post('/insertcomment', data)
export const findCommentPage = (data) => service.post('/findcommentpage', data)
export const photoUpload = (data) => service.post('/photoupload', data)