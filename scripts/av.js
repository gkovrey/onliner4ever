var av = {
	bukSelector : '',
    pricesSelector  : [
        { selector : 'table.content div.textprace nobr', filters : [
            { type: 'replace', cond: ' млн', val : '00000' }
        ] },
    ]
}