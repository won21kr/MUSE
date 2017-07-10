
import 'yuki-createjs';
console.log("********************************************");

class Anim
{
    constructor(name, target) {
        var inst = this;
        this.target = target;
        window.OBJ = {'x': 0}
        console.log("Anim "+name);
        this.name = name;
        this.tween = createjs.Tween.get(OBJ)
        //this.tween = new TWEEN.Tween(OBJ)
	    .to({x:0},   0)
	    .to({x:10},  10000)
	    .to({x:20}, 100000);
        this.tween.addEventListener('change', () => inst.handleChange(OBJ))
    }

    handleChange(obj)
    {
        console.log("OBJ: "+JSON.stringify(obj));
        //var m = game.models.platform.scene;
        //var m = game.models.station.scene;
        var m = this.target;
        this.target.x = obj.x;
    }

    get playTime() {
        return 0;
    }

    set playTime(t) {
        this.tween.setPosition(t);
    }
}



function animTest(game)
{
    game = game || window.game;
    console.log("!!!! >>>>>>>>>>>>>>>>>>>>>>>>>> animTest...........");
    window.a = new Anim("anim1", game.models.station.position);
    game.programControl.registerPlayer(a, "anim1");
}

export {animTest, Anim};

