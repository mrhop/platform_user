import dragDropRules from '../structure'
import SampleGroup from '../basicGroup/sampleGroup';
import WorkGroup from '../basicGroup/workGroup';
import TrashGroup from '../basicGroup/trashGroup';
import {VALIDATE_RULE} from '../../../common/form/actions'


export const INIT_WORK_FLOW_REQUEST = 'INIT_WORK_FLOW_REQUEST'
export const INIT_WORK_FLOW_SUCCESS = 'INIT_WORK_FLOW_SUCCESS'
export const INIT_WORK_FLOW_FAILURE = 'INIT_WORK_FLOW_FAILURE'

export const ROLES_GET_REQUEST = 'ROLES_GET_REQUEST'
export const ROLES_GET_SUCCESS = 'ROLES_GET_SUCCESS'
export const ROLES_GET_FAILURE = 'ROLES_GET_FAILURE'

export const POSITIONS_GET_REQUEST = 'POSITIONS_GET_REQUEST'
export const POSITIONS_GET_SUCCESS = 'POSITIONS_GET_SUCCESS'
export const POSITIONS_GET_FAILURE = 'POSITIONS_GET_FAILURE'

export const SHOW_SAVE_WORK_FLOW_FORM = 'SHOW_SAVE_WORK_FLOW_FORM'
export const HIDE_SAVE_WORK_FLOW_FORM = 'HIDE_SAVE_WORK_FLOW_FORM'

export const SAVE_WORK_FLOW_REQUEST = 'SAVE_WORK_FLOW_REQUEST'
export const SAVE_WORK_FLOW_SUCCESS = 'SAVE_WORK_FLOW_SUCCESS'
export const SAVE_WORK_FLOW_FAILURE = 'SAVE_WORK_FLOW_FAILURE'
export const AFTER_SAVE_WORK_FLOW_SUCCESS = 'AFTER_SAVE_WORK_FLOW_SUCCESS'

//清空工作流模板
export const CLEAN_WORK_GROUP = 'CLEAN_WORK_GROUP'
//显示新建或者需修改的单个元素的form modal
export const SHOW_ELEMENT_FORM = 'SHOW_ELEMENT_FORM'
export const AFTER_SAVE_ELEMENT = 'AFTER_SAVE_ELEMENT'
export const HIDE_ELEMENT_FORM = 'HIDE_ELEMENT_FORM'
//删除单个元素，同时删除单独关联元素
export const DELETE_ELEMENT = 'DELETE_ELEMENT'


//init flow
function initWorkflow(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [INIT_WORK_FLOW_REQUEST, INIT_WORK_FLOW_SUCCESS, INIT_WORK_FLOW_FAILURE],
            endpoint: requestCondition.url,
        },
        requestCondition
    }
}
export function initWorkflowDispatch(requestCondition) {
    if (requestCondition.url) {
        return (dispatch, getState) => {
            return dispatch(initWorkflow(requestCondition))
        }
    } else {
        if (window.localStorage && window.localStorage["work_flow::" + requestCondition.symbol]) {
            return (dispatch, getState) => {
                return dispatch({
                    type: INIT_WORK_FLOW_SUCCESS,
                    requestCondition: requestCondition,
                    response: JSON.parse(window.localStorage["work_flow::" + requestCondition.symbol])
                })
            }
        } else {
            return (dispatch, getState) => {
                return dispatch({
                    type: INIT_WORK_FLOW_SUCCESS,
                    requestCondition
                })
            }
        }
    }
}


//GET roles
function getRoles(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [ROLES_GET_REQUEST, ROLES_GET_SUCCESS, ROLES_GET_FAILURE],
            endpoint: requestCondition.url,
        },
        requestCondition
    }
}
export function getRolesDispatch(requestCondition) {
    return (dispatch, getState) => {
        return dispatch(getRoles(requestCondition))
    }
}

//Get positions
function getPositions(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'get',
            types: [POSITIONS_GET_REQUEST, POSITIONS_GET_SUCCESS, POSITIONS_GET_FAILURE],
            endpoint: requestCondition.url,
        },
        requestCondition
    }
}
export function getPositionsDispatch(requestCondition) {
    return (dispatch, getState) => {
        return dispatch(getPositions(requestCondition))
    }
}

