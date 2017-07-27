import * as THREE from 'three';

import { CMPDataVizController } from './controllers/CMPDataVizController';
import { Scripts } from './Scripts';
import { PanoPortal } from './lib/PanoPortal';
import { CMPProgram } from './CMPProgram';
import { Screens } from './Screens';
import { Game } from './Game';
import { Dancer } from './controllers/DanceController';
import NavigationController from './controllers/NavigationController';
import SolarSystemController from './controllers/SolarSystemController';
import StarsController from './controllers/StarsController';
import UIController from './controllers/UIController';
import VRGame from './VRGame';
import WebVR from './lib/vr/WebVR';

import { ViewManager } from './ViewManager';
import { addLight, setupLights } from './Lights';
import Marquee from './Marquee';

let {degToRad} = THREE.Math;

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

let LIGHTS = [
    {  type: 'PointLight', name: 'light1', color: 0xffaaaa, position: [0, -25,-2]},
    {  type: 'PointLight', name: 'light2', color: 0xaaffaa, position: [0, -25, 0]},
    {  type: 'PointLight', name: 'light3', color: 0xaaaaff, position: [0, -25, 2]},
    {  type: 'PointLight', name: 'sun',    color: 0xffffff, position: [0, 1000, 0], distance: 5000},
];

let OBJ_MODEL = {
    type: 'Model', name: 'derrick', parent: 'station',
    path: 'models/obj/derrick.obj',
    position: [20, 0, 1.6], rot: [0, 0, 0], scale: 2.0
};

let SPECS = [
    {   type: 'Group', name: 'station'  },
    {   type: 'Model', name: 'platform',
        parent: 'station',
        path: 'models/PlayDomeSkp_v1.dae',
        position: [0, 0, 0],
        rot: [0, 0, 0],
        scale: 0.025
    },
    {   type: 'Model', name: 'bmw',
        parent: 'station',
        path: 'models/bmw/model.dae',
        position: [0.2, 0, 1.6],
        rot: [0, 0, 0],
        scale: 0.020,
        visible: false
    },
    OBJ_MODEL,
    {   type: 'Screen', name: 'mainScreen',
        parent: 'station', radius: 8.8,
        path: 'videos/Climate-Music-V3-Distortion_HD_540.webm',
        phiStart: 34, phiLength: 47,
        thetaStart: 110, thetaLength: 140
    },
    {   type: 'Screen', name: 'rightScreen',
        parent: 'station', radius: 8.8,
        path: 'videos/Climate-Music-V3-Distortion_HD_540.webm',
        phiStart: 34, phiLength: 47,
        thetaStart: 300, thetaLength: 60
    },
    {  type: 'Marquee',    name: 'marquee1',
       radius: 7,
       phiStart: -50, phiLength: 100,
       thetaStart: 65, thetaLength: 20
    },
    LIGHTS,
    {  type: 'Inline',     name: 'debugStuff', children: TEST },
    {  type: 'CMPDataViz', name: 'cmp',
       position: [0, 2, 0], rotation: [0, 0, 0], scale: [1.5, 1, 1.5],
       visible: false
    },
    {  type: 'SolarSystem' },
    {  type: 'Stars' }
];

function start(config) {
    var specs = config.specs || SPECS;

    let isVRWithFallbackControl =
        config.preferredControl === 'vr' ||
        config.fallbackControl === 'pointerlock';

    if (isVRWithFallbackControl) {
        window.game = new VRGame('canvas3d');
    } else if (config.preferredControl === 'multi') {
        window.game = new Game('canvas3d');
        game.addMultiControls();
    }

    window.game = game;
    game.defaultGroupName = 'station';

    let cmpProgram = new CMPProgram(game);
    game.setProgram(cmpProgram);
    
    let uiController = new UIController({
        game: game,
        playerControl: cmpProgram
    });
    let scriptControls = new Scripts(game, uiController);
    game.viewManager = new ViewManager(game, uiController);

    if (isVRWithFallbackControl) {
        let navigationController = new NavigationController(game.body, game.camera, game.plControls);
        game.registerController('navigation', navigationController);
    }

    game.registerController('ui', uiController);
    game.registerController('scripts', scriptControls);
    game.registerController("viewManager", game.viewManager);

    game.load(specs);

    if (isVRWithFallbackControl) {
        game.body.position.set(2, 1.5, 2);
    }
    else {
        game.camera.position.set(100, 200, 150);
    }

    game.animate(0);
}

window.start = start;
