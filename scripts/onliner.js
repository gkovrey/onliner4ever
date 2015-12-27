var onliner = {
    bukSelector : '.top-informer-currency ._u',
    pricesSelector  : [
        { selector : '.cost-i a strong' },
        { selector : 'tr .cost strong' },
        { selector : '.autoba-hd-details-costs .cost' },
        { selector : '.price', filters : [
            { type: 'replace', cond: ' млн', val : '000000' }
        ]},
        { selector : 'li.cost' },
        { selector : '.fs-item-ba-price, li .price' },
        { selector : '.classified__price' },
        { selector : '.apartment-bar__value'},
        { selector : 'select option', filters : [
            { type: 'replace', cond: ' млн', val : '000000' }
        ]},
        { selector : '.schema-product__price a span'},
        { selector : '.b-offers-desc__info-sub a', filters : [
            { type: 'split'  , cond : /[^0-9a-zA-Z\s\$]/}
        ] },
        { selector : '.b-offers-desc__info-sub', filters : [
            { type: 'split'  , cond : /[^0-9a-zA-Z\s\$]/}
        ] },
        { selector : '.product-aside__price--primary'},
    ],
    filters : []
}