export function showSaveWorkflowForm(requestCondition) {
    return (dispatch, getState) => {
        return dispatch({type: SHOW_SAVE_WORK_FLOW_FORM, requestCondition})
    }
}
export function hideSaveWorkflowFrom(requestCondition) {
    //base on the key,根据内容进行调整 form的内容，以及modal的标题等，并放置在requestCondition里面
    return (dispatch, getState) => {
        return dispatch({type: HIDE_SAVE_WORK_FLOW_FORM, requestCondition})
    }
}
//save workflow template
function saveWorkflow(requestCondition) {
    return {
        [MiddleWare.CALL_API]: {
            httpType: 'post',
            types: [SAVE_WORK_FLOW_REQUEST, SAVE_WORK_FLOW_SUCCESS, SAVE_WORK_FLOW_FAILURE],
            endpoint: requestCondition.url,
        },
        requestCondition
    }
}
export function saveWorkflowDispatch(requestCondition) {
    return (dispatch, getState) => {
        if (window.localStorage && window.localStorage["work_flow::" + requestCondition.symbol]) {
            requestCondition.data = JSON.parse(window.localStorage["work_flow::" + requestCondition.symbol])

        } else {
            requestCondition.data = getState().dragDrop.main[requestCondition.symbol].flow
        }
        if (requestCondition.flowName) {
            requestCondition.data.flowName = requestCondition.flowName
            if (requestCondition.desc) {
                requestCondition.data.desc = requestCondition.desc
            }
            getState().dragDrop.main[requestCondition.symbol].flow = requestCondition.data
            if (window.localStorage && window.localStorage["work_flow::" + requestCondition.symbol]) {
                window.localStorage["work_flow::" + requestCondition.symbol] = JSON.stringify(requestCondition.data)
            }
        }
        return dispatch(saveWorkflow(requestCondition))
    }
}
//clear workflow work group
export function cleanWorkgroup(requestCondition) {
    //firsh clear the localshorage, then reduce change the state
    if (window.localStorage && window.localStorage["work_flow::" + requestCondition.symbol]) {
        var json = JSON.parse(window.localStorage["work_flow::" + requestCondition.symbol])
        json.data = null
        window.localStorage["work_flow::" + requestCondition.symbol] = JSON.stringify(json)
    }
    return (dispatch, getState) => {
        return dispatch({type: CLEAN_WORK_GROUP, requestCondition})
    }
}

