/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {RoleListWrapper} from '../../components/role/DefaultRoleWrapper';

export default class TableMainBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Panel.PanelWithHeader panelValues={{title : '角色列表'}}>
                    <RoleListWrapper />
                </Panel.PanelWithHeader>
            </div>)
            ;
    }
}
