/**
 * Created by Donghui Huo on 2016/5/10.
 */
require('./dashBoardLeftNav.scss');
class DashboardLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onMouseOut(e) {
        document.querySelector('.al-sidebar .direct-line').style.top = '-200px';
    }


    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        let asideClassnames = classNames('al-sidebar')
        if (this.props.leftMenu.collapse != undefined) {

            asideClassnames = classNames('al-sidebar', this.props.leftMenu.collapse ? 'collapse' : 'un-collapse');
        }
        return (
            <sidebar>
                <aside className={asideClassnames} onMouseOut={this.onMouseOut}>
                    <div className="direct-line"></div>
                    <CustomScrollbar style={{'heigh':'100%'}}>
                        { this.props.leftMenu.data &&
                        <DashboardLeftList data={this.props.leftMenu.data.responseData.data.content} {...this.props} />}
                    </CustomScrollbar>
                </aside>
            </sidebar>
        );
    }
}
class DashboardLeftList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.openParent) {
            this.onClick.bind(this, {currentTarget: this.openParent})();
        }
    }


    onMouseOver(e) {
        var directLine = document.querySelector('.al-sidebar .direct-line');
        directLine.style.top = e.currentTarget.parentElement.offsetTop + 'px';
        directLine.style.height = e.currentTarget.clientHeight + 'px';
        e.stopPropagation();
    }

    onClick(e) {
        var parentDom = e.currentTarget;
        var subUl = parentDom.querySelector('.al-sidebar-sublist');
        if (subUl) {
            var sidebar = document.querySelector('.al-sidebar');
            if (!parentDom.classList.contains('opened')) {
                var height = 0;
                var liSubList = subUl.querySelectorAll('.al-sidebar-sublist-item');
                for (var i = 0; i < liSubList.length; ++i) {
                    height += liSubList[i].offsetHeight;
                }
                subUl.style.height = height + 'px';
                parentDom.classList.add('opened');
            } else {
                if ((!sidebar || sidebar && sidebar.classList.contains('un-collapse')) && parentDom.classList.contains('opened')) {
                    subUl.style.height = '0px';
                    parentDom.classList.remove('opened');
                }
            }
            if (sidebar && !sidebar.classList.contains('un-collapse')) {
                this.props.leftMenuCollapseChange({collapse: false});
            }
            e.type && e.preventDefault();
        } else {
            this.props.leftMenuSelectedChange({
                selectedUrl: e.currentTarget.getAttribute('data-url'),
                selectedTitle: e.currentTarget.getAttribute('data-title')
            });
            var w = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
            if (w < 1200) {
                this.props.leftMenuCollapseChange({collapse: true});
            }
        }
    }

    render() {
        var classNames = require('classnames');
        var items = this.props.data.map(function (item) {
            var liClass = classNames('al-sidebar-list-item', {'selected': this.props.leftMenu.selectedUrl == item.moduleUrl ? 'selected' : null});
            //var liClass = classNames('al-sidebar-list-item', {'selected': item.selected});
            return (
                item.available && (<li key={item.internalId} className={liClass}
                                       data-url={item.moduleUrl} data-title={item.moduleName}
                                       onClick={this.onClick.bind(this)} id={"li-parent-"+item.internalId}
                                       ref={(liParent) => (item.internalId == this.props.leftMenu.openParent)&&(this.openParent = liParent)}>
                    <ReactRouter.Link className={"al-sidebar-list-link"}
                                      to={ item.moduleUrl ? item.moduleUrl : null}
                                      onMouseOver={this.onMouseOver}
                                      onClick={!item.moduleUrl ? e => e.preventDefault() : null}>
                        <i className={item.iconClass}></i>
                        <span>{item.moduleName}</span>
                        {item.children ? (<b className="down"></b>) : null}
                    </ReactRouter.Link>
                    {item.children ? (
                        <DashboardLeftSubList {...this.props} data={item.children}
                        />) : null}
                </li>)
            );
        }, this);

        return (
            <ul className="al-sidebar-list">
                {items}
            </ul>);
    }
}

class DashboardLeftSubList extends React.Component {
    constructor(props) {
        super(props);
    }

    onMouseOver(e) {
        var directLine = document.querySelector('.al-sidebar .direct-line');
        directLine.style.top = (e.currentTarget.offsetTop + e.currentTarget.parentNode.parentNode.offsetTop) + 'px';
        directLine.style.height = e.currentTarget.clientHeight + 'px';
        e.stopPropagation();
    }

    onClick(e) {
        this.props.leftMenuSelectedChange({
            selectedUrl: e.currentTarget.getAttribute('data-url'),
            selectedTitle: e.currentTarget.getAttribute('data-title')
        });
        var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        if (w < 1200) {
            this.props.leftMenuCollapseChange({collapse: true});
        }
        e.stopPropagation();
    }

    render() {
        var classNames = require('classnames');
        var subItems = this.props.data.map(function (subItem) {
            var selected = null
            var liClass = classNames('al-sidebar-sublist-item', {'selected': this.props.leftMenu.selectedUrl == subItem.moduleUrl ? 'selected' : null});
            return (
                subItem.available && (
                    <li key={subItem.internalId} data-url={subItem.moduleUrl} data-title={subItem.moduleName}
                        className={liClass}
                        onClick={this.onClick.bind(this)}
                        onMouseOver={this.onMouseOver}>
                        <ReactRouter.Link className={"al-sidebar-list-link"} to={subItem.moduleUrl}>
                            <span>{subItem.moduleName}</span>
                        </ReactRouter.Link>
                    </li>)
            );
        }, this);
        return (<ul className="al-sidebar-sublist">{subItems}</ul>);
    }
}


export default DashboardLeft