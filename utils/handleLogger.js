const {IncomingWebhook} =  require("@slack/webhook");
//TODO: envio de notificaciones 
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
const loggerStream = {
    write: message =>{
        webHook.send({
            text: message
        });
        // console.log("capturando", message)
    },
};

module.exports = {loggerStream}