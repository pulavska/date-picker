/**
 * @author: olivka
 * @date: 17.02.15
 *
 * DatePicker wrapper
 */

var DatePicker = function (element, params) {
    this.init(element, params);
};

DatePicker.prototype = {
    constructor: DatePicker,
    //$dom: DOMElement object
    //    jQuery object
    $dom: null,
    //defaults: object
    //    Default settings
    defaults: {
        //format: string
        //   Date format, example: January - 2015
        format: "MM-yyyy",
        //weekStart: int
        //   Represents from which date will be start week: 0 - Sunday, 1 - Monday
        weekStart: 1,
        //startDate: Date object
        //    The earliest date that may be selected. '-' dates before today will be disabled
        startDate: null,
        //endDate: Date object
        //   The latest date that may be selected. '+' dates after today will be disabled
        endDate: null,
        //startView: int|string
        //   The view that the datepicker should show when it is opened. 0 - month, 1- year, 2 - 10 years
        startView: 1,
        //minViewMode: int|string
        //   Gives the ability to pick only a month or an year. Accepts: “days” or 0, “months” or 1, and “years” or 2
        minViewMode: 1,
        //language: string
        //   Default language
        language: "uk",
        //multidate: boolean
        //   Enable multidate picking
        multidate: false,
        //keyboardNavigation: boolena
        //   Whether or not to allow date navigation by arrow keys
        keyboardNavigation: true,
        //autoclose: boolean
        //    Whether or not to close the datepicker immediately when a date is selected
        autoclose: true,
        //date: Date object
        //   Show this date by opening datePicker
        date: null,
        //defaultViewDate: Date object
        //   Show this date in open calendar by default
        defaultViewDate: null,
        //disabledPeriods: array of dates
        //   Periods that must be disabled.
        //   Format array: [{from: '2014-08-03', to: '2014-08-12'}, {from: '2014-08-21', to: '2014-08-25'}, ...]
        disabledPeriods: []
    },

    /**
     * @param jQuery object element
     * @param object options
     */
    init: function (element, options) {
        this.$dom = element;
        var settings = $.extend({}, this.defaults, this.$dom.data(), options);

        this.$dom.datepicker({
            format: settings.format,
            weekStart: settings.weekStart,
            startDate: settings.startDate,
            endDate: settings.endDate,
            startView: settings.startView,
            minViewMode: settings.minViewMode,
            language: settings.language,
            multidate: settings.multidate,
            autoclose: settings.autoclose,
            keyboardNavigation: settings.keyboardNavigation,
            beforeShowDay: function (date) {
                if (settings.disabledPeriods.length > 0) {
                    var result = true;
                    $.each(settings.disabledPeriods, function (i, period) {
                        var from = new Date(period.from),
                            to = new Date(period.to);
                        from.setHours('00'); //set hours to midnight, because by default time is 02:00
                        if (date >= from && date <= to) {
                            return result = false;
                        }
                    });
                    return result;
                }
            }
        });
        //set default date
        if (settings.date !== null) {
            this.setDate(settings.date);
        } else if (settings.defaultViewDate !== null) {
            this.setDefaultViewDate(settings.defaultViewDate);
        }
    },

    /**
     * Set date
     * @param Date object |string date
     */
    setDate: function (date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        this.$dom.datepicker('setDate', date);
        return this;
    },

    /**
     * Get date format: 2015-03-12
     * @returns string
     */
    getDate: function () {
        var date = this.$dom.datepicker('getDate');
        return this._formattedDate(date);
    },

    /**
     * Get number of month, start from 1 (January)
     * @returns  string
     */
    getMonth: function () {
        var date = this.$dom.datepicker('getDate'),
            month = date.getMonth() + 1;
        month = (month < 10) ? '0' + month : month;
        return month;
    },

    /**
     * Get year
     * @returns {number|*}
     */
    getYear: function () {
        var date = this.$dom.datepicker('getDate');
        return date.getFullYear();
    },

    /**
     * Disable all dates before set date
     * @param Date object date
     */
    setStartDate: function (date) {
        this.$dom.datepicker('setStartDate', date);
        return this;
    },

    /**
     * Disable all dates after set date
     * @param Date object date
     */
    setEndDate: function (date) {
        this.$dom.datepicker('setEndDate', date);
        return this;
    },

    /**
     * Return the displayed dat
     * @returns {*|jQuery}
     */
    getViewDate:function() {
        return $('input', this.$dom).val();
    },

    /**
     * Set the date which will be shown when calendar is open by default
     * @param Date object date
     */
    setDefaultViewDate: function (date) {
        if (!this.$dom.val().length) {
            var object = this.$dom.data('datepicker');
            object.viewDate = date;
            object.fill();
        }
    },

    /**
     * Return formatted date: '2013-03-01'
     * @param Date object date
     * @returns string
     * @private
     */
    _formattedDate: function (date) {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        month = (month < 10) ? '0' + month : month;
        day = (day < 10) ? '0' + day : day;
        return year + '-' + month + '-' + day;
    }

};


define(['jquery', 'bootstrap-datepicker'],
    function ($) {
          $.fn.datepicker.dates.uk = {
            days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
            daysShort: ["Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
            daysMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            months: ["Cічень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
            monthsShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
            today: "Сьогодні",
            clear: "Очистити",
            format: "dd.mm.yyyy",
            weekStart: 1
        };
        return DatePicker;
    }
);
