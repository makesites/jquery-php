/*!
 * jQuery PHPjs
 * by Makis Tracend (makis@makesit.es)
 *
 * Examples: 
 * 
 * $("#container").php("trim")
 * or
 * $.trim("#container");
 * 
 * $("#container").php("empty")
 * or
 * $.empty("#container");
 * 
 * $("#container").php("rand",{ min: 1, max: 5})
 * or
 * $.rand("#container", { min: 1, max: 5});
 * 
 * Apply a no-conflict action...
 * 
 */
 
(function( $ ){
	
	// create the shortcuts
	$.trim = function( container, options ){
		$(container).php( "trim", options );
	};
	$.empty = function( container, options ){
		$(container).php( "empty", options );
	};
	$.ucwords = function( container, options ){
		$(container).php( "ucwords", options );
	};
	$.rand = function( container, options ){
		$(container).php( "rand", options );
	};

  var methods = {
     init : function( options ) {
    	
		var settings = {
		};
		
		return this.each(function() {

		var $this = $(this),
			data = $this.data('php');
			
			// merging custom options with default settings
			if ( options ) { 
				$.extend( settings, options );
			}
			// save settings
			$this.data('php', settings );

    	});
	
	},
	
	// pase the URL on page load
	trim : function( options ) { 
		return this.each(function(){

		var $this = $(this), 
			data = $this.data('php')
						

		var str = options.str, 
			charlist = options.charlist;
			
			var whitespace, l = 0,
				i = 0;
			str += '';
		
			if (!charlist) {
				// default list
				whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
			} else {
				// preg_quote custom list
				charlist += '';
				whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
			}
		
			l = str.length;
			for (i = 0; i < l; i++) {
				if (whitespace.indexOf(str.charAt(i)) === -1) {
					str = str.substring(i);
					break;
				}
			}
		
			l = str.length;
			for (i = l - 1; i >= 0; i--) {
				if (whitespace.indexOf(str.charAt(i)) === -1) {
					str = str.substring(0, i + 1);
					break;
				}
			}
		
			return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';

		});
	},
	
	empty : function( options ) { 
		return this.each(function(){

		var $this = $(this), 
			data = $this.data('php');
		
		var key, 
			mixed_var = options.mixed_var;

		if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
			return true;
		}
	
		if (typeof mixed_var == 'object') {
			for (key in mixed_var) {
				return false;
			}
			return true;
		}
	
		return false;
			
		});
	},
	
	ucwords : function( options ) { 
		return this.each(function(){

		var $this = $(this), 
			data = $this.data('php');
		
			return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
				return $1.toUpperCase();
			});
			
		});
	},
	
	rand : function( options ) { 
		return this.each(function(){

		var $this = $(this),
			data = $this.data('php');
		
		var min = options.min,
			max = options.max;
			
			var argc = arguments.length;
			if (argc === 0) {
				min = 0;
				max = 2147483647;
			} else if (argc === 1) {
				throw new Error('Warning: $.rand() expects exactly 2 parameters, 1 given');
			}
			return Math.floor(Math.random() * (max - min + 1)) + min;
			
		});
	},
	
	destroy : function( ) { 
		return this.each(function(){

		var $this = $(this),
             data = $this.data('php');
			 

		});
	}
	
  };

  $.fn.php = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.php' );
    }
	
  };

})( jQuery );
