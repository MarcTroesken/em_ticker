var moment = require('moment');
moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "vor %s",
        s:  "%d Sekunden",
        m:  "einer Minute",
        mm: "%d Minuten",
        h:  "einer Stunde",
        hh: "%d Stunden",
        d:  "einem Tag",
        dd: "%d Tagen",
        M:  "einem Monat",
        MM: "%d Monaten",
        y:  "einem Jahr",
        yy: "%d Jahren"
    }
});

module.exports = moment;