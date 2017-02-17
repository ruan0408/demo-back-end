
let port = process.env.PORT || 3000;
let app = require('./server');
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
