/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {DefaultTableWrapper,RowEditableTableWrapper,StripedTableWrapper,HoverTableWrapper,CondensedTableWrapper,BorderTableWrapper} from '../../components/table/DefaultTableWrapper';

export default class TableMainBlock extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        var columns1 = [
                <Panel.PanelWithHeader panelValues={{title : 'Basic default Table'}}>
                    <DefaultTableWrapper />
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Basic Border Table'}}>
                    <BorderTableWrapper />
                </Panel.PanelWithHeader>
            ]
            ;
        var columns2 = [
                <Panel.PanelWithHeader panelValues={{title : 'Basic Condensed Table'}}>
                    <CondensedTableWrapper/>
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Basic Hover Table'}}>
                    <HoverTableWrapper/>
                </Panel.PanelWithHeader>
            ]
            ;
        var columns3 = [
                <Panel.PanelWithHeader panelValues={{title : 'Basic Striped Table'}}>
                    <StripedTableWrapper />
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
                <Panel.PanelWithHeader panelValues={{title : 'RowEditable Table'}}>
                    <RowEditableTableWrapper />
                </Panel.PanelWithHeader>

            </div>)
            ;
    }
}
