import {getIndexDemoTableDispatch} from '../../actions/table'
import {demoTableRules} from '../../middleware/table'


class BaseTable extends React.Component {

    componentWillMount() {
        //this.props.getIndexDemoTableDispatch({})
    }

    render() {
        return <Table.CondensedTable minHeight={300} tableRules={demoTableRules} {...this.props} />
    }
}

BaseTable.propTypes = {
    tableData: React.PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    if (state && state.table && state.table.demoTable) {
        const {
            demoTableData,
            keys,
            totalCount
        } = state.table.demoTable
        const tableData = keys.map(id => demoTableData[id]);
        return {tableData, totalCount}
    } else {
        return {};
    }
}


export default ReactRedux.connect(mapStateToProps, {
})(BaseTable)