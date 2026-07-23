const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory database (temporary)
let applications = [];
let jobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp India", location: "Mumbai", type: "Full Time", salary: "₹4-6 LPA", category: "Technology" },
  { id: 2, title: "Backend Developer", company: "Infosys", location: "Pune", type: "Full Time", salary: "₹5-8 LPA", category: "Technology" },
  { id: 3, title: "UI/UX Designer", company: "Creative Studio", location: "Bangalore", type: "Remote", salary: "₹3-5 LPA", category: "Design" },
  { id: 4, title: "Data Analyst", company: "Analytics Pro", location: "Hyderabad", type: "Part Time", salary: "₹2-4 LPA", category: "Finance" },
  { id: 5, title: "Flutter Developer", company: "AppWorks", location: "Mumbai", type: "Full Time", salary: "₹4-7 LPA", category: "Technology" },
  { id: 6, title: "Full Stack Developer", company: "Startup Hub", location: "Remote", type: "Remote", salary: "₹6-10 LPA", category: "Technology" },
  { id: 7, title: "Digital Marketing Executive", company: "BrandBoost", location: "Mumbai", type: "Full Time", salary: "₹3-5 LPA", category: "Marketing" },
  { id: 8, title: "HR Executive", company: "PeopleFirst", location: "Thane", type: "Full Time", salary: "₹2.5-4 LPA", category: "Sales" },
  { id: 9, title: "Web Developer Intern", company: "Job Provider Consultancy", location: "Badlapur", type: "Internship", salary: "Stipend Based", category: "Technology" }
];

// ===== JOBS ROUTES =====
// GET all jobs
app.get("/api/jobs", (req, res) => {
  res.json({ success: true, count: jobs.length, data: jobs });
});

// GET single job
app.get("/api/jobs/:id", (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  res.json({ success: true, data: job });
});

// GET jobs by filter
app.get("/api/jobs/filter/:type", (req, res) => {
  const filtered = jobs.filter(j => j.type === req.params.type);
  res.json({ success: true, count: filtered.length, data: filtered });
});

// ===== APPLICATIONS ROUTES =====
// POST new application
app.post("/api/applications", (req, res) => {
  const { name, email, jobId, jobTitle, company } = req.body;
  if (!name || !email || !jobId) {
    return res.status(400).json({ success: false, message: "Please provide name, email and jobId" });
  }
  const application = {
    id: applications.length + 1,
    name, email, jobId, jobTitle, company,
    appliedAt: new Date().toLocaleString("en-IN")
  };
  applications.push(application);
  res.status(201).json({ success: true, message: "Application submitted!", data: application });
});

// GET all applications (admin)
app.get("/api/applications", (req, res) => {
  res.json({ success: true, count: applications.length, data: applications });
});

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.json({ message: "Job Provider Consultancy API is running!" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});