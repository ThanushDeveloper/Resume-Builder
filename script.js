/* Default resume data */
const DEFAULT_DATA = {
  name: "AHMDD SAAH",
  title: "MARKETING MANAGER",
  phone: "+124-4236-7894",
  email: "hello@ahmedd saaahh.com",
  location: "123dfdfgdg, Any City",
  website: "www.ahmedd saaahh com",
  profile:
    '"Neimo ensiont est atem Aham ipsum, finifiam imbo sido. Intum lumina parco regia Aham extra mola idis. Commado Aham antepor yumo finiam carus, domus serim lacur Aham. Mauris solutido Aham in alibadis, ceras vita Aham elit exidio leo, adipiscit sector elit."',
  skills: [
    "Strategic Planning",
    "Problem Solving",
    "Crisis Management",
    "Creative Thinking",
    "Data Analysis",
    "Brand Development",
    "Negotiation",
    "Customer Orientation",
    "Adaptability to Change",
  ],
  languages: ["English (Fluent)"],
  reference: {
    name: "Estelle Darcy",
    role: "Wardiere Inc. / CTO",
    phone: "+124-4236-7894",
    email: "hello@ahmedd saaahh.com",
  },
  education: {
    degree: "Master of Business Management",
    school: "School of business | Wardiere University",
    years: "2029 - 2031",
  },
  experience: [
    {
      company: "Borcelle Studio",
      position: "Marketing Manager & Specialist",
      bullets: [
        "Formulate and implement detailed marketing strategies and initiatives that support the company's mission and objectives.",
        "Guide, inspire, and oversee a dynamic marketing team, promoting a collaborative and performance-oriented culture.",
        "Ensure uniformity of the brand across all marketing platforms and materials.",
      ],
      years: "2030 - PRESENT",
      highlightBadge: true,
    },
    {
      company: "Fbuget Studio",
      position: "Marketing Manager & Specialist",
      bullets: [
        '"Neimo ensiont est atem Aham ipsum, finifiam imbo sido. Intum lumina parco regia Aham extra mola idis. Commado Aham antepor yumo finiam carius, domus serim lacur Aham. Mauris solutido Aham in alibadis, ceras vita Aham elit exidio leo, adipiscit sector elit."',
      ],
      years: "2025 - 2029",
    },
    {
      company: "Studio Showdoe",
      position: "Marketing Manager & Specialist",
      bullets: [
        "Formulate and implement detailed marketing strategies and initiatives that support the company's mission and objectives. Guide, inspire, and oversee a dynamic marketing team, promoting a collaborative and performance-oriented culture. Ensure uniformity of the brand across all marketing platforms and materials.",
      ],
      years: "2024 - 2025",
    },
  ],
};

function $(sel) { return document.querySelector(sel); }

function renderList(target, items, mapper) {
  target.innerHTML = items.map(mapper).join("");
}

function bindData(data) {
  // Header
  $("#name").textContent = data.name;
  $("#title").textContent = data.title;

  // Contact
  $("#phone").textContent = data.phone;
  $("#email").textContent = data.email;
  $("#location").textContent = data.location;
  $("#website").textContent = data.website;

  // Profile
  $("#profile").textContent = data.profile;

  // Lists
  renderList(
    $("#skillsList"),
    data.skills,
    (s) => `<li>${escapeHtml(s)}</li>`
  );
  renderList(
    $("#languagesList"),
    data.languages,
    (s) => `<li>${escapeHtml(s)}</li>`
  );

  // Reference
  $("#ref_name").textContent = data.reference.name;
  $("#ref_role").textContent = data.reference.role;
  $("#ref_phone").textContent = data.reference.phone;
  $("#ref_email").textContent = data.reference.email;

  // Education
  $("#edu_degree").textContent = data.education.degree;
  $("#edu_school").textContent = data.education.school;
  $("#edu_years").textContent = data.education.years;

  // Experience
  const expContainer = document.getElementById("experience");
  expContainer.innerHTML = data.experience
    .map((role) => {
      const bulletsHtml = role.bullets.length === 1 && role.bullets[0].startsWith('"')
        ? `<p class="muted">${escapeHtml(role.bullets[0])}</p>`
        : `<ul>${role.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`;

      const right = role.highlightBadge
        ? `<div class="badge">${escapeHtml(role.years)}</div>`
        : `<div class="range">${escapeHtml(role.years)}</div>`;

      return `
        <article class="role">
          <div class="role-header">
            <div>
              <div class="company">${escapeHtml(role.company)}</div>
              <div class="position">${escapeHtml(role.position)}</div>
            </div>
            ${right}
          </div>
          ${bulletsHtml}
        </article>
      `;
    })
    .join("");
}

function loadData() {
  const saved = localStorage.getItem("resume_data_v1");
  if (saved) {
    try { return JSON.parse(saved); } catch { /* ignore */ }
  }
  return DEFAULT_DATA;
}

function saveData(data) {
  localStorage.setItem("resume_data_v1", JSON.stringify(data));
}

