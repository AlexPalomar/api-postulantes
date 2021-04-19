const mysql =  require('mysql');
const keys = require('./keys');

const pool = mysql.createPool(keys.database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSE');
        }

        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }

        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }

        if(err.code === 'ER_DBACCESS_DENIED_ERROR'){
            console.log('Error: ',err.code,' -> acceso denegado');
        }
    }
    
     if(connection){ 
        connection.release();
        console.log('DB is connected');
     }
});

module.exports = pool;