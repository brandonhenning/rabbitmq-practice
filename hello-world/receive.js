const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        let queue = 'hello'
        channel.assertQueue(queue, {durable: false})
        console.log('Waiting for messages in %s. To exit press CTRL+C', queue)
        channel.consume(queue, message => {
            console.log(' [x] Received %s', message.content.toString())
        }, {noAck: true})
    })
})