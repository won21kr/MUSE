
var TEST = [
    {  type: 'Group',  name: 'station' },
    {  type: 'Group',  name: 'g2',
       position: [200,0,0], rot: [45,0,0],
       children: {type: 'Axes'}
    },
    {  type: 'Group',  name: 'g3',
       position: [200,-500,0],
       rot: [0,30,0],
       children: [
           {  type: 'Axes', name: 'axis3',
              visible: false
           }
       ]
    },
    {  type: 'Axes',   name: 'xyz' }
]

var LIGHTS = [
    {  type: 'PointLight', name: 'light1', color: 0xffaaaa, position: [0, -25,-2]},
    {  type: 'PointLight', name: 'light2', color: 0xaaffaa, position: [0, -25, 0]},
    {  type: 'PointLight', name: 'light3', color: 0xaaaaff, position: [0, -25, 2]},
    {  type: 'PointLight', name: 'sun',    color: 0xffffff, position: [0, 1000, 0], distance: 5000},
];

var OBJ_MODEL = {
    type: 'Model', name: 'derrick', parent: 'station',
    path: 'assets/models/obj/derrick.obj',
    position: [20, 0, 1.6], rot: [0, 0, 0], scale: 2.0
};

var VID_BUBBLES = [
    {   type: 'Screen', name: 'vidBubble1', parent: 'station', radius: 0.4, position: [0,3.6,0],
        path: 'assets/video/YukiyoCompilation.mp4',
    },
    // {   type: 'Screen', name: 'vidBubble2', parent: 'station', radius: 0.4, position: [1,3.6,0],
    //     path: 'webrtc+http://localhost:8081',
    // },
];

var SATELLITE_MODEL = [
    {   type: 'Model', name: 'satellite1',
        parent: 'station',
        //path: 'assets/models/AcrimSat_FINAL.fbx',
        //path: 'assets/models/ISS.fbx',
        path: 'assets/models/satellites/Juno/Juno.obj',
        scale: 1.0
    }
];

var IMAGINARIUM_VENUE = [
    {  type: 'Stats', right: '-0px' },
    //{  type: 'JQControls' },
    {  type: 'ViewManager', bookmarksUrl: 'data/imaginarium_bookmarks.json' },
    //{  type: 'Scripts' },
    {   type: 'Group', name: 'station'  },
    {   type: 'Model', name: 'platform',
        parent: 'station',
        path: 'assets/models/PlayDomeSkp_v1.dae',
        position: [0, 0, 0],
        rot: [0, 0, 0],
        scale: 0.025
    },
    {   type: 'Model', name: 'bmw',
        parent: 'station',
        path: 'assets/models/bmw/model.dae',
        position: [0.2, 0, 1.6],
        rot: [0, 0, 0],
        scale: 0.020,
        visible: false
    },
    //SATELLITE_MODEL,
    //OBJ_MODEL,
    //VID_BUBBLES,
    {   type: 'Screen', name: 'mainScreen',
        parent: 'station', radius: 8.8,
        //path: 'assets/video/Climate-Music-V3-Distortion_HD_540.webm',
        path: 'textures/DisplayNames/display1.PNG',
        phiStart: 34, phiLength: 47,
        thetaStart: 110, thetaLength: 140
    },
    {   type: 'Screen', name: 'rightScreen',
        parent: 'station', radius: 8.8,
        //path: 'assets/video/Climate-Music-V3-Distortion_HD_540.webm',
        path: 'textures/DisplayNames/display2.PNG',
        phiStart: 40, phiLength: 30,
        thetaStart: 270, thetaLength: 60
    },
    {   type: 'Screen', name: 'leftScreen',
        parent: 'station', radius: 8.8,
        //path: 'assets/video/Climate-Music-V3-Distortion_HD_540.webm',
        path: 'textures/DisplayNames/display3.PNG',
        phiStart: 40, phiLength: 30,
        thetaStart: 40, thetaLength: 50
    },
    {  type: 'Screen',    name: 'marquee1',
       radius: 7,
       phiStart: 65, phiLength: 20,
       thetaStart: -50, thetaLength: 100
    },
    LIGHTS,
    //{  type: 'Inline',     name: 'debugStuff', children: TEST },
    {  type: 'Dancer', name: 'dancer', visible: false },
    {  type: 'CMPDataViz', name: 'cmp',
       position: [0, 2, 0], rotation: [0, 0, 0], scale: [1.5, 1, 1.5],
       visible: false
    },
    {  type: 'SolarSystem' },
    {  type: 'Stars' },
    //{  type: 'Hurricane', scale: 0.01 }
    {  type: 'VirtualEarth', name: 'vEarth', satTracks: 0,
       radius: 1.25, position: [0,1.9,0],
       xxxsatTracks: {dataSet: 'iridiumCosmos.3le',
                    models: {
                        22675: {path:'assets/models/satellites/ComSat/model.dae',
                                       scale: .001},
                        24946: {path:'assets/models/satellites/Iridium/model.dae',
                                      scale: .00005}
                    }},
    }
];

export {IMAGINARIUM_VENUE};
