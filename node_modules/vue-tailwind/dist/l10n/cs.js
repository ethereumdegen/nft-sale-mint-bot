"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Czech = void 0;
exports.Czech = {
    weekdays: {
        shorthand: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
        longhand: [
            'Neděle',
            'Pondělí',
            'Úterý',
            'Středa',
            'Čtvrtek',
            'Pátek',
            'Sobota',
        ],
    },
    months: {
        shorthand: [
            'Led',
            'Ún',
            'Bře',
            'Dub',
            'Kvě',
            'Čer',
            'Čvc',
            'Srp',
            'Zář',
            'Říj',
            'Lis',
            'Pro',
        ],
        longhand: [
            'Leden',
            'Únor',
            'Březen',
            'Duben',
            'Květen',
            'Červen',
            'Červenec',
            'Srpen',
            'Září',
            'Říjen',
            'Listopad',
            'Prosinec',
        ],
    },
    firstDayOfWeek: 1,
    ordinal() {
        return '.';
    },
    rangeSeparator: ' do ',
    weekAbbreviation: 'Týd.',
    amPM: ['dop.', 'odp.'],
    yearAriaLabel: 'Rok',
    time24hr: true,
};
exports.default = exports.Czech;
