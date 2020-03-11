import axios from 'axios';
import config from '../config/index';
import requestConfig from '../config/request';

export default class BaseService {

	constructor(path, req) {
		this._req = req ? req : path.split('.').pop();
		if (path) this.path = '/' + path.replace(/\./g, '/');
	}

	_getJoinQuery(data, request) {
		Object.keys(data).forEach((key, i) => {
			request.push(key, '@', 'fields~');
			data[key].fields.forEach(field => {
				request.push(field, ';');
			});
			if (i + 1 < Object.keys(data).length) {
				request = request.slice(0, -1);
				request.push(',');
			} else {
				request = request.slice(0, -1);
			}
		});
		return request;
	}

	_getQuery(request, query, subModel) {
		if (subModel)
			subModel = subModel.replace(/\//g, '.');
		if (!query) query = {};
		let data;
		try {
			data = (subModel) ? requestConfig[this._req][subModel][request] : requestConfig[this._req][request];
			if (!data) data = {};
		} catch (e) {
			if (!query) return '';
			data = {};
		}
		request = [];
		if (data.query || query.query) {
			if (request.length) request.push('&');
			request.push('query=');
			if (data.query) {
				Object.keys(data.query).forEach((key, i) => {
					request.push(key, ';', data.query[key]);
					request.push(i + 1 === Object.keys(data.query).length ? '' : ',');
				});
			}
			if (data.query && query.query) request.push(',');
			if (query.query) {
				Object.keys(query.query).forEach((key, i) => {
					request.push(key, ';', query.query[key]);
					request.push(i + 1 === Object.keys(query.query).length ? '' : ',');
				});
			}
		}

		if (data.fields || query.fields) {
			if (request.length) request.push('&');
			request.push('fields=');
			if (data.fields) {
				data.fields.forEach((field, i) => {
					request.push(field, i + 1 === data.fields.length ? '' : ',');
				});
			}
			if (query.fields && data.fields) request.push(',');
			if (query.fields) {
				query.fields.forEach((field, i) => {
					request.push(field, i + 1 === query.fields.length ? '' : ',');
				});
			}
		}
		if (data.page || query.page) {
			if (request.length) request.push('&');
			request.push('page=', query.page || data.page);
		}
		if (data.sort || query.sort) {
			if (request.length) request.push('&');
			request.push('sort=', query.sort || data.sort);
		}
		if (data.count || query.count) {
			if (request.length) request.push('&');
			request.push('count=', query.count || data.count);
		}
		if (data.limit || query.limit) {
			if (request.length) request.push('&');
			request.push('limit=', query.limit || data.limit);
		}
		if (data.join || query.join) {
			if (request.length) request.push('&');
			request.push('join=');
			request = this._getJoinQuery(query.join || data.join, request);
		}
		return request.join('') ? '?' + request.join('') : '';
	}

	request(method, uri, data, baseUri, callback) {
		if (typeof data === 'function') {
			callback = data;
			data = null;
			baseUri = null;
		}	else if (typeof baseUri === 'function') {
			callback = baseUri;
			baseUri = null;
		}
		axios({
			method: method,
			url: baseUri || config.api.baseUri + this.path + uri,
			data: data
		})
			.then(response => {
				callback(null, response.data);
			})
			.catch(error => {
				callback(error.response || 500, null);
			});
	}

	getMe(query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getMe', query);

		this.request('get', '/me' + query, callback);
	}

	getAll(query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		if (query && !query.ignore || !query) {
			query = this._getQuery('getAll', query);
		}
		this.request('get', query ? query : '', callback);
	}

	getOne(id, query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getOne', query);

		this.request('get', '/' + id + query, callback);
	}

	getEqual(query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getEqual', query);

		this.request('get', '/equal' + query, callback);
	}

	staff(query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getEqual', query);

		this.request('get', '/staff' + query, callback);
	}

	getFind(query, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = null;
		}
		query = this._getQuery('getFind', query);

		this.request('get', '/find' + query, callback);
	}

	update(id, data, callback) {
		this.request('put', '/' + id, data, callback);
	}

	create(data, callback) {
		this.request('post', '', data, callback);
	}

	delete(data, callback) {
		this.request('delete', '/' + data, callback);
	}

}
