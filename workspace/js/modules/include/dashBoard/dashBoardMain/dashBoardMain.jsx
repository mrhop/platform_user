/**
 * Created by Donghui Huo on 2016/5/10.
 */
require('./dashBoardMain.scss');
import DashBoardMainTop from './top/dashBoardMainTop.jsx';
import DashBoardMainBottom from './bottom/dashBoardMainBottom.jsx';


class DashboardMain extends React.Component {
    constructor(props) {
        super(props);
    }

    scrollToTop(e) {
        const {scrollbars} = this.refs;
        scrollbars.scrollTop(0);
    }


    scrollFun() {
        const {scrollbars} = this.refs;
        if (scrollbars.getScrollTop() <= 200) {
            document.querySelector('#backTop').style.display = 'none';
        } else {
            document.querySelector('#backTop').style.display = 'block';
        }
    }

    render() {
        let mainClassnames = classNames('al-main')
        if (this.props.leftMenu.collapse != undefined) {

            mainClassnames = classNames('al-main', this.props.leftMenu.collapse ? 'collapse' : 'un-collapse');
        }
        return (
            <main className={mainClassnames}>
                <CustomScrollbar ref="scrollbars" scrollFun={this.scrollFun.bind(this)}>
                    <div className="al-content">
                        <DashBoardMainTop {...this.props}/>
                        {React.cloneElement(this.props.children, {...this.props})}
                        <DashBoardMainBottom />
                    </div>
                </CustomScrollbar>
                <back-top>
                    <i className="fa back-top" id="backTop" title="Back to Top"
                       onClick={this.scrollToTop.bind(this)}></i>
                </back-top>
            </main>
        );
    }
}
export default DashboardMain

//how to change the window width, when change