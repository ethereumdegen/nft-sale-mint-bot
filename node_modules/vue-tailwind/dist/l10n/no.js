"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Norwegian = void 0;
exports.Norwegian = {
    weekdays: {
        shorthand: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
        longhand: [
            'Søndag',
            'Mandag',
            'Tirsdag',
            'Onsdag',
            'Torsdag',
            'Fredag',
            'Lørdag',
        ],
    },
    months: {
        shorthand: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Okt',
            'Nov',
            'Des',
        ],
        longhand: [
            'Januar',
            'Februar',
            'Mars',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Desember',
        ],
    },
    firstDayOfWeek: 1,
    rangeSeparator: ' til ',
    weekAbbreviation: 'Uke',
    time24hr: true,
    ordinal: () => '.',
};
exports.default = exports.Norwegian;
