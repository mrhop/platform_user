export class DefaultDragDropWrapper extends React.Component {
    render() {
        return <div><DragDrop.DragDrop symbol={"test_default_flow"} type={"actions"}
                              // initUrl={"demoData/dragDrop/workGroupSample.json"}
                              rolesUrl={"demoData/dragDrop/roles.json"}
                              saveUrl={"demoData/dragDrop/save.json"}
                              positionsUrl={"demoData/dragDrop/positions.json"}/></div>
    }
}

export class UpdateDragDropWrapper extends React.Component {
    render() {
        return <div><DragDrop.DragDrop symbol={"test_default_flow_update"} type={"actions"}
                              initUrl={"demoData/dragDrop/workGroupSample.json"}
                              rolesUrl={"demoData/dragDrop/roles.json"}
                              saveUrl={"demoData/dragDrop/update.json"}
                              positionsUrl={"demoData/dragDrop/positions.json"}/></div>
    }
}

export class PositionsDragDropWrapper extends React.Component {
    render() {
        return <div><DragDrop.DragDrop symbol={"test_default_flow_position"} type={"positions"}
                              initUrl={"demoData/dragDrop/workGroupSamplePositions.json"}
                              saveUrl={"demoData/dragDrop/update.json"}
                              positionsUrl={"demoData/dragDrop/positions.json"}/></div>
    }
}

