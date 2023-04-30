import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'

// import studyRouter from './route/study.routes.js'
import userRouter from './route/user.routes.js'
import uploadRouter from './route/upload.routes.js'

const app = express()

const PORT = config.get('port')

app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.use('/images', express.static('images'))

app.use(cors())

const start = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect(config.get('mongodbUrl'))
        console.log(`database OK\tname: ${mongoose.connection.name}`)
    } catch (error) {
        console.log(`database error\tmessage: ${error.message}`)
    }

    // app.use('/api/study', studyRouter)
    app.use('/api/upload', uploadRouter)
    app.use('/api/user', userRouter)

    app.listen(PORT, (error) => {
        if(error) {
            console.log(error.message)
        }
        console.log(`server OK\tport: ${PORT}`)
    })
}

start()