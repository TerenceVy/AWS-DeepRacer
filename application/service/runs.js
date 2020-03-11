import BaseService from './base';

export default class RunService extends BaseService {

    constructor() {
        super('games')
    }

    getAll(id, callback) {
        this.request('get', '/' + id + '/runs', callback);
    }

}