//show the new element form and
export function showElementFrom(requestCondition) {
    //base on the key,根据内容进行调整 form的内容，以及modal的标题等，并放置在requestCondition里面
    var _this = requestCondition._this
    var dataObj = requestCondition.dataObj
    var data = dataObj.data
    var dataRelated = dataObj.dataRelated
    var dataLevel = dataObj.dataLevel
    var dataUp = dataObj.dataUp
    var dataDown = dataObj.dataDown
    var dragElementForm = {
        structure: [],
        submit: {label: '保存'},
        reset: {label: '重置'}
    };
    dragElementForm.structure.push({
        name: "type",
        type: "hidden",
        defaultValue: data.type,
    })
    dragElementForm.structure.push({
        name: "level",
        type: "hidden",
        defaultValue: data.level,
    })
    dragElementForm.structure.push({
        name: "id",
        type: "hidden",
        defaultValue: data.id ? data.id : "temp_id" + _this.state.anonymousId
    })
    if (!data.id) {
        _this.state.anonymousId += 1;
    }
    if (dataRelated) {
        dragElementForm.structure.push({
            name: "parentId",
            type: "hidden",
            defaultValue: [dataRelated.id],
        })
    }
    if (data.type == "action") {
        dragElementForm.structure.push({
            name: "label",
            label: '名称',
            type: "text",
            placeholder: '请输入名称',
            defaultValue: data.label,
            required: true,
            validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
        })
    }
    if (data.type == "position") {
        var dataType = null
        if (_this.props.positions && _this.props.positions.length > 0) {
            if (typeof _this.props.positions[0].value == "number") {
                dataType = "number"
            }
        }
        var optionItems = _this.props.positions;
        var dataForDiff = []
        if (dataLevel && _this.props.type == "actions") {
            for (var i = 0; i < dataLevel.length; i++) {
                if (dataLevel[i].type == "position" && dataLevel[i].elementId != data.elementId) {
                    dataForDiff.push({value: dataLevel[i].elementId})
                }
            }
            optionItems = l_differenceBy(optionItems, dataForDiff, 'value');
        } else if (_this.props.type == "positions" && _this.props.workData) {
            for (var i = 0; i < _this.props.workData.length; i++) {
                var item = _this.props.workData[i]
                if (item) {
                    for (var j = 0; j < item.length; j++) {
                        if (!data.id || (data.id && data.id != item[j].id)) {
                            dataForDiff.push({value: item[j].elementId})
                        }
                    }
                }
            }
            optionItems = l_differenceBy(optionItems, dataForDiff, 'value');
        }
        dragElementForm.structure.push({
            name: "elementId",
            label: '选择职位',
            type: "select",
            items: optionItems,
            dataType: dataType,
            defaultValue: data.elementId,
            required: true,
            validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
        })
    } else if (data.type == "role") {
        var dataType = null
        if (_this.props.roles && _this.props.roles.length > 0) {
            if (typeof _this.props.roles[0].value == "number") {
                dataType = "number"
            }
        }
        var optionItems = _this.props.roles;
        if (dataLevel) {
            var dataForDiff = []
            for (var i = 0; i < dataLevel.length; i++) {
                if (dataLevel[i].type == "role" && dataLevel[i].elementId != data.elementId) {
                    dataForDiff.push({value: dataLevel[i].elementId})
                }
            }
            optionItems = l_differenceBy(optionItems, dataForDiff, 'value');
        }
        dragElementForm.structure.push({
            name: "elementId",
            label: '选择角色',
            type: "select",
            items: optionItems,
            dataType: dataType,
            defaultValue: data.elementId,
            required: true,
            validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
        })
    } else if (data.type == "action") {
        dragElementForm.structure.push({
            name: "elementId",
            type: "hidden",
            defaultValue: data.elementId
        })
        dragElementForm.structure.push({
            name: "actionRule",
            label: '行为标准',
            type: "radio",
            items: dragDropRules.defaultActionChoices,
            defaultValue: data.actionRule ? data.actionRule : "single",
            required: true,
            validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
        })
    }
    if (dataUp) {
        if (_this.props.type == "actions") {
            if ((data.type === 'role' || data.type === 'position') && dataUp.data && dataUp.data.length > 0) {
                var dataType = null
                if (typeof dataUp.data[0].value == "number") {
                    dataType = "number"
                }
                dragElementForm.structure.push({
                    name: "parent",
                    label: '上行行为',
                    type: "checkbox",
                    items: dataUp.data,
                    defaultValue: dataUp.defaultValue,
                    dataType: dataType,
                    required: true,
                    validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
                })
            } else {
                if (dataUp.roles && dataUp.roles.data && dataUp.roles.data.length > 0) {
                    var dataType = null
                    if (typeof dataUp.roles.data[0].value == "number") {
                        dataType = "number"
                    }
                    dragElementForm.structure.push({
                        name: "parentRoles",
                        label: '上行角色',
                        type: "checkbox",
                        items: dataUp.roles.data,
                        defaultValue: dataUp.roles.defaultValue,
                        dataType: dataType
                    })
                }
                if (dataUp.positions && dataUp.positions.data && dataUp.positions.data.length > 0) {
                    var dataType = null
                    if (typeof dataUp.positions.data[0].value == "number") {
                        dataType = "number"
                    }
                    dragElementForm.structure.push({
                        name: "parentPositions",
                        label: '上行职位',
                        type: "checkbox",
                        items: dataUp.positions.data,
                        defaultValue: dataUp.positions.defaultValue,
                        dataType: dataType
                    })
                }
            }
        } else {
            if (dataUp.positions && dataUp.positions.data && dataUp.positions.data.length > 0) {
                var dataType = null
                if (typeof dataUp.positions.data[0].value == "number") {
                    dataType = "number"
                }
                dragElementForm.structure.push({
                    name: "parentPositions",
                    label: '上行职位',
                    type: "select",
                    items: dataUp.positions.data,
                    defaultValue: dataUp.positions.defaultValue,
                    dataType: dataType,
                    required: true,
                    validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
                })
            }
        }
    }
    if (dataDown) {
        if (_this.props.type == "actions") {
            if ((data.type === 'role' || data.type === 'position') && dataDown.data && dataDown.data.length > 0) {
                var dataType = null
                if (typeof dataDown.data[0].value == "number") {
                    dataType = "number"
                }
                dragElementForm.structure.push({
                    name: "child",
                    label: '下行行为',
                    type: "select",
                    items: dataDown.data,
                    defaultValue: dataDown.defaultValue,
                    dataType: dataType,
                    required: true,
                    validateRules: [{name: VALIDATE_RULE.REQUIRED_VALIDATE.name, errorMsg: '不能为空'}]
                })
            } else {
                if (dataDown.roles && dataDown.roles.data && dataDown.roles.data.length > 0) {
                    var dataType = null
                    if (typeof dataDown.roles.data[0].value == "number") {
                        dataType = "number"
                    }
                    dragElementForm.structure.push({
                        name: "childRoles",
                        label: '下行角色',
                        type: "checkbox",
                        items: dataDown.roles.data,
                        defaultValue: dataDown.roles.defaultValue,
                        dataType: dataType,

                    })
                }
                if (dataDown.positions && dataDown.positions.data && dataDown.positions.data.length > 0) {
                    var dataType = null
                    if (typeof dataDown.positions.data[0].value == "number") {
                        dataType = "number"
                    }
                    dragElementForm.structure.push({
                        name: "childPositions",
                        label: '下行职位',
                        type: "checkbox",
                        items: dataDown.positions.data,
                        defaultValue: dataDown.positions.defaultValue,
                        dataType: dataType,
                    })
                }
            }
        } else {
            if (dataDown.positions && dataDown.positions.data && dataDown.positions.data.length > 0) {
                var dataType = null
                if (typeof dataDown.positions.data[0].value == "number") {
                    dataType = "number"
                }
                dragElementForm.structure.push({
                    name: "childPositions",
                    label: '下行职位',
                    type: "checkbox",
                    items: dataDown.positions.data,
                    defaultValue: dataDown.positions.defaultValue,
                    dataType: dataType,
                })
            }
        }
    }
    dragElementForm.structure.push({
        name: "desc",
        label: "详细说明",
        type: "textarea",
        defaultValue: data.desc,
        rows: 3,
        placeholder: '请输入详细说明'
    })
    if (dataObj.operationType == "update") {
        dragElementForm.actions = [{
            label: '删除', extraClassName: 'btn-danger', action: deleteElementDialog.bind(_this, data)
        }]
    }

    requestCondition.dragElementForm = dragElementForm
    requestCondition.dragModalData = _this.dragModalData
    requestCondition.dragModalData.title = (dataObj.operationType == "add" ? "增加" : "修改")
        + (data.type == "role" ? "角色" : (data.type == "position" ? "职位" : "行为"))
        + (data.label ? "[" + data.label + "]" : "")
//注意此处的数据结构要和传输的data保持一致性，所以要在commonElement部分进行data结构的解析和完善，分为多种，注意toplevel的情况处理，
// 是否尝试在modalheadr部分加入声明title？，比如您正在添加一个角色，您正在修改一个角色，您正在将角色添加在顶部等等！！！
    return (dispatch, getState) => {
        return dispatch({type: SHOW_ELEMENT_FORM, requestCondition})
    }
}
export function hideElementFrom(requestCondition) {
    //base on the key,根据内容进行调整 form的内容，以及modal的标题等，并放置在requestCondition里面

    return (dispatch, getState) => {
        return dispatch({type: HIDE_ELEMENT_FORM, requestCondition})
    }
}

