const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const Department = require("./models/Department");
const Employee = require("./models/Employee");
const Patient = require("./models/Patient");

// Get seed data for Departments
const getDepartmentsSeedData = () => {
  // Predefined data
  const departmentsData = [
    {
      name: "Mathematics",
      establishedAt: new Date("1920-01-01"),
      email: "math@university.com",
    },
    {
      name: "Computer Science",
      establishedAt: new Date("1960-01-01"),
      email: "cs@university.com",
    },
    {
      name: "Physics",
      establishedAt: new Date("1930-01-01"),
      email: "physics@university.com",
    },
    {
      name: "Chemistry",
      establishedAt: new Date("1940-01-01"),
      email: "chemistry@university.com",
    },
    {
      name: "Biology",
      establishedAt: new Date("1950-01-01"),
      email: "biology@university.com",
    },
  ];

  return departmentsData;
};

// Get seed data for Employees per Department
const getEmployeesSeedData = (departmentIds) => {
  const employeesData = [
    // Mathematicians
    {
      firstName: "Ada",
      lastName: "Lovelace",
      specialization: "Mathematics",
      gender: "Female",
    },
    {
      firstName: "Alan",
      lastName: "Turing",
      specialization: "Mathematics",
      gender: "Male",
    },
    {
      firstName: "Carl",
      lastName: "Gauss",
      specialization: "Mathematics",
      gender: "Male",
    },
    {
      firstName: "Leonhard",
      lastName: "Euler",
      specialization: "Mathematics",
      gender: "Male",
    },

    // Computer Scientists
    {
      firstName: "Grace",
      lastName: "Hopper",
      specialization: "Computer Science",
      gender: "Female",
    },
    {
      firstName: "Tim",
      lastName: "Berners-Lee",
      specialization: "Computer Science",
      gender: "Male",
    },
    {
      firstName: "Donald",
      lastName: "Knuth",
      specialization: "Computer Science",
      gender: "Male",
    },
    {
      firstName: "Ada",
      lastName: "Lovelace",
      specialization: "Computer Science",
      gender: "Female",
    },

    // Physicists
    {
      firstName: "Albert",
      lastName: "Einstein",
      specialization: "Physics",
      gender: "Male",
    },
    {
      firstName: "Isaac",
      lastName: "Newton",
      specialization: "Physics",
      gender: "Male",
    },
    {
      firstName: "Niels",
      lastName: "Bohr",
      specialization: "Physics",
      gender: "Male",
    },
    {
      firstName: "Marie",
      lastName: "Curie",
      specialization: "Physics",
      gender: "Female",
    },
  ];

  // Seed Employees
  for (const [index, employee] of employeesData.entries()) {
    const departmentIndex = index % departmentIds.length;
    employee.department = departmentIds[departmentIndex];
    employee.employeeId = `EMP-${1000 + index}`;
    employee.dateOfBirth = new Date(`19${90 - index}-01-01`);
    employee.phones = [`123-456-78${(index + 1) % 10}${index % 10}`];
    employee.yearsOfExperience = 5 + (index % 5);
  }

  return employeesData;
};

// Get seed data for Patients
const getPatientsSeedData = (employeeIds) => {
  const generatePatientsData = (patients) => {
    let patientsData = [];
    patients.forEach((patient, index) => {
      const email = `${patient.firstName.toLowerCase()}.${patient.lastName.toLowerCase()}${index}@example.com`;
      patientsData.push({ ...patient, email });
    });
    return patientsData;
  };

  const patientNames = [
    { firstName: "Richard", lastName: "Feynman", gender: "Male" },
    { firstName: "Paul", lastName: "Dirac", gender: "Male" },
    { firstName: "Michael", lastName: "Faraday", gender: "Male" },
    { firstName: "James", lastName: "Maxwell", gender: "Male" },
    { firstName: "Henri", lastName: "Poincaré", gender: "Male" },
    { firstName: "Emmy", lastName: "Noether", gender: "Female" },
    { firstName: "Srinivasa", lastName: "Ramanujan", gender: "Male" },
    { firstName: "Sophie", lastName: "Germain", gender: "Female" },
    { firstName: "Leonhard", lastName: "Euler", gender: "Male" },
    { firstName: "Blaise", lastName: "Pascal", gender: "Male" },
    // Add more names as needed
  ];

  return generatePatientsData(patientNames);
};

const seedData = async () => {
  // Connect to MongoDB
  connectDB();

  // Clear the existing data
  await Department.deleteMany({});
  await Employee.deleteMany({});
  await Patient.deleteMany({});

  // seed Departments
  const departmentsData = getDepartmentsSeedData();
  const departments = await Department.insertMany(departmentsData);
  console.log(`Departments successfully seeded: ${departments.length}`);

  // seed Employees
  const departmentIds = departments.map((department) => department._id);
  const employeesData = getEmployeesSeedData(departmentIds);
  const employees = await Employee.insertMany(employeesData);
  console.log(`Employees successfully seeded: ${employees.length}`);

  // seed Patients
  let patientCounter = 0;
  const employeeIds = employees.map((employee) => employee._id);
  const patientsData = getPatientsSeedData(employeeIds);
  for (const employee of employees) {
    const assignedPatients = patientsData.slice(
      patientCounter,
      patientCounter + 2
    );
    assignedPatients.forEach((patient) => {
      patient.employees = [employee._id];
    });
    await Patient.insertMany(assignedPatients);
    patientCounter += 2;
  }
  console.log(`Patients successfully seeded: ${patientCounter}`);

  console.log("Database seeded successfully!");
  mongoose.disconnect();
};

seedData();
