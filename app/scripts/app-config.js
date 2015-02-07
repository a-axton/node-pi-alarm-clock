module.exports = {
    sections: [
        {
            name: 'lights',
            color: 'yellow',
            icon: 'loader',
            commands: [
                {
                    name: 'All On',
                    command: 'allOn'
                },
                {
                    name: 'All Off',
                    command: 'allOff'
                },
                {
                    name: 'Night Mode',
                    command: 'nightMode'
                }
            ]
        },
        {
            name: 'media',
            color: 'blue',
            icon: 'play'
        },
        {
            name: 'alarm',
            color: 'purple',
            icon: 'clock',
            wake: {
                hours: 9,
                minutes: 20,
                type: 'am'
            },
            sleep: {
                hours: 12,
                minutes: 00,
                type: 'am'
            }
        }
    ]
}