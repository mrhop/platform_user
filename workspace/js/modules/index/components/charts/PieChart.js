class PieChart extends React.Component {

    componentWillMount() {
        //this.props.getIndexDemoTableDispatch({})
    }

    render() {
        return this.props.data ? <ResponsiveCharts.ResponsivePieChart
            data={this.props.data}
            sectorBorderColor="white"
        /> : null;
    }
}

PieChart.propTypes = {
    data: React.PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    if (state && state.chart && state.chart.demoPieChartData) {
        const {
            data
        } = state.chart.demoPieChartData
        return {data}
    } else {
        return {};
    }
}


export default ReactRedux.connect(mapStateToProps, {})(PieChart)