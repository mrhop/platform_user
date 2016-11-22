/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {UserListWrapper,UserUpdateWrapper} from '../../components/user/DefaultUserWrapper';

export default class TableMainBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Panel.PanelWithHeader panelValues={{title : '用户列表'}}>
                    <UserListWrapper />
                </Panel.PanelWithHeader>
            </div>)
            ;
    }
}


export class TableUpdateBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel.PanelWithHeader panelValues={{title : '更新用户信息'}}>
                <UserUpdateWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}

export class TableAddBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel.PanelWithHeader panelValues={{title : '添加用户信息'}}>
                <UserUpdateWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}
