'use strict';

import '../src/css/styles.less';
import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';

const line_items = [{
    item: "Web Updates",
    desc: "Monthly web updates for customyltd.com (Oct. 3 - Oct. 24, 2009)",
    unit_cost: 650,
    qty: 2,
}, {
    item: "Logo design",
    desc: "Applies some font and colors on text",
    unit_cost: 9000,
    qty: 1,
}

];

const textAreas = document.getElementsByTagName('textarea');

Array.prototype.forEach.call(textAreas,  (elem) => {
    elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});

const app = new Vue({
    el: '#invoice--container',
    data: {
        items: line_items,
        sub__total: 0.0,
        amount__paid: 0.0,
    },
    components: {
        Datepicker
    },
    computed: {
        seen: function () {
            return this.items.length > 1;
        },
        balance__due: function () {
            return `$${(this.sub__total - this.amount__paid).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        }
    },
    watch: {
        items: function (new_items) {
            this.sub__total = total_items(this.items);
        }
    },
    methods: {
        add_a_row: function () {
            this.items.push({
                item: "type of work",
                desc: "enter a description",
                unit_cost: null,
                qty: null,
            });
        },
        delete_a_row: function (index) {
            this.items.splice(index, 1);
        },
        line_total: function (unit_cost, qty) {
            if (unit_cost && qty) {
                this.sub__total = total_items(this.items);
                return unit_cost * qty;
            } else {
                return "";
            }
        }
    }

});

function total_items(items) {
    let total = 0.0;
    for (let i = 0; i < items.length; i++) {
        total += parseFloat(items[i].unit_cost * items[i].qty);
    }
    return total;
}
