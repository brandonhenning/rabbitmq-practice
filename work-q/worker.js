const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        let queue = 'task_queue'
        channel.assertQueue(queue, {durable: true})
        console.log(' Waiting for message in %s. To exit press CTRL+C', queue)
        channel.consume(queue, message => {
            let seconds = message.content.toString().split('.').length - 1
            console.log(' [x] Received %s', message.content.toString())
            setTimeout(() => {
                console.log(' [x] Done')
                channel.ack(message)
            }, seconds * 1000)
        }, {noAck: false})
    })
})