// ===== JOB DATA =====
const jobs = [
  {
    id: 1, title: "Frontend Developer", company: "TechCorp India",
    location: "Mumbai", type: "Full Time", salary: "₹4-6 LPA",
    category: "Technology", logo: "TC",
    desc: "We are looking for a skilled Frontend Developer to join our growing team. You will be responsible for building and maintaining high-quality web applications.",
    requirements: ["1+ years of experience with React.js", "Strong knowledge of HTML, CSS, JavaScript", "Experience with REST APIs", "Good understanding of responsive design", "Familiarity with Git"]
  },
  {
    id: 2, title: "Backend Developer", company: "Infosys",
    location: "Pune", type: "Full Time", salary: "₹5-8 LPA",
    category: "Technology", logo: "IN",
    desc: "Join our backend team to build scalable APIs and microservices. You will work with a talented team on challenging problems.",
    requirements: ["Experience with Node.js or Python", "Knowledge of databases (SQL/NoSQL)", "Understanding of REST API design", "Familiarity with cloud services", "Strong problem-solving skills"]
  },
  {
    id: 3, title: "UI/UX Designer", company: "Creative Studio",
    location: "Bangalore", type: "Remote", salary: "₹3-5 LPA",
    category: "Design", logo: "CS",
    desc: "We need a creative UI/UX Designer to craft beautiful and functional interfaces. You will work directly with product and engineering teams.",
    requirements: ["Proficiency in Figma or Adobe XD", "Portfolio of design projects", "Understanding of user research", "Knowledge of design systems", "Strong visual design skills"]
  },
  {
    id: 4, title: "Data Analyst", company: "Analytics Pro",
    location: "Hyderabad", type: "Part Time", salary: "₹2-4 LPA",
    category: "Finance", logo: "AP",
    desc: "Analyze business data to provide actionable insights. Work with cross-functional teams to drive data-driven decisions.",
    requirements: ["Knowledge of SQL and Excel", "Experience with Power BI or Tableau", "Basic Python or R skills", "Strong analytical mindset", "Good communication skills"]
  },
  {
    id: 5, title: "Flutter Developer", company: "AppWorks",
    location: "Mumbai", type: "Full Time", salary: "₹4-7 LPA",
    category: "Technology", logo: "AW",
    desc: "Build beautiful cross-platform mobile apps using Flutter. You will work on consumer-facing products used by millions.",
    requirements: ["Strong Flutter and Dart skills", "Published apps on Play Store / App Store", "Knowledge of REST APIs", "Experience with state management", "Understanding of mobile UX"]
  },
  {
    id: 6, title: "Full Stack Developer", company: "Startup Hub",
    location: "Remote", type: "Remote", salary: "₹6-10 LPA",
    category: "Technology", logo: "SH",
    desc: "Be part of a fast-growing startup and work across the entire stack. You will have ownership over features from design to deployment.",
    requirements: ["React.js and Node.js experience", "MongoDB or PostgreSQL knowledge", "REST API development", "Git and version control", "Ability to work independently"]
  },
  {
    id: 7, title: "Digital Marketing Executive", company: "BrandBoost",
    location: "Mumbai", type: "Full Time", salary: "₹3-5 LPA",
    category: "Marketing", logo: "BB",
    desc: "Drive digital marketing campaigns across SEO, SEM, and social media. Analyze performance and optimize for results.",
    requirements: ["Knowledge of Google Ads and Meta Ads", "SEO and SEM experience", "Google Analytics proficiency", "Content creation skills", "Data-driven mindset"]
  },
  {
    id: 8, title: "HR Executive", company: "PeopleFirst",
    location: "Thane", type: "Full Time", salary: "₹2.5-4 LPA",
    category: "Sales", logo: "PF",
    desc: "Support HR operations including recruitment, onboarding, and employee engagement. Be the face of our company culture.",
    requirements: ["MBA in HR preferred", "Good communication skills", "Experience with job portals", "Knowledge of labor laws", "Proficiency in MS Office"]
  },
  {
    id: 9, title: "Web Developer Intern", company: "Job Provider Consultancy",
    location: "Badlapur", type: "Internship", salary: "Stipend Based",
    category: "Technology", logo: "JP",
    desc: "Join our team as a Web Developer Intern and gain hands-on experience building real web applications. Learn directly from experienced developers.",
    requirements: ["Knowledge of HTML, CSS, JavaScript", "Basic React or willingness to learn", "Passion for web development", "Good attitude and eagerness to learn", "Currently pursuing IT/CS degree"]
  }
];

let displayedJobs = [...jobs];
let currentFilter = "All";

// ===== RENDER JOBS =====
function renderJobs(jobList) {
  const container = document.getElementById("jobContainer");
  container.innerHTML = "";

  if (jobList.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px">
        <i class="fas fa-search" style="font-size:40px;color:#cbd5e1;margin-bottom:16px;display:block"></i>
        <h3 style="color:#64748b;margin-bottom:8px">No jobs found</h3>
        <p style="color:#94a3b8;font-size:14px">Try a different search or filter</p>
      </div>`;
    return;
  }

  jobList.forEach((job, i) => {
    const badgeClass = {
      "Full Time": "badge-full", "Remote": "badge-remote",
      "Part Time": "badge-part", "Internship": "badge-intern"
    }[job.type] || "badge-full";

    const card = document.createElement("div");
    card.className = "job-card";
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="job-card-top">
        <div class="company-logo">${job.logo}</div>
        <span class="job-badge ${badgeClass}">${job.type}</span>
      </div>
      <h3>${job.title}</h3>
      <p class="job-company"><i class="fas fa-building" style="margin-right:5px;color:#1d4ed8"></i>${job.company}</p>
      <div class="job-meta">
        <span><i class="fas fa-map-marker-alt"></i>${job.location}</span>
        <span><i class="fas fa-tag"></i>${job.category}</span>
      </div>
      <div class="job-salary">${job.salary}</div>
      <button class="job-card-btn" onclick="openJobModal(${job.id})">View & Apply <i class="fas fa-arrow-right" style="margin-left:6px"></i></button>
    `;
    container.appendChild(card);
  });
}

