var k = {
    bukSelector : '',
    pricesSelector  : [
        { selector : '.item-t .offers' },
        { selector : '.offers span' },
        { selector : '.offersbeznal span' },
        { selector : '.t-list span.red' },
        { selector : '.o-price b' },
        { selector : '.price .offers', filters : [
        	{ type: 'split'  , cond : /[^0-9a-zA-Z\s\$]/}
        ]},
        { selector : '.price .offersbeznal', filters : [
        	{ type: 'split'  , cond : /[^0-9a-zA-Z\s\$]/}
        ] },
        { selector : '.similar-items .top'}
    ],
    filters : [
    ]
}