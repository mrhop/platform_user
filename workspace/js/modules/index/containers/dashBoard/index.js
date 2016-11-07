/**
 * Created by Donghui Huo on 2016/5/11.
 */
require('./index.scss');

class DashBoardMainBlock extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //data init
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {

        var basicToastData = {
            content: <span>this is a toast?</span>,
            title: 'check toast?'
        };

        var basicModalData = {
            content: <span>test modal?</span>,
            title: 'check something?',
            closeFun: function () {
                return true;
            },
            footerCloseButton: {
                visible: true,
                title: 'close',
            },
            footerContent: <span>test modal</span>,
        };
        const confirmModalData = {
            content: <span>you can not revert the data</span>,
            title: 'Do you really want to do things like this?',
            closeFun: function () {
                return true;
            },
            footerConfirmButton: {
                callback: function () {
                    //console.log('confirm')
                },
                title: 'Confirm',
            },
            footerCloseButton: {
                visible: true,
                title: 'Cancel',
            },
        };
        var basicTabData = [
            {
                id: 1,
                active: true,
                title: 'tab1',
                content: 'content1'
            }, {
                id: 2,
                title: 'tab2',
                content: 'content2'
            }, {
                id: 3,
                title: 'tab3',
                children: [
                    {
                        id: '3-1',
                        title: 'tab3-1',
                        content: 'content3-1'
                    },
                    {
                        id: '3-2',
                        title: 'tab3-2',
                        content: 'content3-2'
                    }
                ]
            }
        ];

        var columns = [
                <Panel.DefaultPanel>
                    <button className="btn btn-primary"
                            onClick={Toast.createToast.bind(this,basicToastData,'default')}>open default toast
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-primary btn-success"
                            onClick={Toast.createToast.bind(this,basicToastData,'success')}>open success toast
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-primary btn-warning"
                            onClick={Toast.createToast.bind(this,basicToastData,'warning')}>open warning toast
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-primary btn-danger"
                            onClick={Toast.createToast.bind(this,basicToastData,'error')}>open error toast
                    </button>
                </Panel.DefaultPanel>
            ]
            ;
        var columnsSecond = [
                <Panel.DefaultPanel>
                    <button className="btn btn-primary"
                            onClick={Modal.createModal.bind(this,{modalValues:basicModalData,type:'default'})}>open default modal
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-primary"
                            onClick={Modal.createModal.bind(this,{modalValues:basicModalData,type:'lgModal'})}>open large modal
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-primary"
                            onClick={Modal.createModal.bind(this,{modalValues:basicModalData,type:'smModal'})}>open small modal
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-primary"
                            onClick={Modal.createModal.bind(this,{modalValues:basicModalData,type:'message'})}>open default message modal
                    </button>
                </Panel.DefaultPanel>

            ]
            ;
        var columnsThird = [
                <Panel.DefaultPanel>
                    <button className="btn btn-success"
                            onClick={Modal.createModal.bind(this,{modalValues:basicModalData,type:'messageSuccess'})}>open success modal
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-warning"
                            onClick={Modal.createModal.bind(this,{modalValues:basicModalData,type:'messageWarning'})}>open warning modal
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-danger"
                            onClick={Modal.createModal.bind(this,{modalValues:basicModalData,type:'messageError'})}>open error modal
                    </button>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <button className="btn btn-danger"
                            onClick={Modal.createModal.bind(this,{modalValues:confirmModalData,type:'messageConfirm'})}>open confirm message
                        modal
                    </button>
                </Panel.DefaultPanel>

            ]
            ;
        var columnsFourth = [
                <Panel.DefaultPanel>
                    <Tab.DefaultTab tabValues={basicTabData}/>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <Tab.LeftVerticalTab tabValues={basicTabData}/>
                </Panel.DefaultPanel>,
                <Panel.DefaultPanel>
                    <Tab.RightVerticalTab tabValues={basicTabData}/>
                </Panel.DefaultPanel>
            ]
            ;
        return (
            <div>
                <Layout.Columns4 columnValues={columns}/>
                <Layout.Columns4 columnValues={columnsSecond}/>
                <Layout.Columns4 columnValues={columnsThird}/>
                <Layout.Columns3 columnValues={columnsFourth}/>
            </div>)
            ;
    }
}


DashBoardMainBlock.propTypes = {}
function mapStateToProps(state, ownProps) {
    return {};
}

export default ReactRedux.connect(mapStateToProps, {})(DashBoardMainBlock)
