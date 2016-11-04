const CALL_API = Symbol('Call API')

var toQueryString = function (obj) {
    return l_map(obj, function (v, k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }).join('&');
};

var callApi = function (endpoint, schema, httpType, requestCondition) {
    httpType = httpType.toUpperCase();
    var fetchObj = null;
    //此处需要处理json和http formData 的区分，因为有file的处理，目前只考虑单file，也可以考虑多file部分，根据name，and id来结合处理
    if (httpType === 'POST' || httpType == 'PUT') {
        var formData = null;
        if (requestCondition.multipart) {
            formData = new FormData();
            const data = requestCondition ? requestCondition.data : null;
            if (data) {
                for (var key in data) {
                    if (!data.hasOwnProperty(key)) {
                        continue
                    }
                    var obj = data[key]
                    if (obj && typeof  obj === 'object') {
                        for (var subKey in obj) {
                            if (obj[subKey] && typeof  obj[subKey] === 'object') {
                                var files = obj[subKey].files
                                if (files) {
                                    for (var i = 0; i < files.length; i++) {
                                        var file = files[i];
                                        formData.append(key, file);
                                    }
                                }
                            } else {
                                if (!obj[subKey]) {
                                    obj[subKey] = ''
                                }
                                formData.append(key, obj[subKey]);
                            }
                        }
                    } else {
                        if (!obj) {
                            obj = ''
                        }
                        formData.append(key, obj);
                    }
                }
            }
        }
        return fetch(endpoint, {
            method: httpType,
            credentials: 'same-origin',
            headers: formData ? null : {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: formData ? formData : (requestCondition ? JSON.stringify(requestCondition) : null)
        }).then(response => response.text().then(function (text) {
                if (text) {
                    var json = JSON.parse(text);
                    return {json, response}
                } else {
                    return {response}
                }
            }
        )).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            if (json) {
                if (schema) {
                    const camelizedJson = humps.camelizeKeys(json)
                    return Object.assign(
                        normalizr.normalize(camelizedJson, schema)
                    )
                } else {
                    return json
                }
            } else {
                return {};
            }
        });
    } else if (httpType === 'GET' || httpType == 'DELETE') {
        endpoint = endpoint + (requestCondition ? ((endpoint.indexOf('?')>-1?'&':'?') + toQueryString(requestCondition)) : '');
        return fetch(endpoint, {
            method: httpType,
            credentials: 'same-origin',
        }).then(response => response.text().then(function (text) {
                if (text) {
                    var json = JSON.parse(text);
                    return {json, response}
                } else {
                    return {response}
                }
            }
        )).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            if (json) {
                if (schema) {
                    const camelizedJson = humps.camelizeKeys(json)
                    return Object.assign(
                        normalizr.normalize(camelizedJson, schema)
                    )
                } else {
                    return json
                }
            } else {
                return {};
            }
        });
    }
    return null;
}


const defaultCall = store=>
    next => action => {
        const callAPI = action[CALL_API]
        if (typeof callAPI === 'undefined') {
            return next(action)
        }
        let {endpoint} = callAPI
        const {httpType = 'post', schema, types} = callAPI
        const [ requestType, successType, failureType ] = types;
        const requestCondition = action['requestCondition'];

        function actionWith(data) {
            const finalAction = Object.assign({}, action, data)
            delete finalAction[CALL_API]
            return finalAction
        }

        next(actionWith({type: requestType}))
        if (typeof endpoint == "function") {
            next(actionWith({
                response: endpoint(requestCondition, schema),
                type: successType
            }))
        } else {
            return callApi(endpoint, schema, httpType, action['requestCondition']).then(
                response => next(actionWith({
                    response,
                    type: successType
                })),
                error => next(actionWith({
                    type: failureType,
                    error: error.message || 'Something bad happened'
                }))
            )
        }
    }

module.exports = {CALL_API, callApi, defaultCall}