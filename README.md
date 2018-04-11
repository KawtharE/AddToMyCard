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

2- *@app.route('/')
   def start():*: configure the URL for the starting page.
   
3- *@app.route('/submitted')
   def submitted():*: configure the URL for the after submitting page.

4- *if __name__=='__main__':
      app.debug = True
      app.run(host='0.0.0.0', port=5000)*: if the special variable __name__ have the value __main__ that mean that the current file is the main project and in that case we will be running the app *app.run()*, and in order to be able to visualize changes automatically without reloading the page every time we enable the debug mode *app.debug = True*.
      
=> Now that we have all URLs working, we will be adding templates which we will be developing using **Backbone**.

#### Iteration 3: developing the templates

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

1- Views                  2- Events

3- Models                 4- Collections

5- Routers



