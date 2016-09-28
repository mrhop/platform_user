class AreaChart extends React.Component {

    componentWillMount() {
        //this.props.getIndexDemoTableDispatch({})
    }

    render() {
        return this.props.data ? <ResponsiveCharts.ResponsiveAreaChart
            legend={true}
            data={this.props.data}
            xAxisTickInterval={{unit: 'year', interval: 2}}
            yAxisLabel="Altitude"
            xAxisLabel="Elapsed Time (sec)"
            xAccessor={(d)=> {
                    return new Date(d[0]);
                }
             }
            yAccessor={(d)=>d[1]}
            domain={{ y: [,60]}}
        /> : null;
    }
}

AreaChart.propTypes = {
    data: React.PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    if (state && state.chart && state.chart.demoAreaChartData) {
        const {
            data
        } = state.chart.demoAreaChartData
        return {data}
    } else {
        return {};
    }
}


export default ReactRedux.connect(mapStateToProps, {})(AreaChart)