function dataParse(str){
    const st1 = str.split(':');
    const hour = +st1[0];
    const st2 = st1[1].split(' ');
    const min = +st2[0];
    const mer = st2[1];
    return { hour, min, mer };
}

function duration(start, end){
    const s = dataParse(start);
    const e = dataParse(end);
    const sCombined = +`${s.hour}${s.min}`;
    const eCombined = +`${e.hour}${e.min}`;

    //start and finish same day morning
    //start and finish same day pm
    if(s.mer === e.mer && sCombined < eCombined){
        const sMin = s.hour * 60 + s.min;
        const eMin = e.hour * 60 + e.min;
        return eMin - sMin;
    }
    //CORRECT start in morning, finish in pm same day
    else if(s.mer === 'am' && e.mer === 'pm'){
        const sMin = s.hour * 60 + s.min;
        const eMin = (12 + e.hour) * 60 + e.min;
        return eMin - sMin;
    }
    //CORRECT same day, evening
    else if(s.mer === 'pm' && e.mer === 'pm' && sCombined < eCombined){
        const sMin = s.hour * 60 + s.min;
        const eMin = e.hour * 60 + e.min;
        return eMin - sMin;
    }
    //CORRECT morning one day and morning next day
    else if(s.mer === 'am' && e.mer === 'am'){
        const sMin = s.hour * 60 + s.min;
        const eMin = (24 + e.hour) * 60 + e.min;
        return eMin - sMin;
    }
    //CORRECT starts in afternoon one day, ends in afternoon next day - FIXED
    else if(s.mer === 'pm' && e.mer === 'pm'){
        const sMin = s.hour * 60 + s.min;
        const eMin = (24 + e.hour) * 60 + e.min;
        return eMin - sMin;
    }

    //CORRECT start in afternoon one day, finish in the morning of next day, time format is 12 hour - FIXED
    else if(s.mer === 'pm' && e.mer === 'am'){
        const sMin = s.hour * 60 + s.min;
        const eMin = (e.hour + 12) * 60 + e.min;
        return eMin - sMin;
    }
}

console.log(duration('10:10 am', '10:30 am'));//20 min correct
console.log(duration('10:10 am', '11:30 am')); //80 min correct
console.log(duration('10:10 am', '1:30 pm')); //200 min correct

console.log(duration('1:10 pm', '1:30 pm')); //20 min correct
console.log(duration('1:10 pm', '2:30 am'));//800 min correct, Fixed

console.log(duration('10:10 am', '9:30 am'));//1400 min correct
console.log(duration('1:10 pm', '10:30 am'));// 1280 min, Fixed
console.log(duration('1:10 pm', '1:05 pm'));// 1435 min, Fixed

module.exports = duration;

