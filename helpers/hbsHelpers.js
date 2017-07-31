function hbsHelpers(hbs){

    hbs.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    /**
     * The {{#exists}} helper checks if a variable is defined.
     */
    hbs.registerHelper('keyexists', function(variable, options) {
        if (typeof variable !== 'undefined') {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    hbs.registerHelper('nonempty', function(variable, options) {
        var isValid = true;

        if (variable == null){
            isValid = false;
        }
        else if (typeof variable === 'string'){
            isValid = variable.length === 0 ? false : true;
        }
        else{
            isValid = Object.keys(variable).length === 0 ? false : true;
        }

        if (isValid) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    hbs.registerHelper('readroot', function(v1, options) {
        // Demo purpose only
        // console.log('options- ',options.data.root.v1);
        // console.log('v1',v1);
        // return options.data.root[v1];
    });

    hbs.registerHelper('with',function(data,options) {
        var initial = data.name.charAt(0).toUpperCase();
        console.log(initial);

        //return ('<img id="userimg" class="circle-image" src="' + initial + '"></img>');

        return (initial);
    });

    hbs.registerHelper('withavh',function(data,options){
        var initial = data.charAt(0).toUpperCase();

        return (initial);
    });

}

module.exports = hbsHelpers;