"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slovenian = void 0;
exports.Slovenian = {
    weekdays: {
        shorthand: ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'],
        longhand: [
            'Nedelja',
            'Ponedeljek',
            'Torek',
            'Sreda',
            'Četrtek',
            'Petek',
            'Sobota',
        ],
    },
    months: {
        shorthand: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Maj',
            'Jun',
            'Jul',
            'Avg',
            'Sep',
            'Okt',
            'Nov',
            'Dec',
        ],
        longhand: [
            'Januar',
            'Februar',
            'Marec',
            'April',
            'Maj',
            'Junij',
            'Julij',
            'Avgust',
            'September',
            'Oktober',
            'November',
            'December',
        ],
    },
    firstDayOfWeek: 1,
    rangeSeparator: ' do ',
    time24hr: true,
    ordinal() {
        return '.';
    },
};
exports.default = exports.Slovenian;
