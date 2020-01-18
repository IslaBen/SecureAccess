const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/AccessControl",{ useNewUrlParser: true });


// // fix problem angular
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
//===========================================================================================
const _KEY = 'mySecretKey'
const person = require("./models/Person");
const log = require("./models/AccessLog");
const room = require("./models/Room")
const User = require("./models/User")
//==================================================================================================

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(( req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//================ midelware ==================================================================================

function verifyToken (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unautorized request')
    }
    let token = req.headers.authorization;
    if (token === 'null') {
        return res.status(401).send('Unautorized request')
    }
    let payload = jwt.verify(token, _KEY);
    if (!payload) {
        return res.status(401).send('Unautorized request')
    }
    req.userId = payload.subject;
    next()
}

//================ auth    ==================================================================================

// app.post('/Signin', (req, res) =>{
//     console.log('hh554445hhh');
//     let user = new User(req.body);
//     console.log('hh554566hhh');
//     user.save((err, user) => {
//         if (err) {
//
//             consol.log(err.error)
//         } else {
//             console.log('hh55466876875hhh');
//             let payload = { subject: user._id };
//             let token = jwt.sign(payload, _KEY);
//             res.status(200).send({token})
//         }
//     })
// });
app.post('/Register', (req, res) =>{
    let user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            consol.log(err)
        } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, _KEY);
            res.status(200).send({token})
        }
    })
});

app.post('/Login', (req, res) =>{
    User.findOne({email : req.body.email}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid email or password');
            } else {
                if (user.password !== req.body.password) {
                    res.status(401).send('Invalid email or password')
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, _KEY);
                    res.status(200).send({token})
                }
            }
        }
    })
});

app.get("/Users", (req, res) => {
    User.find().then(function(user){
        res.json(user);
    })
})
//================ Get all ==================================================================================

app.get('/persons',(req,res)=>{
    person.find()
        .exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

})

//================ get Person ====================================================================

