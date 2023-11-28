const soap = require('strong-soap').soap;
const url = 'http://localhost:8000/wsdl?wsdl';

// Cambia "name" a "firstName" para que coincida con el WSDL
const requestArgs = {
  firstName: 'World'
};

const options = {};
soap.createClient(url, options, function(err, client) {
  if (err) {
    console.error('Error al crear el cliente SOAP:', err);
    return;
  }
  
  // Asegúrate de usar los nombres correctos de acuerdo con el WSDL
  // El método también debe cambiar a "sayHello"
  client.Hello_Service.Hello_Port.sayHello(requestArgs, function(err, result, envelope) {
    if (err) {
      console.error('Error al llamar al método sayHello:', err);
      return;
    }
    // La respuesta, el resultado y el sobre de respuesta en bruto
    console.log('Response Envelope: \n' + envelope);
    // "result" ya es un objeto, no es necesario usar JSON.stringify a menos que quieras convertirlo en una cadena JSON
    console.log('Result: \n', result);
  });
});
