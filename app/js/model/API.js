/**
 * Created by chensuilun on 2017/7/20.
 */
import HTTPUtils from '.././utils/HTTPUtils'

const HOST = 'https://diycode.cc/api/v3';

const MAIN_TOPICS_LIST = 'mainTopicsList';
const MAIN_NEWS_LIST = 'mainNewsList';
const MAIN_SITES_LIST = 'mainSitesList';

const storage = global.storage;

//----------------------新闻----------------------
/**
 * 从网络获取新闻列表
 * @param offest
 * @param limit
 * @param cacheable
 * @returns {Promise.<TResult>}
 */
export function getNewsList(offest, limit, cacheable = false) {
    let param = {
        offset: 0,
        limit: 20,
    };
    if (typeof offest === 'number') {
        param.offset = offest;
    }
    if (typeof limit === 'number') {
        param.limit = limit;
    }
    return HTTPUtils.get(`${HOST}/news.json`, param).then(ret => {
        "use strict";
        console.log('API#getNewList-netwrok:', ret);
        if (cacheable) {
            storage.save({
                key: MAIN_NEWS_LIST,
                data: ret,
                expires: 10 * 60 * 1000,
            });
        }
        return ret;
    });
}

/**
 * 优先从缓存中获取新闻列表
 * @param offset
 * @param limit
 * @returns {Promise.<T>}
 */
export function getNewsListFromCache(offset, limit) {
    return storage.load({
        key: MAIN_NEWS_LIST,
    }).then(ret => {
        "use strict";
        console.log('API#getNewListFromCache-hit:', ret);
        return ret;
    }).catch(err => {
        "use strict";
        console.warn('API#getNewListFromCache:', err);
        return getNewsList(offset, limit, true);
    });

}


//----------------------主题----------------------
/**
 * 从网络获取主题列表
 * @param offset
 * @param limit
 * @param cacheable
 * @returns {Promise.<TResult>}
 */
export function getTopicList(offset, limit, cacheable = false) {
    let param = {
        offset: 0,
        limit: 20,
    };
    if (typeof offset === 'number') {
        param.offset = offset;
    }
    if (typeof limit === 'number') {
        param.limit = limit;
    }
    return HTTPUtils.get(`${HOST}/topics.json`, param).then(ret => {
        "use strict";
        console.log('API#getTopicList-netwrok:', ret);
        if (cacheable) {
            storage.save({
                key: MAIN_TOPICS_LIST,
                data: ret,
                expires: 10 * 60 * 1000,
            });
        }
        return ret;
    });
}
/**
 * 优先从缓存中获取主题列表
 * @param offset
 * @param limit
 * @returns {Promise.<T>}
 */
export function getTopicListFromCache(offset, limit) {
    return storage.load({
        key: MAIN_TOPICS_LIST,
    }).then(ret => {
        "use strict";
        console.log('API#getTopicListFromCache-hit:', ret);
        return ret;
    }).catch(err => {
        "use strict";
        console.warn('API#getTopicListFromCache:', err);
        return getTopicList(offset, limit, true);
    });
}
/**
 *  获取主题详情
 * @param id 主题 id
 * @returns {Promise}
 */
export function getTopicDetail(id) {
    return HTTPUtils.get(`${HOST}/topics/${id}.json`);
}
/**
 * 获取某个主题的回复列表
 * @param id 主题 id
 * @returns {Promise}
 */
export function getTopicReplies(id, offest = 0, limit = 10) {
    let param = {
        offset: offest,
        limit: limit,
    };
    return HTTPUtils.get(`${HOST}/topics/${id}/replies.json`, param);
}


//------------网站-----------------
export function getSites(cacheable = false) {
    return HTTPUtils.get(`${HOST}//sites.json`).then(ret=> {
        "use strict";
        if (cacheable) {
            storage.save({
                key: MAIN_SITES_LIST,
                data: ret,
                expires: 60 * 60 * 1000,
            });
            return ret;
        }
    });
}

export function getSitesFromCache() {
    return storage.load({key: MAIN_SITES_LIST}).catch(err => {
        "use strict";
        return getSites(true);
    });
}
