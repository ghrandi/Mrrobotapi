module.exports = (app) => {
    const thous = require('../controllers/thou.controller.js');


    app.post('/thous', thous.create);

    
    app.get('/thous', thous.findAll);

   
    app.get('/thous/:thouId', thous.findOne);

    
    app.put('/thous/:thouId', thous.update);

    
    app.delete('/thous/:thouId', thous.delete);
}
