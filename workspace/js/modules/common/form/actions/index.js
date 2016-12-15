export const FORM_INIT_REQUEST = 'FORM_INIT_REQUEST'
export const FORM_INIT_SUCCESS = 'FORM_INIT_SUCCESS'
export const FORM_INIT_FAILURE = 'FORM_INIT_FAILURE'
export const FORM_VALIDATE_FAILURE = 'FORM_VALIDATE_FAILURE'
export const FORM_POST_REQUEST = 'FORM_POST_REQUEST'
export const FORM_POST_SUCCESS = 'FORM_POST_SUCCESS'
export const FORM_POST_FAILURE = 'FORM_POST_FAILURE'
export const FORM_UPDATE_REQUEST = 'FORM_UPDATE_REQUEST'
export const FORM_UPDATE_SUCCESS = 'FORM_UPDATE_SUCCESS'
export const FORM_UPDATE_FAILURE = 'FORM_UPDATE_FAILURE'
export const FORM_RESET = 'FORM_RESET'
const DATE_FORMAT = 'YYYY/MM/DD';
export const VALIDATE_RULE = {
    'REQUIRED_VALIDATE': {
        name: 'REQUIRED_VALIDATE',
        defaultRegex: '^\\S+(([\\S\\s]*\\S+$)|(\\S*$))',
        defaultErrorMsg: '不能为空且不能以空格开头和结尾'
    },
    'NUMBER_VALIDATE': {
        name: 'NUMBER_VALIDATE',
        defaultRegex: '^(-?\\d+)(\\.\\d+)?$',
        defaultErrorMsg: 'can only be a number'
    },
    'INT_VALIDATE': {name: 'INT_VALIDATE', defaultRegex: '^-?\\d+$', defaultErrorMsg: 'can only be an int'},
    'EMAIL_VALIDATE': {
        name: 'EMAIL_VALIDATE',
        defaultRegex: '^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$',
        defaultErrorMsg: 'not an email'
    },
}

function confirmForm(requestCondition) {

    return {
        [MiddleWare.CALL_API]: {
            httpType: 'post',
            types: [FORM_POST_REQUEST, FORM_POST_SUCCESS, FORM_POST_FAILURE],
            endpoint: requestCondition.url,
        },
        requestCondition
    }
}
export function confirmFormDispatch(requestCondition = {
    data, formKey
}) {
    return (dispatch, getState) => {
        //getstate 根据formKey获取rule，并首先client validate data，失败后 return FORM_VALIDATE_FAILURE ,一定要把formKey传入，并更新props
        //然后如果成功了进行form confirm，然后设置成功后，调用callback在form内
        //do validate
        // getState.form[formKey].rule
        var clientValidate = validateFormClient(requestCondition.data, getState().form.main[requestCondition.formKey].rule)
        if (!clientValidate.returnFlag) {
            var structure = clientValidate.structure
            return dispatch({formKey: requestCondition.formKey, structure, type: FORM_VALIDATE_FAILURE})
        }
        requestCondition.multipart = clientValidate.multipart
        return dispatch(confirmForm(requestCondition))
    }
}


function initForm(requestCondition = {
    formKey, endpoint
}) {
    //将数据进行处理化，并关联store后映射到form component中，然后根据props进行和state的对应更新
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'GET',
            types: [FORM_INIT_REQUEST, FORM_INIT_SUCCESS, FORM_INIT_FAILURE],
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function initFormDispatch(requestCondition = {formKey, endpoint}) {
    return (dispatch, getState) => {
        return dispatch(initForm(requestCondition))
    }
}


function updateForm(requestCondition = {
    formKey, endpoint
}) {
    //将数据进行处理化，并关联store后映射到form component中，然后根据props进行和state的对应更新
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'POST',
            types: [FORM_UPDATE_REQUEST, FORM_UPDATE_SUCCESS, FORM_UPDATE_FAILURE],
            endpoint: requestCondition.endpoint,
        },
        requestCondition
    }
}
export function updateFormDispatch(requestCondition = {formKey, endpoint}) {
    return (dispatch, getState) => {
        return dispatch(updateForm(requestCondition))
    }
}


