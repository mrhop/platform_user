class TreemapChart extends React.Component {

    componentWillMount() {
        //this.props.getIndexDemoTableDispatch({})
    }

    render() {
        return this.props.data ? <ResponsiveCharts.ResponsiveTreemap
            legend={true}
            data={this.props.data}
            hoverAnimation={true}
        /> : null;
    }
}

TreemapChart.propTypes = {
    data: React.PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    if (state && state.chart && state.chart.demoTreemapChartData) {
        const {
            data
        } = state.chart.demoTreemapChartData
        return {data}
    } else {
        return {};
    }
}


export default ReactRedux.connect(mapStateToProps, {})(TreemapChart)