const express = require('express');
const app = express();
const path = require('path');

// Set up Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Use the routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
