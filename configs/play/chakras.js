
var CONFIG = {
    //'cameraControls': 'Orbit',
    cameraControls: {type: 'MultiControls', movementSpeed: .15, keyPanSpeed: .02},
    gameOptions: {ambientLightIntensity: 2, headlightIntensity: 3},
    webUI: {type: 'JQControls',
             //screens: ["mainScreen"],
          },
    'program': {
       duration: 32*60,
       channels: ['time', 'year', 'narrative', 'spaceStatus'],
    },
    //'venue': '/configs/venues/imaginarium.js',
    nodes: [
        {type: 'Chakras'}
    ]
};

MUSE.returnValue(CONFIG);
