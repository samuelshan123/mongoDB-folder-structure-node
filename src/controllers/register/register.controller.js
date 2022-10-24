const { objectCollection, circleCollection } = require("../../../server");


// Object registration
exports.object_register = async (req, res) => {
    const data = req.body
    let response;
    if (data.hasOwnProperty('func')) {

        if (data.func.flag === 1) {

            if (data.func.sflag === 1) {

                if (data.obj.objid.length === 50 && data.obj.objid.match(/^[0-9a-zA-Z]+$/)) {

                    await objectCollection.findOne({
                        obj: data.obj
                    }, async (err, result) => {
                        if (err) {
                            console.log(err);
                            response = {
                                "status": 0,
                                "code": 32,
                                "info": "Unable to update our records",
                                "payload": data
                            }
                            res.send(response)
                        } else {
                            if (result) {
                                response = {
                                    "status": 0,
                                    "code": 16,
                                    "info": "obj ID in already use",
                                    "payload": data
                                }

                                res.send(response)
                            } else {
                                await objectCollection.insertOne(data, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        response = {
                                            "status": 0,
                                            "code": 32,
                                            "info": "Unable to update our records",
                                            "payload": data
                                        }
                                        res.send(response)
                                    } else {
                                        response = {
                                            "func": {
                                                "flag": 1,
                                                "sflag": 2
                                            },
                                            "objid": data.obj.objid,
                                            "status": 1,
                                            "info": "object registered"
                                        }

                                        res.send(response)

                                    }
                                })
                            }
                        }
                    })

                } else {
                    response = {
                        "status": 0,
                        "code": 8,
                        "info": "invalid object ID",
                        "payload": data
                    }

                    res.send(response)
                }

            } else {
                response = {
                    "status": 0,
                    "code": 4,
                    "info": "invalid sub flag",
                    "payload": data
                }
                res.send(response)
            }
        } else {
            result = {
                "status": 0,
                "code": 2,
                "info": "unknown flag",
                "payload": data
            }

            res.send(result)
        }

    } else {
        response = {
            "status": 0,
            "code": 1,
            "info": "function not defined",
            "payload": data
        }
        res.send(response)
    }

}

// Circle registration
exports.circle_register = async (req, res) => {
    const data = req.body
    let response;
    if (data.hasOwnProperty('func')) {

        if (data.func.flag === 2) {

            if (data.func.sflag === 1) {

                if (data.cir.cirid.length === 50 && data.cir.cirid.match(/^[0-9a-zA-Z]+$/)) {

                    await objectCollection.findOne({
                        "obj.objid": data.catalyst.objid
                    }, async (err, result) => {
                        if (err) {
                            console.log(err);
                            response = {
                                "status": 0,
                                "code": 32,
                                "info": "Unable to update our records",
                                "payload": data
                            }
                            res.send(response)
                        } else {
                            console.log('obj',result);
                            if (result) {
                                await circleCollection.findOne({"cir.cirid":data.cir.cirid}, async (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        response = {
                                            "status": 0,
                                            "code": 32,
                                            "info": "Unable to update our records",
                                            "payload": data
                                        }
                                        res.send(response)
                                    } else {
                                        console.log(result);
                                        if(result){
                                            response = {
                                                "status": 0,
                                                "code": 16,
                                                "info": "circle ID in already use",
                                                "payload": data
                                            }
            
                                            res.send(response)
                                        
                                        }
                                        else{
                                            await objectCollection.insertOne(data, (err, result) => {
                                                   
                                                if(err){
                                                    console.log(err);
                                                    response = {
                                                        "status": 0,
                                                        "code": 32,
                                                        "info": "Unable to update our records",
                                                        "payload": data
                                                    }
                                                    res.send(response)
                                                }
                                                else{
                                            response = {
                                                "func": {
                                                    "flag": 2,
                                                    "sflag": 2
                                                },
                                                "cirid": data.cir.cirid,
                                                "status": 1,
                                                "info": "circle registered"
                                            }
    
                                            res.send(response)
                                        }
                                        })
                                        }
                                      
                                    }
                                })
                            } 
                            else {
                                response = {
                                    "status": 0,
                                    "code": 16,
                                    "info": "unknown catalyst",
                                    "payload":data
                                  }

                                res.send(response)
                            }
                        }
                    })

                } else {
                    response = {
                        "status": 0,
                        "code": 8,
                        "info": "invalid circle ID",
                        "payload": data
                    }

                    res.send(response)
                }

            } else {
                response = {
                    "status": 0,
                    "code": 4,
                    "info": "invalid sub flag",
                    "payload": data
                }
                res.send(response)
            }
        } else {
            result = {
                "status": 0,
                "code": 2,
                "info": "unknown flag",
                "payload": data
            }

            res.send(result)
        }

    } else {
        response = {
            "status": 0,
            "code": 1,
            "info": "function not defined",
            "payload": data
        }
        res.send(response)
    }

}