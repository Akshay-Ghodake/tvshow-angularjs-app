My TV app
=================================================================================================================================

# Framwork used and why
	1. AngularJS :- 
		> AngularJS provides separation of concerns by organizing the application code into 
		  Model-View-Controller (MVC) architecture on the client side. 
		> AngularJS provides a Declarative Interface which lets the designer use HTML as template 
		  language and extend the HTML syntax by inventing our own attributes to existing elements or create new HTML elements.
		> Angular binds the view and the model to populate the UI in a bi-directional way, there-by facilitating 
		  instant projection of data in view.
		> To get hold of dependencies, the dependencies just need to be passed as parameters to AngularJS components. 
		  There is no need for explicit instantiation/creation of the dependencies.
	
	2. Bootstrap :-
		> Bootstrap is a free front-end framework, with the purpose to make web development faster and easier.
		> Bootstrap also provides the users with the ability to easily create responsive designs.
		> The responsive CSS of Bootstrap also adjusts to phones, tablets, and desktops easily.
		> It is compatible with all modern browsers. 
		

# Environment Setup
	1. npm install angular@1.8.2 :- to install AngularJS
	2. npm install angular-route :- to install ngRoute
	3. npm install bootstrap :- to install bootstrap

# AngularJS Project Structure
	
	AngularJS Version :  1.8.2 
	Bootstrap Version :  5.2.3 
	NPM version : 8.19.2
	Visual Studio Code : VS Code helps you be instantly productive with syntax and extensions
	How to run project : 1] Install http server by using : npm install http-server -g 
				   2] Goto app folder path run : http-server -o 

			OR		

				   1] use "Live Server" extensions of VS Code 
				   2] Goto index.html file right click and click on "open with live server" or just do "ALT+L+O"  
	

	I used File Type Based Approach for this tiny api call project :-
	
	Project Structure :-
		--index.html
		--js
		 -------tvscript.js
		--css
		 -------styel.css
		--view
		 -------home.html
		 -------allShows.html
		 -------singlePage.html

	# index.html file :
		> index.html include all script & styel 
		> In body tag I used 'ng-app="MyApp"' which starting point of this app 
		> In body tag set one controller 'ng-controller="MyCtrn"' which control all scope elemnts. Which use for data binding
		> This file having bootstrap navigation bar which contais menu and search and search results
		> ng-view directive : - The "ng-view" is a directive that complements the route service by including the rendered template
					      of the current route into the main layout (index.html) file.
	
	# tvscript.js file :
		> angular.module("MyApp", ['ngRoute']) :- 
			- An AngularJS module defines an application & controllers.
			- The "MyApp" parameter refers to an HTML element in which the application will run 
			- The "ngRoute" is dependancy & ngRoute module helps your application to become a Single Page Application.
		> app.config(function ($routeProvider){}) :-
			- The config() takes a function that takes the $routeProvider as a parameter and the routing configuration goes inside the function.
			- The $routeProvider is a simple API that accepts either when() or otherwise() method.
			- $routeProvider '.when()' defines the URLs like 'home.html', 'allShows.html', 'singlePage.html'.  The default view is set by '.otherwise()' which is 'index.html'.
		> app.controller() :- 
			AngularJS applications are controlled by controllers. The 'ng-controller' directive defines the application controller.

			I used two controller
				1. app.controller('MyCtrn', ($scope, $http)={}) :- 
				   - 'MyCtrn' is the name of controller
				   - '$scope' :- The Scope in AngularJS is the binding part between HTML (view) and JavaScript (controller) and it is a built-in object.
						     In a code :- $scope bind with tvshowdata ($scope.tvshowdata) so we can use 'tvshowdata' to share data between view and controller.
				   - '$http' :-  The $http service is used to send or receive data from the remote server.
						     $http.get() method sends http GET request to the remote server and retrieves the data.The function needs to return the 
						     response object directly
						     
						     In a code:-  $http.get(`${URL}/schedule/`).then(res, error) :-
								In this `${URL}/schedule/` is our http API call
						    		In '.then()' we get response and bind successs response to '$scope.tvshowdata = res.data;' which is use for bind data between view and controller
				2. app.controller('singleController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {}]) :-
							- In this line $scope & $http working same to get data from API and bind between view and controller
							- $routeParams is used for to get perticular 'Id' or data in variable 'var currentId = $routeParams.id;' from route 	
		> app.filter('removeHTMLTags', function () {} :-
			- Filters are used to modify or update the data before rendering the data on view or UI 
			- I created this filter because data come from API is not well formated so i used this filter. i.e. from API I get Summary data come with html tag  						
	
	# View Folder ('home.html', 'allShows.html', 'singlePage.html') :- 
		 <div ng-repeat="show in tvshowdata | limitTo: 10">:-
			ng-repeat :- The ng-repeat directive repeats a set of HTML, a given number of times.The set of HTML will be repeated once per item in a collection.
					 The collection must be an array or an object.
					- we get data to HTML page with repect to filter which is limit to 10 records
			removeHTMLTags :- We used custom filter which we created on tvscript.js file for clean data
			ng-href :- The ng-href directive is used when we have an angular expression inside the href value
			
	# CSS (styel.css):- It is used for to apply addtional css to tags like to make shadow, flex box, to display limites charater in <p> tag and search container onload animation


# Functionlity :
	# All Data :
		> To get all data from given API url with the help of $http
		> get() to get all response from API 
		> $scope.tvshowdata = res.data : To get data objet with help of $scope in tvshowdata variable
		
		  <div ng-repeat="show in tvshowdata">
				 <h5 class="card-title"> {{show.show.name}}</h5>
		  </div>
		> bind data with the help of ng-repeat veriable and display to HTML page using {{show.show.name}}
		> Display all tv shows on 'home.html'

	# Single Data :
		> To display single data 1st I get tv show Id by using ng-href and route 
		> In ng-href(.html page)
			<a ng-href="#!singlePage/{{show.show.id}}">
			- ng-href="#!singlePage/{{show.show.id}}" by using this we get Id of current tv show 
		 
		> In $routeProvider(tvscript.js page)
			when("/singlePage/:id", {
            templateUrl: "view/singlePage.html",
            controller: 'singleController'
            })
			- ":/id" we get Id from current url and share with controller and singlePage.html
		
		> $http.get(`${URL}/shows/${currentId}`)
			- Colntoller hit API with current Id and fetch data of that Tv show
		> Display all single tv show data on 'singlePage.html'

	# Genres Data:-
		> Get all data by using API and display using ng-repeat
		> In Html : - <div ng-repeat="show in tvshowdata | filter : 'Sports' : true | limitTo: 10">
		> While displaying data I applay one filter which contain spacific string and display data related that string
		> Display all Genreswise tv shows on 'allShows.html'

	# Search Data :
		In Html File:- input type="text" class="form-control sclss" placeholder="Enter Tv Show name" ng-model="s"
                    	ng-change="get_tvshow()" />
		In JS file :- $http.get(`${URL}/search/shows?q=${tvShow}`)
		> Created one ng-change="get_tvshow()" function 
		> Get value from input by using 'ng-model' and pass to get_tvshow()  
		> By passing input value "let tvShow = $scope.s" to given search API url with the help of $http
		> Display all result in one conatiner and toggle that container with the help of ng-change