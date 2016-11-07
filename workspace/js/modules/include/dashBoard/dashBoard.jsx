/**
 * Created by Donghui Huo on 2016/5/10.
 */
require('./dashBoard.scss');
import {getLeftMenuDispatch, leftMenuCollapseChange,leftMenuSelectedChange} from './actions'
import DashboardTop from './dashBoardTop/dashBoardTop.jsx';
import DashBoardLeftNav from './dashBoardLeftNav/dashBoardLeftNav.jsx';
import DashBoardMain from './dashBoardMain/dashBoardMain.jsx';

class DashBoardBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //data init
        this.props.getLeftMenuDispatch()
    }

    render() {

        return (
                <div style={{'height' : '100%'}}>
                    <DashBoardLeftNav {...this.props}/>
                    <DashboardTop {...this.props}/>
                    <DashBoardMain {...this.props}/>
                </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {};
}


DashBoardBlock.propTypes = {
    getLeftMenuDispatch: React.PropTypes.func.isRequired,
    leftMenuCollapseChange: React.PropTypes.func.isRequired,
    leftMenuSelectedChange: React.PropTypes.func.isRequired,
    collapse: React.PropTypes.bool,
    data: React.PropTypes.array,
    selectedUrl: React.PropTypes.string
}

function mapStateToProps(state, ownProps) {
    if (state && state.dashBoardFramework && state.dashBoardFramework.leftMenuData) {
        const {
            data,
            collapse,
            selectedUrl,
            openParent,
            selectedTitle
        } = state.dashBoardFramework.leftMenuData
        return {leftMenu: {data, collapse,selectedUrl,openParent,selectedTitle}}
    } else {
        return {leftMenu: {}};
    }
}


export default ReactRedux.connect(mapStateToProps, {getLeftMenuDispatch, leftMenuCollapseChange,leftMenuSelectedChange})(DashBoardBlock);





