/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./table.scss');
import {
    getTableDispatch,
    deleteTableRowDispatch,
    addTableRowDispatch,
    updateTableRowDispatch,
    updateTableColumnDispatch,
    refreshTableDispatch
} from './actions'
const defaultRowSizeOptions = [
    {value: 5, label: 5},
    {value: 10, label: 10},
    {value: 15, label: 15},
    {value: 20, label: 20},
    {value: 25, label: 25}
];
const defaultCurrentSize = 5;
const deleteRowConfirmModalData = {
    content: <span>删除一行，无法恢复.</span>,
    title: '确定要删除该记录?',
    closeFun: function () {
        console.log('before close');
        return true;
    },
    footerConfirmButton: {
        callback: function () {
            this.deleteRow();
        },
        title: '确认',
    },
    footerCloseButton: {
        visible: true,
        title: '取消',
    },
};

class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableId = 'id-' + this.props.symbol;
        this.state = {
            pager: {
                show: false,
                currentValue: 0,
                rowSize: {
                    show: false
                }
            },
            sort: {available: false},
            filter: {available: false},
            currentEditTdDom: {},
            init: true
        };

        if (this.props.panelActionCallBack) {
            this.props.panelActionCallBack.clickEvent = function () {
                if (this.state.currentEditTdDom.dom && this.state.currentEditTdDom.dom.classList.contains('open')) {
                    this.state.currentEditTdDom.dom.classList.remove('open');
                    this.props.updateColumn && this.props.updateColumn({
                        key: this.state.currentEditTdDom.rowKey,
                        data: [{'name': this.state.currentEditTdDom.name, value: this.state.currentEditTdDom.value}]
                    });
                }
            }.bind(this);
        }
    }

    componentWillMount() {
        this.getList();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tableRules && this.state.init) {
            this.state.init = false;
            var additionalFeature = nextProps.additionalFeature;
            if (additionalFeature && additionalFeature.pager) {
                this.state.pager.show = true;
                this.state.pager.options = [{label: 1, value: 0}, {label: 2, value: 1}, {
                    label: 3,
                    value: 2
                }, {label: 4, value: 3}];
                if (additionalFeature.pager.rowSize && additionalFeature.pager.rowSize.show) {
                    this.state.pager.rowSize.show = true;
                    this.state.pager.rowSize.options = additionalFeature.pager.rowSize.options ? additionalFeature.pager.rowSize.options : defaultRowSizeOptions;
                    this.state.pager.rowSize.value = additionalFeature.pager.rowSize.currentSize ? additionalFeature.pager.rowSize.currentSize : defaultCurrentSize;
                }
            }
            if (additionalFeature && additionalFeature.sortAvailable) {
                this.state.sort.available = true;
            }
            if (additionalFeature && additionalFeature.filterAvailable) {
                this.state.filter.available = true;
                this.state.filter.data = {};
            }

            if (additionalFeature && additionalFeature.editable) {
                this.state.editable = true;
            }
            if (additionalFeature && additionalFeature.deletable) {
                this.state.deletable = true;
            }
            if (additionalFeature && additionalFeature.addable) {
                this.state.addable = true;
            }

            if (nextProps.tableRules && nextProps.tableRules.thead) {
                nextProps.tableRules.thead.map(function (subItem, index) {
                    if (this.state.sort.available) {
                        if (subItem.sort) {
                            this.state.sort.currentTh = {sortName: subItem.value, sortDirection: subItem.sort};
                        }
                    }
                }, this);
            }
        }
        if (nextProps.tableRefresh) {
            this.props.refreshTableDispatch({symbol: this.props.symbol});
        }
    }

    getList() {

        this.props.getTableDispatch && this.props.getTableDispatch({
            filters: this.state.filter.available ? this.state.filter.data : null,
            sort: this.state.sort.available ? this.state.sort.currentTh : null,
            rowSize: this.state.pager.rowSize.show ? this.state.pager.rowSize.value : null,
            currentPage: this.state.pager.currentValue ? this.state.pager.currentValue : 0,
            endpoint: this.props.endpoints.getTableUrl,
            symbol: this.props.symbol,
            init: this.state.init
        })
    }

    getPagerOptionsByTotalCount() {
        if (this.state.pager.show) {
            var currentPage = this.state.pager.currentValue;
            var rowSize = this.state.pager.rowSize.value;
            var totalCount = this.props.totalCount;
            var totalPager = Math.ceil(totalCount / rowSize);
            this.state.pager.options = [];
            var beginIndex = currentPage > 1 ? currentPage - 2 : 0;
            if (currentPage + 2 > totalPager - 1 && totalPager - 5 > -1) {
                beginIndex = totalPager - 5;
            }
            var endIndex = currentPage + 2;
            if (endIndex > totalPager - 1 || (endIndex < 4 && totalPager - 1 < 4)) {
                endIndex = totalPager - 1;
            } else if (endIndex < 4 && totalPager - 1 >= 4) {
                endIndex = 4;
            }
            for (var i = beginIndex; i <= endIndex; i++) {
                this.state.pager.options.push({label: i + 1, value: i});
            }
            if (beginIndex > 0) {
                this.state.pager.options.unshift({label: '...', value: beginIndex - 1});
            }
            if (endIndex < totalPager - 1) {
                this.state.pager.options.push({label: '...', value: endIndex + 1});
            }
        }
    }

    onRowSizeChange(value) {
        this.state.pager.rowSize.value = value ? value.value : null;
        this.state.pager.currentValue = 0;
        this.forceUpdate();
        this.getList();
    }

    onPagerClick(value) {
        this.state.pager.currentValue = value;
        this.forceUpdate();
        this.getList();
    }

    onSortClick(sortName) {
        if (this.state.sort.currentTh && this.state.sort.currentTh.sortName == sortName) {
            this.state.sort.currentTh.sortDirection = this.state.sort.currentTh.sortDirection == 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sort.currentTh = {sortName: sortName, sortDirection: 'asc'};
        }
        this.forceUpdate();
        UtilFun.delay(this.sortClick.bind(this, sortName), 400);
    }

    sortClick(sortName) {
        this.state.pager.currentValue = 0;
        this.getList();
    }

    onFilterChange(filterName, type, e) {

        if (!UtilFun.formTypeValue(type, e, this.state.filter.data[filterName])) {
            delete this.state.filter.data[filterName];
        } else {
            this.state.filter.data[filterName] = UtilFun.formTypeValue(type, e, this.state.filter.data[filterName])
        }
        this.forceUpdate();
        UtilFun.delay(this.filterChange.bind(this, filterName), 400);
    }

    filterChange(filterName) {
        this.state.pager.currentValue = 0;
        this.getList();
    }


    onRowAddChange(name, type, e) {
        this.state.addData[name] = UtilFun.formTypeValue(type, e, this.state.addData[name])
        this.forceUpdate();
    }

    onRowAdd() {
        //which shall be at top wrapper
        this.tableRoot.querySelector('thead tr.theadRowAdd').style.display = 'table-row';
    }


    onRowSave() {
        this.state.addData.endpoint = this.props.endpoints.addTableRowUrl
        this.state.addData.symbol = this.props.symbol
        this.props.addTableRowDispatch && this.props.addTableRowDispatch(this.state.addData)
        this.state.addData = {};
        this.tableRoot.querySelector('thead tr.theadRowAdd').style.display = 'none';
    }

    onRowCancel() {
        this.tableRoot.querySelector('thead tr.theadRowAdd').style.display = 'none';
    }


    renderBasic(tableExtraClass) {
        this.getPagerOptionsByTotalCount();
        var additionalFeature = this.props.additionalFeature;
        var tableClass = classNames('table', tableExtraClass,
            (additionalFeature && additionalFeature.extraClass ? additionalFeature.extraClass : null));
        var style = null;
        if (this.props.minHeight) {
            style = {
                height: 1,
                minHeight: this.props.minHeight
            };
        }
        var thead = null;
        if (this.props.tableRules && this.props.tableRules.thead) {
            thead = this.props.tableRules.thead.map(function (subItem, index) {
                var sortItem = null;
                var onclick = null;
                var subItemClassName = subItem.className;
                if (this.state.sort && this.state.sort.available && subItem.sortable) {
                    onclick = this.onSortClick.bind(this, subItem.value);
                    subItemClassName = classNames(subItemClassName, 'sortAvailable');
                    var sortClass = classNames('fa th-sort');
                    if (this.state.sort.currentTh && this.state.sort.currentTh.sortName == subItem.value) {
                        sortClass = classNames(sortClass, this.state.sort.currentTh.sortDirection);
                    }
                    sortItem = <span className={sortClass}></span>;
                }
                return (<th key={index} className={subItemClassName}
                            colSpan={subItem.colSpan ? subItem.colSpan : null}
                            data-value={subItem.value} onClick={onclick}>{subItem.title}{sortItem}</th>);
            }, this);
            if ('row-editable' === tableExtraClass) {
                thead.push(<th key={thead.length}>Actions</th>);
            }
        }


        var theadFilter = null;
        if (this.props.tableRules && this.props.tableRules.thead && this.state.filter && this.state.filter.available) {
            theadFilter = this.props.tableRules.thead.map(function (subItem, index) {
                var onFilter = this.onFilterChange.bind(this, subItem.value, subItem.editType);
                var editContent = null;
                var className = '';
                if (subItem.editType == 'text') {
                    className = 'form-control';
                }
                if (subItem.filter) {
                    editContent = UtilFun.formType({
                        type: subItem.editType,
                        name: subItem.value,
                        value: this.state.filter.data[subItem.value] ? this.state.filter.data[subItem.value] : null,
                        onChangeCallback: onFilter,
                        options: subItem.editValue,
                        className: className
                    });
                }
                return (
                    <th key={index} colSpan={subItem.colSpan ? subItem.colSpan : null}>{editContent}
                    </th>);
            }, this);
            if ('row-editable' === tableExtraClass) {
                theadFilter.push(<th key={thead.length}></th>);
            }
        }
        var tbody = <TableRowWrapper {...this.props} tableId={this.tableId}
                                                     tableType={this.tableType}
                                                     editable={this.state.editable}
                                                     deletable={this.state.deletable}
                                                     getList={this.getList.bind(this)}
                                                     currentEditTdDom={this.state.currentEditTdDom}
        />;
        var tfoot = null;
        if (this.props.tableRules && this.props.tableRules.tfoot) {
            tfoot = this.props.tableRules.tfoot.map(function (subItem, index) {
                return (<td key={index}
                            colSpan={subItem.colSpan ?(subItem.colSpan+('row-editable' === tableExtraClass?1:0)) : null}
                            className={subItem.className}>{subItem.title}<span
                    style={{float:"right"}}>共{this.props.totalCount}条记录</span></td>);
            }, this);
        }
        var topOperations = [];
        var bottomOperations = [];
        var theadRowAdd = null;
        if (this.state.addable && tableExtraClass == 'row-editable' && this.props.endpoints.addTableRowUrl) {
            topOperations.push(<button key={topOperations.length} className="btn btn-primary btn-add-row"
                                       onClick={this.onRowAdd.bind(this)}>Add
                row</button>);
            if (this.props.tableRules && this.props.tableRules.thead) {
                theadRowAdd = this.props.tableRules.thead.map(function (subItem, index) {
                    var onRowAddChange = this.onRowAddChange.bind(this, subItem.value, subItem.editType);
                    var editContent = null;
                    var className = '';
                    if (subItem.editType == 'text') {
                        className = 'form-control';
                    }
                    if (subItem.addable) {
                        editContent = UtilFun.formType({
                            type: subItem.editType,
                            name: subItem.value + '-add',
                            value: this.state.addData[subItem.value] ? this.state.addData[subItem.value] : null,
                            onChangeCallback: onRowAddChange,
                            options: subItem.editValue,
                            className: className
                        });
                    }
                    return (
                        <th key={index} colSpan={subItem.colSpan ? subItem.colSpan : null}>{editContent}
                        </th>);
                }, this);
                if ('row-editable' === tableExtraClass) {
                    theadRowAdd.push(<th key='add-actions' className="td-row-actions">
                        <div className="btn-group btn-group-xs editing">
                            <button className="btn btn-primary btn-xs save"
                                    onClick={this.onRowSave.bind(this)}>
                                Save
                            </button>
                            <button className="btn btn-danger btn-xs cancel"
                                    onClick={this.onRowCancel.bind(this)}>
                                Cancel
                            </button>
                        </div>
                    </th>);
                }
            }
        }
        if (this.state.addable && tableExtraClass == 'row-editable' && this.props.addUrl) {
            //router to new page
            topOperations.push(
                <ReactRouter.Link key={topOperations.length} className={"btn btn-primary btn-add-row"}
                                  to={this.props.addUrl}>
                    <span>添加记录</span>
                </ReactRouter.Link>);
        }
        if (this.state.pager && this.state.pager.rowSize && this.state.pager.rowSize.show) {
            topOperations.push(<Select key={topOperations.length}
                                       value={this.state.pager.rowSize.value ? this.state.pager.rowSize.value : null}
                                       className="select-row-size" name='rowSize'
                                       placeholder="Select your row size"
                                       clearable={false}
                                       options={this.state.pager.rowSize.options}
                                       onChange={this.onRowSizeChange.bind(this)}
            >
            </Select>);

        }
        if (this.state.pager && this.state.pager.show) {
            var pagerOptions = this.state.pager.options;
            var pagerA = pagerOptions.map(function (subItem, index) {
                var className = classNames('btn btn-sm btn-default', {'active': subItem.value == this.state.pager.currentValue});
                return (
                    <a key={index} data-value={subItem.value} className={className}
                       onClick={this.onPagerClick.bind(this,subItem.value)}>{subItem.label}</a>);
            }.bind(this));
            bottomOperations.push(
                <div key={bottomOperations.length} className="btn-group btn-group-sm btn-pager">
                    {pagerA}
                </div>
            );
        }
        return (
            <div className="table-root" ref={(ref) => this.tableRoot = ref} id={this.tableId}>
                {topOperations.length > 0 ?
                    <div className="top-operations">{topOperations}<br className="clearfix-bottom"/></div> : null }
                <div className="table-content" style={style}>
                    <CustomScrollbar>
                        <table className={tableClass}>
                            <thead>
                            <tr>
                                {thead}
                            </tr>
                            {theadFilter ? <tr className="theadFilter">
                                {theadFilter}
                            </tr> : null}
                            {theadRowAdd ? <tr className="theadRowAdd">
                                {theadRowAdd}
                            </tr> : null}
                            </thead>
                            <tfoot>
                            <tr className={(tableExtraClass == 'striped' || (additionalFeature && additionalFeature.extraClass == 'striped') ) && this.props.tableData&&this.props.tableData.length % 2 == 0 ? 'tr-deep' : null}>
                                {tfoot}
                            </tr>
                            </tfoot>
                            {tbody}
                        </table>
                    </CustomScrollbar>
                </div>
                {bottomOperations.length > 0 ? <div className="bottom-operations">{bottomOperations}</div> : null }
            </div>
        );
    }
}


class TableRowWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var tableRows = this.props.tableData && this.props.tableData.map(function (row, index) {
                return (
                    <TableRow key={index} rowData={row} rowIndex={index}   {...this.props}  />
                );
            }, this);
        return (
            <tbody>
            {tableRows}
            </tbody>
        );
    }
}

class TableRow extends React.Component {

    constructor(props) {
        super(props);
        this.currentData = [];
        //this.currentTdData = {};
        this.state = {rowEditState: false};
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.rowEditState) {
            this.trDom.classList.add('edit');
        } else {
            this.trDom.classList.remove('edit');
        }
    }

    onRowDelete(key) {
        Modal.createModal.bind(this, {modalValues: deleteRowConfirmModalData, type: 'messageConfirm'})();
    }

    deleteRow() {
        this.props.deleteTableRowDispatch && this.props.deleteTableRowDispatch({
            key: this.props.rowData.key,
            endpoint: this.props.endpoints.deleteTableRowUrl,
            symbol: this.props.symbol
        })
    }

    onRowEdit() {
        this.props.rowData.value.map(function (subItem, index) {
            this.currentData[index] = subItem.value;
        }, this);
        this.state.rowEditState = true;
        this.forceUpdate();
    }

    onRowSave(rowKey) {
        this.props.updateTableRowDispatch && this.props.updateTableRowDispatch({
            key: this.props.rowData.key,
            data: this.props.rowData.value,
            endpoint: this.props.endpoints.updateTableRowUrl,
            symbol: this.props.symbol
        });
        this.state.rowEditState = false;
        this.forceUpdate();
    }

    onRowCancel() {
        this.props.rowData.value.map(function (subItem, index) {
            subItem.value = this.currentData[index];
        }, this);
        this.state.rowEditState = false;
        this.forceUpdate();
    }

    render() {
        var rowIndex = this.props.rowIndex;
        var tds = this.props.rowData.value.map(function (subItem, index) {
            return <TableTd key={index} tdData={subItem} rowKey={this.props.rowData.key} rowIndex={rowIndex}
                            rowEditState={this.state.rowEditState}
                            theadItem={ this.props.tableRules.thead ? this.props.tableRules.thead[index] : null}
                            currentEditTdDom={this.props.currentEditTdDom} {...this.props}></TableTd>;
        }, this);
        if (this.props.tableType == 'row-editable') {
            tds.push(<td key='row-actions' className="td-row-actions">
                <div className="btn-group btn-group-xs edited">
                    {this.props.editable && this.props.endpoints.updateTableRowUrl &&
                    <button className="btn btn-primary btn-xs edit"
                            onClick={this.onRowEdit.bind(this)}>
                        Edit
                    </button>
                    }
                    {this.props.deletable && this.props.endpoints.deleteTableRowUrl &&
                    <button className="btn btn-danger btn-xs delete"
                            onClick={this.onRowDelete.bind(this)}>
                        Delete
                    </button>
                    }
                </div>
                {this.props.editable && this.props.endpoints.updateTableRowUrl &&
                <div className="btn-group btn-group-xs editing">
                    <button className="btn btn-primary btn-xs save"
                            onClick={this.onRowSave.bind(this)}>
                        Save
                    </button>
                    <button className="btn btn-danger btn-xs cancel"
                            onClick={this.onRowCancel.bind(this)}>
                        Cancel
                    </button>

                </div> }
            </td>);
        }
        return (<tr ref={(ref) => this.trDom = ref} key={this.props.rowData.key}>{tds}</tr>);
    }
}
class TableTd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tdEditState: false, tdData: this.props.tdData};
    }

    componentWillReceiveProps(nextProps) {
        this.state.tdData = nextProps.tdData;
    }

    onTdEdit(type, e) {
        this.state.tdData = UtilFun.formTypeValue(type, e, this.state.tdData)
        this.props.currentEditTdDom.value = this.state.tdData
        this.forceUpdate();
    }

    onTdClick(name, e) {
        if (!this.props.rowEditState) {
            this.state.tdEditState = true;
            if (this.props.currentEditTdDom.dom) {
                this.props.currentEditTdDom.dom.classList.remove('open');
            }
            this.props.currentEditTdDom.dom = this.tdDom;
            this.props.currentEditTdDom.rowKey = this.props.rowKey;
            this.props.currentEditTdDom.name = this.props.theadItem.value;
            this.props.currentEditTdDom.value = this.state.tdData;
            this.tdDom.classList.add('open');
            this.currentData = this.state.tdData;
            this.forceUpdate();
            e.stopPropagation();
        }
    }

    onTdSave(e) {
        this.props.updateTableColumnDispatch && this.props.updateTableColumnDispatch({
            key: this.props.rowKey,
            data: [{'name': this.props.theadItem.value, value: this.state.tdData}],
            endpoint: this.props.endpoints.updateTableColumnUrl,
            symbol: this.props.symbol
        });
        this.tdDom.classList.remove('open');
        e.stopPropagation();
    }

    onTdCancel(name, e) {
        this.state.tdData = this.currentData;
        this.tdDom.classList.remove('open');
        this.state.tdEditState = false;
        this.forceUpdate();
        e.stopPropagation();
    }

    render() {
        var tdItem = this.state.tdData;
        var rowIndex = this.props.rowIndex;
        var theadItem = this.props.theadItem;
        var rowEditState = this.props.rowEditState;
        var editContent = null;
        var columnEditContent = null;
        var columnEditContentAction = null;
        var tdValueClassName = 'td-value';
        if (this.props.editable && theadItem && theadItem.editable && rowEditState) {
            var className = '';
            if (theadItem.editType == 'text') {
                className = 'input-text';
            }
            editContent = UtilFun.formType({
                type: theadItem.editType,
                name: theadItem.value + '-' + this.props.rowKey,
                value: tdItem,
                onChangeCallback: this.onTdEdit.bind(this, theadItem.editType),
                options: theadItem.editValue,
                className: className
            });
            this.state.tdEditState = false;
        }
        if (this.props.editable && theadItem && theadItem.columnEditable) {
            tdValueClassName = tdValueClassName + ' column-edit';
        }
        if (this.props.editable && theadItem && theadItem.columnEditable && this.state.tdEditState) {
            var className = 'column-editable';
            if (theadItem.editType == 'text') {
                className = className + ' input-text';
            }
            columnEditContent = UtilFun.formType({
                type: theadItem.editType,
                name: theadItem.value + '-' + this.props.rowKey,
                value: tdItem,
                onChangeCallback: this.onTdEdit.bind(this, theadItem.editType),
                options: theadItem.editValue,
                className: className
            });
            columnEditContentAction =
                <div key='td-actions' className="column-editable btn-group btn-group-xs edited">
                    <button className="btn btn-primary btn-xs save"
                            onClick={this.onTdSave.bind(this)}>
                        <i className="fa"></i>
                    </button>
                    <button className="btn btn-danger btn-xs cancel"
                            onClick={this.onTdCancel.bind(this,theadItem.value)}>
                        <i className="fa"></i>
                    </button>
                </div>;

        }
        return (<td ref={(ref) => this.tdDom = ref} colSpan={theadItem.colSpan ? theadItem.colSpan : null}
                    className={ classNames(theadItem.className, this.props.editable && theadItem && theadItem.columnEditable ? 'td-editable' : null,this.props.editable && theadItem && theadItem.className == 'td-id' ? 'td-editable' : null)}
                    onClick={this.props.editable && theadItem && theadItem.columnEditable && this.onTdClick.bind(this,theadItem.value)}>{
            this.props.editable && theadItem.className == 'td-id' &&
            <ReactRouter.Link to={{ pathname: this.props.updateUrl, query: { key: this.props.rowKey }}}>
                <span
                    className={tdValueClassName}>{!tdItem ? rowIndex + 1 + (this.props.rowSize ? this.props.rowSize * this.props.currentPage : 0) : tdItem.toString()}</span>
            </ReactRouter.Link>
        }{
            !this.props.editable && theadItem.className == 'td-id' &&
            <span
                className={tdValueClassName}>{!tdItem ? rowIndex + 1 + (this.props.rowSize ? this.props.rowSize * this.props.currentPage : 0) : tdItem.toString()}</span>
        }{
            theadItem.className != 'td-id' &&
            <span className={tdValueClassName}>{tdItem.toString()}</span>
        }{editContent}{columnEditContent}{columnEditContentAction}
        </td>);
    }
}

