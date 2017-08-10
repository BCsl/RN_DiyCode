/**
 * Created by chensuilun on 2017/7/20.
 */
import HTTPUtils from '.././utils/HTTPUtils'
export function getNewList(start, end) {
    let param = {
        offset: 0,
        limit: 20,
    };
    if (start != undefined && typeof start == Number) {
        param.offset = start;
    }
    if (end != undefined && typeof end == Number) {
        param.limit = end;
    }
    return HTTPUtils.get('https://diycode.cc/api/v3/news.json', param).then(ret => {
        "use strict";
        console.log('API#getNewList-netwrok:', ret);
        storage.save({
            key: MAIN_PAGER_LIST,
            data: ret,
            expires: 5000 * 60,
        });
        return ret;
    });
}

const MAIN_PAGER_LIST = "mainPagerList";

const storage = global.storage;

export function getNewListFromCache(start, end) {
    return storage.load({
        key: MAIN_PAGER_LIST,
    }).then(ret => {
        "use strict";
        console.log('API#getNewListFromCache-hit:', ret);
        return ret;
    }).catch(err => {
        "use strict";
        console.warn('API#getNewListFromCache:', err);
        return getNewList(start, end);
    });

}
