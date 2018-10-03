$(document).ready(function(){
	//set url
	var results = '';
	var _url  = 'https://my-json-server.typicode.com/milleaduski/Pwa/db';
	function fetchData(data){
		$.each(data.items, function(key, items){
			results += "<div>"
						+ "<h4>" + items.type + "</h4>"
						+ "<li>" + items.name + "</li>"
						"</div>";
		})
		$('#results').html(results);
	}

	var networkConnect = false

	var networkData =  fetch(_url).then(function(response){
		return response.json()
	}).then(function(data){
		console.log("from network")
		networkConnect = true
		fetchData(data)
	})

	caches.match(_url).then(function(response){
		console.log("from cache")
		console.log(response)
		if(!response) throw Error('no data on cache');
			return response.json();
	}).then(function(data){
		if(!networkConnect){
			fetchData(data)
			console.log("From the cache")
		}
	})
});
