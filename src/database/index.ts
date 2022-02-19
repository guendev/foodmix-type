import { connect } from 'mongoose'

const options = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function run(): Promise<void> {
    try {
        await connect(process.env.MONGODB_URL!, options)
        console.log('MongoDB connected!')
    } catch (e) {
        console.log(e)
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(run, 5000)
    }
}

export default {
    run
} as const
