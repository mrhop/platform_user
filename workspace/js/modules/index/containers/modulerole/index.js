/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {ModuleRoleListWrapper,ModuleRoleUpdateWrapper,ModuleRoleAddWrapper} from '../../components/modulerole/DefaultModuleRoleWrapper';

export default class TableMainBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Panel.PanelWithHeader panelValues={{title : '模块角色列表'}}>
                    <ModuleRoleListWrapper />
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
            <Panel.PanelWithHeader panelValues={{title : '更新模块角色信息'}}>
                <ModuleRoleUpdateWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}

export class TableAddBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel.PanelWithHeader panelValues={{title : '新增模块角色'}}>
                <ModuleRoleAddWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}
