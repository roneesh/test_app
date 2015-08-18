# Test App

### Installation

1. Run 'npm install'
2. Run 'npm start' to start the app
3. Change the PORT variable in index.js if you're already using port 3000.

### Code Reviewing This App

The majority of the JS code is in two files: ./index.js and ./public/js/main.js

index.js is the Javascript code utilizing express to make this a multi-page web application.

main.js is a file enabling simple client side form validation using jQuery.

Views are in the ./views folder, the main views are new.jade for the main page, show.jade for the single application status page and index.jade for the 'admin' page where you can approve or deny applications.

CSS is in the ./public/css folder. The main file is main.scss which compiles to main.css, and then the import files into main.scss that are in ./public/css/styles.

### Architecture

The application uses HTML5Boilerplate as a skeleton for folder structure, and to import some general best practices in HTML/CSS development. Such as warning the user in older browsers, meta tags to make responsive display in an iPhone and using a CSS Normalize.

The application uses Express.js to serve the app and give it routing.

### Routes

/applications/new -- The home route, the place to apply for a card

/applications -- The index page of all applications, user can reject or accept applications

/applications/:application_id - The place to view a specific applications status

### HTML and CSS

The CSS is organized into SCSS files based on functionality. Generally I organize my CSS along these lines, but I don't follow any hard and fast rules there. The larger and more stylized a project, the greater the CSS will be broken up into files. 

I try to use @extends, especially to bring .clearfix into classes and avoid putting it in the DOM as a className. I also try and use mixins as much as possible. In this simple design I didn't use any mixins but have frequently in the past.

I also aim to just use one class per dom element, with on occasion having two classes per element. This is to keep specificity low and readability high.

Concerning HTML, I try and keep markup clean and use semantic elements such as footer, nav, section, etc when reasonable. 

### Javascript

With Javascript I try and follow some general best practices as much as possible:

1. Avoid anonymous functions and try to use named functions
2. Keep functions to less than 5 lines (per Sandi Metz's rules)
3. Have functions return something explicit
4. Utilize returning of booleans in functions
5. Declare all variables at the top in a single var statement
6. Abstract out repeated strings/numbers into a single variable at the documents top (see: DB_FILE_NAME = 'applications.json'; for the database as an example)
7. Use objects liberally, as they are the heart of JS.

I am aware I could use the 'new' syntax to create application objects, however in this case it seems like too complex a solution, so I stuck with just creating a basic application object.

### Data Validations

As a first line of client side defense I use HTML5's pattern attribute. I try and use commonly accepted regexes for fields like e-mail and phone and names, but in this app I wrote my own (hopefully this demonstrates I can write regex if needed!). There is jQuery validation implemented in main.js, and then the server does some validation in index.js. So in tota the app has 3 measures of validation security in it. 

For the application lookup, it does a simple search to see if it can find an application with that application_id, if so it goes to the show page, if not it bounces back to the application/new page with a message. There is no validation in right now for checking to make sure there aren't two validations with the same application_id. That's because it's a small chance there'll be a double here, and a DB would handle id consistency among records. 

### Database

The 'database' in this case is just writing to a file. It was really fun to explore node's fs utility! I really enjoyed the learning of that library that this project afforded me. The database supports basic read, write, update of records. Delete has yet to be implemented, it will be a feature I implement with testing.