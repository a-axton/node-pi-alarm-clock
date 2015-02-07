var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
    showSection: function(section) {
        AppDispatcher.handleViewAction({
            actionType: 'SHOW_SECTION',
            section: section
        });
    },
}