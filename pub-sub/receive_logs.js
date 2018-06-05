const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        let exchange = 'logs'
        channel.assertExchange(exchange, 'fanout', {durable: false})

        channel.assertQueue('', {exclusive: true}, (error, queue) => {
            console.log(' [] Waiting for messages in %s. To exit press CTRL+C', queue.queue)
            channel.bindQueue(queue.queue, exchange, '')
            channel.consume(queue.queue, message => {
                console.log(' [x] %s', message.content.toString())
            }, {noAck: true})
        })
    })
})