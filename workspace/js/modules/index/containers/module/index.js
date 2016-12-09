/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {ModuleListWrapper,ModuleUpdateWrapper,ModuleAddWrapper} from '../../components/module/DefaultModuleWrapper';

export default class TableMainBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Panel.PanelWithHeader panelValues={{title : '模块列表'}}>
                    <ModuleListWrapper />
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
            <Panel.PanelWithHeader panelValues={{title : '更新模块信息'}}>
                <ModuleUpdateWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}

export class TableAddBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel.PanelWithHeader panelValues={{title : '新增模块'}}>
                <ModuleAddWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}
