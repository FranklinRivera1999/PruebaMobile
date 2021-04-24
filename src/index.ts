import Server from './loaders/app'

Server.start(()=>{
    console.log(`ENVIRONMENT ===> ${process.env.NODE_ENV}`)
    console.log(`Server on port ${Server.port}`)
    console.log(`Open Browser  ==> http://localhost:${Server.port}`)
})