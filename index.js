const app = require('./server')

const port = procass.env.PORT||3000;

app.listen(port,()=>{
    console.log('Server started:)!')
})