const { data_base } = require("../../server");
const User = data_base.collection('Users');



exports.ping = (req,res)=>{
  res.send('pong')
}