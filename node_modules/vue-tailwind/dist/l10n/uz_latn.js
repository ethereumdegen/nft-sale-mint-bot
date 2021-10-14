"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UzbekLatin = void 0;
exports.UzbekLatin = {
    weekdays: {
        shorthand: ['Ya', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'],
        longhand: [
            'Yakshanba',
            'Dushanba',
            'Seshanba',
            'Chorshanba',
            'Payshanba',
            'Juma',
            'Shanba',
        ],
    },
    months: {
        shorthand: [
            'Yan',
            'Fev',
            'Mar',
            'Apr',
            'May',
            'Iyun',
            'Iyul',
            'Avg',
            'Sen',
            'Okt',
            'Noy',
            'Dek',
        ],
        longhand: [
            'Yanvar',
            'Fevral',
            'Mart',
            'Aprel',
            'May',
            'Iyun',
            'Iyul',
            'Avgust',
            'Sentabr',
            'Oktabr',
            'Noyabr',
            'Dekabr',
        ],
    },
    firstDayOfWeek: 1,
    ordinal() {
        return '';
    },
    rangeSeparator: ' — ',
    weekAbbreviation: 'Hafta',
    amPM: ['AM', 'PM'],
    yearAriaLabel: 'Yil',
    time24hr: true,
};
exports.default = exports.UzbekLatin;
