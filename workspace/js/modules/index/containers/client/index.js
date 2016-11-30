/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {ClientListWrapper,ClientUpdateWrapper,ClientAddWrapper} from '../../components/client/DefaultClientWrapper';

export default class TableMainBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Panel.PanelWithHeader panelValues={{title : '客户端列表'}}>
                    <ClientListWrapper />
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
            <Panel.PanelWithHeader panelValues={{title : '更新客户端信息'}}>
                <ClientUpdateWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}

export class TableAddBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel.PanelWithHeader panelValues={{title : '新增客户端'}}>
                <ClientAddWrapper {...this.props}/>
            </Panel.PanelWithHeader>);
    }
}
