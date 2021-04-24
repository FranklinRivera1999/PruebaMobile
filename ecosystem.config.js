module.exports = {
  apps : [{
    name:"PRUEBA-MOBILE",
    script: 'dist/index.js',
    watch: false,
    env:{
      NODE_ENV: "production"
    },
    error_file: "logs/error.log",
    log_file:"logs/console.log",
    time:true
  }]
};
