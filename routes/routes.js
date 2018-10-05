const db = require('../models/index');

module.exports = function(app){

    app.get('/api/cards',function(req,res){
        db.Cards.find({})
        .then(function(cards){
            res.json(cards);
        })
    })

    app.get('/api/lists',function(req,res){
        db.Lists.find({})
        .then(function(lists){
            res.json(lists);
        })
    })

    app.post('/api/cards',function(req,res){
        db.Cards.create(req.body)
            .then(function(cards){
                res.json(cards);
            })
    })
    app.post('/app/lists',function(req,res){
        db.Lists.create(req.body)
        .then(function(lists){
            res.json(lists);
        })
    })

    app.put('/app/cards/',function(req,res){
            db.Cards.findOneAndUpdate({_id: req.body._id},{set:{card: req.body.card}})
            .then(function(cards){
                res.json(cards);
            })
    })
    app.put('/app/lists',function(req,res){
        db.Lists.findOneAndUpdate({_id: req.body._id},{set:{list: req.body.list}})
        .then(function(lists){
            res.json(lists);
        })
    })

    app.delete('/app/cards',function(req,res){
        db.Cards.findOneAndDelete(req.body)
        .then(function(cards){
            res.json(cards);
        })
    })

    app.delete('/app/lists',function(req,res){
        db.Lists.findOneAndDelete(req.body)
        .then(function(lists){
            res.json(lists);
        })
    })
};