function buildFormFromData(form, data) {
  form.name.value = data.name;
  form.title.value = data.title;
  form.phone.value = data.phone;
  form.email.value = data.email;
  form.location.value = data.location;
  form.website.value = data.website;
  form.profile.value = data.profile.replace(/^"|"$/g, "");
  form.skills.value = data.skills.join("\n");
  form.languages.value = data.languages.join("\n");
  form.ref_name.value = data.reference.name;
  form.ref_role.value = data.reference.role;
  form.ref_phone.value = data.reference.phone;
  form.ref_email.value = data.reference.email;
  form.edu_degree.value = data.education.degree;
  form.edu_school.value = data.education.school;
  form.edu_years.value = data.education.years;

  // Experience editors
  const list = document.getElementById("experienceList");
  list.innerHTML = "";
  data.experience.forEach((r, idx) => list.appendChild(createRoleEditor(r, idx)));
  // Provide an empty slot
  if (data.experience.length < 6) {
    list.appendChild(createRoleEditor({ company: "", position: "", years: "", bullets: [""] }, data.experience.length));
  }
}

function createRoleEditor(role, idx) {
  const wrap = document.createElement("div");
  wrap.className = "role-editor";
  wrap.innerHTML = `
    <div class="grid">
      <label>Company<input type="text" name="company_${idx}" value="${escapeAttr(role.company || "")}"></label>
      <label>Years<input type="text" name="years_${idx}" value="${escapeAttr(role.years || "")}"></label>
    </div>
    <div class="grid">
      <label>Position<input type="text" name="position_${idx}" value="${escapeAttr(role.position || "")}"></label>
      <label>Badge Highlight<select name="badge_${idx}"><option value="no" ${role.highlightBadge?"":"selected"}>No</option><option value="yes" ${role.highlightBadge?"selected":""}>Yes</option></select></label>
    </div>
    <label>Bullets / Paragraph (one per line)<textarea name="bullets_${idx}" rows="4">${escapeHtml((role.bullets||[""]).join("\n"))}</textarea></label>
  `;
  return wrap;
}

function readForm(form) {
  const data = {
    name: form.name.value || DEFAULT_DATA.name,
    title: form.title.value || DEFAULT_DATA.title,
    phone: form.phone.value || DEFAULT_DATA.phone,
    email: form.email.value || DEFAULT_DATA.email,
    location: form.location.value || DEFAULT_DATA.location,
    website: form.website.value || DEFAULT_DATA.website,
    profile: form.profile.value ? form.profile.value : DEFAULT_DATA.profile.replace(/^"|"$/g, ""),
    skills: splitLines(form.skills.value, DEFAULT_DATA.skills),
    languages: splitLines(form.languages.value, DEFAULT_DATA.languages),
    reference: {
      name: form.ref_name.value || DEFAULT_DATA.reference.name,
      role: form.ref_role.value || DEFAULT_DATA.reference.role,
      phone: form.ref_phone.value || DEFAULT_DATA.reference.phone,
      email: form.ref_email.value || DEFAULT_DATA.reference.email,
    },
    education: {
      degree: form.edu_degree.value || DEFAULT_DATA.education.degree,
      school: form.edu_school.value || DEFAULT_DATA.education.school,
      years: form.edu_years.value || DEFAULT_DATA.education.years,
    },
    experience: [],
  };

  // experience collection
  const list = document.getElementById("experienceList");
  const editors = list.querySelectorAll(".role-editor");
  editors.forEach((wrap, idx) => {
    const company = wrap.querySelector(`[name="company_${idx}"]`).value.trim();
    const position = wrap.querySelector(`[name="position_${idx}"]`).value.trim();
    const years = wrap.querySelector(`[name="years_${idx}"]`).value.trim();
    const badge = wrap.querySelector(`[name="badge_${idx}"]`).value === "yes";
    const bullets = splitLines(wrap.querySelector(`[name="bullets_${idx}"]`).value, []);
    const hasAny = company || position || years || bullets.length;
    if (hasAny) {
      data.experience.push({ company, position, years, bullets, highlightBadge: badge });
    }
  });

  // As in the design, if bullets has single long paragraph with quotes, keep as paragraph
  if (data.profile && !/^".*"$/.test(data.profile)) {
    data.profile = `"${data.profile}"`;
  }
  return data;
}

function splitLines(value, fallback) {
  const lines = (value || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return lines.length ? lines : fallback.slice();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(str){
  return escapeHtml(str).replace(/\n/g, "&#10;");
}

// UI logic
const form = document.getElementById("resumeForm");
const editor = document.getElementById("editor");

function toggleEditorVisibility(){
  const hidden = editor.hasAttribute("hidden");
  if (hidden) editor.removeAttribute("hidden");
  else editor.setAttribute("hidden", "");
}

document.getElementById("toggleEditor").addEventListener("click", toggleEditorVisibility);

document.getElementById("addExperience").addEventListener("click", () => {
  const list = document.getElementById("experienceList");
  const idx = list.querySelectorAll(".role-editor").length;
  list.appendChild(createRoleEditor({ company: "", position: "", years: "", bullets: [""] }, idx));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = readForm(form);
  saveData(data);
  bindData(data);
});

// PDF download via print
const downloadBtn = document.getElementById("downloadPdf");

downloadBtn.addEventListener("click", () => {
  // Close editor for clean print
  editor.setAttribute("hidden", "");
  window.setTimeout(() => window.print(), 50);
});

// Initial load
const data = loadData();
bindData(data);
buildFormFromData(form, data);
