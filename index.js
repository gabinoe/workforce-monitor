const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");

init();

function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        // ... (rest of the choices)
      ]
    }
  ]).then(function (res) {
    const choice = res.choice;

    switch (choice) {
      // ... (rest of the switch cases)
    }
  });
}

// View all employees
function viewEmployees() {
  db.findAllEmployees()
    .then(function ([rows]) {
      const employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(loadMainPrompts);
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
