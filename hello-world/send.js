const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        let queue = 'hello'
        channel.assertQueue(queue, {durable: false})
        channel.sendToQueue(queue, new Buffer('Hello World!'))
        console.log(' [x] Sent Hello World')
    })
    setTimeout(() => { connection.close(); process.exit(0) }, 500)
})
