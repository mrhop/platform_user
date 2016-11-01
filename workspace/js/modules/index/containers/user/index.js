/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {UserListWrapper} from '../../components/user/DefaultUserWrapper';

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
