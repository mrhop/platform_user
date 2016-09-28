/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

import {
    DefaultDragDropWrapper, UpdateDragDropWrapper, PositionsDragDropWrapper
} from '../../components/dragDrop/DefaultDragDropWrapper'
export default class DragDropMainBlock extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Panel.PanelWithHeader panelValues={{title : 'Default Test DragAndDrop'}}>
                    <DefaultDragDropWrapper />
                </Panel.PanelWithHeader>
                <Panel.PanelWithHeader panelValues={{title : 'Default Test DragAndDrop With Data Init'}}>
                    <UpdateDragDropWrapper />
                </Panel.PanelWithHeader>
                <Panel.PanelWithHeader panelValues={{title : 'Positions Test DragAndDrop With Data Init'}}>
                    <PositionsDragDropWrapper />
                </Panel.PanelWithHeader>
            </div>)
            ;
    }
}
