/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');
import {LineChartWrapper,AreaChartWrapper,BarChartWrapper,PieChartWrapper,ScatterChartWrapper,TreemapChartWrapper} from '../../components/chart/DefaultChartWrapper'

export default class DashBoardMainBlock extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {

        var columns = [
                <Panel.PanelWithHeader panelValues={{title : 'Default Line Chart'}}>
                    <BarChartWrapper/>
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Default Area Chart'}}>
                    <AreaChartWrapper/>
                </Panel.PanelWithHeader>
            ]
            ;
        var columns2 = [
                <Panel.PanelWithHeader panelValues={{title : 'Default Bar Chart'}}>
                    <LineChartWrapper />
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Default Pie Chart'}}>
                    <PieChartWrapper/>
                </Panel.PanelWithHeader>
            ]
            ;

        var columns3 = [
                <Panel.PanelWithHeader panelValues={{title : 'Default Scatter Chart'}}>
                    <ScatterChartWrapper/>
                </Panel.PanelWithHeader>,
                <Panel.PanelWithHeader panelValues={{title : 'Default Treemap Chart'}}>
                    <TreemapChartWrapper/>
                </Panel.PanelWithHeader>
            ]
            ;

        return (
            <div>
                <Layout.Columns2 columnValues={columns}/>
                <Layout.Columns2 columnValues={columns2}/>
                <Layout.Columns2 columnValues={columns3}/>
            </div>)
            ;
    }
}
