var React = require('react');
var socket = io();

module.exports = React.createClass({
    componentDidMount: function(){
        socket.on('success:lights', function(sectionState){
            this.props.changeSectionState(sectionState);
        }.bind(this))
    },
    render: function(){
        return (
            <div className="commands">{this.props.children}</div>
        );
    }
});