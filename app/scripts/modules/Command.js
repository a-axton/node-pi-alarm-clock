var React = require('react');
var grid = require('../utils/grid');
var socket = io();

module.exports = React.createClass({
    mixins: [grid],
    componentWillMount: function(){
        // inherited from grid mixin
        this.calculatePosition();
    },
    componentDidUpdate: function(){
        // inherited from grid mixin
        this.gridLoadAnimation(); 
    },
    getInitialState: function(){
        return {
            translateX: 0,
            translateY: 0,
            distance: 0,
            active: false
        }
    },
    sendCommand: function(){
        var command = this.props.command.command;
        var sectionName = this.props.parent;
        
        socket.emit('command:'+sectionName, command);
    },
    render: function(){
        var style = {
            transform: 'translateY('+this.state.translateY+'vw) translateX('+this.state.translateX+'vw)'
        }

        return (
            <div
                className="block command"
                style={style} 
                onClick={this.sendCommand}>
                {this.props.command.name}
            </div>
        );
    }
});