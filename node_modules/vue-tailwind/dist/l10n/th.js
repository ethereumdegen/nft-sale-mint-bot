"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thai = void 0;
exports.Thai = {
    weekdays: {
        shorthand: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
        longhand: [
            'อาทิตย์',
            'จันทร์',
            'อังคาร',
            'พุธ',
            'พฤหัสบดี',
            'ศุกร์',
            'เสาร์',
        ],
    },
    months: {
        shorthand: [
            'ม.ค.',
            'ก.พ.',
            'มี.ค.',
            'เม.ย.',
            'พ.ค.',
            'มิ.ย.',
            'ก.ค.',
            'ส.ค.',
            'ก.ย.',
            'ต.ค.',
            'พ.ย.',
            'ธ.ค.',
        ],
        longhand: [
            'มกราคม',
            'กุมภาพันธ์',
            'มีนาคม',
            'เมษายน',
            'พฤษภาคม',
            'มิถุนายน',
            'กรกฎาคม',
            'สิงหาคม',
            'กันยายน',
            'ตุลาคม',
            'พฤศจิกายน',
            'ธันวาคม',
        ],
    },
    firstDayOfWeek: 1,
    rangeSeparator: ' ถึง ',
    time24hr: true,
    ordinal: () => '',
};
exports.default = exports.Thai;
