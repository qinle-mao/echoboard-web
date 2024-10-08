let Mock = require('mockjs')

export const messageCards = Mock.mock({
    "data|18": [{
        "id|+1": 0,
        "userId|+1": 10,
        "time": new Date(),
        "content|24-96": "@cword",
        "label|0-10": 0,
        "name": "@cname",
        "likes|0-120": 0,
        "comments|0-120": 0,
        "type": 0,
        "imgUrl|0-4": 0,
        "revoke|0-20": 0,
        "report|0-20": 0,
    }]
})

export const photoCards = Mock.mock({
    "data|15": [{
        "id|+1": 0,
        "userId|+1": 10,
        "time": new Date(),
        "content|24-96": "@cword",
        "label|0-10": 0,
        "name": "@cname",
        "likes|0-120": 0,
        "comments|0-120": 0,
        "type": 1,
        "imgUrl|0-4": 0,
        "revoke|0-20": 0,
        "report|0-20": 0,
    }]
})

export const comments = Mock.mock({
    "data|9": [{
        "id|+1": 0,
        "userId|+1": 10,
        "time": new Date(),
        "content|24-96": "@cword",
        "name": "@cname",
        "avatarUrl|0-2": 0,
    }]
})