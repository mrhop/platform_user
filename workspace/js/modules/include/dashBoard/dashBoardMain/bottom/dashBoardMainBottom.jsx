/**
 * Created by Donghui Huo on 2016/5/10.
 */

class DashboardMainBottom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="al-footer">
                <div className="al-footer-right">
                    Created by Huo
                </div>
                <div className="al-footer-left">
                    <span className="al-copy">© <a href="#" target="_blank">Huo</a> 2016</span>
                    <ul className="al-share">
                        <li><a href="#" target="_blank"><i
                            className="fa fa-wechat"></i></a></li>
                        <li><a href="#" target="_blank"><i
                            className="fa fa-weibo"></i></a></li>
                        <li><a href="#" target="_blank"><i
                            className="fa fa-facebook"></i></a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}

export default DashboardMainBottom;

//how to change the window width, when change