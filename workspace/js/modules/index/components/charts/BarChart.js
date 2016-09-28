class BarChart extends React.Component {

    componentWillMount() {
        //this.props.getIndexDemoTableDispatch({})
    }

    render() {
        return this.props.data ? <ResponsiveCharts.ResponsiveBarChart
            legend={true}
            data={this.props.data}
            xAxisLabel="Position"
            yAxisLabel="Value"
        /> : null;
    }
}

BarChart.propTypes = {
    data: React.PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    if (state && state.chart && state.chart.demoBarChartData) {
        const {
            data
        } = state.chart.demoBarChartData
        return {data}
    } else {
        return {};
    }
}


export default ReactRedux.connect(mapStateToProps, {})(BarChart)