import * as Index from '../containers'
import DashBoardContainer from '../../include/dashBoard/dashBoard.jsx'

export default [
    //<ReactRouter.IndexRoute component={Index.dashBoard} />
    <ReactRouter.Route path={baseUrl+"(index.html)"} component={DashBoardContainer}>
        <ReactRouter.IndexRoute component={Index.dashBoard}/>
        <ReactRouter.Route path={baseUrl+"role/list.html"} component={Index.role}/>
        <ReactRouter.Route path={baseUrl+"user/list.html"} component={Index.user}/>
        <ReactRouter.Route path={baseUrl+"user/info.html"} component={Index.userUpdate}/>
        <ReactRouter.Route path={baseUrl+"user/add.html"} component={Index.userAdd}/>
        <ReactRouter.Route path={baseUrl+"user/personalinfo.html"} component={Index.userPersonalInfo}/>
        <ReactRouter.Route path={baseUrl+"client/list.html"} component={Index.clients}/>
        <ReactRouter.Route path={baseUrl+"client/info.html"} component={Index.clientUpdate}/>
        <ReactRouter.Route path={baseUrl+"client/add.html"} component={Index.clientAdd}/>
        <ReactRouter.Route path={baseUrl+"modulerole/list.html"} component={Index.moduleRoles}/>
        <ReactRouter.Route path={baseUrl+"modulerole/info.html"} component={Index.moduleRoleUpdate}/>
        <ReactRouter.Route path={baseUrl+"modulerole/add.html"} component={Index.moduleRoleAdd}/>
        <ReactRouter.Route path={baseUrl+"module/list.html"} component={Index.modules}/>
        <ReactRouter.Route path={baseUrl+"module/info.html"} component={Index.moduleUpdate}/>
        <ReactRouter.Route path={baseUrl+"module/add.html"} component={Index.moduleAdd}/>
        <ReactRouter.Route path="/*" component={Index.error404}/>
    </ReactRouter.Route>
]

