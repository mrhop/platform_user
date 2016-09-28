class ScatterChart extends React.Component {

    componentWillMount() {
        //this.props.getIndexDemoTableDispatch({})
    }

    render() {
        return this.props.data ? <ResponsiveCharts.ResponsiveScatterChart
            legend={true}
            data={this.props.data}
            domain={{x:[-15,], y:[-15,]}}
        /> : null;
    }
}

ScatterChart.propTypes = {
    data: React.PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    if (state && state.chart && state.chart.demoScatterChartData) {
        const {
            data
        } = state.chart.demoScatterChartData
        return {data}
    } else {
        return {};
    }
}


export default ReactRedux.connect(mapStateToProps, {})(ScatterChart)