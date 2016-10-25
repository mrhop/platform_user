/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./responsiveCharts.scss');

import rd3 from 'rd3';
import elementResizeEvent from 'element-resize-event';

import {
    getChartDispatch
} from './actions';

var resizeId = null
const createClass = (chartType) => {
    class Chart extends React.Component {
        constructor(props) {
            super(props);
            this.state = {size: {w: 0, h: 0}};
        }

        fitToParentSize() {
            const w = this.refs.wrapper.offsetWidth;
            const h = this.refs.wrapper.offsetHeight;
            const currentSize = this.state.size;
            if (w !== currentSize.w || h !== currentSize.h) {
                this.setState({
                    size: {w, h},
                });
            }
        }

        componentWillMount() {
            this.props.getChartDispatch({endpoint: this.props.endpoint, symbol: this.props.symbol});
        }


        // setTimeOutFitToParentSize() {
        //     clearTimeout(resizeId);
        //     resizeId = setTimeout(this.fitToParentSize.bind(this), 200);
        // }

        getChartClass() {
            let Component;
            switch (chartType) {
                case 'AreaChart':
                    Component = rd3.AreaChart;
                    break;
                case 'BarChart':
                    Component = rd3.BarChart;
                    break;
                case 'CandleStickChart':
                    Component = rd3.CandlestickChart;
                    break;
                case 'LineChart':
                    Component = rd3.LineChart;
                    break;
                case 'PieChart':
                    Component = rd3.PieChart;
                    break;
                case 'ScatterChart':
                    Component = rd3.ScatterChart;
                    break;
                case 'Treemap':
                    Component = rd3.Treemap;
                    break;
                default:
                    console.error('Invalid Chart Type name.');
                    break;
            }
            return Component;
        }

        componentDidMount() {
            elementResizeEvent(this.refs.wrapper, this.fitToParentSize.bind(this));
            this.fitToParentSize();
        }

        componentDidUpdate() {
        }

        componentWillUnmount() {
        }

        render() {
            var component = null;
            if (this.props.data ) {
                const {margin, ...others} = this.props;
                let Component = this.getChartClass();
                let width = this.props.width;
                let height = this.props.height;
                width = this.state.size.w || 100;
                height = this.state.size.h || 100;
                if (chartType == 'LineChart' || chartType == 'BarChart' || chartType == 'AreaChart' || chartType == 'ScatterChart') {
                    l_assign(others, {
                        viewBoxObject: {
                            x: 0,
                            y: 0,
                            width: (width > 480 ? width - 100 : width),
                            height: height
                        },
                        legend: (width > 480 ? true : false)
                    })
                } else if (chartType == 'PieChart') {
                    l_assign(others, {
                        radius: ((width > height) ? (height / 3) : (width / 3)),
                        innerRadius: 20
                    })
                }
                component = <Component
                    width={width}
                    height={height}
                    margin={margin}
                    {...others}
                />
            }
            return (<div className="chart-wrapper" ref="wrapper">
                {component}
            </div>);
        }
    }
    Chart.defaultProps = {
        margin: {},
    };
    Chart.propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        margin: React.PropTypes.object,
        data: React.PropTypes.array,
        symbol: React.PropTypes.string,
        getChartDispatch: React.PropTypes.func
    };
    return Chart;
};

const ResponsiveAreaChart = createClass('AreaChart');
const ResponsiveBarChart = createClass('BarChart');
const ResponsiveCandleStickChart = createClass('CandleStickChart');
const ResponsiveLineChart = createClass('LineChart');
const ResponsivePieChart = createClass('PieChart');
const ResponsiveScatterChart = createClass('ScatterChart');
const ResponsiveTreemap = createClass('Treemap');

function mapStateToProps(state, ownProps) {
    if (ownProps.symbol && state && state.chart && state.chart.main && state.chart.main[ownProps.symbol]) {
        const {
            data
        } = state.chart.main[ownProps.symbol]
        return {data}
    } else {
        return {};
    }
}
const AreaChart = ReactRedux.connect(mapStateToProps, {getChartDispatch})(ResponsiveAreaChart);
const BarChart = ReactRedux.connect(mapStateToProps, {getChartDispatch})(ResponsiveBarChart);
const CandleStickChart = ReactRedux.connect(mapStateToProps, {getChartDispatch})(ResponsiveCandleStickChart);
const LineChart = ReactRedux.connect(mapStateToProps, {getChartDispatch})(ResponsiveLineChart);
const PieChart = ReactRedux.connect(mapStateToProps, {getChartDispatch})(ResponsivePieChart);
const ScatterChart = ReactRedux.connect(mapStateToProps, {getChartDispatch})(ResponsiveScatterChart);
const TreemapChart = ReactRedux.connect(mapStateToProps, {getChartDispatch})(ResponsiveTreemap);

export {
    AreaChart,
    BarChart,
    CandleStickChart,
    LineChart,
    PieChart,
    ScatterChart,
    TreemapChart
}

export default {
    AreaChart,
    BarChart,
    CandleStickChart,
    LineChart,
    PieChart,
    ScatterChart,
    TreemapChart
}