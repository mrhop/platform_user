/**
 * Created by Donghui Huo on 2016/5/13.
 */
import {Scrollbars} from 'react-custom-scrollbars';
require('./customScrollbar.scss');

class CustomScrollbar extends React.Component {
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    getScrollTop() {
        return this.refs.scrollbars.getScrollTop();
    }

    getScrollHeight() {
        return this.refs.scrollbars.getScrollHeight();
    }

    getHeight() {
        return this.refs.scrollbars.getHeight();
    }

    scrollTop(top) {
        const {scrollbars} = this.refs;
        const scrollTop = scrollbars.getScrollTop();
        var percent = scrollTop / 150;
        this.topInterval = setInterval(this.scrollTopInternal.bind(this, percent), 1);
    }

    scrollTopInternal(val) {
        const {scrollbars} = this.refs;
        var top = scrollbars.getScrollTop() - val;
        if (top <= 0) {
            scrollbars.scrollTop(0);
            clearInterval(this.topInterval);
            return;
        }
        scrollbars.scrollTop(top);
    }

    onScroll() {
        if (this.props.scrollFun) {
            this.props.scrollFun();
        }
    }

    handleSpringUpdate(spring) {
        const {scrollbars} = this.refs;
        const val = spring.getCurrentValue();
        scrollbars.scrollTop(val);
    }

    render() {
        const { scrollFun, ...rest } = this.props
        return (
            <Scrollbars {...rest} onScroll={this.onScroll.bind(this)}
                                        autoHide
                                        autoHideTimeout={400}
                                        autoHideDuration={400}
                                        renderTrackHorizontal={({ style, ...props }) =><div {...props} style={{ ...style}} className="track-horizontal"/>}
                                        renderTrackVertical={({ style, ...props })  => <div {...props} style={{ ...style}} className="track-vertical"/>}
                                        renderThumbHorizontal={({ style, ...props })  => <div {...props} style={{ ...style}} className="thumb-horizontal"/>}
                                        renderThumbVertical={({ style, ...props })  => <div {...props} style={{ ...style}} className="thumb-vertical"/>}
                                        renderView={({ style, ...props })  => <div {...props} style={{ ...style}} className="view"/>}
                                        ref="scrollbars">
                {this.props.children}
            </Scrollbars>
        );
    }
}
CustomScrollbar.propTypes = {scrollFun: React.PropTypes.func};
module.exports = CustomScrollbar;