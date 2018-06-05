const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        let exchange = 'logs'
        let message = process.argv.slice(2).join(' ') || 'Hello World!'

        channel.assertExchange(exchange, 'fanout', { durable: false })
        channel.publish(exchange, '', new Buffer(message))
        console.log(' [x] Sent %s', message)
    })
    setTimeout(() => {connection.close(); process.exit(0) }, 500)
})