export function resetForm(requestCondition = {
    rule, formKey
}) {
    //将数据进行处理化，并关联store后映射到form component中，然后根据props进行和state的对应更新
    return (dispatch, getState) => {
        l_assign(requestCondition, {type: FORM_RESET})
        return dispatch(requestCondition)
    }
}


function validateFormClient(data, rule) {
    const {structure} = rule
    let returnFlag = true;
    let multipart = false;
    structure.forEach(function (item) {
        if (Array.isArray(item)) {
            item.forEach(function (subItem) {
                let subItemData = data[subItem.name]
                if (subItem.type === 'file') {
                    multipart = true;
                }
                if (subItem.type === 'date') {
                    data[subItem.name] = subItemData ? ( typeof subItemData === 'string' ? (subItem.dateFormat ? moment(subItemData, subItem.dateFormat).valueOf() : moment(subItemData, DATE_FORMAT).valueOf()) : moment(subItemData).valueOf()) : null;
                    subItemData = data[subItem.name] ? data[subItem.name] + '' : null;
                }
                if (subItem.type === 'daterange') {
                    var dateTimeStart = subItemData.dateTimeStart ? ( typeof subItemData.dateTimeStart === 'string' ? (subItem.dateFormat ? moment(subItemData.dateTimeStart, subItem.dateFormat).valueOf() : moment(subItemData.dateTimeStart, DATE_FORMAT).valueOf()) : moment(subItemData.dateTimeStart).valueOf()) : null;
                    var dateTimeEnd = subItemData.dateTimeEnd ? ( typeof subItemData.dateTimeEnd === 'string' ? (subItem.dateFormat ? moment(subItemData.dateTimeEnd, subItem.dateFormat).valueOf() : moment(subItemData.dateTimeEnd, DATE_FORMAT).valueOf()) : moment(subItemData.dateTimeEnd).valueOf()) : null;

                    data[subItem.name] = {dateTimeStart: dateTimeStart, dateTimeEnd: dateTimeEnd};
                    subItemData = data[subItem.name];
                }
                if (!subItem.readonly && false != subItem.available && subItem.validateRules && subItem.type !== 'daterange') {
                    var validateMsg = validateInternal(subItemData, subItem.validateRules, subItem.required)
                    if (validateMsg) {
                        l_assign(subItem, validateMsg);
                        returnFlag = false
                    }
                } else if (!subItem.readonly && false != subItem.available && subItem.validateRules && subItem.type === 'daterange') {
                    var validateMsgDateTimeStart = null
                    var validateMsgDateTimeEnd = null
                    if (subItem.validateRules[0]) {
                        validateMsgDateTimeStart = validateInternal(subItemData.dateTimeStart ? subItemData.dateTimeStart + '' : null, subItem.validateRules[0], subItem.required)
                    }
                    if (subItem.validateRules[1]) {
                        validateMsgDateTimeEnd = validateInternal(subItemData.dateTimeEnd ? subItemData.dateTimeEnd + '' : null, subItem.validateRules[1], subItem.required)
                    }
                    if (validateMsgDateTimeStart || validateMsgDateTimeEnd) {
                        var validateMsg = {
                            validated: false,
                            dateTimeStartValidated: validateMsgDateTimeStart ? false : true,
                            dateTimeEndValidated: validateMsgDateTimeEnd ? false : true
                        }
                        validateMsg.errorMsg = validateMsgDateTimeStart ? validateMsgDateTimeStart.errorMsg : ''
                        if (validateMsgDateTimeEnd) {
                            validateMsg.errorMsg = validateMsg.errorMsg ? validateMsg.errorMsg + ' & ' + validateMsgDateTimeEnd.errorMsg : validateMsgDateTimeEnd.errorMsg;
                        }
                        l_assign(subItem, validateMsg);
                        returnFlag = false
                    }
                }
            })
        } else {
            let itemData = data[item.name]
            if (item.type === 'file') {
                multipart = true;
            }
            if (item.type === 'date') {
                data[item.name] = itemData ? ( typeof itemData === 'string' ? (item.dateFormat ? moment(itemData, item.dateFormat).valueOf() : moment(itemData, DATE_FORMAT).valueOf()) : moment(itemData).valueOf()) : null;
                itemData = data[item.name] ? data[item.name] + '' : null;
            }
            if (item.type === 'daterange') {
                var dateTimeStart = itemData.dateTimeStart ? ( typeof itemData.dateTimeStart === 'string' ? (item.dateFormat ? moment(itemData.dateTimeStart, item.dateFormat).valueOf() : moment(itemData.dateTimeStart, DATE_FORMAT).valueOf()) : moment(itemData.dateTimeStart).valueOf()) : null;
                var dateTimeEnd = itemData.dateTimeEnd ? ( typeof itemData.dateTimeEnd === 'string' ? (item.dateFormat ? moment(itemData.dateTimeEnd, item.dateFormat).valueOf() : moment(itemData.dateTimeEnd, DATE_FORMAT).valueOf()) : moment(itemData.dateTimeEnd).valueOf()) : null;
                data[item.name] = {dateTimeStart: dateTimeStart, dateTimeEnd: dateTimeEnd};
                itemData = data[item.name];
            }
            if (!item.readonly && false != item.available && item.validateRules && item.type !== 'daterange') {
                var validateMsg = validateInternal(itemData, item.validateRules, item.required)
                if (validateMsg) {
                    l_assign(item, validateMsg);
                    returnFlag = false
                }
            } else if (!item.readonly && false != item.available && item.validateRules && item.type === 'daterange') {
                var validateMsgDateTimeStart = null
                var validateMsgDateTimeEnd = null
                if (item.validateRules[0]) {
                    validateMsgDateTimeStart = validateInternal(itemData.dateTimeStart ? itemData.dateTimeStart + '' : null, item.validateRules[0], item.required)
                }
                if (item.validateRules[1]) {
                    validateMsgDateTimeEnd = validateInternal(itemData.dateTimeEnd ? itemData.dateTimeEnd + '' : null, item.validateRules[1], item.required)
                }
                if (validateMsgDateTimeStart || validateMsgDateTimeEnd) {
                    var validateMsg = {
                        validated: false,
                        dateTimeStartValidated: validateMsgDateTimeStart ? false : true,
                        dateTimeEndValidated: validateMsgDateTimeEnd ? false : true
                    }
                    validateMsg.errorMsg = validateMsgDateTimeStart ? validateMsgDateTimeStart.errorMsg : ''
                    if (validateMsgDateTimeEnd) {
                        validateMsg.errorMsg = validateMsg.errorMsg ? validateMsg.errorMsg + ' & ' + validateMsgDateTimeEnd.errorMsg : validateMsgDateTimeEnd.errorMsg;
                    }
                    l_assign(item, validateMsg);
                    returnFlag = false
                }
            }
        }
    })
    return {structure, returnFlag, multipart}
}
function validateInternal(itemData, validateRules, required) {

    var tmpData = null;
    if (itemData) {
        if (typeof itemData === 'number') {
            itemData = itemData + ''
        }
        if (typeof itemData === 'string') {
            tmpData = itemData.replace(/(^\s*)|(\s*$)/g, "")
        } else if (itemData instanceof Array && itemData.length > 0) {
            tmpData = JSON.stringify(itemData);
        } else if (typeof itemData === 'object') {
            tmpData = ''
            for (var key in itemData) {
                if (itemData[key].files) {
                    tmpData += itemData[key].value.toLowerCase();
                }
            }
        }
    }
    if (!tmpData) {
        if (!required) {
            return null
        }
        tmpData = '';
    }
    for (var index in validateRules) {
        let validateRule = validateRules[index];
        if (VALIDATE_RULE[validateRule.name] && !validateRule.validateRegex) {
            validateRule.validateRegex = VALIDATE_RULE[validateRule.name].defaultRegex;
        }
        var regExp = validateRule.validateRegex;
        if (typeof validateRule.validateRegex === 'string') {
            regExp = new RegExp(validateRule.validateRegex);
        }
        if (VALIDATE_RULE[validateRule.name] && !validateRule.errorMsg) {
            validateRule.errorMsg = VALIDATE_RULE[validateRule.name].defaultErrorMsg;
        }
        if (!regExp.test(tmpData)) {
            return {
                validated: false,
                errorMsg: validateRule.errorMsg
            }
        }
    }

    return null
}
