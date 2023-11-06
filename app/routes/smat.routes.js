module.exports = (app) => {
    const smats = require('../controllers/smat.controller.js');


    app.post('/smats', smats.create);

    
    app.get('/smats', smats.findAll);

   
    app.get('/smats/:smatId', smats.findOne);

    
    app.put('/smats/:smatId', smats.update);

    
    app.delete('/smats/:smatId', smats.delete);
}
