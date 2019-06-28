const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// CRUD OPERATIONS
// - Create
// - Read
// - Update
// - Delete

// cRud: READ
// GET home page
// Route "GET /" to display all companies
router.get("/", (req, res, next) => {
  let start = new Date();
  Company.find()
    .sort({ name: 1 }) // to sort the company by name
    .limit(1000) // to limit the nr of companies displayed
    .then(companiesFromDb => {
      let end = new Date();
      console.log("Diff in ms:", end - start);
      res.render("index", { companies: companiesFromDb });
    });
});

// cRud: READ
// Route "GET /company/anId" to display the detail
// Example: http://localhost:3000/company/52cdef7c4bab8bd675297d94
router.get("/company/:companyId", (req, res, next) => {
  let companyId = req.params.companyId;
  Company.findById(companyId).then(company => {
    res.render("company-detail", { company: company });
  });
});

// cruD: DELETE
// Route "GET /delete-company/anId" to delete one company
router.get("/delete-company/:companyId", (req, res, next) => {
  let companyId = req.params.companyId;
  Company.findByIdAndDelete(companyId).then(company => {
    res.redirect("/"); // Go to the page http://localhost:3000/
  });
});

// Crud: CREATE
// Route "GET /add-company" to display/render a form
router.get("/add-company", (req, res, next) => {
  res.render('add-company');
});

// Crud: CREATE
// Route "GET /add-company" to handle the form submission
// i.e. the new company is saved in the database and displayed in the home page
router.post("/add-company", (req, res, next) => {
  // Shortcut for:
  // let name = req.body.name;
  // let number_of_employees = req.body.number_of_employees;
  // let description = req.body.description;
  let {name, number_of_employees, description} = req.body;
  Company.create({
    name, // remember to create a company with a name including a number because we are sorting!!!
    number_of_employees,
    description
  })
  .then(
    res.redirect('/')
  )
});


module.exports = router;
