/**
 * Created by Donghui Huo on 2016/5/10.
 */
class AuthOneClickBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="auth-sep"><span style={{width : '150px'}}><span>{commonProperties['auth.oneClickLogin']}</span></span></div>
                <div className="al-share-auth">
                    <ul className="al-share clearfix">
                        <li><i className="a socicon socicon-wechat" title="Share on wechat"></i></li>
                        <li><i className="a socicon socicon-weibo" title="Share on weibo"></i></li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default AuthOneClickBlock;