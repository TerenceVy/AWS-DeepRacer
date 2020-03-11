import BaseService from './base';

export default class RankingService extends BaseService {

    constructor() {
        super('games')
    }

    getAll(id, modelId, callback) {
        this.request('get',  '/' + id + '/runs/' + modelId + '/ranking', callback);
    }
}
