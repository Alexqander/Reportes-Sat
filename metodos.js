const ExcelJS = require("exceljs");
const FacturasConvertir = (info) => {
  //declaro mi array
  const arrayFacturas = [];

  //separar los datose
  const fol = info.map((palabra) => {
    if (palabra.includes("Folio")) {
      let flio = palabra.split(" ");
      let fliofis = flio[2];
      if (fliofis != "") return fliofis;
    }
  });
  const rzonSocial = info.map((palabra) => {
    if (palabra.includes("Social")) {
      let rzon = palabra.split(":");
      let razon = rzon[1].trim();
      if (
        razon.includes("MACHADO") != true &&
        razon.includes("Machado") != true
      ) {
        return razon;
      }
    }
  });
  const montos = info.map((palabra) => {
    if (palabra.search("Total:") >= 0) {
      let numerostr = palabra.slice(8, 16);
      let numsolo = numerostr.replace(/,/, "");
      let numtotal = Number(numsolo);
      return numtotal;
    }
  });
  //filtrado de datos
  const provedor = rzonSocial.filter((item) => item != undefined);
  //aqui filtro los montos
  const totalesSuma = montos.filter((item) => item != undefined);
  //aqui filtro los folios
  const folios = fol.filter((item) => item != undefined);

  const largo = folios.length;

  for (let i = 0; i < largo; i++) {
    const factura = {
      folio: folios[i],
      provedor: provedor[i],
      monto: totalesSuma[i],
    };
    arrayFacturas.push(factura);
  }
  return arrayFacturas;
};

const saveExcel = (data) => {
  const workbook = new ExcelJS.Workbook();
  const fileName = "Reporte provedores.xlsx";
  const sheet = workbook.addWorksheet("provedores");

  const columns = [
    { header: "Folio", key: "folio" },
    { header: "Provedor", key: "provedor" },
    { header: "Monto", key: "monto" },
  ];
  sheet.columns = columns;
  sheet.addRows(data);
  workbook.xlsx
    .writeFile(fileName)
    .then((e) => {
      console.log("archivo creado exitosamente");
    })
    .catch((e) => {
      console.log("algo ocurrio al guardar el archivo", e);
    });
};

module.exports = { FacturasConvertir, saveExcel };
