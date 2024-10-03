const { Redis } = require('ioredis')
const redis = new Redis();

const setCacheData = (key, data) => {
    const expireInSeconds = 60 * 1440
    const jsonData = JSON.stringify(data)
    return new Promise((resolve, reject) => {
        redis.set(key, jsonData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                redis.expire(key, expireInSeconds, (err, reply) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

const getCacheData = (key) => {
    return new Promise((resolve, reject) => {
        redis.get(key).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
}

const deleteCacheData = (key) => {
    return new Promise((resolve, reject) => {
        redis.del(key, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { setCacheData, getCacheData, deleteCacheData }