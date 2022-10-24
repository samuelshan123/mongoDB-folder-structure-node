const {
  circleCollection
} = require("../../server");
const openpgp = require('openpgp');


exports.ping = (req, res) => {
  res.send('pong')
}

exports.webInterface = async (req, res) => {
  let response;
  if (req.params.id.length === 50 && req.params.id.match(/^[0-9a-zA-Z]+$/)) {

    await circleCollection.findOne({
      "cir.cirid": req.params.id
    }, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        if (result) {
          res.render('encrypt',{result})
        } else {
          response = {
            "status": 0,
            "code": 3002,
            "info": "unknown Circle"
          }
          res.send(response)
        }
      }
    })
  } else {
    response = {
      "status": 0,
      "code": 3001,
      "info": "invalid Circle"
    }

    res.send(response)

  }
}

exports.encryptFormData= async (req,res)=>{

  const senderPublicKeyObject = await openpgp.readKey({
    armoredKey: req.body.pgp_fingerprint,
})
const encryptedMessage = await openpgp.encrypt({
   message: await openpgp.createMessage({
       text: JSON.stringify({name:req.body.name,message:req.body.message}),
   }),
   encryptionKeys: senderPublicKeyObject,
   // signingKeys: receiverPrivateKeyObject,
})

console.log(encryptedMessage);
  res.json({message:encryptedMessage})
}

exports.findCircles=async (req,res)=>{
  // console.log(req);
  circleCollection.find().toArray((err,result)=>{
    if(err) throw err
    res.send(result)
})
}