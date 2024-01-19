const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function saveData(data, filename) {
  // const filePath = path.join(
  //   "C:/Users/S4T/Documents/GitHub/API/tramdomua",
  //   `${filename}.json`
  // );
  const filePath = path.join(
    "C:/Users/Thu/OneDrive/Documents/GitHub/API/tramdomua",
    `${filename}.json`
  );
  fs.writeFileSync(filePath, JSON.stringify(data));
}

async function main() {
  const url = "https://csdlpcttapi.nuian.vn/api/tramdomua";
  const initialData = await fetchData(url);

  for (const item of initialData) {
    const maTramAPI = item.MaTramAPI;
    const data = await fetchData(
      `https://csdlpcttapi.nuian.vn/api/tramdomua/${maTramAPI}`
    );
    saveData(data, maTramAPI);
    console.log(data);
  }
}

main();
