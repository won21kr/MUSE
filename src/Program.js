/*
  This is base class for object that controls various media and animations
  associated with a program or performance.

  Long term plan is that this, or a subclass, can read from spreadsheets or
  JSON specs that fully define a performance.

  It displays things like which displays are visible, what is presented on
  the displays, which objects are on stage, etc.
*/
import {sprintf} from "sprintf-js";
import * as Util from './Util';
import {Game} from './Game';
import {MUSE} from './MUSE';
import {MUSENode} from './Node';

function getClockTime() { return new Date().getTime()/1000.0; }

class Program extends MUSENode
{
    constructor(game, options) {
        options = options || {};
        super(game, options);
        this.checkOptions(options);
        this.game = game;
        game.setProgram(this);
        this.gss = null;
        this.mediaSequence = null;
        if (options.gss)
            this.gss = new GSS.SpreadSheet(options.gss);
        this.startTime = 0;
        if (options.startTime) {
            //var date = Util.toDate(options.startTime);
            //this.startTime = date.getTime()/1000.0;
            this.startTime = Util.toTime(options.startTime);
        }
        this.duration = options.duration || 60;
        this._playTime = 0;
        var playSpeed = options.playSpeed || 1.0;
        this.setPlaySpeed(playSpeed);
        var t = 0;
        if (options.playTime) {
            t = Util.toTime(options.playTime);
        }
        this.setPlayTime(t);
        this.onStartProgram = options.onStartProgram;
        this.channels = options.channels || [];
        this.scripts = options.scripts || {};
        this.stages = options.stages || [];
        console.log("channels:", this.channels);
        var inst = this;
        setInterval(()=>inst.tick(), 200);
        if (options.media) {
            this.setMedia(options.media);
        }
        this.readyPromise = new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    startProgram() {
        var t = this.getPlayTime();
        this.setPlayTime(t);
        if (this.onStartProgram)
            this.onStartProgram(this.game, this);
    }

    setTimeRange(startTime, endTime)
    {
        var startTime = Util.toTime(startTime);
        var endTime = Util.toTime(endTime);
        this.startTime = startTime;
        var dur = endTime - startTime;
        this.duration = dur;
    }

    tick() {
        var t = this.getPlayTime();
        //console.log("tick "+t);
        this.displayTime(t);
    }

    formatTime(t) {
        if (t == undefined) {
            console.log("yikes formatTime got bad t");
            return "*** null ***";
        }
        return sprintf("%8.1f", t);
    }

    // This should just update UI elements with playtime information.
    // this may get called with every tick, so the things it causes
    // should be lightweight. (E.g. not seeking videos or redrawing
    // animations.)
    displayTime(t, isAdjust) {
        //console.log("displayTime "+t);
        var tStr = "";
        try {
            tStr = this.formatTime(t);
        }
        catch (e) {
            console.log("err: ", e);
            console.log("*** displayTime err  t: "+t);
        }
        this.game.state.set("time", t);
        this.game.state.set('seek', isAdjust ? true : false);
        var dur = this.duration;
    	let value = ((t-this.startTime)/(0.0+dur));
        if (game.controllers.ui) {
            game.controllers.ui.setTimeSlider(value);
        }
        // This bit is a hack because it is CMP specific.
        // it was moved here from CMPProgram.  This functionality
        // can all be moved to scripts in the config.
        if (this.gss) {
            var year = GSS.timeToYear(t);
            //console.log("year: " + year);
            var yearStr = "";
            if (year) {
                var va = this.gss.getFieldByYear(year, "videofade");
                var nar = this.gss.getFieldByYear(year, "narrative") || "";
                //console.log("va: " + va + "  narrative: " + nar);
                yearStr = Math.floor(year);
                if (nar) {
                    this.game.state.set('narrative', yearStr + ':' + nar);
                }
            }
            //console.log("yearStr:"+yearStr);
            this.game.state.set('year', yearStr);
        }
    }

    play() {
        console.log("**** play *****");
        this.setPlaySpeed(this._savedPlaySpeed);
        this.propagate(player => player.play());
    }

    pause() {
        console.log("**** pause *****");
        this._savedPlaySpeed = this._playSpeed;
        this._playSpeed = 0;
        this.propagate(player => player.pause());
    }

    isPlaying() {
        return this._playSpeed > 0;
    }

    getPlaySpeed() {
        return this._playSpeed;
    }

    setPlaySpeed(s) {
        this._playSpeed = s;
        this._savedPlaySpeed = s;
        return s;
    }

    getPlayTime() {
        var t = getClockTime();
        var dt = t - this._prevClockTime;
        this._prevClockTime = t;
        //console.log("dt: "+dt+"  "+this._playSpeed);
        this._playTime += dt*this._playSpeed;
        return this._playTime;
    };

    getRelativeTime(name) {
        var t = this.getPlayTime();
        var t0 = game.state.get(name+"._t");
        if (t0)
            return t - t0;
        return t;
    }

    // isAdjust is true if this was an adjustment (e.g. scrubbing) event
    // that should not force a heavyweight seek.  This can be ignored,
    // but may provide a nicer user experience if expensive operations
    // are only done when isAdjust=false.
    setPlayTime(t, isAdjust) {
        t = Util.toTime(t);
        this._prevClockTime = getClockTime();
        this._playTime = t;
        this.game.players.forEach(player => {
            var rt = this.getRelativeTime(player.name);
            if (player.setPlayTime)
                player.setPlayTime(rt);
        });
        this.displayTime(t, isAdjust);
    }

    propagate(fun) {
        this.game.players.forEach(player => {
            try { fun(player) }
            catch (e) {
                console.log("err: ", e);
            }
        });
    }

    setMedia(mediaSpec) {
        var specs = this.game.loadSpecs(mediaSpec, "media");
    }

    addMediaSequence(mediaSequence) {
        if (this.mediaSequence) {
            alert("MediaControl does not support more than one media sequence.");
        }
        this.mediaSequence = mediaSequence;
    }

    prevState() {
        console.log("MediaControl.prev");
        if (this.mediaSequence)
            this.mediaSequence.prev();
    }

    nextState() {
        console.log("MediaControl.next");
        if (this.mediaSequence)
            this.mediaSequence.next();
    }
}

function addProgram(game, opts)
{
    let program = new Program(game, opts);
    return program.readyPromise;
}

Game.registerNodeType("Program", addProgram);

MUSENode.defineFields(Program, [
    "media",
    "startTime",
    "playTime",
    "playSpeed",
    "duration",
    "gss",
    "stages",
    "channels",
    "scripts",
    "onStartProgram"
]);

export {Program};