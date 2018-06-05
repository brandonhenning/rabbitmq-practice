const amqp = require('amqplib/callback_api')

function generateTask () {
    amqp.connect('amqp://localhost', (error, connection) => {
        connection.createChannel((error, channel) => {
            let queue = 'hello'
            let message = 'comin in hot!'
            channel.assertQueue(queue, { durable: false })
            channel.sendToQueue(queue, new Buffer(message), { persistent: true })
            console.log(message)
        })
    })
}

const testGenerate = setInterval (generateTask, 1000)