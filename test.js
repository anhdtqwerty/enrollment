const soapRequest = require("easy-soap-request");
const fs = require("fs");
const DomParser = require("dom-parser");

// example data
const url = "http://ams.tinnhanthuonghieu.vn:8009/bulkapi?wsdl ";
const sampleHeaders = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "",
};
const xml = fs.readFileSync("./test.xml", "utf-8");

// usage of module
(async () => {
  const { response } = await soapRequest({
    url: url,
    headers: sampleHeaders,
    xml: xml,
    timeout: 5000,
  }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  console.log(headers);
  const parser = new DomParser();
  doc = parser.parseFromString(body);
  console.log(doc);
  const balance = doc.getElementsByTagName("balance")[0].textContent;
  console.log(balance);
  console.log(statusCode);
})();
