$(document).ready(function(){
	//set url
	var results = '';
	var _url  = 'https://my-json-server.typicode.com/milleaduski/Pwa/db';
	$.get(_url,function(data){
		$.each(data.items, function(key, items){
			console.log(items);
			results += "<div>"
						+ "<h4>" + items.type + "</h3>"
						+ "<li>" + items.name + "</li>"
						"</div>";
		})
		$('#results').html(results);
	});// end of fetch API

	if ('serviceWorker' in navigator) {
  		 window.addEventListener('load', function() {
   		 	navigator.serviceWorker.register('/sw.js');
  		},function(err){
  			console.log("Registration failed"+err);
  		});
	}
});