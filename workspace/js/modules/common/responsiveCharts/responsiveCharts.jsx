/**
 * Created by Donghui Huo on 2016/5/13.
 */
require('./responsiveCharts.scss');

import rd3 from 'rd3';
import elementResizeEvent from 'element-resize-event';

const {
    AreaChart,
    BarChart,
    CandleStickChart,
    LineChart,
    PieChart,
    ScatterChart,
    Treemap,
} = rd3;

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

        setTimeOutFitToParentSize() {
            clearTimeout(resizeId);
            resizeId = setTimeout(this.fitToParentSize.bind(this), 200);
        }

        getChartClass() {
            let Component;
            switch (chartType) {
                case 'AreaChart':
                    Component = AreaChart;
                    break;
                case 'BarChart':
                    Component = BarChart;
                    break;
                case 'CandleStickChart':
                    Component = CandleStickChart;
                    break;
                case 'LineChart':
                    Component = LineChart;
                    break;
                case 'PieChart':
                    Component = PieChart;
                    break;
                case 'ScatterChart':
                    Component = ScatterChart;
                    break;
                case 'Treemap':
                    Component = Treemap;
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

        componentWillUnmount() {

        }

        render() {
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
            return (
                <div className="chart-wrapper" ref="wrapper">
                    <Component
                        width={width}
                        height={height}
                        margin={margin}
                        {...others}
                    />
                </div>
            );
        }
    }
    Chart.defaultProps = {
        margin: {},
    };
    Chart.propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        margin: React.PropTypes.object,
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

export {
    ResponsiveAreaChart,
    ResponsiveBarChart,
    ResponsiveCandleStickChart,
    ResponsiveLineChart,
    ResponsivePieChart,
    ResponsiveScatterChart,
    ResponsiveTreemap,
};

export default {
    ResponsiveAreaChart,
    ResponsiveBarChart,
    ResponsiveCandleStickChart,
    ResponsiveLineChart,
    ResponsivePieChart,
    ResponsiveScatterChart,
    ResponsiveTreemap,
};