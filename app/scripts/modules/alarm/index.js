var React = require('react');
var TimePicker = require('./TimePicker');

module.exports = React.createClass({
    render: function(){
        var wake = this.props.section.wake;
        var sleep = this.props.section.sleep;

        return (
            <div className="alarm">
                <div className="commands">{this.props.children}</div>
                <div className="alarm-times">
                    <TimePicker type={'wake'} time={wake}/>
                    <TimePicker type={'sleep'} time={sleep}/>
                </div>
                
            </div>
        );
    }
});