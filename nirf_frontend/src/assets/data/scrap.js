// const puppeteer = require("puppeteer");
// const axios = require("axios");
// const pdf = require("pdf-parse");
// const fs = require("fs");
// const { GoogleSpreadsheet } = require("google-spreadsheet");

// // Function to scrape PDF URLs from the NIRF India website
// async function scrapePDFURLs() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.nirfindia.org/2023/EngineeringRanking.html");

//   // Implement code to scrape PDF URLs from the website here

//   await browser.close();
// }

// // Function to download and parse PDF files
// async function downloadAndParsePDF(pdfURL) {
//   const response = await axios.get(pdfURL, { responseType: "arraybuffer" });
//   const dataBuffer = Buffer.from(response.data);

//   const data = await pdf(dataBuffer);
//   return data.text;
// }

// // Function to save data to JSON file
// function saveDataToJSON(data) {
//   fs.writeFileSync("output.json", JSON.stringify(data, null, 2));
// }

// // Function to save data to Google Sheets (requires Google Sheets API setup)
// async function saveDataToGoogleSheets(data) {
//   const doc = new GoogleSpreadsheet("YOUR_GOOGLE_SHEET_ID");
//   await doc.useServiceAccountAuth(require("./credentials.json"));
//   await doc.loadInfo();

//   const sheet = doc.sheetsByIndex[0];
//   await sheet.clear();

//   // Implement code to populate Google Sheets with data here
// }

// (async () => {
//   const pdfURLs = await scrapePDFURLs();
//   const pdfData = [];

//   for (const pdfURL of pdfURLs) {
//     const textData = await downloadAndParsePDF(pdfURL);
//     pdfData.push({ pdfURL, textData });
//   }

//   saveDataToJSON(pdfData);
//   // Uncomment the line below if you want to save data to Google Sheets
//   // saveDataToGoogleSheets(pdfData);
// })();

const axios = require("axios");
const pdf = require("pdf-parse");
const { GoogleSpreadsheet } = require("google-spreadsheet");

// Function to download and extract text from a PDF file given its URL
async function extractTextFromPDF(pdfURL) {
  try {
    const response = await axios.get(pdfURL, { responseType: "arraybuffer" });
    const dataBuffer = Buffer.from(response.data);

    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error while processing PDF: ${pdfURL}`, error);
    return null;
  }
}

// Function to save data to a Google Sheets document
async function saveDataToGoogleSheets(pdfURLs) {
  const doc = new GoogleSpreadsheet("YOUR_GOOGLE_SHEET_ID");
  await doc.useServiceAccountAuth(require("./credentials.json"));
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const data = [];
  for (const pdfURL of pdfURLs) {
    const textData = await extractTextFromPDF(pdfURL);
    if (textData) {
      data.push([pdfURL, textData]);
    }
  }

  if (data.length > 0) {
    await sheet.addRows(data);
    console.log(`Data added to Google Sheets: ${data.length} rows`);
  }
}

(async () => {
  // Provide an array of PDF URLs you want to extract data from
  const pdfURLs = [
    "https://www.nirfindia.org/nirfpdfcdn/2023/pdf/Engineering/IR-E-U-0456.pdf",
    // Add more PDF URLs as needed
  ];

  await saveDataToGoogleSheets(pdfURLs);
})();
