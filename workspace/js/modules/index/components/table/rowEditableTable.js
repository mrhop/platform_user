import {getIndexDemoTableDispatch, deleteDemoTableDispatch, addDemoTableDispatch,updateDemoTableDispatch,updateColumnDemoTableDispatch} from '../../actions/table'
import {demoTableRules, rowEditableAdditionalFeature} from '../../middleware/table'


class RowEditableTable extends React.Component {

    deleteRow(requestCondition) {
        this.props.deleteDemoTableDispatch(requestCondition);
    }

    getList(requestCondition) {
        this.props.getIndexDemoTableDispatch(requestCondition);
    }

    saveRow(requestCondition) {
        this.props.addDemoTableDispatch(requestCondition);
    }

    updateRow(requestCondition) {
        this.props.updateDemoTableDispatch(requestCondition);
    }

    updateColumn(requestCondition) {
        this.props.updateColumnDemoTableDispatch(requestCondition);
    }

    render() {
        return <Table.RowEditableTable {...this.props} tableRules={demoTableRules}
                                                       additionalFeature={rowEditableAdditionalFeature}
                                                       minHeight={300} deleteRow={this.deleteRow.bind(this)}
                                                       getList={this.getList.bind(this)} saveRow ={this.saveRow.bind(this)}
                                                       updateRow={this.updateRow.bind(this)} updateColumn ={this.updateColumn.bind(this)}/>
    }
}


RowEditableTable.propTypes = {
    tableData: React.PropTypes.array,
    totalCount: React.PropTypes.number,
    getIndexDemoTableDispatch: React.PropTypes.func.isRequired,
    deleteDemoTableDispatch: React.PropTypes.func.isRequired
}
function mapStateToProps(state, ownProps) {
    if (state && state.table && state.table.demoTable) {
        const {
            table: {
                demoTable: {
                    demoTableData,
                    keys,
                    totalCount
                }
            }
        } = state
        const tableData = keys.map(id => demoTableData[id]);
        return {tableData, totalCount}
    } else {
        return {};
    }
}

export default ReactRedux.connect(mapStateToProps, {
    getIndexDemoTableDispatch,
    deleteDemoTableDispatch,
    addDemoTableDispatch,
    updateDemoTableDispatch,
    updateColumnDemoTableDispatch
})(RowEditableTable)
