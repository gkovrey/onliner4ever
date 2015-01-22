var BukCalc = function(options) {
        this.init(options);
        return this;
};

BukCalc.prototype.init = function(options) {
        this.options = {
            tagClass : 'act-price',
            tag      : '<text/>'
        }
        $.extend( this.options, options );
        return this;
};

BukCalc.prototype.setPrices = function() {
    var self = this;

    $(this.options.pricesSelector).each(function(key, o) {
        if($(o.selector + ' .' + self.options.tagClass).length <  $(o.selector).length) {
            $(o.selector).each(function() {
                if($(this).find('.' + self.options.tagClass).length == 0) {
                    self.setPrice(this, self.getPrice(this, o));
                }
            });
        } 
    });
};

BukCalc.prototype.setPrice = function(block, price) {
    if ($.isArray(price) &&
        !isNaN(price[0]) && price[0] > 0 &&
        !isNaN(price[1]) && price[1] > 0 ) {
        $(block).append(
            $(this.options.tag, {
                    class : this.options.tagClass,
                    text : ' (~ $' + price[0] + '-' + price[1] + ')',
                    title : this.buk
                }
            )
        );

    } else if (!isNaN(price) && price > 0 ) {
        $(block).append(
            $(this.options.tag, {
                    class : this.options.tagClass,
                    text : ' (~ $' + price + ')',
                    title : this.buk
                }
            )
        );
    }
};

BukCalc.prototype.run = function() {
    this.setPrices();  
};

BukCalc.prototype.getBuk = function() {
    var self = this;
    if (this.options.bukSelector.length < 1) {
        $.ajax({
            url: this.options.defaultBukUrl,
            type: 'GET',
            cache:false,
            success: function (data) {;
                self.buk = parseInt(self.trimPrice(
                    $(data).find(self.options.defaultBukSelector).text()
                ));
            }
        }); 
    } else {
        this.buk = parseInt(this.trimPrice(
            $(this.options.bukSelector).text()
        )); 
    }
};

BukCalc.prototype.filter = function(price, filter) {
    switch (filter.type) {
        case 'replace':
            if ($.isArray(price)) {
                $(price).each(function(i, v) {
                    price[i] = price[i].replace(filter.cond, filter.val);
                });
            } else {
                price = price.replace(filter.cond, filter.val);
            }
        break;
        case 'split':
            if ($.isArray(price)) {
                $(price).each(function(i, v) {
                    price[i] = price[i].split( filter.cond );
                });
            } else {
                price = price.split( filter.cond );
            }
            
        break;
    }
    return price;
};

BukCalc.prototype.fetchPrice = function(element) {
    return $(element).text();
};

BukCalc.prototype.getPrice = function (element, object) {
    var basicPrice, price, self = this;
    basicPrice  = this.fetchPrice(element);
    price       = this.trimPrice(basicPrice, object.filters);
    if($.isArray(price)) {
        $(price).each(function(i, v) {
            price[i] = self.calc(price[i]);
        });
    } else {
        price = this.calc(price);
    }
    return price;
}

BukCalc.prototype.calc = function(price) {
    return parseInt( parseInt(price) / this.buk );
};

BukCalc.prototype.trimPrice = function(basicPrice, filters) {
    filters = filters || [];
    var price, self = this;
    price = basicPrice;
    filters = filters.concat(this.options.filters, this.options.defaultFilters)
    $(filters).each(function() {
        price = self.filter(price, this);
    })

    return price;
}

var Factory = function(options) {
    this.init(options);
    return this;
};

Factory.prototype.init = function (options) {
    this.options = options;
    return this;
};

Factory.prototype.getConfig = function (URL) {
    var config;
    if (URL.match('.*onliner.*')) {
        config = onliner;
    } else if (URL.match('.*tut.*')) {
        config = tut;
    } else if (URL.match('.*1k.*')) {
        config = k;
    } else if (URL.match('.*cheapmunk.*')) {
        config = cheapmunk;
    } else if (URL.match('.*redmoose.*')) {
        config = redmoose;
    } else if (URL.match('.*av.*')) {
        config = av;
    }
    return config;
};
