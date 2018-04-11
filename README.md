# Add To My Card App

Simple application shown the usage of **the organizational library Backbone** for the Front-end side and **the Flask micro-framework** for handling the Back-end.

![Starting Screen](https://github.com/KawtharE/AddToMyCard/blob/master/assets/addToMyCardApp.gif)

Before start explaining the process of developing this application, let me mention the fact that business application should be a feature-rich app, in order to be a strong competitor in the market of application. And adding a shopping feature around in the app with a great user experience and a secure back-end handling will take the app to another level.

In this demo i am focusing on the **User Experience** part, using **BackboneJS** and **Flask**.

**Note:** To run this application on your machine make sure that you have **Python 3.5** and **Flask** installed in your environment.

## Developemnt Process

Our development process is an **iteration process**, which allow us to have a working prototype at each iteration. So to go through this process we need to organize our steps as iterations.

#### Iteration 1: create mock-ups

Our first iteration consist at creating mock-ups for every page in the application and design URLs for each one. In our case, we only have two pages: the starting page where we will be displaying all items (**index.html**) and after submitting page (**postSubmit.html**) where we will be displaying the items chosen by the user.

**Page:** index.html            **URL:** '/'

**Page:** postSubmit.html       **URL:** '/submitted'


#### Iteration 2: configure routing

We will be configuring the routing in the **Flask application**, so first of all we need to install it:

      $ pip3 install flask
      
For Mac or Ubuntu users python 3.5 is already installed.

After installing Flask, lets get start configuring the routing in the back-end.

Create a new file inside the root directory of the project and call it for example, as i am calling it, *submit.py*:


    from flask import Flask
    app = Flask(__name__)

    @app.route('/')
    def start():

    @app.route('/submitted')
    def submitted():

    if __name__=='__main__':
      app.debug = True
      app.run(host='0.0.0.0', port=5000)

**Line by line:**

1- *app = Flask(__name__)*: this line of code creates a new instance of the Flask class with the name of the running app. **__name__** is a special variable in python that have the value *__main__* if the app is running by the python interpreter or *__fileName__* if the file is imported in another project. 

2- *@app.route('/')*

   *def start():*: configure the URL for the starting page.
   
3- *@app.route('/submitted')*

   *def submitted():*: configure the URL for the after submitting page.

4- *if __name__=='__main__':*

   *app.debug = True*
   
   *app.run(host='0.0.0.0', port=5000)*: if the special variable __name__ have the value __main__ that mean that the current file is the main project and in that case we will be running the app *app.run()*, and in order to be able to visualize changes automatically without reloading the page every time we enable the debug mode *app.debug = True*.
      
=> Now that we have all URLs working, we will be adding templates which we will be developing using **Backbone**.

#### Iteration 3: configuring the Front-end part of the app

Flask knows that your HTML files are in the **templates** folder and your CSS and JavaScript files are in the **static** folder. So this is how will be the structure of our project:

      ---static
            |---css
                  |---main.css
            |---js
                  |---collections
                  |---models
                  |---routers
                  |---views
                  |---app.js
      ---templates
            |---index.html
            |---postSubmit.hmtl
      ---submit.py

Now the reason ther are *collections, models, routers and views* folders inside the js folder is that we will be using **BackboneJS** for the client-sid part of the app.

**Backone** is one of the amazing organizational library that belong to the **MV* pattern family**. As any other organizational library or framework, backbone is made of these five modules:

1- Views                 

2- Events

3- Models                 

4- Collections

5- Routers

**Backbone**'s dependcy is only the **underscore** library, and adding **jquery** make functionalities a their top.

      $ npm install underscore
      $ npm install backbone
      $ npm install jquery@3.3.1
      
And now we are ready to go!

#### Iteration 4: developing the Front-end part with backbone

The goal of using the library backbone, is to make our code stable, free of bugs, scalable and well organized so it can be easily maintained and adding new features in the future can be done in no time.

Starting by our HTML templates:

**index.html**

      <!DOCTYPE html>
      <html lang="en">
      <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Add To My Card | BackboneJS</title>
            <link rel="stylesheet" type="text/css" href="{{url_for('static', filename='css/main.css')}}"/>
      </head>
      <body>
      ...

      <script src="{{url_for('static', filename='node_modules/jquery/dist/jquery.min.js')}}"></script>
      <script src="{{url_for('static', filename='node_modules/underscore/underscore.js')}}"></script>
      <script src="{{url_for('static', filename='node_modules/backbone/backbone.js')}}"></script>

      <script src="{{url_for('static', filename='js/models/item-model.js')}}"></script>
      <script src="{{url_for('static', filename='js/collections/item-collection.js')}}"></script>
      <script src="{{url_for('static', filename='js/routers/router.js')}}"></script>
      <script src="{{url_for('static', filename='js/views/list-view.js')}}"></script>
      <script src="{{url_for('static', filename='js/views/app-view.js')}}"></script>
      <script src="{{url_for('static', filename='js/app.js')}}"></script>
      </body>
      </html>
      
Since we are inside a **Flask** project referencing CSS and JS files will be different from the usual way, we are using here the function **url_for('static', filename='..')** in order to return the url of our CSS and JS files that are placed inside the **static** folder.

Notice the order in which we import our js files (model, collection, router, view and app.js), it is important to place the *app.js* at the end in order to give time to the model, collection, router and view to get setup before kicking off the app.

Inside the body we will be having a form to be submitted, the form composed of a bunch of checkbox items, a submit button and a total price of selected items that will be calculating while selecting or deselecting items:

		<form id="form" method="POST" action="{{url_for('submitted')}}">
			<ul id="list"></ul>
			<div class="total">
				<input class="submitBtn" id="submit-btn" type="submit" value="Add">
				<span id="total-price">Total: <span id="total">$ 0.00</span></span>
			</div>						
		</form>
            
The list of items are added dynamically to the form once we configure the model and filled the collection, so we will be having a template that will be rendred for each item in the collection:

      <script type="text/template" id="item-template">
            <% _.each(items, function(item){ %>
                  <li id="list-item">
                        <input class="toggle" id="toggle" type="checkbox" name="itemName" value="<%- item.name %>" data-name="<%- item.name %>"><span id="name"><%- item.name %> </span><span id="author"><%- item.author %></span><span id="price">$ <%- item.price %></span>
                  </li><br>
            <% }); %>
      </script>

The rest of files in our backbone project: model, collection, router, view and app.js, have the following structure:

      var app = app || {};

      (function(){
            ...
      })();
      
      
*var app = app || {}*: test if the app have already been created otherwise it take a value {}.
*IIFE*: Immediate Invoked Function Expression, where code goes.

The first thing we need to develop is our Model, in our case it is a book with the following properties:

	app.Item = Backbone.Model.extend({
		default:{
			name: '',
			author: '',
			price: 0,
			checked: false
		},
		toggle: function(){
			this.set('checked', !this.get('checked'));
		}
	});
      
Next, from that model we will be creating a Collection that will be rendred next:

	var Items = Backbone.Collection.extend({
		model: app.Item,
		checkedItems: function(){
			return this.where({checked: true});
		}
	});
	app.items = new Items([
		new app.Item({id:0, name: 'The Self-Taught Programmer', author:'Cory Althoff', price: 14.98, checked: false}),
		new app.Item({id:1, name: 'Python for R Users: A Data Science Approach', author:'Ajay Ohri', price: 42.53, checked: false}),
		new app.Item({id:2, name: 'Web Design with HTML, CSS, JavaScript and jQuery Set', author:'Jon Duckett', price: 29.55, checked: false}),
		new app.Item({id:3, name: 'HTML and CSS: Design and Build Websites ', author:'Jon Duckett', price: 13.99, checked: false}),
		new app.Item({id:4, name: 'Deep Learning with Python ', author:'Francois Chollet', price: 42.78, checked: false})
		]);
            
            
            
Now that we have all data that we need, we will start render them in the DOM by making a view for each item and then render all of them to the DOM:

	app.ListView = Backbone.View.extend({
		el: '#list',
		template: _.template($('#item-template').html()),
		events: {
			'click .toggle': 'toggle'
		},
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template({items: app.items.toJSON()}));
			return this;
		},
		toggle: function(ev){
			var listName = $(ev.currentTarget).attr('data-name');
			app.model = app.items.where({name: listName});
			app.model[0].toggle();
			var total = 0;
			_.each(app.items.checkedItems(), function(item){
				total += item.get('price');
			});
			$('#total').html('$ '+total.toFixed(2));
		}
	});
      
     
     var AppView = Backbone.View.extend({
            el: '#form',

            initialize: function(){
                  this.listenTo(app.items.toJSON(), 'change', this.render);
                  this.listenTo(app.items.toJSON(), 'all', this.render);
                  app.listView = new app.ListView();
                  this.render();
            },
            render: function(){
                  this.form = $('#form');
                  this.list = $('#list');
                  this.total = $('#total');
                  this.list.show();
                  this.total.show();
                  this.form.show();

                  return this;
            }
      });
      
 to kick off the application we instantiate the AppView variable inside the app.js file:
 
      var app = app || {};

      $(function(){
            'use strict';

            var appView = new AppView();
      });
