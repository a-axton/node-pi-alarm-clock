var React = require('react');
var _ = require('lodash');
var $nav;
var $wrapper;
var $toggle;

var NavItem = React.createClass({
    showSection: function(){
        this.props.hideNav();
    },
    render: function(){
        return (
            <li onClick={this.showSection}>{this.props.section.name}</li>
        );
    }
});

module.exports = React.createClass({
    componentDidMount: function(){
        $wrapper = jQuery('#nav');
        $nav = jQuery('#nav nav');
        $toggle = jQuery('.nav-toggle');
    },
    hideNav: function(toggle){
        $wrapper.removeClass('active');

        $nav
            .velocity('reverse')
            .velocity({
                borderRadius: '50vw'
            },{
                queue: false,
                delay: 0,
                duration: 120
            })

        $toggle
            .velocity('reverse', {delay: 200})
    },
    toggleNav: function(e){
        var offset = $nav.offset();

        $wrapper.toggleClass('active');

        if ($wrapper.hasClass('active')){
            $nav
                .velocity({
                    translateX: [-offset.left, 2],
                    translateY: [-offset.top+2, 2],
                    width: '100vh',
                    height: '100vh'
                },{
                    duration: 220
                })
                .velocity({
                    borderRadius: 0
                },{
                    queue: false,
                    delay: 100,
                    duration: 200
                });

            $toggle
                .velocity({
                    scale: [1.2, 1],
                    backgroundColor: '#24FFD5'
                },{
                    duration: 300,
                    easing: 'spring'
                });

        } else {
            this.hideNav();
        }
        
            
    },
    render: function(){
        var navItems = _.map(this.props.sections, function(section, i){
            return <NavItem section={section} hideNav={this.hideNav}/>;
        }.bind(this));

        return (
            <div id="nav">
                <nav>
                    <ul>
                        {navItems}
                    </ul>
                </nav>
                <div onClick={this.toggleNav} className="nav-toggle">
                    <div className="icon">
                        <span></span>
                    </div>
                </div>
                
            </div>
        );
    }
});