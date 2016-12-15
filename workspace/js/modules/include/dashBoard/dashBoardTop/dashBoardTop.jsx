/**
 * Created by Donghui Huo on 2016/5/10.
 */
require('./dashBoardTop.scss');

class DashboardTop extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(e) {
        var sidebar = document.querySelector('.al-sidebar');
        var mainContent = document.querySelector('main');
        if (sidebar) {
            if (sidebar.classList.contains('collapse') || sidebar.clientWidth < 100) {
                this.props.leftMenuCollapseChange({collapse: false});
            } else {
                this.props.leftMenuCollapseChange({collapse: true});
            }
        }
        e.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="page-top clearfix">
                <ReactRouter.Link to={baseUrl} className="al-logo clearfix">
                    <span>{commonProperties['app.name']}</span>{commonProperties['app.adminPlatform']}
                </ReactRouter.Link>
                <a className="collapse-menu-link" onClick={this.onClick.bind(this)}></a>
                <div className="user-profile clearfix">
                    <div className="al-user-profile dropdown">
                        <a className="profile-toggle-link dropdown-toggle">
                            <img src={commonProperties['user.photo']}/>
                        </a>
                    </div>
                </div>
                <div className="questions-section">{commonProperties['dashBoard.haveQuestions']}<a
                    href="mailto:15309861499@163.com">15309861499@163.com</a>
                </div>
            </div>
        );
    }
}
export default DashboardTop
