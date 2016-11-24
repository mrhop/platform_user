/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {UserListWrapper,UserUpdateWrapper,UserAddWrapper,UserPersonalInfoWrapper} from '../../components/user/DefaultUserWrapper';

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
            <Panel.PanelWithHeader panelValues={{title : '新增用户'}}>
                <UserAddWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}

export class TablePersonalInfoBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel.PanelWithHeader panelValues={{title : '用户个人信息修改'}}>
                <UserPersonalInfoWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}
