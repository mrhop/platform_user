/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');
import {ErrorPage404} from '../../components/error'

export class Error404 extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Panel.DefaultPanel>
                <ErrorPage404/>
            </Panel.DefaultPanel>);
    }
}
