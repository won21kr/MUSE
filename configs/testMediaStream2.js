
MEDIA_SPEC = [
    {  type: 'StateStream',
       records: [
           { t: 0,     year: 0, population: "few", narrative: ""},
           { t: 100,   year: 1066, narrative: "Norman conquest", population: "more"},
           { t: 200,   year: 1812, population: "many"},
           { t: 300,   year: 1958},
       ]
    }
]

// Note that letting these rules be set programaticaly allows programmers to be
// unaware of cyclical loops.   Requiring them to be done by using a rule, such
// as Routes allows the system to be able to detect cycles.
function onStart0(game) {
    game.state.on('time', t => game.state.set("timeStr", sprintf("T_%.2f", t)));
    game.state.on('time', t => game.state.set("f1", t-1));
    game.state.on('f1',  f1 => game.state.set('f2', 2*f1));
    //game.state.on('f2', v => game.state.set('f1', v+2)); // This causes stack overflows.
}

ROUTES = [];

class Route
{
    constructor(src, dst, fun) {
        console.log("Route "+src+" "+dst);
        fun = fun || (v => v);
        this.src = src;
        this.dst = dst;
        this.fun = fun;
        game.state.on(src, v => {
            game.state.set(dst, fun(v));
        });
        ROUTES.push(this);
    }
}

function onStart(game) {
    console.log("============================");
    new Route("time", "timeStr", v => sprintf("t: %.2f", v));
    new Route("time", "f1", t => t-1);
    new Route("f1", "f2");
}

var CONFIG = {
    onStart: onStart,
    'webUI': {type: 'JQControls'},
    'program': {
       duration: 32*60,
       channels: ['time', 'timeStr', 'year', 'narrative', 'population',
            'f1', 'f2'],
       media: MEDIA_SPEC,
    },
};

MUSE.returnValue(CONFIG);
