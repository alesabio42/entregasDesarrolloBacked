const cluster = require('cluster');
const { startServer } = require("./app");

// Configura el número mínimo de trabajadores necesarios
const numeroDeTrabajadores = 1;

if (cluster.isPrimary) {
    console.log(`Proceso principal con PID: ${process.pid}`);
    console.log(`Número de trabajadores configurados: ${numeroDeTrabajadores}`);

    // Crear el número mínimo de trabajadores necesarios
    for (let i = 0; i < numeroDeTrabajadores; i++) {
        cluster.fork();
    }

    // Escuchar mensajes de los trabajadores
    cluster.on('message', worker => {
        console.log(`Mensaje recibido del worker con PID: ${worker.process.pid}`);
    });

    // Escuchar eventos de salida de los trabajadores
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker con PID: ${worker.process.pid} ha terminado con código ${code} y señal ${signal}`);
        console.log('Creando un nuevo worker...');
        cluster.fork(); // Reemplazar el trabajador caído con uno nuevo
    });

} else {
    console.log(`Proceso worker creado con PID: ${process.pid}, no es el principal`);
    startServer(); // Iniciar el servidor en el proceso worker
}
