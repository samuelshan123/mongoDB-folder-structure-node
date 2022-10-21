
const { FIREBASE_SERVER_KEY } = require('../constants/constants');
    const FCM = require('fcm-node');
    const fcm = new FCM(FIREBASE_SERVER_KEY);

  module.exports= function notification(payload){
    var message = {
        to:'fsD34thjp1UG2IQ4Xn4amd:APA91bHtCqbO3umJHurJdwJcGPHjjKVQ6z0Ep-oJAJkM_5t2b0-2or0bkGerev25mqGw6oGI9-V5AGN7qOvv0QdAjWC7jJBSGTmJrQ5Dx73GIpnuAc7Vh0YnWf56WViJnlQrOkbkkj4a',
            notification: {
                title: 'NotifcatioTestAPP',
                body: '{"Message from node js app"}',
            },
    
            data: { //you can send only notification or only data(or include both)
                title: 'ok cdfsdsdfsd',
                body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
            }
    
        };
    
        fcm.send(message, function(err, response) {
            if (err) {
                console.log("Something has gone wrong!"+err);
                console.log("Respponse:! "+response);
            } else {
                // showToast("Successfully sent with response");
                console.log("Successfully sent with response: ", response);
            }
    
        });
  }