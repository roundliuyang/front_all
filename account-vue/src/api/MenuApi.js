import env from '@/env';
import Api from "./Api";

export default new class extends Api {
    constructor() {
        super();
    }

    list() {
        const url = env.account + '/account/menu/getAllMenus';
        return this.axios.get(url);
    }

    listById(managerId) {
        const url = env.account + '/account/menu/managers/' + managerId + '/menus';
        return this.axios.get(url);
    }

    addMenu(menu) {
        const url = env.account + '/account/menu';
        return this.axios.post(url, menu);
    }

    updateById(menu) {
        const url = env.account + '/account/menu/updateById';
        return this.axios.put(url, menu);
    }

    delById(id) {
        const url = env.account + '/account/menu/delById?id=' + id;
        return this.axios.delete(url);
    }

    /**
     * [{id,seq}]
     */
    sortApi(sortArr) {
        const url = env.account + '/account/menu/sort'
        return this.axios.put(url, sortArr)
    }
    
    /**
     * 对菜单排序
     * @param {Array<Number>} sorted 排序后的菜单列表
     */
    sort(sorted = []) {
        const url = env.account + '/account/menu/sort';
        return this.axios.post(url, sorted);
    }

    delete(idArr = []) {
        let url = env.account + '/account/menu?';
        idArr.forEach(id => url += '&id=' + id);
        return this.axios.delete(url);
    }
}