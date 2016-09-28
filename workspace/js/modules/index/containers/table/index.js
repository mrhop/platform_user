/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import BaseTable from '../../components/table/baseTable';
import BaseBorderTable from '../../components/table/baseBorderTable';
import BaseCondensedTable from '../../components/table/baseCondensedTable';
import BaseHoverTable from '../../components/table/baseHoverTable';
import BaseStripedTable from '../../components/table/baseStripedTable';
import RowEditableTable from '../../components/table/rowEditableTable';
import {getIndexDemoTableDispatch, refreshDemoTableDispatch} from '../../actions/table';
class TableMainBlock extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //data init
        this.props.getIndexDemoTableDispatch()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.demoTableRefresh) {
            this.props.refreshDemoTableDispatch();
        }
    }

    render() {
        var columns1 = [
                <Panel.PanelWithHeader panelValues={{title : 'Basic default Table'}}>
                    <BaseTable />
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Basic Border Table'}}>
                    <BaseBorderTable />
                </Panel.PanelWithHeader>
            ]
            ;
        var columns2 = [
                <Panel.PanelWithHeader panelValues={{title : 'Basic Condensed Table'}}>
                    <BaseCondensedTable />
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Basic Hover Table'}}>
                    <BaseHoverTable />
                </Panel.PanelWithHeader>
            ]
            ;
        var columns3 = [
                <Panel.PanelWithHeader panelValues={{title : 'Basic Striped Table'}}>
                    <BaseStripedTable />
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Basic Table'}}>
                    <div>to be continue</div>
                </Panel.PanelWithHeader>
            ]
            ;
        return (
            <div>
                <Layout.Columns2 columnValues={columns1}/>
                <Layout.Columns2 columnValues={columns2}/>
                <Layout.Columns2 columnValues={columns3}/>
                <Panel.PanelWithHeader panelValues={{title : 'Row Editable Table'}}>
                    <RowEditableTable />
                </Panel.PanelWithHeader>
            </div>)
            ;
    }
}



TableMainBlock.propTypes = {
    getIndexDemoTableDispatch: React.PropTypes.func.isRequired,
    refreshDemoTableDispatch: React.PropTypes.func.isRequired,
    demoTableRefresh: React.PropTypes.bool,
}
function mapStateToProps(state, ownProps) {
    const {
        demoTableRefresh
    } = state.table.demoTable
    return {demoTableRefresh};
}

export default ReactRedux.connect(mapStateToProps, {
    getIndexDemoTableDispatch,
    refreshDemoTableDispatch,
})(TableMainBlock)
