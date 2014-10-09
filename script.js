$(document).ready(function() {

	var conversion = 0;
	
	
	$.get( "https://coinbase.com/api/v1/prices/buy?qty=1", function( data ) {
	  conversion = data['subtotal']['amount'];
	  var matchText = function(node, regex, callback, excludeElements) { 

	    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'cavas', 'html', 'meta', 'link']);
	    
	    var child = node.firstChild;
	   if(child != null) {
	    do {
			
		    switch (child.nodeType) {
		
		        case 1:
		            if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
		                continue;
		            }
		            matchText(child, regex, callback, excludeElements);
		            break;
		
		        case 3:
		           child.data.replace(regex, function(all) {
		                var args = [].slice.call(arguments),
		                    offset = args[args.length - 2],
		                    newTextNode = child.splitText(offset);
		
		                newTextNode.data = newTextNode.data.substr(all.length);
		
		                callback.apply(window, [child].concat(args));
		
		                child = newTextNode;
		     
		            });
		            break;
		
		        
		    }
	
	    } while (child = child.nextSibling);
		}
	    return node;
	
	}
	var nodes = document.getElementsByTagName("*");
	for( var i=0; i< nodes.length; i++) {
		matchText(nodes[i], /\$\d+(,\d{3})*\.?[0-9]?[0-9]?$/g, function(node, match, offset) {
			matchValue = match.slice(1);
			console.log(matchValue);
			result = (parseInt(matchValue.replace(/,/g, ''), 10)) / conversion;
			console.log(result);
		    var span = document.createElement("span");
		    span.textContent = match + ' ' + result.toFixed(3) + ' btc';
		    node.parentNode.insertBefore(span, node.nextSibling); 
		});
	}
	});
	
	
	
});