BasicTable.propTypes = {
    minHeight: React.PropTypes.number,
    endpoints: React.PropTypes.object,

    status: React.PropTypes.string,
    message: React.PropTypes.string,
    keys: React.PropTypes.array,
    tableData: React.PropTypes.array,
    tableRules: React.PropTypes.object,
    additionalFeature: React.PropTypes.object,
    totalCount: React.PropTypes.number,

    getTableDispatch: React.PropTypes.func,
    deleteTableRowDispatch: React.PropTypes.func,
    addTableRowDispatch: React.PropTypes.func,
    updateTableRowDispatch: React.PropTypes.func,
    updateTableColumnDispatch: React.PropTypes.func,
    refreshTableDispatch: React.PropTypes.func,

    panelActionCallBack: React.PropTypes.object,
};


class DefaultTable extends BasicTable {
    render() {
        return (
            this.renderBasic()
        );
    }
}

class HoverTable extends BasicTable {
    render() {
        return (
            this.renderBasic('hover')
        );
    }
}

class BorderTable extends BasicTable {
    render() {
        return (
            this.renderBasic('border')
        );
    }
}
class CondensedTable extends BasicTable {
    render() {
        return (
            this.renderBasic('condensed')
        );
    }
}
class StripedTable extends BasicTable {
    render() {
        return (
            this.renderBasic('striped')
        );
    }
}

