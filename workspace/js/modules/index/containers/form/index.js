/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {
    DefaultFormWrapper,
    NoLabelFormWrapper,
    HorizontalFormWrapper,
    InlineFormWrapper,
    BlockFormWrapper
} from '../../components/form/DefaultFormWrapper'
export default class FormMainBlock extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

                <Panel.PanelWithHeader panelValues={{title : 'Default Form'}}>
                    <DefaultFormWrapper />
                </Panel.PanelWithHeader>
                <Panel.PanelWithHeader panelValues={{title : 'WithOutLabel Form '}}>
                    <NoLabelFormWrapper />
                </Panel.PanelWithHeader>
                <Panel.PanelWithHeader panelValues={{title : 'Horizontal Form'}}>
                    <HorizontalFormWrapper />
                </Panel.PanelWithHeader>
                <Panel.PanelWithHeader panelValues={{title : 'Inline Form'}}>
                    <InlineFormWrapper />
                </Panel.PanelWithHeader>
                <Panel.PanelWithHeader panelValues={{title : 'Block Form'}}>
                    <BlockFormWrapper />
                </Panel.PanelWithHeader>
            </div>)
            ;
    }
}
