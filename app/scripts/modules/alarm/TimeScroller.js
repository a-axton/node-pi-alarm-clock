var React = require('react');
var _ = require('lodash');
var dragStart;
var scrolled = 0;
var position = 0;
var lastChanged = 0;

module.exports = React.createClass({
    startDrag: function(e){
        dragStart = e.changedTouches[0].clientY;
    },
    endDrag: function(e){
        jQuery(this.getDOMNode()).velocity('stop');
    },
    drag: function(e){
        var drag = e.changedTouches[0].clientY;
        var interval = 50;
        var changed = dragStart - drag;
        var diff = lastChanged - changed;
        var round = Math.round(changed / interval);
        var $el = jQuery(this.getDOMNode());
        var newY;

        if (round != scrolled){
            if (diff <= 0){
                newY = '-=60';
                position = position - 60;
            } else {
                newY = '+=60';
                position = position + 60;
            }
            
            // if ($el.position().top < 0){ return }
            
            $el.velocity({translateY: newY}, {duration: 100, easing: 'easeOutBack'})

            scrolled++;
        }

        lastChanged = changed;
    },
    render: function(){
        var selected;
        var type = this.props.type;
        var times;
        
        if (type == 'hours'){
            times = [1,2,3,4,5,6,7,8,9,10,11,12];
        } else if (type == 'minutes'){
            times = [00,15,30,45];
        }

        var time = _.map(times, function(time,i){
            if (time == this.props.time){
                selected = i;
                return <span className="selected">{time}</span>
            } else {
                return <span>{time}</span>
            }
        }.bind(this));
        
        var style = {
            transform: 'translateY(-'+(selected*60)+'px)'
        }

        return (
                <div    className="times hours"
                        style={style}
                            onTouchMove={this.drag} 
                            onTouchStart={this.startDrag}
                            onTouchEnd={this.endDrag}>
                        {time}
                    </div>
        );
    }
});