var React = require('react');

module.exports = React.createClass({
    animateIn: function(){
        var $el = jQuery(this.getDOMNode());

        $el
            .velocity({
                translateY: [0, -8],
                opacity: 1
            },{
                duration: 200,
                easing: 'easeOutBounce'
            })
    },
    animateOut: function(){
        var $el = jQuery(this.getDOMNode());

        $el.velocity('reverse');
    },
    render: function(){
        return (
            <header className="module-header">
                <h1>{this.props.title}</h1>
            </header>
        );
    }
});