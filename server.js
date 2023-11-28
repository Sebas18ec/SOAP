const soap = require('strong-soap').soap;
const http = require('http');
const fs = require('fs');

// Este es el servicio que implementa las operaciones SOAP.
const serviceObject = {
  Hello_Service: {
    Hello_Port: {
      // La operación 'sayHello' debe coincidir con lo definido en tu WSDL
      sayHello: function(args, callback) {
        // Implementar la lógica de la operación aquí
        console.log('sayHello called with argument: ', args.firstName);

        // Crear una respuesta
        const response = {
          greeting: 'Hello, ' + args.firstName
        };

        // Usar callback para enviar la respuesta
        callback(null, response);
      }
    }
  }
};

// Cargar el archivo WSDL
const xml = fs.readFileSync('xml.wsdl', 'utf8');

// Opciones para el servidor
const options = {};

// Crear un servidor HTTP
const server = http.createServer(function(request, response) {
  response.end('404: Not Found: ' + request.url);
});

// Escuchar en un puerto específico, por ejemplo, 8000
server.listen(8000, function() {
  console.log('Server is listening on port 8000');
});

// Añadir el servicio SOAP al servidor HTTP creado anteriormente
soap.listen(server, '/wsdl', serviceObject, xml, function() {
  console.log('SOAP service is up and running');
});
