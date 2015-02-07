var React = require('react');
var _ = require('lodash');
window.jQuery = require('jquery');
require('velocity-animate');

var AppDispatcher = require('./dispatcher/AppDispatcher')
var config = require('./app-config');
var Nav = require('./Nav');
var Section = require('./modules/Section');
var Lights = require('./modules/lights');
var Command = require('./modules/Command');

var App = React.createClass({
    render: function(){
        var appConfig = this.props.config;
        var sections = _.map(appConfig.sections, function(section, i){
            return <Section section={section} key={i} index={i}/>
        });

        return (
            <div>
                <Nav sections={appConfig.sections}/>
                <div className="sections">
                    {sections}
                </div>
            </div>
        );
    }
});

React.initializeTouchEvents(true);

React.render(
    <App config={config}/>, 
    document.getElementById('app')
);