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
                <div className="search">
                    <i className="ion-ios-search-strong"></i>
                    <input id="searchInput" type="text"
                           placeholder={commonProperties['dashBoard.searchPlaceHolder']}/>
                </div>
                <div className="user-profile clearfix">
                    <div className="al-user-profile dropdown">
                        <a className="profile-toggle-link dropdown-toggle">
                            <img src={commonProperties['user.photo']}/>
                        </a>
                    </div>
                    <ul className="al-msg-center clearfix">
                        <li className="dropdown">
                            <a href="" className="dropdown-toggle"><i className="fa fa-bell-o"></i><span>5</span>
                                <div className="notification-ring"></div>
                            </a>
                        </li>
                        <li className="dropdown">
                            <a href="" className="msg dropdown-toggle"><i
                                className="fa fa-envelope-o"></i><span>15</span>
                                <div className="notification-ring"></div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="questions-section">{commonProperties['dashBoard.haveQuestions']}<a
                    href="mailto:15309861499@163.com">15309861499@163.com</a>
                </div>
            </div>
        );
    }
}
export default DashboardTop
