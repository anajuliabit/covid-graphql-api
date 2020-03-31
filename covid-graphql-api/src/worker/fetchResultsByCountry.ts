import axios from "axios";
import cheerio from "cheerio";
// import { Country } from "src/entity/Country";

export async function parseApiData() {
  const data = await getResults();
  await persistResults(data);
}

async function persistResults(data: any) {
  // await Country.save(data);
  console.log(`Updated states: ${data.length} states`);
}

async function getResults() {
  const response = await axios.get(
    "https://www.worldometers.info/coronavirus/#countries"
  );
  if (response.status !== 200) {
    console.log("Error", response.status);
  }

  const html = cheerio.load(response.data);
  const statesTable = html("table#main_table_countries_today");
  const tableRows = statesTable
    .children("tbody")
    .children("tr:not(.total_row)")
    .toArray();
  const dataColIndexes: any = {
    cases: 1,
    todayCases: 2,
    deaths: 3,
    todayDeaths: 4,
    recovered: 5,
    active: 6
  };

  const result: any = [];
  tableRows.forEach(row => {
    const cells = row.children.filter(cell => cell.name === "td");
    const data: any = {};
    data["name"] = parseStateCell(cells[0]);
    Object.keys(dataColIndexes).forEach(property => {
      data[property] = parseNumberCell(cells[dataColIndexes[property]]);
    });
    result.push(data);
  });
  return result;
}

function parseStateCell(cell: any) {
  let state =
    cell.children[0].data ||
    cell.children[0].children[0].data ||
    // state name with link has another level
    cell.children[0].children[0].children[0].data ||
    cell.children[0].children[0].children[0].children[0].data ||
    "";
  state = state.trim();
  if (state.length === 0) {
    // parse with hyperlink
    state = cell.children[0].next.children[0].data || "";
  }
  return state.trim() || "";
}

function parseNumberCell(cell: any) {
  const cellValue = cell.children.length ? cell.children[0].data : "";
  return parseFloat(cellValue.replace(/[,+\-\s]/g, "")) || 0;
}
