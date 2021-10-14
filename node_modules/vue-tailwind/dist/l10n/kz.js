"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kazakh = void 0;
exports.Kazakh = {
    weekdays: {
        shorthand: ['Жс', 'Дс', 'Сc', 'Ср', 'Бс', 'Жм', 'Сб'],
        longhand: [
            'Жексенбi',
            'Дүйсенбi',
            'Сейсенбi',
            'Сәрсенбi',
            'Бейсенбi',
            'Жұма',
            'Сенбi',
        ],
    },
    months: {
        shorthand: [
            'Қаң',
            'Ақп',
            'Нау',
            'Сәу',
            'Мам',
            'Мау',
            'Шiл',
            'Там',
            'Қыр',
            'Қаз',
            'Қар',
            'Жел',
        ],
        longhand: [
            'Қаңтар',
            'Ақпан',
            'Наурыз',
            'Сәуiр',
            'Мамыр',
            'Маусым',
            'Шiлде',
            'Тамыз',
            'Қыркүйек',
            'Қазан',
            'Қараша',
            'Желтоқсан',
        ],
    },
    firstDayOfWeek: 1,
    ordinal() {
        return '';
    },
    rangeSeparator: ' — ',
    weekAbbreviation: 'Апта',
    amPM: ['ТД', 'ТК'],
    yearAriaLabel: 'Жыл',
};
exports.default = exports.Kazakh;
