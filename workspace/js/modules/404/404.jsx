/**
 * Created by Donghui Huo on 2016/5/6.
 */

require('./404.scss');

class ErrorPage404 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{commonProperties ? commonProperties['404.error'] : '404 Error'}</h1>
                <p>{commonProperties ? commonProperties['404.sorrySentence'] : 'Sorry, that page doesn\'t exist.'}<a
                    href={baseUrl}>{commonProperties ? commonProperties['404.backHome'] : 'Go to Home Page'}</a></p>
            </div>
        );
    }
}

ReactDOM.render(
    <ErrorPage404 />,
    document.querySelector('.page-not-found-modal')
);