//-I think the form have been saved,shall be callback, 根据返回的data,进行新增element 的id的更新，预设temp id
export function afterSaveElement(requestCondition) {
    //base on the key
    var dataInput = requestCondition.data
    if (window.localStorage && window.localStorage["work_flow::" + requestCondition.symbol]) {
        var json = JSON.parse(window.localStorage["work_flow::" + requestCondition.symbol]);
        json.data = saveOrUpdateElement(json.data, dataInput, requestCondition.type)
        window.localStorage["work_flow::" + requestCondition.symbol] = JSON.stringify(json);
        return (dispatch, getState) => {
            return dispatch({type: AFTER_SAVE_ELEMENT, requestCondition, data: json.data})
        }
    }
    return (dispatch, getState) => {
        return dispatch({type: AFTER_SAVE_ELEMENT, requestCondition})
    }
}
//delete one single element, rebuild the data structure,because of delete the related elements
export function deleteElement(requestCondition) {
    //base on the key
    if (window.localStorage && window.localStorage["work_flow::" + requestCondition.symbol]) {
        var json = JSON.parse(window.localStorage["work_flow::" + requestCondition.symbol]);
        var item = requestCondition.nowDelete;
        json.data = deleteElementInternal(item, json.data)
        window.localStorage["work_flow::" + requestCondition.symbol] = JSON.stringify(json);
        return (dispatch, getState) => {
            return dispatch({type: DELETE_ELEMENT, requestCondition, data: json.data})
        }
    } else {
        return (dispatch, getState) => {
            return dispatch({type: DELETE_ELEMENT, requestCondition})
        }
    }
}
export function deleteElementInternal(item, data) {
    var items = data[item.level]
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
            items.splice(i, 1);
            // base on the item find the children-->sub children delete, find the parent and release the connection!!!
            break
        }
    }
    if (item) {
        items = data[item.level - 1]
        if (items && item.parentId) {
            for (var i = 0; i < items.length; i++) {
                var itemSub = items[i]
                if (item.parentId.indexOf(itemSub.id) > -1) {
                    if (itemSub.childId) {
                        itemSub.childId.splice(itemSub.childId.indexOf(item.id), 1);
                    }
                }
            }
        }
        //不进行递归的删除处理，而仅删除第一层关系
        // var itemsTemp = [];
        // itemsTemp = iterationFlowDelete(item, data, item.level + 1, itemsTemp)
        // for (var i = 0; i < itemsTemp.length; i++) {
        //     var obj = itemsTemp[i];
        //     data[obj.x].splice(obj.y, 1);
        // }
        items = data[item.level + 1]
        if (items && item.childId) {
            for (var j = 0; j < items.length; j++) {
                var itemSub = items[j]
                if (itemSub.parentId) {
                    var index = itemSub.parentId.indexOf(item.id)
                    if (index > -1) {
                        itemSub.parentId.splice(index, 1)
                    }
                }
            }
        }
    }
    return data
}

