import chalk from "chalk";
import inquirer from "inquirer";

// Currency Coverter API Link
let apiLink = "https://v6.exchangerate-api.com/v6/f574f7c218a6e8c5fda7ff12/latest/PKR";


// Fetching Data 
let fetchData = async (data: any) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};


let data = await fetchData(apiLink);
// Object to Array
let countries = Object.keys(data);


// User input first country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting from",
    choices: countries,
})
console.log(`Converting from ${chalk.greenBright.bold(firstCountry.name)}`);


// First country money
let userMoney = await inquirer.prompt({
    type: "input",
    name: "rupee",
    message: `Please enter the ammount ${chalk.greenBright.bold(firstCountry.name)}: `
})
console.log(userMoney.rupee);


// Convert Country
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting to",
    choices: countries,
})

// Conversion Rate
let cnv = `https://v6.exchangerate-api.com/v6/f574f7c218a6e8c5fda7ff12/pair/${firstCountry.name}/${secondCountry.name}`;


// fetching data for conversion rate
let cnvData = async (data: any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};

let conversionRate = await cnvData(cnv)
let convertedRate = userMoney.rupee * conversionRate
console.log(`Your ${chalk.greenBright.bold(firstCountry.name)} ${chalk.greenBright.bold(userMoney.rupee)} in ${chalk.greenBright.bold(secondCountry.name)} is ${chalk.greenBright.bold(convertedRate)}`);
