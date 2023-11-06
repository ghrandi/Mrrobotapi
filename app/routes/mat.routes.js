module.exports = (app) => {
    const mats = require('../controllers/mat.controller.js');


    app.post('/mats', mats.create);

    
    app.get('/mats', mats.findAll);

   
    app.get('/mats/:matId', mats.findOne);

    
    app.put('/mats/:matId', mats.update);

    
    app.delete('/mats/:matId', mats.delete);
}
