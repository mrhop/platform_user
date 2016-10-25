export class LineChartWrapper extends React.Component {
    render() {
        let symbol = 'chart-' + 'base-chart-1'
        return <ResponsiveCharts.LineChart
            symbol={symbol}
            legend={true}
            yAxisLabel="Altitude"
            xAxisLabel="Elapsed Time (sec)"
            domain={{x: [,6], y: [-10,]}}
            gridHorizontal={true}
            endpoint='demoData/chartData/line.json'/>
    }
}
export class AreaChartWrapper extends React.Component {
    render() {
        let symbol = 'chart-' + 'base-chart-2'
        return <ResponsiveCharts.AreaChart
            symbol={symbol}
            legend={true}
            xAxisTickInterval={{unit: 'year', interval: 2}}
            yAxisLabel="Altitude"
            xAxisLabel="Elapsed Time (sec)"
            xAccessor={(d)=> {
                                    return new Date(d[0]);
                                    }
                                 }
            yAccessor={(d)=>d[1]}
            domain={{ y: [,60]}}
            endpoint='demoData/chartData/area.json'/>
    }

}

export class BarChartWrapper extends React.Component {
    render() {
        let symbol = 'chart-' + 'base-chart-123'
        return <ResponsiveCharts.BarChart
            symbol={symbol}
            legend={true}
            xAxisLabel="Position"
            yAxisLabel="Value"
            endpoint='demoData/chartData/bar.json'/>
    }
}


export class PieChartWrapper extends React.Component {
    render() {
        let symbol = 'chart-' + 'base-chart-4'
        return <ResponsiveCharts.PieChart
            symbol={symbol}
            sectorBorderColor="white"
            endpoint='demoData/chartData/pie.json'  />
    }
}


export class ScatterChartWrapper extends React.Component {
    render() {
        let symbol = 'chart-' + 'base-chart-5'
        return <ResponsiveCharts.ScatterChart
            symbol={symbol}
            legend={true}
            domain={{x:[-15,], y:[-15,]}}
            endpoint='demoData/chartData/scatter.json' />
    }
}

export class TreemapChartWrapper extends React.Component {
    render() {
        let symbol = 'chart-' + 'base-chart-6'
        return <ResponsiveCharts.TreemapChart
            symbol={symbol}
            legend={true}
            hoverAnimation={true}
            endpoint='demoData/chartData/treemap.json'/>
    }
}

