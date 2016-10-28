/**
 * Created by Donghui Huo on 2016/5/10.
 */

class DashboardMainTop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <content-top>
                <div className="content-top">
                    <h1 className="al-title">{this.props.leftMenu.selectedTitle ? this.props.leftMenu.selectedTitle : "总览"}</h1>
                    {this.props.leftMenu.selectedTitle&&
                    <ul className="breadcrumb al-breadcrumb">
                        <li>
                            <ReactRouter.Link to={baseUrl}>
                                <span>总览</span>
                            </ReactRouter.Link>
                        </li>
                        <li>
                            {this.props.leftMenu.selectedTitle}
                        </li>
                    </ul>}
                </div>
            </content-top>
        );
    }
}

export default DashboardMainTop;

//how to change the window width, when change