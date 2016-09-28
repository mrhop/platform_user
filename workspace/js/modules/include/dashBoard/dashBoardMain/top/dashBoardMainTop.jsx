/**
 * Created by Donghui Huo on 2016/5/10.
 */

class DashboardMainTop extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <content-top>
               <div className="content-top">
                   <h1 className="al-title">DASHBOARD</h1>
                   <ul className="breadcrumb al-breadcrumb">
                       <li>
                           <a href="#">Home</a>
                       </li>
                       <li>
                           Dashboard
                       </li>
                   </ul>
               </div>
           </content-top>
        );
    }
}

export default DashboardMainTop;

//how to change the window width, when change