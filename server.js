import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/api.js'
const app = express()
app.use(cors())

app.use("/api", apiRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})