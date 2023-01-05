const path = require('path'); 

module.exports = {
    mode: 'development', 
    entry: './src/script.js', 
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.js'
    }, 
    watch: true
}
module.exports = {
    mode: 'development', 
    entry: './src/userLogin.js', 
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'userLogin.js'
    },
    watch: true
}



module.exports = {
    mode: 'development', 
    entry: './src/app.js', 
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'app.js'
    }, 
    watch: true
}
module.exports = {
    mode: "development", 
    entry: './src/register.js', 
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'register.js'
    }, 
    watch: true
}