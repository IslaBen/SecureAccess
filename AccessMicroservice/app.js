const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/AccessControl",{ useNewUrlParser: true });

//===========================================================================================

const person = require("./models/Person");
const log = require("./models/AccessLog");

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

//================ Get all ==================================================================================


app.get('/persons',(req,res)=>{
    person.find()
        .exec()
        .then(docs=>{
            const response = {
                count: docs.length,
                persons: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        lastName: doc.lastName,
                        rfID : doc.rfID,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/persons/' + doc.rfID
                        }
                    }
                })
            }
            res.status(500).json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

})

//================ Add Person ====================================================================

app.post('/persons',(req,res, next) => {
    
    const p = new person({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName : req.body.lastName,
        rfID : req.body.rfID
    })

    p.save()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                entry:'person',
                createdEntry: {
                    id : p._id,
                    name: p.name,
                    lastName: p.lastName,
                    rfID: p.rfID,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/persons/' + p.rfID
                    }
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });

});

//================ AccessRequest ========================================================

app.get('/persons/:personId',(req,res, next) => {
    const id = req.params.personId;
    person.find({rfID : id})
        .exec()
        .then(doc=>{
            console.log(doc);
            if (doc.length>0){
                console.log(doc);
                const accessLog = new log({
                    _id : mongoose.Types.ObjectId(),
                    person: doc[0]._id,
                    door : req.body.door,
                })

                accessLog.save()
                    .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });;
                const response = {
                    message : "access permisson granted "
                }
                res.status(200).json(response);
            }else {
                res.status(401).json({
                    message:"Access denied !!!"
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});

//================ Update ====================================================

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
                message:"entry updated !!",
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

//================ Delete ================================================

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
