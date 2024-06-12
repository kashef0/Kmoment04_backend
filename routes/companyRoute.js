const express = require("express");
const router = express.Router();
const CompanyCheck = require("../monitor/companyControll");
const auth = require("../auth/autentisering");

router.get("/", CompanyCheck.getCompany);
router.post("/", auth, CompanyCheck.createCompany);
router.delete("/:id", auth, CompanyCheck.deleteCompany);


module.exports = router;