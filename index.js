const fs = require("fs");
const pdf = require("pdf-parse");
const facturas = require("./metodos");
const readLine = require("readline");

const captura = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

captura.question("Ingresa el nombre del archivo a analizar : ", function (res) {
  let dataBuffer = fs.readFileSync("D:/" + res + ".pdf");

  pdf(dataBuffer).then(function (data) {
    const textoPdf = data.text;
    const textoString = JSON.stringify(textoPdf);
    const jsonPdf = JSON.parse(textoString);
    const snEspacios = jsonPdf.split("\n");

    const fact = facturas.FacturasConvertir(snEspacios);

    const excel = facturas.saveExcel(fact);
  });
  captura.close();
});