export function iterationFlowDelete(item, data, level, dataReturn) {
    var items = data[level]
    if (items) {
        for (var j = 0; j < items.length; j++) {
            var itemSub = items[j]
            if (itemSub.parentId && itemSub.parentId.length == 1 && itemSub.parentId.indexOf(item.id) > -1) {
                dataReturn.push({x: level, y: j})
                iterationFlowDelete(itemSub, data, level + 1, dataReturn)
            }
        }
    }
    return dataReturn
}


export function createBasicSvg(_this, type) {
    var el = _this.refs.wrapper;
    _this.d3 = {svgContainer: d3.select(el).append("svg")}
    var defs = _this.d3.svgContainer.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "150%");
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");
    var feOffset = filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 5)
        .attr("dy", 5)
        .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
    var arrowMarker = defs.append("marker")
        .attr("id", "arrow-marker")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("viewBox", "0 0 6 6")
        .attr("refX", 3)
        .attr("refY", 3)
        .attr("orient", "auto")
    arrowMarker.append("path")
        .attr("d", "M1,1 L5,3 L1,5 L3,3 L1,1")
        .style("fill", "#000")
    let sampleGroup =
        _this.d3.workGroup = new WorkGroup(_this);
    _this.d3.trashGroup = new TrashGroup(_this);
    _this.d3.sampleGroup = new SampleGroup(_this,
        (type && type == 'positions') ? _this.defaultPositionsFlowSample : _this.defaultWorkFlowSample);
}

export function resizeSvg(_this) {
    _this.d3.svgContainer.attr("width", _this.state.size.w)
        .attr("height", _this.state.size.h);
    _this.d3.sampleGroup.resize(_this.state.size.w, _this.state.size.h);
    _this.d3.workGroup.resize(_this.state.size.w, _this.state.size.h, _this.props.workData);
    _this.d3.trashGroup.resize(_this.state.size.w, _this.state.size.h);
}
export function cleanWorkflowDialog(_this) {
    Modal.createModal.bind(_this, {modalValues: dragDropRules.cleanWorkflowDialog, type: 'messageConfirm'})()
}


