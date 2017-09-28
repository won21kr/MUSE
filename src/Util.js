
import * as THREE from 'three';
import { sprintf } from "sprintf-js";
var toDeg = THREE.Math.radToDeg;

// This is ridiculous to not have a standard language feature for this by now
export function values(obj) { return Object.keys(obj).map( k => obj[k]) };

// take a string, a float (seconds since epoch) or date
// and return date.
export function toDate(datetime) {
//    const [day, month, year] = dateStr.split("-");
//    return new Date(year, month - 1, day);
    if (datetime instanceof Date)
        return datetime;
    if (datetime == 'now')
        return new Date();
    if (typeof datetime == 'string') {
        var d = Date.parse(datetime);
        return new Date(d);
    }
    return new Date(datetime*1000);
}

export function toTime(datetime) {
//    const [day, month, year] = dateStr.split("-");
//    return new Date(year, month - 1, day);
    if (datetime instanceof Date)
        return datetime.getTime()/1000.0;
    if (datetime == 'now')
        return getClockTime();
    if (typeof datetime == 'string') {
        var d = Date.parse(datetime);
        return new Date(d).getTime()/1000.0;
    }
    return datetime;
}

export function formatDatetime(dt)
{
    if (!(dt instanceof Date))
        dt = new Date(dt*1000);
    return sprintf("%s/%s/%s %02d:%02d:%02d",
                    dt.getMonth()+1, dt.getDate(), dt.getFullYear(),
                    dt.getHours(), dt.getMinutes(), dt.getSeconds());
}

export function getClockTime() {
    return new Date().getTime()/1000.0;
}

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getJSON(url, handler)
{
    console.log("Util.getJSON: "+url);
    $.ajax({
        url: url,
        dataType: 'text',
        success: function(str) {
            var data;
            try {
                data = JSON.parse(str);
            }
            catch (err) {
                console.log("err: "+err);
                alert("Error in json for: "+url+"\n"+err);
                return;
            }
            handler(data);
        }
    });
}

export function toJSON(obj)
{
    return JSON.stringify(obj, null, 3);
}

export function getCameraParams(cam)
{
    console.log("LookControls.getCameraParams");
    cam = cam || window.game.camera;
    var wv = cam.getWorldDirection();
    //console.log("wv: "+JSON.stringify(wv));
    var s = new THREE.Spherical();
    s.setFromVector3(wv);
    console.log(sprintf("cam phi: %6.2f theta: %6.2f", toDeg(s.phi), toDeg(s.theta)));
    //return {phi: s.phi, theta: s.theta};
    return s;
}

export function randomIntFromInterval(min,max)
{
    return Math.floor(randomFromInterval(min,max));
}

export function randomFromInterval(min,max)
{
    return Math.random()*(max-min+1)+min;
}

export default {
    getJSON,
    getClockTime,
    getCameraParams,
    getParameterByName,
    randomIntFromInterval,
    randomFromInterval,
    toTime,
    toDate,
    formatDatetime,
    values
};
