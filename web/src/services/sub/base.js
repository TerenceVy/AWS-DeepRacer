import BaseService from "../base";

export default class SubbaseService extends BaseService {

	constructor(path, subModel, req) {
		super(path, req);
		this.subModel = subModel.replace(/\./g, '/');
	}

	getMe(modelId, query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getMe', query, this.subModel);

		this.request('get', '/' + modelId + '/' + this.subModel + '/me' + query, callback);
	}

	getAll(modelId, query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getAll', query, this.subModel);

		this.request('get', '/' + modelId + '/' + this.subModel + query, callback);
	}

	getOne(modelId, id, query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getOne', query, this.subModel);

		this.request('get', '/' + modelId + '/' + this.subModel + '/' + id + query, callback);
	}

	getEqual(modelId, query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getEqual', query, this.subModel);

		this.request('get', '/' + modelId + '/' + this.subModel + '/equal' + query, callback);
	}

	getFind(modelId, query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getFind', query, this.subModel);

		this.request('get', '/' + modelId + '/' + this.subModel + '/find' + query, callback);
	}
	
	getRanking(id, modelId, callback) {
		this.request('get', '/' + id + '/' + this.subModel + '/' + modelId + '/ranking', callback);
	}
	
	addRanking(id, modelId, data, callback) {
		this.request('post', '/' + id + '/' + this.subModel + '/' + modelId + '/ranking', data, callback);
	}

	update(modelId, id, data, callback) {
		this.request('put', '/' + modelId + '/' + this.subModel + '/' + id, data, callback);
	}

	create(modelId, data, callback) {
		this.request('post', '/' + modelId + '/' + this.subModel, data, callback);
	}

	delete(modelId, id, callback) {
		this.request('delete', '/' + modelId + '/' + this.subModel + '/' + id, callback);
	}

}