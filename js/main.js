$(document).ready(function(){
	//set url
	var results = '';
	var _url  = 'https://my-json-server.typicode.com/milleaduski/Pwa/db';
	$.get(_url,function(data){
		$.each(data.items, function(key, items){
			results += "<div>"
						+ "<h4>" + items.type + "</h3>"
						+ "<li>" + items.name + "</li>"
						"</div>";
		})
		$('#results').html(results);
	});// end of fetch API
});