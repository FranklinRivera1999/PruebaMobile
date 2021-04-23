import Server from './loaders/app'

Server.start(()=>{
    console.log(`Server on port ${Server.port}`)
})