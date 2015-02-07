var React = require('react');
var _ = require('lodash');

var Header = require('../Header');
var Back = require('../Back');
var Command = require('./Command');
var Lights = require('./lights');
var Alarm = require('./alarm');

var grid = require('../utils/grid');

module.exports = React.createClass({
    mixins: [grid],
    loadModule: function(){
        if (this.state.active){return}

        var self = this;
        var $el = jQuery(this.getDOMNode());
        var x = this.state.translateX;
        var y = this.state.translateY;
        var dur = this.state.distance * 5;
            dur = dur || 200;

        $el
            .css({
                'z-index': 50,
                'position':'fixed',
                'backface-visibility':'visible'
            })
            .velocity({
                translateY: ['-4vw', y + 'vw'],
                translateX: ['-4vw', x + 'vw'],
                width: ['100vw', '44vw'],
                height: ['100vh', '44vw']
            },{
                duration: dur,
                easing: 'easeInSine',
                complete: self.showModuleContent
            });

        this.setState({
            active: true
        });
    },

    hideSection: function(){
        var $el = jQuery(this.getDOMNode());
        var header = this.refs.header;
        var back = this.refs.back;

        header.animateOut();
        back.animateOut();

        $el
            .css({'backface-visibility':'hidden'})
            .velocity('reverse', {
                duration: 320, 
                easing: 'easeInOutSine',
                complete: function(){
                    $el.css({
                        'z-index':'inherit',
                        'position':'absolute'
                    });
                }
            });

        this.setState({
            active: false
        });
    },

    showModuleContent: function(){
        var header = this.refs.header;
        var back = this.refs.back;

        header.animateIn();
        back.animateIn();
    },

    componentWillMount: function(){
        // inherited from grid mixin
        this.calculatePosition();
    },

    changeSectionState: function(sectionState){
        // changes state of section based on
        // what commands were used
        this.setState({
            sectionState: sectionState
        });
    },

    getInitialState: function(){
        return {
            translateX: 0,
            translateY: 0,
            distance: 0,
            active: false,
            sectionState: null
        }
    },

    render: function(){
        var section = this.props.section;
        var name = section.name;
        var color = section.color;
        var module;
        var commands;

        if (section.commands){
            commands = _.map(section.commands, function(command, i){
                return <Command command={command} parent={name} index={i} active={this.state.active}/>;
            }.bind(this));    
        }

        if (name == 'lights'){
            module =    <Lights active={this.state.active} changeSectionState={this.changeSectionState}>
                            {commands}
                        </Lights>
        } else if (name == 'alarm'){
            module =    <Alarm section={this.props.section} active={this.state.active} changeSectionState={this.changeSectionState}>
                            {commands}
                        </Alarm>
        }
        
        var style = {
            transform: 'translateY('+this.state.translateY+'vw) translateX('+this.state.translateX+'vw)'
        }

        return (
            <div
                className={'block ' + name + ' ' + color}
                data-active={this.state.active}
                data-state={this.state.sectionState}
                style={style}
                onClick={this.loadModule}>

                <div className="section-content">
                    <Header ref="header" title={name} active={this.state.active}/>
                    {module}
                    <Back ref="back" hideSection={this.hideSection}/>
                </div>

                <div className="section-info">
                    <span className={"icon icon-"+section.icon}></span>
                </div>

            </div>
        );
    }
});