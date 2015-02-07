var React = require('react');
var TimeScroller = require('./TimeScroller');


module.exports = React.createClass({

    getInitialState: function(){
        return {
            hours: 0,
            minutes: 0,
            ampm: 0
        }
    },
    setAmPm: function(e){
        var $target = jQuery(e.target);
        var selected = $target.text();

        $target.siblings().removeClass('selected');
        $target.addClass('selected');
    },
    render: function(){
        if (this.props.time.type == 'am'){
            var amClass = 'selected';
            var pmClass = '';       
        } else {
            var amClass = '';
            var pmClass = 'selected'; 
        }

        var ampm =  <div className="times ampm">
                        <span className={amClass} onClick={this.setAmPm}>am</span>
                        <span className={pmClass} onClick={this.setAmPm}>pm</span>
                    </div>


        return (
            <div className="time-picker">
                <h1>{this.props.type}</h1>
                <div className="time-picker-wrapper">
                    <TimeScroller ref={'hours'} type={'hours'} time={this.props.time.hours}/>
                    <TimeScroller ref={'minutes'} type={'minutes'} time={this.props.time.minutes}/>
                    {ampm}
                </div>
            </div>
        );
    }
});