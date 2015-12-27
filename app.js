var App = function(options) {
    this.init(options);
    return this;
}

App.prototype.init = function(options) {
    this.options = {
        defaultBukUrl : 'http://select.by/kurs/',
        defaultBukSelector : 'div.module-best_kurs table tbody tr:nth-child(3) td:nth-child(3)',
        defaultFilters : [ 
            { type: 'replace', cond : /\D/g, val :''}
            
        ],
        configs : [ 'config', 'default']
    }
    $.extend( this.options, options );
    return this;
}

App.prototype.getURL = function() {
    var pathArray = window.location.href.split( '/' );
    return  pathArray[2]
}

App.prototype.run = function() {
    var factory, URL, config, bukCalc, interval;
    factory = new Factory();
    URL = this.getURL();
    config = factory.getConfig(URL);
    $.extend( this.options, config );
    bukCalc  = new BukCalc(this.options);
    bukCalc.getBuk();
    interval  = setInterval(function () { 
        bukCalc.run();
    }, 3000);

}

$(function() {
    var app = new App();
    app.run();
})