app.get('/persons/:PersonId',(req,res, next) => {
    const id = req.params.PersonId;
    person.find({_id : id})
        .exec()
        .then(doc=>{
            if (doc.length>0){
                res.status(200).json(doc[0]);
            }else {
                res.status(404).json({
                    message:" person doesn't exist :( "
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});
//================ Add Person ====================================================================

app.post('/persons',verifyToken, (req,res, next) => {
    
    const p = new person({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName : req.body.lastName,
        rfID : req.body.rfID,
        rooms : req.body.rooms
    });

    p.save()
        .then(result=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(401).json({
                error:err
            })
        });

});

//================ AccessRequest IN ========================================================

app.get('/persons/in/:personId/:position/', (req,res, next) => {
    const id = req.params.personId;
    person.find({rfID : id})
        .exec()
        .then(doc=>{
            console.log("found");
            if (doc.length>0){
                room.find({position : req.params.position})
                    .exec()
                    .then(reqRoom =>{
                        console.log("found");
                        console.log(reqRoom.length);
                        console.log(reqRoom[0]._id);
                        console.log(reqRoom[0].state);

                        if(reqRoom.length>0 && doc[0].rooms.includes(reqRoom[0]._id) && reqRoom[0].state){
                            const accessLog = new log({
                                _id : mongoose.Types.ObjectId(),
                                person: doc[0]._id,
                                door : reqRoom[0]._id,
                                timeIN: Date.now()
                            });
                            accessLog.save()
                                     .catch(err=>{
                                           res.status(500).json({
                                           error:err
                                           });
                                        });
                            const response = {
                                message : "access permisson granted "
                            }
                            res.status(200).json(response);
                        } else {
                            res.status(401).json({
                                message:"Access denied 2 !!!"
                            });
                        }
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({error:err});
                })
            }else {
                res.status(401).json({
                    message:"Access denied 1!!!"
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});

//================ AccessRequest OUT ========================================================

app.get('/persons/out/:personId/:position/', (req,res, next) => {
    const id = req.params.personId;

    person.find({rfID : id})
        .exec()
        .then(doc=>{
            log.find({timeOUT :{$exists : false}, person : doc[0]._id})
                .exec()
                .then(doc2=>{
                    log.update({_id:doc2[0]._id},{ $set:{timeOUT: Date.now()}})
                        .exec()
                        .then(result=>{
                            res.status(200).json({
                                message:"Succes",
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json({
                                error:err
                            });
                        });
                });
        });

});

//================ UpdatePerson ====================================================

app.patch('/persons/:personId',(req,res, next) => {
    const id = req.params.personId;
    const updateOpts = {};
    for (const ops of Object.keys(req.body)){
        updateOpts[ops] = req.body[ops];
    }
    person.update({_id:id},{ $set:updateOpts})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"User updated !!",
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

//================ DeletePerson ================================================

app.delete('/persons/:personId',(req,res, next) => {
    const id = req.params.personId;
    person.remove({
        _id: id
    })
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"entry deleted !!",
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});


//==================================================================================================
//==================================================================================================
//==================================================================================================

//================ Get all rooms ==================================================================================


app.get('/rooms',(req,res)=>{
    room.find()
        .exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

})

//================ Add room ====================================================================

app.post('/rooms',(req,res, next) => {
    
    const newRoom = new room({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        position : req.body.position,
        state : false
    })

    newRoom.save()
        .then(result=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });

});

//================ get room ========================================================

app.get('/rooms/:RoomId',(req,res, next) => {
    const id = req.params.RoomId;
    room.find({_id : id})
        .exec()
        .then(doc=>{
            if (doc.length>0){
                res.status(200).json(doc[0]);
            }else {
                res.status(404).json({
                    message:" Room doesn't exist :( "
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});

//================ UpdateRoom ====================================================

app.patch('/rooms/:RoomId',(req,res, next) => {
    const id = req.params.RoomId;
    const updateOpts = {};
    for (const ops of Object.keys(req.body)){
        updateOpts[ops] = req.body[ops];
    }
    room.update({_id:id},{ $set:updateOpts})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"room status updated",
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

//================ DeleteRoom ================================================

app.delete('/rooms/:RoomId',(req,res, next) => {
    const id = req.params.RoomId;
    room.remove({_id: id})
          .exec()
          .then(result=>{
              res.status(200).json({
                  message:"Room deleted !!",
              });
          })
          .catch(err=>{
              console.log(err);
              res.status(500).json({
                  error:err
              });
          });
});


//==================================================================================================
//==================================================================================================
//==================================================================================================

//================ Get all Log ==================================================================================

app.get('/logs',(req,res)=>{
    log.find()
        .exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

})

//================ Add Log ====================================================================

app.post('/logs',(req,res, next) => {
    
    const newLog = new log({
        _id : mongoose.Types.ObjectId(),
        person : req.body.person,
        door : req.body.door
    });
    newLog.save().then(
        result=>{
            console.log(result);
            res.status(200).json(result);
        }).catch(
            err=>{
            console.log(err);
            res.status(401).json({
                error:err
            })
        });

});

//================ get Log ======================================================== TODO

app.get('/logs/:LogId',(req,res, next) => {
    const id = req.params.LogId;
    log.find({_id : id})
        .exec()
        .then(doc=>{
            if (doc.length>0){
                res.status(200).json(doc);
            }else {
                res.status(404).json({
                    message:" Room doesn't exist :( "
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});

//================ UpdateLog ====================================================

app.patch('/logs/:LogId',(req,res, next) => {
    const id = req.params.LogId;
    const updateOpts = {};
    for (const ops of Object.keys(req.body)){
        updateOpts[ops] = req.body[ops];
    }
    log.update({_id:id},{ $set:updateOpts})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"room status updated",
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

//================ DeleteLog ================================================

app.delete('/logs/:LogId',(req,res, next) => {
    const id = req.params.LogId;
    log.remove({_id: id})
          .exec()
          .then(result=>{
              res.status(200).json({
                  message:"Room deleted !!",
              });
          })
          .catch(err=>{
              console.log(err);
              res.status(500).json({
                  error:err
              });
          });
});


//==================================================================================================



// 404 routes
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status|| 500);
    res.json({
        error :{
            message: error.message

        }
    })
})
module.exports = app ;
//==========================================================
