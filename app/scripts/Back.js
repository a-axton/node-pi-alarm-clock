var React = require('react');

module.exports = React.createClass({
    goBack: function(){
        console.log('fooback')
        this.props.hideSection();
    },
    animateIn: function(){
        var $el = jQuery(this.getDOMNode());

        $el.velocity({
            translateY: [0, 8]
        },{
            display: 'block',
            duration: 700,
            easing: 'spring'
        });
    },
    animateOut: function(){
        var $el = jQuery(this.getDOMNode());

        $el.velocity('reverse').hide();
    },
    render: function(){
        return (
            <div onClick={this.goBack} className="go-back">
                <span className="icon-arrow-left"></span>
            </div>
        );
    }
});