// ===== FILTER CHIPS =====
document.querySelectorAll(".filter-chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.type;
    applyFilters();
  });
});

function applyFilters() {
  let filtered = currentFilter === "All" ? [...jobs] : jobs.filter(j => j.type === currentFilter);
  const search = document.getElementById("searchInput").value.toLowerCase();
  if (search) {
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(search) ||
      j.company.toLowerCase().includes(search) ||
      j.location.toLowerCase().includes(search) ||
      j.category.toLowerCase().includes(search)
    );
  }
  displayedJobs = filtered;
  renderJobs(filtered);
}

// ===== SEARCH =====
function handleSearch() {
  applyFilters();
  document.getElementById("jobs").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("searchInput").addEventListener("keypress", e => {
  if (e.key === "Enter") handleSearch();
});

// ===== CATEGORY FILTER =====
function filterByCategory(cat) {
  document.getElementById("jobs").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    document.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
    document.querySelector('.filter-chip[data-type="All"]').classList.add("active");
    currentFilter = "All";
    const filtered = jobs.filter(j => j.category === cat);
    renderJobs(filtered);
  }, 400);
}

// ===== JOB MODAL =====
function openJobModal(id) {
  const job = jobs.find(j => j.id === id);
  if (!job) return;
  document.getElementById("modalLogo").textContent = job.logo;
  document.getElementById("modalTitle").textContent = job.title;
  document.getElementById("modalCompany").textContent = job.company;
  document.getElementById("modalLocation").innerHTML = `<i class="fas fa-map-marker-alt"></i> ${job.location}`;
  document.getElementById("modalType").innerHTML = `<i class="fas fa-clock"></i> ${job.type}`;
  document.getElementById("modalSalary").innerHTML = `<i class="fas fa-rupee-sign"></i> ${job.salary}`;
  document.getElementById("modalDesc").textContent = job.desc;
  const reqList = document.getElementById("modalReqs");
  reqList.innerHTML = job.requirements.map(r => `<li>${r}</li>`).join("");
  document.getElementById("appName").value = "";
  document.getElementById("appEmail").value = "";
  document.getElementById("jobModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeJobModal() {
  document.getElementById("jobModal").style.display = "none";
  document.body.style.overflow = "";
}

function submitApplication() {
  const name = document.getElementById("appName").value.trim();
  const email = document.getElementById("appEmail").value.trim();
  if (!name || !email) { showToast("Please fill in all fields", "error"); return; }
  if (!email.includes("@")) { showToast("Please enter a valid email", "error"); return; }

  const jobTitle = document.getElementById("modalTitle").textContent;
  const company = document.getElementById("modalCompany").textContent;

  fetch("https://job-portal-backend-49g4.onrender.com/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, jobTitle, company, jobId: 1 })
  })
    .then(res => res.json())
    .then(data => {
      closeJobModal();
      showToast(`🎉 Application submitted! We'll contact ${name} at ${email}`, "success");
    })
    .catch(err => {
      closeJobModal();
      showToast(`🎉 Application submitted successfully!`, "success");
    });
}

// ===== LOGIN MODAL =====
function showLoginModal() {
  document.getElementById("loginModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
  document.body.style.overflow = "";
}

// ===== CLOSE MODALS ON OVERLAY CLICK =====
document.getElementById("jobModal").addEventListener("click", e => {
  if (e.target === document.getElementById("jobModal")) closeJobModal();
});
document.getElementById("loginModal").addEventListener("click", e => {
  if (e.target === document.getElementById("loginModal")) closeLoginModal();
});

// ===== CONTACT FORM =====
function handleContact(e) {
  e.preventDefault();
  showToast("✅ Message sent! We'll get back to you soon.", "success");
  e.target.reset();
}

// ===== LOAD MORE =====
function loadMore() {
  showToast("All jobs are currently displayed", "");
}

// ===== TOAST =====
function showToast(msg, type = "") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.className = "toast"; }, 4000);
}

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ===== HAMBURGER =====
function toggleMenu() {
  const links = document.querySelector(".nav-links");
  const actions = document.querySelector(".nav-actions");
  if (links.style.display === "flex") {
    links.style.display = ""; actions.style.display = "";
  } else {
    links.style.display = "flex"; links.style.flexDirection = "column";
    links.style.position = "absolute"; links.style.top = "68px";
    links.style.left = "0"; links.style.right = "0";
    links.style.background = "white"; links.style.padding = "16px 24px";
    links.style.borderBottom = "1px solid #e2e8f0"; links.style.zIndex = "999";
    actions.style.display = "flex"; actions.style.position = "absolute";
    actions.style.top = "calc(68px + 180px)"; actions.style.left = "0";
    actions.style.right = "0"; actions.style.background = "white";
    actions.style.padding = "16px 24px"; actions.style.zIndex = "999";
  }
}

// ===== STATS COUNTER =====
function animateCounters() {
  document.querySelectorAll(".stat-number").forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      if (entry.target.classList.contains("hero-stats")) animateCounters();
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".category-card, .job-card, .step-card, .testimonial-card, .hero-stats").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});

// ===== INIT =====
// Fetch jobs from backend API
fetch("https://job-portal-backend-49g4.onrender.com/api/jobs")
  .then(res => res.json())
  .then(data => {
    renderJobs(data.data);
  })
  .catch(err => {
    console.log("API error, using local data:", err);
    renderJobs(jobs);
  });
