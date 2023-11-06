module.exports = (app) => {
    const contents = require('../controllers/content.controller.js');


    app.post('/contents', contents.create);

    
    app.get('/contents', contents.findAll);

   
    app.get('/contents/:contentId', contents.findOne);

    
    app.put('/contents/:contentId', contents.update);

    
    app.delete('/contents/:contentId', contents.delete);
}