class RowEditableTable extends BasicTable {
    constructor(props) {
        super(props);
        this.tableType = 'row-editable';
        this.state.addData = {};
    }

    render() {
        return (
            this.renderBasic('row-editable')
        );
    }
}
function mapStateToProps(state, ownProps) {
    if (ownProps.symbol && state && state.table && state.table.main[ownProps.symbol]) {
        const {
            status,
            message,
            keys,
            tableData,
            tableRules,
            additionalFeature,
            totalCount,
            rowSize,
            currentPage,
            tableRefresh
        } = state.table.main[ownProps.symbol]
        return {
            status,
            message,
            keys,
            tableData,
            tableRules,
            additionalFeature,
            totalCount,
            rowSize,
            currentPage,
            tableRefresh
        }
    } else {
        return {};
    }
}
module.exports = {
    DefaultTable: ReactRedux.connect(mapStateToProps, {
        getTableDispatch,
        deleteTableRowDispatch,
        addTableRowDispatch,
        updateTableRowDispatch,
        updateTableColumnDispatch,
        refreshTableDispatch
    })(DefaultTable),
    HoverTable: ReactRedux.connect(mapStateToProps, {
        getTableDispatch,
        deleteTableRowDispatch,
        addTableRowDispatch,
        updateTableRowDispatch,
        updateTableColumnDispatch,
        refreshTableDispatch
    })(HoverTable),
    BorderTable: ReactRedux.connect(mapStateToProps, {
        getTableDispatch,
        deleteTableRowDispatch,
        addTableRowDispatch,
        updateTableRowDispatch,
        updateTableColumnDispatch,
        refreshTableDispatch
    })(BorderTable),
    CondensedTable: ReactRedux.connect(mapStateToProps, {
        getTableDispatch,
        deleteTableRowDispatch,
        addTableRowDispatch,
        updateTableRowDispatch,
        updateTableColumnDispatch,
        refreshTableDispatch
    })(CondensedTable),
    StripedTable: ReactRedux.connect(mapStateToProps, {
        getTableDispatch,
        deleteTableRowDispatch,
        addTableRowDispatch,
        updateTableRowDispatch,
        updateTableColumnDispatch,
        refreshTableDispatch
    })(StripedTable),
    RowEditableTable: ReactRedux.connect(mapStateToProps, {
        getTableDispatch,
        deleteTableRowDispatch,
        addTableRowDispatch,
        updateTableRowDispatch,
        updateTableColumnDispatch,
        refreshTableDispatch
    })(RowEditableTable)
};