export function saveOrUpdateElement(data, dataInput, type) {
    var items = data ? data[dataInput.level] : null
    var insertFlag = true;
    if (!items) {
        items = [dataInput]
        if (data) {
            data.push(items)
        } else {
            data = [items]
        }
    } else {
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            if (items[i].id == dataInput.id) {
                items[i] = dataInput;
                //here shall give the parentId and the childId
                if (dataInput.parent && dataInput.parent.length > 0) {
                    dataInput.parentId = dataInput.parent
                }

                if (dataInput.child) {
                    dataInput.childId = Array.isArray(dataInput.child) ? dataInput.child : [dataInput.child]
                }

                if (dataInput.parentRoles || dataInput.parentPositions) {
                    var parent1 = dataInput.parentRoles ? dataInput.parentRoles : []
                    var parent2 = dataInput.parentPositions ? dataInput.parentPositions : []
                    dataInput.parentId = parent1.concat(parent2)
                    dataInput.parentId = dataInput.parentId.length > 0 ? dataInput.parentId : null
                }
                if (dataInput.childRoles || dataInput.childPositions) {
                    var child1 = dataInput.childRoles ? dataInput.childRoles : []
                    var child2 = dataInput.childPositions ? dataInput.childPositions : []
                    dataInput.childId = child1.concat(child2)
                    dataInput.childId = dataInput.childId.length > 0 ? dataInput.childId : null
                }
                insertFlag = false;
                break
            } else if (item.level == dataInput.level && (dataInput.elementId && item.type == dataInput.type && item.elementId == dataInput.elementId)) {
                if (dataInput.parentId) {
                    if (item.parentId) {
                        item.parentId = l_uniq(item.parentId.concat(dataInput.parentId))
                    } else {
                        item.parentId = dataInput.parentId
                    }
                }
                if (dataInput.childId) {
                    if (item.childId) {
                        item.childId = l_uniq(item.childId.concat(dataInput.childId))
                    } else {
                        item.childId = dataInput.childId
                    }
                }
                insertFlag = false;
                break
            }
        }
        if (insertFlag) {
            items.push(dataInput);
        }
    }
    if (data[dataInput.level - 1]) {
        items = data[dataInput.level - 1]
        if (type == "actions") {
            for (var i = 0; i < items.length; i++) {
                if (dataInput.parentId && dataInput.parentId.indexOf(items[i].id) > -1) {
                    var childId = items[i].childId;
                    if (items[i].type != "action") {
                        if (childId) {
                            for (var j = 0; j < childId.length; j++) {
                                if (childId[j] != dataInput.id) {
                                    for (var k = 0; k < data[dataInput.level].length; k++) {
                                        if (data[dataInput.level][k].id == childId[j]) {
                                            if (data[dataInput.level][k].parentId) {
                                                data[dataInput.level][k].parentId.splice(data[dataInput.level][k].parentId.indexOf(items[i].id), 1)
                                            }
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        items[i].childId = [dataInput.id];
                    } else if (!childId) {
                        items[i].childId = [dataInput.id];
                    } else if (childId && childId.indexOf(dataInput.id) < 0) {
                        items[i].childId.push(dataInput.id)
                    }
                } else if (items[i].childId && items[i].childId.indexOf(dataInput.id) > -1) {
                    items[i].childId.splice(items[i].childId.indexOf(dataInput.id), 1)
                }
            }
        } else if (type == "positions") {
            //此处需要重新处理
            for (var i = 0; i < items.length; i++) {
                if (dataInput.parentId && dataInput.parentId.indexOf(items[i].id) > -1) {
                    var childId = items[i].childId;
                    if (childId) {
                        items[i].childId = l_uniq(childId.concat(dataInput.id))
                    } else {
                        items[i].childId = [dataInput.id];
                    }
                } else if (items[i].childId && items[i].childId.indexOf(dataInput.id) > -1) {
                    items[i].childId.splice(items[i].childId.indexOf(dataInput.id), 1)
                }
            }
        }
    }
    if (data[dataInput.level + 1]) {
        items = data[dataInput.level + 1]
        for (var i = 0; i < items.length; i++) {
            if (dataInput.childId && dataInput.childId.indexOf(items[i].id) > -1) {
                var parentId = items[i].parentId;
                if (!parentId) {
                    items[i].parentId = [dataInput.id];
                } else if (parentId && parentId.indexOf(dataInput.id) < 0) {
                    items[i].parentId.push(dataInput.id)
                }
            } else if (items[i].parentId && items[i].parentId.indexOf(dataInput.id) > -1) {
                items[i].parentId.splice(items[i].parentId.indexOf(dataInput.id), 1)
            }
        }
    }
    return data
}

export function deleteElementDialog(data) {
    this.state.nowDelete = data;
    Modal.createModal.bind(this, {modalValues: dragDropRules.deleteElementDialog, type: 'messageConfirm'})()
}

