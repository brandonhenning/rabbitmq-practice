const amqp = require('amqplib/callback_api')
const _ = require('lodash')

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        let queue = 'hello'
        channel.assertQueue(queue, {durable: false})
        console.log(' Waiting for message in %s. To exit press CTRL+C', queue)
        channel.consume(queue, message => {
            let seconds = _.random(6)
            console.log(` [x] Received ${message.content}, ${seconds}, ${queue}`)
            setTimeout(() => {
                console.log(` [x] Done in ${seconds} seconds`)
                channel.ack(message)
            }, seconds * 1000)
        }, {noAck: false})
    })
})