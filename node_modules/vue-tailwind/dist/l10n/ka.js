"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Georgian = void 0;
exports.Georgian = {
    weekdays: {
        shorthand: ['კვ', 'ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა'],
        longhand: [
            'კვირა',
            'ორშაბათი',
            'სამშაბათი',
            'ოთხშაბათი',
            'ხუთშაბათი',
            'პარასკევი',
            'შაბათი',
        ],
    },
    months: {
        shorthand: [
            'იან',
            'თებ',
            'მარ',
            'აპრ',
            'მაი',
            'ივნ',
            'ივლ',
            'აგვ',
            'სექ',
            'ოქტ',
            'ნოე',
            'დეკ',
        ],
        longhand: [
            'იანვარი',
            'თებერვალი',
            'მარტი',
            'აპრილი',
            'მაისი',
            'ივნისი',
            'ივლისი',
            'აგვისტო',
            'სექტემბერი',
            'ოქტომბერი',
            'ნოემბერი',
            'დეკემბერი',
        ],
    },
    firstDayOfWeek: 1,
    ordinal() {
        return '';
    },
    rangeSeparator: ' — ',
    weekAbbreviation: 'კვ.',
    amPM: ['AM', 'PM'],
    yearAriaLabel: 'წელი',
    time24hr: true,
};
exports.default = exports.Georgian;
