module.exports = {
    calculatePosition: function(){
        // used to calculate position in 2x2 grid
        // fires before render
        var index = this.props.index;
        var translateY;
        var translateX;
        
        if (index % 2 == 1){
            translateX = 48;
            translateY = (Math.floor(index / 2) * 48);
        } else {
            translateX = 0;
            
            if (index > 0){
                translateY = ((Math.floor(index / 2)) * 48);
            } else {
                translateY = 0;
            }
        }

        var hyp = Math.pow(translateX,2)+Math.pow(translateY,2);
            hyp = Math.sqrt(hyp);

        this.setState({
            distance: hyp,
            translateY: translateY,
            translateX: translateX
        });
    },
    gridLoadAnimation: function(){
        var $el = jQuery(this.getDOMNode());
        var index = this.props.index;
        var y = this.state.translateY;
        var x = this.state.translateX;

        if (this.props.active){
            $el.velocity({
                translateY: [y+'vw', (y+3) + 'vw'],
                translateX: [x+'vw', x+'vw'],
                opacity: 1
            },{
                delay: (index+1)*80,
                display: 'block'
            })    
        } else {
            $el.velocity('reverse', { duration: 200, display: 'none'});
        } 
    }
}