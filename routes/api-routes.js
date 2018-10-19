const db = require('../models/index');

module.exports = function (app) {

    app.get('/api/cards', function (req, res) {
        db.Cards.find({})
            .populate('notes')
            .then(function (lists) {
                res.json(lists);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.get('/api/lists/:id', function (req, res) {
        db.Lists.find({ _id: req.params.id })
            .populate('cards')
            .then(function (list) {
                // console.log(list);
                res.json(list);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    app.get('/api/lists/:id', function (req, res) {
        db.Lists.find({ _id: req.params.id })
            .populate('cards')
            .then(function (list) {
                console.log(list);
                res.json(list);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    app.get('/api/cards/:id', function (req, res) {
        db.Cards.find({ _id: req.params.id })
            // .populate('note')
            .then(function (list) {
                res.json(list);
            })
    })
    app.get('/api/notes', function (req, res) {
        db.Notes.find({})
            .then(function (notes) {
                res.json(notes);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    app.get('/api/lists', function (req, res) {
        db.Lists.find({})
            .populate('cards')
            .then(function (lists) {

                res.json(lists);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/users', function (req, res) {
        console.log(req.body);
        db.User.find({})
            .then(function (dbUser) {
                res.json(dbUser);
            })
            .catch(function (err) {
                res.json(err);
            })
    })

    app.post('/api/users', function (req, res) {
        db.User.create(req.body)
            .then(function (dbUser) {
                res.json(dbUser);
            })
            .catch(function (err) {
                res.json(err);
            })
    })

    app.post('/api/lists/:id', function (req, res) {
        db.Cards.create(req.body)
            .then(function (dbcards) {
                db.Lists.findOneAndUpdate({ _id: req.params.id }, { $push: { cards: dbcards._id } }, { new: true })
                    .then(newListInfo => {
                        res.json({ list: newListInfo, newCardInfo: dbcards });

                    })
            })
    });
    app.post('/api/lists', function (req, res) {
        db.Lists.create(req.body)
            .then(function (lists) {
                res.json(lists);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.post('/api/cards/:id', function (req, res) {
        db.Notes.create(req.body)
            .then(function (dbnotes) {
                db.Cards.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbnotes._id } }, { new: true })
                    .then(newCardInfo => {
                        res.json({ list: newCardInfo, newNoteInfo: dbnotes });
                    })
            })
    })
    //post route for finding a specific user
    app.post('/api/login', function (req, res) {
        db.User.findOne(req.body).where('password').equals(req.body.password)
            .then(function (user) {
                if (!user) {
                    res.json(user);
                } else {
                    res.json(user);
                }
            })
            .catch(function (err) {
                res.json(err)
            })
    })
    //post route for adding lists to a specific user
    // app.post("/submit", function (req, res) {
    //     db.User.create(req.body)
    //         .then(function (dbUser) {
    //             return db.User.findOneAndUpdate({}, { $push: { list: dbUser._id } }, { new: true });
    //         })
    //         .then(function (dbUser) {
    //             res.json(dbUser);
    //         })
    //         .catch(function (err) {
    //             res.json(err);
    //         });
    // });
    app.put('/api/notes', function (req, res) {
        db.Notes.findOneAndUpdate({ _id: req.body._id }, { $set: { note: req.body.card } })
            .populate('noteincard')
            .then(function (notes) {
                res.json(notes)
            })
            .catch(function (err) {
                res.json(err);
            })
    })

    app.put('/api/cards', function (req, res) {
        db.Cards.findOneAndUpdate({ _id : req.body._id }, { $set: { card: req.body.card } })
            .populate('cards')
            .then(function (cards) {
                res.json(cards);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put('/api/lists', function (req, res) {
        db.Lists.findOneAndUpdate({ _id: req.body._id }, { $set: { list: req.body.list } })
            .then(function (lists) {
                res.json(lists);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete('/api/cards/:id', function(req,res) {
        db.Notes.findOneAndDelete(req.body)
            .populate('notes')
            .then(function (deleteNote) {
                db.Cards.findOneAndDelete({_id: req.params.id}, {$pull: {'card.notes' : {body:deleteNote}}})
                res.json(deleteNote);
            })
            .catch(function (err) {
                res.json(err)
            });
    })

    app.delete('/api/lists/:id', function (req, res) {
        // const deleteid = req._id;
        db.Cards.findOneAndDelete(req.body)
            // .populate('cards')
            .then(function (deleteCard) {
                db.Lists.findOneAndUpdate({_id: req.params.id}, {$pull: {'list.cards' : {body :deleteCard}}});
                
                res.json(deleteCard);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete('/api/lists', function (req, res) {
        db.Lists.findOneAndDelete(req.body)
            .then(function (lists) {
                res.json(lists);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

}
