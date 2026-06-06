const STORAGE_KEY = "applydash_profile";
const DISABLED_KEY = "applydash_disabled";
const DEFAULT_PROFILE = {
  static: {
    personal: {
      firstName: "Sudharsan",
      lastName: "Srinivasan",
      middleName: "",
      preferredName: "Sudharsan",
      email: "sudharsanak1010@gmail.com",
      phone: "+16822830833",
      phoneType: "Mobile",
      addressLine1: "1801, North Summit Avenue",
      addressLine2: "5302",
      city: "Lewisville",
      state: "Texas",
      zip: "75077",
      country: "United States"
    },
    links: {
      linkedin: "https://www.linkedin.com/in/sudharsan-srinivasan10/",
      github: "https://github.com/sudharsan-ak",
      portfolio: "https://sudharsansrinivasan.com"
    },
    workAuth: {
      authorizedToWork: true,
      requiresSponsorship: true,
      visaType: "H-1B",
      citizenship: "India",
      countryOfBirth: "India",
      securityClearance: false
    },
    compensation: {
      type: "Salary",
      currentSalary: "",
      noticePeriod: "Available to start immediately",
      startImmediately: true
    },
    preferences: {
      openToRelocation: true,
      remote: true,
      hybrid: true,
      onsite: true,
      willingToTravel: true,
      preferredEmploymentType: "Full-time",
      openToContractToHire: true
    },
    demographics: {
      gender: ["Man"],
      lgbtq: false,
      sexualOrientation: ["Heterosexual", "Heterosexual/Straight", "Straight"],
      pronouns: ["He/Him", "He/Him/His"],
      race: ["South Asian", "Asian"],
      veteranStatus: ["No, I am not a veteran or active member", "No, I am not a protected veteran", "I am not a protected veteran", "Not a veteran", "No"],
      disability: ["No", "I do not have a disability", "No, I do not have a disability"],
      hispanic: false,
      over18: true,
      age: "30"
    },
    customQA: [],
    coverLetter: "I'm a Full Stack Software Engineer with 5+ years of experience building web applications and backend systems using JavaScript, TypeScript, React, Node.js, MongoDB, and PostgreSQL. In my current role at Fortress Information Security, I've worked on end-to-end product features across frontend and backend, including real-time messaging, bulk workflows, custom business objects, and search improvements. I'm looking for a role where I can contribute across the stack, build solid user-facing and backend systems, and continue growing as an engineer."
  },
  education: [
    {
      id: "edu-1",
      institution: "University of Texas at Arlington",
      degreeType: "Master's / MS",
      fieldOfStudy: "Computer Science",
      minor: "",
      gpa: "",
      startDate: "2019",
      endDate: "2021",
      currentlyEnrolled: false,
      honors: ""
    },
    {
      id: "edu-2",
      institution: "Anna University",
      degreeType: "Bachelor's / BS",
      fieldOfStudy: "Computer Science and Engineering",
      minor: "",
      gpa: "",
      startDate: "2013",
      endDate: "2017",
      currentlyEnrolled: false,
      honors: ""
    }
  ],
  dynamic: {
    experience: [
      {
        id: "exp-1",
        company: "Fortress Information Security",
        title: "Software Engineer",
        employmentType: "Full-time",
        location: "Texas, United States",
        workSetting: "Hybrid",
        startDate: "June 2023",
        endDate: "April 2026",
        currentlyWorking: false,
        bullets: [
          "Introduced MongoDB Atlas Search for grid views while preserving backward compatibility with existing column-specific search behavior, filters, and sorting, using optimized indexing and aggregation pipelines to cut query latency by 35%",
          "Developed a reusable bulk update capability across multiple business objects, mapping structured user changes to backend updates, database writes, and aggregation refreshes so grid workflows stayed in sync",
          "Resolved a severe production performance issue in SlickGrid handling 250K+ records by replacing multiple find queries with a MongoDB aggregation pipeline, reducing latency and restoring reliable grid behavior",
          "Engineered a configurable custom tabs system that translated per-subscription business-object settings into dynamic rendered UI behavior across workflow-heavy product surfaces",
          "Delivered a real-time bi-directional messaging feature between an internal platform and vendor portal using Meteor publish/subscribe and reactivity",
          "Tech led 4 junior engineers, drove code reviews, and supported maintainable, testable delivery standards across teams, reducing PR turnaround time by 10%"
        ],
        reasonForLeaving: "Company restructuring / layoff"
      },
      {
        id: "exp-2",
        company: "Fortress Information Security",
        title: "Associate Software Engineer",
        employmentType: "Full-time",
        location: "Texas, United States",
        workSetting: "Hybrid",
        startDate: "June 2021",
        endDate: "May 2023",
        currentlyWorking: false,
        bullets: [
          "Led Scrum execution and CI/CD adoption using sprint planning, daily standups, retrospectives and automated pipelines, shortening deployment/testing cycles and improving release predictability",
          "Optimized cyber risk processing using JavaScript/Meteor, Lodash-based UI components, and MongoDB query/indexing improvements, boosting performance by 15%, reducing load time by 30%, and lowering data retrieval latency by 40%",
          "Implemented unit/integration/E2E tests for React/JavaScript features using Jest, React Testing Library, Selenium, and JUnit, reducing regressions and improving release confidence"
        ],
        reasonForLeaving: "Promoted to Software Engineer"
      },
      {
        id: "exp-3",
        company: "Merch",
        title: "Full Stack Developer Intern",
        employmentType: "Internship",
        location: "Texas, United States",
        workSetting: "Remote / Hybrid",
        startDate: "August 2020",
        endDate: "May 2021",
        currentlyWorking: false,
        bullets: [
          "Built frontend website and integrated APIs using WordPress/HTML/CSS to enable storefronts for businesses",
          "Increased organic traffic by 20% in 3 months using topic clusters and SEO optimization, reducing load time to 5 seconds"
        ],
        reasonForLeaving: "Graduated. Got a full-time job."
      },
      {
        id: "exp-4",
        company: "Cognizant",
        title: "Programmer Analyst",
        employmentType: "Full-time",
        location: "India",
        workSetting: "On-site",
        startDate: "January 2018",
        endDate: "November 2018",
        currentlyWorking: false,
        bullets: [
          "Developed and optimized COBOL backend jobs for Policy Management Systems, improving execution times by 10% and ensuring reliable IBM Mainframe production operations"
        ],
        reasonForLeaving: "Left to pursue Master's degree"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "LinkedIn Recruiter Finder",
        techStack: "JavaScript, Chrome Extension",
        bullets: [
          "Built a Chrome extension that scans LinkedIn job and People pages to find recruiter profiles, track history, and reduce manual outreach research"
        ],
        githubUrl: "https://github.com/sudharsan-ak",
        liveUrl: "",
        order: 0
      },
      {
        id: "proj-2",
        name: "Personal Portfolio Website",
        techStack: "React, TypeScript, Tailwind CSS, Supabase, AWS Lambda, Vercel",
        bullets: [
          "Built a responsive React/TypeScript portfolio focused on polished frontend presentation and project discoverability",
          "Implemented a serverless contact form with Supabase/PostgreSQL and Nodemailer for secure message persistence",
          "Designed and deployed a serverless Projects REST API on AWS Lambda + Supabase with CORS-secured browser access"
        ],
        githubUrl: "",
        liveUrl: "https://sudharsansrinivasan.com",
        order: 1
      },
      {
        id: "proj-3",
        name: "JobFlow Automator",
        techStack: "TypeScript, Node.js, Playwright",
        bullets: [
          "Built a TypeScript/Node.js CLI tool with Playwright and a human-in-the-loop workflow to automate applications across 3 job boards, reducing manual effort by 75%"
        ],
        githubUrl: "https://github.com/sudharsan-ak",
        liveUrl: "",
        order: 2
      }
    ],
    resumeFileName: "Sudharsan Srinivasan Resume 2026.pdf",
    resumeUpdatedAt: ""
  }
};
function migrateDemographics(raw) {
  const def = DEFAULT_PROFILE.static.demographics;
  const toArr = (v, fallback) => Array.isArray(v) ? v : typeof v === "string" && v ? [v] : fallback;
  return {
    gender: toArr(raw == null ? void 0 : raw.gender, def.gender),
    lgbtq: (raw == null ? void 0 : raw.lgbtq) ?? def.lgbtq,
    sexualOrientation: toArr(raw == null ? void 0 : raw.sexualOrientation, def.sexualOrientation),
    pronouns: toArr(raw == null ? void 0 : raw.pronouns, def.pronouns),
    race: toArr(raw == null ? void 0 : raw.race, def.race),
    veteranStatus: toArr(raw == null ? void 0 : raw.veteranStatus, def.veteranStatus),
    disability: toArr(raw == null ? void 0 : raw.disability, def.disability),
    hispanic: (raw == null ? void 0 : raw.hispanic) ?? def.hispanic,
    over18: (raw == null ? void 0 : raw.over18) ?? def.over18,
    age: (raw == null ? void 0 : raw.age) ?? def.age
  };
}
function mergeProfileWithDefaults(profile2) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  return {
    ...DEFAULT_PROFILE,
    ...profile2,
    static: {
      ...DEFAULT_PROFILE.static,
      ...profile2.static,
      personal: { ...DEFAULT_PROFILE.static.personal, ...(_a = profile2.static) == null ? void 0 : _a.personal },
      links: { ...DEFAULT_PROFILE.static.links, ...(_b = profile2.static) == null ? void 0 : _b.links },
      workAuth: { ...DEFAULT_PROFILE.static.workAuth, ...(_c = profile2.static) == null ? void 0 : _c.workAuth },
      compensation: { ...DEFAULT_PROFILE.static.compensation, ...(_d = profile2.static) == null ? void 0 : _d.compensation },
      preferences: { ...DEFAULT_PROFILE.static.preferences, ...(_e = profile2.static) == null ? void 0 : _e.preferences },
      demographics: migrateDemographics((_f = profile2.static) == null ? void 0 : _f.demographics),
      customQA: (((_g = profile2.static) == null ? void 0 : _g.customQA) ?? []).map((qa) => ({
        ...qa,
        // migrate: question (string) → questions (string[])
        questions: qa.questions ?? (qa.question ? [qa.question] : []),
        sites: qa.sites ?? []
      }))
    },
    education: profile2.education ?? DEFAULT_PROFILE.education,
    dynamic: {
      ...DEFAULT_PROFILE.dynamic,
      ...profile2.dynamic,
      experience: ((_h = profile2.dynamic) == null ? void 0 : _h.experience) ?? DEFAULT_PROFILE.dynamic.experience,
      projects: ((_i = profile2.dynamic) == null ? void 0 : _i.projects) ?? DEFAULT_PROFILE.dynamic.projects
    }
  };
}
async function getProfile() {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      if (result[STORAGE_KEY]) {
        const merged = mergeProfileWithDefaults(result[STORAGE_KEY]);
        chrome.storage.local.set({ [STORAGE_KEY]: merged });
        resolve(merged);
      } else {
        chrome.storage.local.set({ [STORAGE_KEY]: DEFAULT_PROFILE });
        resolve(structuredClone(DEFAULT_PROFILE));
      }
    });
  });
}
async function getDisabledPrefs() {
  return new Promise((resolve) => {
    chrome.storage.local.get(DISABLED_KEY, (result) => {
      resolve(result[DISABLED_KEY] ?? { allPages: false, domains: [] });
    });
  });
}
async function saveDisabledPrefs(prefs) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [DISABLED_KEY]: prefs }, resolve);
  });
}
const SITE_OPTIONS = [
  { label: "Ashby", domains: ["ashbyhq.com"] },
  { label: "Greenhouse", domains: ["greenhouse.io"] },
  { label: "Lever", domains: ["lever.co"] },
  { label: "LinkedIn", domains: ["linkedin.com"] },
  { label: "Workday", domains: ["workday.com", "myworkdayjobs.com"] },
  { label: "iCIMS", domains: ["icims.com"] },
  { label: "SmartRecruiters", domains: ["smartrecruiters.com"] },
  { label: "Jobvite", domains: ["jobvite.com"] },
  { label: "BambooHR", domains: ["bamboohr.com"] },
  { label: "Taleo", domains: ["taleo.net"] },
  { label: "Recruitee", domains: ["recruitee.com"] }
];
const FIELD_MAP = {
  // ── Identity ──────────────────────────────────────────────────────────────
  firstName: ["first name", "fname", "given name", "forename", "legal first"],
  lastName: ["last name", "lname", "surname", "family name", "legal last"],
  fullName: ["full name", "your name", "your full name", "legal name", "complete name"],
  middleName: ["middle name", "middle initial"],
  preferredName: ["preferred name", "preferred first", "nickname", "goes by"],
  email: ["email address", "work email", "personal email", "e-mail", "email"],
  phone: ["phone number", "mobile number", "contact number", "telephone", "mobile", "cell", "phone"],
  phoneType: ["phone type", "type of phone", "number type"],
  // ── Work authorization — BEFORE location/country to avoid "job location" clash ──
  workAuthorization: ["authorized to work", "work authorization", "legally authorized", "eligible to work", "currently authorized", "authorization to work", "require authorization"],
  sponsorship: ["visa sponsorship", "require sponsorship", "will you now or in the future require", "need sponsorship", "sponsorship required", "sponsorship"],
  visaType: ["visa type", "visa status", "work authorization type", "immigration status"],
  citizenship: ["country of citizenship", "citizenship", "nationality"],
  countryOfBirth: ["country of birth", "place of birth", "born in"],
  // ── Address — multi-word patterns before single words ─────────────────────
  addressLine1: ["address line 1", "address 1", "street address", "mailing address", "street"],
  addressLine2: ["address line 2", "address 2", "apartment", "suite", "unit", "apt", "floor"],
  location: ["current location", "preferred location", "where are you located", "where are you normally based", "location"],
  city: ["city of residence", "municipality", "city", "town"],
  state: ["state/province", "state or province", "province", "region", "state"],
  zip: ["postal code", "zip code", "postcode", "pin code", "zip"],
  country: ["country of residence", "country/region", "country", "nation"],
  // ── Links ─────────────────────────────────────────────────────────────────
  linkedin: ["linkedin profile url", "linkedin profile", "linkedin url", "linkedin link", "linkedin"],
  github: ["github profile", "github url", "git hub", "github"],
  portfolio: ["personal website", "portfolio url", "personal site", "website url", "portfolio", "website"],
  resumeUpload: ["upload resume", "upload cv", "attach resume", "curriculum vitae", "resume/cv", "resume", "cv"],
  coverLetter: ["cover letter", "motivation letter", "letter of interest", "why do you want", "why are you interested"],
  // ── Compensation ──────────────────────────────────────────────────────────
  currentSalary: ["current salary", "current compensation", "present salary"],
  salaryMin: ["salary min", "minimum salary", "minimum compensation", "salary from"],
  salaryMax: ["salary max", "maximum salary", "maximum compensation", "salary to"],
  salary: ["expected salary", "desired salary", "annual salary", "salary expectation", "expected compensation", "compensation requirements", "salary", "compensation"],
  hourlyRate: ["hourly rate", "rate per hour", "contract rate", "hourly"],
  noticePeriod: ["notice period", "how soon can you start", "notice"],
  startDate: ["available to start", "available from", "when can you start", "earliest start date", "start date", "pick date"],
  availableImmediately: ["available immediately", "available to start immediately", "immediate start"],
  // ── Preferences ───────────────────────────────────────────────────────────
  relocation: ["open to relocation", "willing to relocate", "relocation", "relocate"],
  workPreference: ["work location preference", "work arrangement", "work preference", "on-site", "remote", "hybrid"],
  employmentType: ["type of employment", "employment type", "job type", "full-time", "part-time"],
  travel: ["willing to travel", "travel requirement", "travel percentage", "travel"],
  contractToHire: ["contract to hire", "contract-to-hire", "c2h"],
  // ── Demographics — ethnicity BEFORE city so "ethnicity" doesn't substring-hit ─
  race: ["race/ethnicity", "ethnic background", "ethnicity", "racial", "race"],
  gender: ["gender identity", "gender", "sex"],
  pronouns: ["preferred pronouns", "pronouns"],
  sexualOrientation: ["sexual orientation", "orientation"],
  lgbtq: ["lgbtqia+", "lgbtqia", "lgbtq", "identify as lgbt", "queer"],
  transgender: ["identify as transgender", "do you identify as transgender", "transgender"],
  hispanic: ["hispanic or latino", "hispanic", "latino", "latinx"],
  veteran: ["protected veteran", "military status", "veteran status", "military", "veteran"],
  disability: ["disability status", "have a disability", "had one in the past", "accommodation", "disability", "disabled"],
  over18: ["age verification", "at least 18", "18 years", "over 18"],
  age: ["age range", "how old are you", "identify my age as", "age"],
  // custom and unknown are handled outside FIELD_MAP (via matchCustomQA / fallback)
  custom: [],
  unknown: []
};
const EXCLUDE_PATTERNS = [
  "privacy notice",
  "terms and conditions",
  "by submitting",
  "consent to the following",
  "acknowledge that you have read",
  "equal opportunity",
  "eeo statement",
  "data will be used",
  "personal data"
];
function tokenize(text) {
  return text.toLowerCase().replace(/[*?!.,;:()\[\]\/\-]/g, " ").split(/\s+/).filter((t) => t.length > 0);
}
const KEYWORD_ENTRIES = Object.entries(FIELD_MAP).filter(([ft]) => ft !== "unknown").flatMap(
  ([ft, keywords]) => keywords.map((kw) => {
    const tokens = tokenize(kw);
    return { fieldType: ft, tokens, wordCount: tokens.length };
  })
);
function phraseInTokens(phrase, label) {
  const n = phrase.length;
  outer: for (let i = 0; i <= label.length - n; i++) {
    for (let j = 0; j < n; j++) {
      if (label[i + j] !== phrase[j]) continue outer;
    }
    return true;
  }
  return false;
}
const SINGLE_TOKEN_MAP = {
  name: "fullName",
  email: "email",
  phone: "phone",
  city: "city",
  state: "state",
  country: "country",
  location: "location",
  zip: "zip",
  resume: "resumeUpload",
  cv: "resumeUpload",
  linkedin: "linkedin",
  github: "github",
  portfolio: "portfolio",
  website: "portfolio",
  gender: "gender",
  pronouns: "pronouns",
  race: "race",
  ethnicity: "race",
  age: "age",
  salary: "salary",
  sponsorship: "sponsorship"
};
function matchFieldType(labelText) {
  const lower = labelText.toLowerCase().trim();
  if (lower.length > 300) return "unknown";
  if (EXCLUDE_PATTERNS.some((p) => lower.includes(p))) return "unknown";
  const labelTokens = tokenize(lower);
  if (labelTokens.length === 0) return "unknown";
  if (labelTokens.length === 1) return SINGLE_TOKEN_MAP[labelTokens[0]] ?? "unknown";
  let bestType = "unknown";
  let bestScore = 0;
  for (const { fieldType, tokens, wordCount } of KEYWORD_ENTRIES) {
    if (!phraseInTokens(tokens, labelTokens)) continue;
    const score = wordCount * wordCount;
    if (score > bestScore) {
      bestType = fieldType;
      bestScore = score;
    }
  }
  return bestType;
}
function hostnameMatchesSite(hostname, siteLabel) {
  const site = SITE_OPTIONS.find((s) => s.label === siteLabel);
  return (site == null ? void 0 : site.domains.some((d) => hostname.includes(d))) ?? false;
}
function matchCustomQA(labelText, customQA, hostname = window.location.hostname) {
  if (customQA.length === 0) return null;
  const labelTokens = tokenize(labelText.toLowerCase());
  if (labelTokens.length === 0) return null;
  const labelSet = new Set(labelTokens);
  let bestMatch = null;
  let bestScore = 0;
  for (const qa of customQA) {
    if (qa.sites.length === 0 || !qa.sites.some((s) => hostnameMatchesSite(hostname, s))) continue;
    let bestVariantScore = 0;
    for (const question of qa.questions) {
      const qTokens = tokenize(question.toLowerCase());
      if (qTokens.length === 0) continue;
      const qSet = new Set(qTokens);
      let intersection = 0;
      for (const t of qSet) {
        if (labelSet.has(t)) intersection++;
      }
      const union = (/* @__PURE__ */ new Set([...labelSet, ...qSet])).size;
      const score = intersection / union;
      if (score > bestVariantScore) bestVariantScore = score;
    }
    if (bestVariantScore >= 0.5 && bestVariantScore > bestScore) {
      bestMatch = qa;
      bestScore = bestVariantScore;
    }
  }
  return bestMatch;
}
let _idCounter = 0;
function genId() {
  return `field-${++_idCounter}`;
}
function getLabelForElement(el) {
  var _a, _b, _c, _d, _e, _f, _g;
  if (el.id) {
    const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
    if (label) return ((_a = label.textContent) == null ? void 0 : _a.trim()) ?? "";
  }
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel.trim();
  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    const parts = labelledBy.split(/\s+/);
    const text = parts.map((id) => {
      var _a2, _b2;
      return (_b2 = (_a2 = document.getElementById(id)) == null ? void 0 : _a2.textContent) == null ? void 0 : _b2.trim();
    }).filter(Boolean).join(" ");
    if (text) return text;
  }
  const ownPrev = el.previousElementSibling;
  if (ownPrev) {
    const tag = ownPrev.tagName;
    if (["LABEL", "SPAN", "P", "DIV", "H1", "H2", "H3", "H4"].includes(tag)) {
      const text = (_b = ownPrev.textContent) == null ? void 0 : _b.trim();
      if (text && text.length < 120 && !text.includes("\n")) return text;
    }
  }
  for (const ancestor of [el.parentElement, (_c = el.parentElement) == null ? void 0 : _c.parentElement]) {
    const prev = ancestor == null ? void 0 : ancestor.previousElementSibling;
    if (!prev) continue;
    const tag = prev.tagName;
    if (["LABEL", "SPAN", "P", "DIV", "H1", "H2", "H3", "H4"].includes(tag)) {
      const text = (_d = prev.textContent) == null ? void 0 : _d.trim().replace(/\s+/g, " ");
      if (text && text.length < 120) return text;
    }
  }
  let parent = el.parentElement;
  let depth = 0;
  while (parent && depth < 6) {
    if (parent.tagName === "LABEL") {
      const clone = parent.cloneNode(true);
      clone.querySelectorAll("input, select, textarea").forEach((c) => c.remove());
      const text = (_e = clone.textContent) == null ? void 0 : _e.trim();
      if (text) return text;
    }
    if (parent.tagName === "FIELDSET") {
      const legend = parent.querySelector(":scope > legend");
      if (legend) return ((_f = legend.textContent) == null ? void 0 : _f.trim()) ?? "";
    }
    const prevSibling = parent.previousElementSibling;
    if (prevSibling) {
      const tag = prevSibling.tagName;
      if (["LABEL", "SPAN", "P", "DIV", "H1", "H2", "H3", "H4", "LEGEND"].includes(tag)) {
        const text = (_g = prevSibling.textContent) == null ? void 0 : _g.trim();
        if (text && text.length < 120 && !text.includes("\n")) return text;
      }
    }
    parent = parent.parentElement;
    depth++;
  }
  const placeholder = el.getAttribute("placeholder");
  if (placeholder) return placeholder.trim();
  const name = el.getAttribute("name");
  if (name) return name.replace(/[_\-[\]]/g, " ").trim();
  return "";
}
function getRadioGroupLabel(radio) {
  var _a, _b, _c;
  const fieldset = radio.closest("fieldset");
  if (fieldset) {
    const legend = fieldset.querySelector("legend");
    if (legend) return ((_a = legend.textContent) == null ? void 0 : _a.trim()) ?? "";
  }
  const group = radio.closest('[role="radiogroup"]');
  if (group) {
    const ariaLabel = group.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel;
    const labelledBy = group.getAttribute("aria-labelledby");
    if (labelledBy) {
      const el = document.getElementById(labelledBy);
      if (el) return ((_b = el.textContent) == null ? void 0 : _b.trim()) ?? "";
    }
  }
  let parent = radio.parentElement;
  let depth = 0;
  while (parent && depth < 8) {
    const prev = parent.previousElementSibling;
    if (prev) {
      const text = (_c = prev.textContent) == null ? void 0 : _c.trim();
      if (text && text.length > 4 && text.length < 200) return text;
    }
    parent = parent.parentElement;
    depth++;
  }
  return radio.getAttribute("name") ?? "";
}
function isPdfFileInput(el) {
  if (el.tagName !== "INPUT") return false;
  const input = el;
  if (input.type !== "file") return false;
  const accept = input.getAttribute("accept") ?? "";
  return accept === "" || accept.includes("pdf") || accept.includes("*");
}
function isVisible(el) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const style = window.getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
}
function getAriaRadioGroupLabel(group) {
  var _a;
  const ariaLabel = group.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel.trim();
  const labelledBy = group.getAttribute("aria-labelledby");
  if (labelledBy) {
    const parts = labelledBy.split(/\s+/);
    const text = parts.map((id) => {
      var _a2, _b;
      return (_b = (_a2 = document.getElementById(id)) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim();
    }).filter(Boolean).join(" ");
    if (text) return text;
  }
  let parent = group.parentElement;
  let depth = 0;
  while (parent && depth < 6) {
    const prev = parent.previousElementSibling;
    const text = (_a = prev == null ? void 0 : prev.textContent) == null ? void 0 : _a.trim();
    if (text && text.length > 4 && text.length < 200) return text;
    parent = parent.parentElement;
    depth++;
  }
  return "";
}
function getAshbyFieldLabel(container) {
  var _a, _b;
  return ((_b = (_a = container.querySelector(".ashby-application-form-question-title")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) ?? "";
}
function findGroupContainer(checkboxes) {
  if (checkboxes.length === 1) return checkboxes[0];
  let el = checkboxes[0].parentElement ?? checkboxes[0];
  while (el.parentElement) {
    if (checkboxes.every((cb) => el.contains(cb))) break;
    el = el.parentElement;
  }
  return el;
}
function isAshbyAutofillWidget(el) {
  return !!(el.closest("._autofillPane_oj0x8_445") || el.closest(".ashby-application-form-autofill-uploader") || el.closest(".ashby-application-form-autofill-input-root"));
}
function detectFieldsHeuristic(customQA = []) {
  var _a;
  const fields = [];
  const seenElements = /* @__PURE__ */ new Set();
  const ashbyContainers = Array.from(
    document.querySelectorAll(
      ".ashby-application-form-field-entry, fieldset._fieldEntry_17tft_29"
    )
  ).filter(isVisible);
  for (const container of ashbyContainers) {
    if (isAshbyAutofillWidget(container)) {
      container.querySelectorAll("input, button").forEach((el) => seenElements.add(el));
      continue;
    }
    const label = getAshbyFieldLabel(container);
    if (!label) continue;
    const fieldType = matchFieldType(label);
    const resumeInput = container.querySelector(
      'div[class*="_container_1fd3o"] input[type="file"], ._container_1fd3o_71 input[type="file"]'
    );
    if (resumeInput) {
      seenElements.add(resumeInput);
      container.querySelectorAll("button").forEach((el) => seenElements.add(el));
      fields.push({ id: genId(), element: resumeInput, fieldType: "resumeUpload", label, expectedValue: "", status: "pending" });
      continue;
    }
    const pushField = (element, ft = fieldType) => {
      if (ft !== "unknown") {
        fields.push({ id: genId(), element, fieldType: ft, label, expectedValue: "", status: "pending" });
        return;
      }
      const customMatch = matchCustomQA(label, customQA);
      if (customMatch) {
        fields.push({ id: genId(), element, fieldType: "custom", label, expectedValue: customMatch.id, status: "pending" });
      }
    };
    const yesNoContainer = container.querySelector('div[class*="_yesno_"]');
    if (yesNoContainer) {
      const buttons = yesNoContainer.querySelectorAll("button");
      yesNoContainer.querySelectorAll("button, input").forEach((el) => seenElements.add(el));
      seenElements.add(yesNoContainer);
      if (buttons.length >= 2) pushField(yesNoContainer);
      continue;
    }
    const checkboxInputs = container.querySelectorAll('input[type="checkbox"]');
    if (checkboxInputs.length >= 2) {
      checkboxInputs.forEach((cb) => seenElements.add(cb));
      pushField(container);
      continue;
    }
    const radioInputs = container.querySelectorAll('input[type="radio"]');
    if (radioInputs.length >= 1) {
      radioInputs.forEach((r) => seenElements.add(r));
      pushField(radioInputs[0]);
      continue;
    }
    const combobox = container.querySelector(
      'input[role="combobox"], input[aria-autocomplete="list"]'
    );
    if (combobox) {
      seenElements.add(combobox);
      container.querySelectorAll("button").forEach((el) => seenElements.add(el));
      pushField(combobox);
      continue;
    }
    const textInput = container.querySelector(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="url"]'
    );
    if (textInput) {
      seenElements.add(textInput);
      pushField(textInput);
      continue;
    }
  }
  const ghSelectControls = Array.from(
    document.querySelectorAll(".select__control")
  ).filter(isVisible);
  for (const control of ghSelectControls) {
    if (seenElements.has(control)) continue;
    let labelText = "";
    let ancestor = control.parentElement;
    for (let d = 0; d < 6 && ancestor; d++) {
      const lbl = ancestor.querySelector(":scope > label, :scope > .label");
      if (lbl) {
        labelText = ((_a = lbl.textContent) == null ? void 0 : _a.trim()) ?? "";
        break;
      }
      ancestor = ancestor.parentElement;
    }
    if (!labelText) labelText = getLabelForElement(control);
    if (!labelText) continue;
    const fieldType = matchFieldType(labelText);
    if (fieldType === "unknown") continue;
    control.querySelectorAll("input").forEach((el) => seenElements.add(el));
    seenElements.add(control);
    fields.push({ id: genId(), element: control, fieldType, label: labelText, expectedValue: "", status: "pending" });
  }
  if (window.location.hostname.includes("lever.co")) {
    const leverLabels = Array.from(document.querySelectorAll("label")).filter(isVisible);
    for (const label of leverLabels) {
      const labelDiv = label.querySelector(".application-label") ?? label;
      const rawText = labelDiv.textContent ?? "";
      const labelText = rawText.replace(/[*✱✲＊⁎]/g, "").replace(/ /g, " ").replace(/s+/g, " ").trim();
      if (!labelText) continue;
      const fieldType = matchFieldType(labelText);
      if (fieldType === "unknown") continue;
      const input = label.querySelector('input:not([type="hidden"]), select, textarea');
      if (!input || seenElements.has(input)) continue;
      if (!isVisible(input)) continue;
      seenElements.add(input);
      seenElements.add(label);
      fields.push({ id: genId(), element: input, fieldType, label: labelText, expectedValue: "", status: "pending" });
    }
  }
  const seenRadioNames = /* @__PURE__ */ new Set();
  const allRadios = Array.from(
    document.querySelectorAll('input[type="radio"]')
  ).filter(isVisible);
  for (const radio of allRadios) {
    if (seenElements.has(radio)) continue;
    const groupName = radio.getAttribute("name") ?? radio.id ?? "";
    if (seenRadioNames.has(groupName)) continue;
    seenRadioNames.add(groupName);
    const groupLabel = getRadioGroupLabel(radio);
    const combined = `${groupLabel} ${groupName}`;
    const fieldType = matchFieldType(combined);
    document.querySelectorAll(`input[type="radio"][name="${CSS.escape(groupName)}"]`).forEach((r) => seenElements.add(r));
    if (fieldType !== "unknown") {
      fields.push({ id: genId(), element: radio, fieldType, label: groupLabel || groupName, expectedValue: "", status: "pending" });
    }
  }
  const ariaRadioGroups = Array.from(
    document.querySelectorAll('[role="radiogroup"]')
  ).filter(isVisible);
  for (const group of ariaRadioGroups) {
    const radios = Array.from(group.querySelectorAll('[role="radio"]')).filter(isVisible);
    if (radios.length === 0) continue;
    radios.forEach((radio) => seenElements.add(radio));
    const label = getAriaRadioGroupLabel(group);
    const fieldType = matchFieldType(label);
    if (fieldType !== "unknown") {
      fields.push({ id: genId(), element: radios[0], fieldType, label: label || "Radio group", expectedValue: "", status: "pending" });
    }
  }
  const checkboxGroupMap = /* @__PURE__ */ new Map();
  const allCheckboxInputs = Array.from(
    document.querySelectorAll('input[type="checkbox"]')
  ).filter((el) => isVisible(el) && !seenElements.has(el));
  for (const cb of allCheckboxInputs) {
    const name = cb.getAttribute("name") ?? "";
    if (!name) continue;
    if (!checkboxGroupMap.has(name)) checkboxGroupMap.set(name, []);
    checkboxGroupMap.get(name).push(cb);
  }
  for (const [, checkboxes] of checkboxGroupMap) {
    if (checkboxes.length < 2) continue;
    checkboxes.forEach((cb) => seenElements.add(cb));
    const groupLabel = getRadioGroupLabel(checkboxes[0]);
    const fieldType = matchFieldType(groupLabel);
    const container = findGroupContainer(checkboxes);
    if (fieldType !== "unknown") {
      fields.push({ id: genId(), element: container, fieldType, label: groupLabel, expectedValue: "", status: "pending" });
    } else if (groupLabel) {
      const customMatch = matchCustomQA(groupLabel, customQA);
      if (customMatch) {
        fields.push({ id: genId(), element: container, fieldType: "custom", label: groupLabel, expectedValue: customMatch.id, status: "pending" });
      }
    }
  }
  const nonRadioSelector = [
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]):not([type="radio"])',
    "select",
    "textarea",
    '[role="combobox"]',
    '[role="checkbox"]',
    '[role="radio"]'
  ].join(", ");
  const elements = Array.from(document.querySelectorAll(nonRadioSelector));
  for (const el of elements) {
    if (seenElements.has(el)) continue;
    seenElements.add(el);
    if (!isVisible(el) && !isPdfFileInput(el)) continue;
    if (isAshbyAutofillWidget(el)) continue;
    if (el instanceof HTMLInputElement && (el.type === "date" || el.type === "time" || el.type === "datetime-local" || el.type === "month" || el.type === "week")) continue;
    if (el instanceof HTMLInputElement && el.type === "checkbox") {
      const labelText2 = getLabelForElement(el);
      const nameAttr2 = el.getAttribute("name") ?? "";
      const combined2 = `${labelText2} ${nameAttr2}`;
      const fieldType2 = matchFieldType(combined2);
      if (fieldType2 !== "unknown") {
        fields.push({ id: genId(), element: el, fieldType: fieldType2, label: labelText2 || nameAttr2 || "Checkbox", expectedValue: "", status: "pending" });
      }
      continue;
    }
    const labelText = getLabelForElement(el);
    const nameAttr = el.getAttribute("name") ?? "";
    const idAttr = el.id ?? "";
    const combined = `${labelText} ${nameAttr} ${idAttr}`;
    const role = el.getAttribute("role");
    if (!combined.trim() && !isPdfFileInput(el)) continue;
    if (role === "radio") continue;
    if (isPdfFileInput(el)) {
      if (!isAshbyAutofillWidget(el)) {
        fields.push({ id: genId(), element: el, fieldType: "resumeUpload", label: labelText || "Resume", expectedValue: "", status: "pending" });
      }
      continue;
    }
    if (el.tagName === "TEXTAREA") {
      if (labelText) {
        const ft = matchFieldType(labelText);
        if (ft === "coverLetter") {
          fields.push({ id: genId(), element: el, fieldType: "coverLetter", label: labelText, expectedValue: "", status: "pending" });
        } else {
          const customMatch = matchCustomQA(labelText, customQA);
          if (customMatch) {
            fields.push({ id: genId(), element: el, fieldType: "custom", label: labelText, expectedValue: customMatch.id, status: "pending" });
          }
        }
      }
      continue;
    }
    const fieldType = matchFieldType(combined);
    if (fieldType !== "unknown") {
      fields.push({ id: genId(), element: el, fieldType, label: labelText || nameAttr || "Field", expectedValue: "", status: "pending" });
      continue;
    }
    if (labelText) {
      const customMatch = matchCustomQA(labelText, customQA);
      if (customMatch) {
        fields.push({ id: genId(), element: el, fieldType: "custom", label: labelText, expectedValue: customMatch.id, status: "pending" });
      }
    }
  }
  return fields;
}
function detectFields(customQA = []) {
  const fields = detectFieldsHeuristic(customQA);
  const seen = /* @__PURE__ */ new Set();
  const deduped = fields.filter((f) => {
    if (seen.has(f.element)) return false;
    seen.add(f.element);
    return true;
  });
  const known = deduped.filter((f) => f.fieldType !== "unknown");
  known.sort((a, b) => {
    const pos = a.element.compareDocumentPosition(b.element);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
  return known;
}
function dispatch(el, eventName, init) {
  el.dispatchEvent(new Event(eventName, { bubbles: true, cancelable: true, ...init }));
}
function dispatchInput(el) {
  el.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true }));
}
function normalizeCandidates(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}
function setNativeValue(el, value) {
  var _a;
  const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = (_a = Object.getOwnPropertyDescriptor(proto, "value")) == null ? void 0 : _a.set;
  if (setter) setter.call(el, value);
  else el.value = value;
}
function fillText(el, value) {
  el.focus();
  setNativeValue(el, value);
  dispatchInput(el);
  dispatch(el, "change");
  dispatch(el, "blur");
}
function fillSelect(el, value) {
  const options = Array.from(el.options);
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase();
    let matched = options.find((o) => o.value === candidate || o.text === candidate);
    if (!matched) matched = options.find(
      (o) => o.value.toLowerCase() === lower || o.text.toLowerCase() === lower
    );
    if (!matched) matched = options.find(
      (o) => o.text.toLowerCase().includes(lower) || lower.includes(o.text.toLowerCase())
    );
    if (!matched) continue;
    el.focus();
    el.value = matched.value;
    dispatchInput(el);
    dispatch(el, "change");
    dispatch(el, "blur");
    return true;
  }
  return false;
}
function fillCheckbox(el, shouldCheck) {
  if (el.checked !== shouldCheck) {
    el.focus();
    el.checked = shouldCheck;
    dispatch(el, "click");
    dispatch(el, "change");
    dispatch(el, "blur");
  }
}
function fillAriaCheckbox(el, shouldCheck) {
  const checked = el.getAttribute("aria-checked") === "true";
  if (checked === shouldCheck) return true;
  el.focus();
  el.click();
  dispatch(el, "change");
  dispatch(el, "blur");
  return el.getAttribute("aria-checked") === String(shouldCheck);
}
function fillRadioByName(representativeRadio, value) {
  var _a, _b;
  const groupName = representativeRadio.getAttribute("name");
  const radios = groupName ? Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(groupName)}"]`)) : [representativeRadio];
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase().trim();
    for (const radio of radios) {
      let optionLabel = "";
      let labelEl = null;
      if (radio.id) {
        const lbl = document.querySelector(`label[for="${CSS.escape(radio.id)}"]`);
        if (lbl) {
          labelEl = lbl;
          optionLabel = ((_a = lbl.textContent) == null ? void 0 : _a.trim()) ?? "";
        }
      }
      if (!optionLabel) {
        const parent = radio.closest("label");
        if (parent) {
          labelEl = parent;
          const clone = parent.cloneNode(true);
          clone.querySelectorAll("input").forEach((i) => i.remove());
          optionLabel = ((_b = clone.textContent) == null ? void 0 : _b.trim()) ?? "";
        }
      }
      if (!optionLabel) optionLabel = radio.value;
      const optLower = optionLabel.toLowerCase().trim();
      if (optLower === lower || optLower.startsWith(lower) || lower.startsWith(optLower)) {
        if (radio.checked) return true;
        if (labelEl) labelEl.click();
        else {
          radio.focus();
          radio.checked = true;
          dispatch(radio, "click");
          dispatch(radio, "change");
          dispatch(radio, "blur");
        }
        return true;
      }
    }
  }
  return false;
}
function fillRadio(container, value) {
  var _a;
  const radios = Array.from(container.querySelectorAll('input[type="radio"]'));
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase();
    for (const radio of radios) {
      const label = document.querySelector(`label[for="${CSS.escape(radio.id)}"]`);
      const labelText = ((_a = label == null ? void 0 : label.textContent) == null ? void 0 : _a.trim().toLowerCase()) ?? radio.value.toLowerCase();
      if (labelText.includes(lower) || lower.includes(labelText)) {
        if (label instanceof HTMLElement) label.click();
        else {
          radio.focus();
          radio.checked = true;
          dispatch(radio, "click");
        }
        dispatch(radio, "change");
        dispatch(radio, "blur");
        return true;
      }
    }
  }
  return false;
}
function fillAriaRadio(representativeRadio, value) {
  const group = representativeRadio.closest('[role="radiogroup"]') ?? representativeRadio.parentElement;
  if (!group) return false;
  const options = Array.from(group.querySelectorAll('[role="radio"]'));
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase().trim();
    for (const option of options) {
      const text = (option.getAttribute("aria-label") ?? option.textContent ?? "").toLowerCase().trim();
      if (!text) continue;
      if (text === lower || text.includes(lower) || lower.includes(text)) {
        option.focus();
        option.click();
        dispatch(option, "change");
        dispatch(option, "blur");
        return true;
      }
    }
  }
  return false;
}
function fillContentEditable(el, value) {
  el.focus();
  el.textContent = value;
  dispatchInput(el);
  dispatch(el, "input");
  dispatch(el, "change");
  dispatch(el, "blur");
}
async function fillFileInput(el, buffer, fileName) {
  const file = new File([buffer], fileName, { type: "application/pdf" });
  const dt = new DataTransfer();
  dt.items.add(file);
  el.files = dt.files;
  dispatch(el, "change");
  dispatch(el, "input");
}
async function fillClickDropdown(el, value) {
  el.focus();
  el.click();
  for (let attempt = 0; attempt < 4; attempt++) {
    await new Promise((r) => setTimeout(r, 350));
    const listbox = document.querySelector(
      '[role="listbox"], [aria-expanded="true"] + *, [data-radix-popper-content-wrapper]'
    );
    const pool = listbox ? Array.from(listbox.querySelectorAll('[role="option"], li, button, div')) : Array.from(document.querySelectorAll('[role="option"]'));
    const options = pool.filter((o) => {
      var _a;
      if (!((_a = o.textContent) == null ? void 0 : _a.trim())) return false;
      const s = window.getComputedStyle(o);
      return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
    });
    if (options.length === 0) continue;
    for (const candidate of normalizeCandidates(value)) {
      const lower = candidate.toLowerCase().trim();
      const match = options.find((o) => {
        const t = (o.textContent ?? "").trim().toLowerCase();
        return t === lower || t.includes(lower) || lower.includes(t);
      });
      if (!match) continue;
      match.click();
      await new Promise((r) => setTimeout(r, 150));
      dispatch(el, "change");
      dispatch(el, "blur");
      return true;
    }
  }
  return false;
}
function triggerReactHandler(el, eventType = "click", checkedValue) {
  const fiberKey = Object.keys(el).find(
    (k) => k.startsWith("__reactFiber") || k.startsWith("__reactInternalInstance")
  );
  if (!fiberKey) return false;
  const handlerProp = eventType === "click" ? "onClick" : eventType === "mousedown" ? "onMouseDown" : "onChange";
  const alternatePropNames = handlerProp === "onChange" ? ["onChange", "onCheckedChange", "onValueChange"] : [handlerProp];
  const syntheticEvent = {
    target: el,
    currentTarget: el,
    type: eventType,
    bubbles: true,
    cancelable: true,
    preventDefault: () => {
    },
    stopPropagation: () => {
    },
    nativeEvent: new MouseEvent(eventType, { bubbles: true }),
    persist: () => {
    }
  };
  let fiber = el[fiberKey];
  while (fiber) {
    const props = fiber.memoizedProps;
    if (props) {
      for (const prop of alternatePropNames) {
        const handler = props[prop];
        if (typeof handler === "function") {
          if (prop === "onCheckedChange" && checkedValue !== void 0) handler(checkedValue);
          else handler(syntheticEvent);
          return true;
        }
      }
    }
    fiber = fiber.return;
  }
  return false;
}
function isButtonAlreadyActive(button) {
  const cls = button.getAttribute("class") ?? "";
  if (/\b(_active_|_selected_|_checked_|active|selected|checked)\b/i.test(cls)) return true;
  if (button.getAttribute("aria-pressed") === "true") return true;
  if (button.getAttribute("aria-selected") === "true") return true;
  if (button.getAttribute("data-state") === "on" || button.getAttribute("data-state") === "active") return true;
  return false;
}
function fillButtonGroup(container, value) {
  var _a;
  const buttons = Array.from(container.querySelectorAll("button"));
  for (const candidate of normalizeCandidates(value)) {
    const lower = candidate.toLowerCase().trim();
    for (const button of buttons) {
      const text = ((_a = button.textContent) == null ? void 0 : _a.trim().toLowerCase()) ?? "";
      if (!text) continue;
      if (text === lower || text.includes(lower) || lower.includes(text)) {
        if (isButtonAlreadyActive(button)) return true;
        button.focus();
        const handledByReact = triggerReactHandler(button, "click");
        if (!handledByReact) {
          button.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, composed: true, view: window }));
        }
        return true;
      }
    }
  }
  return false;
}
async function fillAriaCombobox(el, value) {
  el.focus();
  el.click();
  for (const candidate of normalizeCandidates(value)) {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      setNativeValue(el, candidate);
    } else if (el.getAttribute("contenteditable") === "true") {
      el.textContent = candidate;
    }
    el.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true, data: candidate }));
    dispatch(el, "change");
    const lower = candidate.toLowerCase().trim();
    for (let attempt = 0; attempt < 6; attempt++) {
      await new Promise((r) => setTimeout(r, 400));
      const options = Array.from(
        document.querySelectorAll('[role="option"], [role="listbox"] li, [role="listbox"] button, ul li, datalist option')
      ).filter((o) => {
        var _a;
        const t = (_a = o.textContent) == null ? void 0 : _a.trim();
        if (!t) return false;
        const s = window.getComputedStyle(o);
        return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
      });
      if (options.length === 0) continue;
      const exactMatch = options.find((o) => o.textContent.trim().toLowerCase() === lower);
      const partialMatch = options.find((o) => {
        const t = o.textContent.trim().toLowerCase();
        return t.includes(lower) || lower.includes(t);
      });
      const match = exactMatch ?? partialMatch;
      if (!match) continue;
      match.click();
      await new Promise((r) => setTimeout(r, 150));
      dispatch(el, "change");
      dispatch(el, "blur");
      return true;
    }
  }
  return false;
}
async function fillDatePicker(el) {
  var _a;
  const today = /* @__PURE__ */ new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  el.focus();
  el.click();
  await new Promise((r) => setTimeout(r, 400));
  for (const selector of ['[role="gridcell"]', '[role="option"]', "td", "button"]) {
    for (const cell of Array.from(document.querySelectorAll(selector))) {
      if (((_a = cell.textContent) == null ? void 0 : _a.trim()) !== String(todayDay)) continue;
      const style = window.getComputedStyle(cell);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (parseFloat(style.opacity) < 0.5) continue;
      cell.click();
      await new Promise((r) => setTimeout(r, 200));
      const val = el.value ?? el.textContent ?? "";
      if (val) return true;
    }
  }
  const mm = String(todayMonth + 1).padStart(2, "0");
  const dd = String(todayDay).padStart(2, "0");
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    setNativeValue(el, `${mm}/${dd}/${todayYear}`);
  }
  dispatchInput(el);
  dispatch(el, "input");
  dispatch(el, "change");
  dispatch(el, "blur");
  return true;
}
function sendToMainWorld$1(type, detail) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
async function fillGreenhouseSelect(el, value) {
  const candidates = normalizeCandidates(value);
  const tmpId = `_ad_gh_${Date.now()}`;
  el.setAttribute("data-ad-tmp", tmpId);
  sendToMainWorld$1("__applydash_fill_select", { controlAttr: tmpId });
  let optionEls = [];
  for (let attempt = 0; attempt < 8; attempt++) {
    await new Promise((r) => setTimeout(r, 300));
    optionEls = Array.from(
      document.querySelectorAll('.select__option, [class*="select__option"]')
    ).filter((opt) => {
      var _a;
      if (!((_a = opt.textContent) == null ? void 0 : _a.trim())) return false;
      const style = window.getComputedStyle(opt);
      return style.display !== "none" && style.visibility !== "hidden";
    });
    if (optionEls.length > 0) break;
  }
  if (optionEls.length === 0) {
    el.removeAttribute("data-ad-tmp");
    return false;
  }
  let bestIdx = -1;
  let bestScore = 0;
  for (const candidate of candidates) {
    const lower = candidate.toLowerCase().trim();
    optionEls.forEach((opt, i) => {
      const text = (opt.textContent ?? "").trim().toLowerCase();
      let score = 0;
      if (text === lower) score = 3;
      else if (text.startsWith(lower) || lower.startsWith(text)) score = 2;
      else if (text.includes(lower) || lower.includes(text)) score = 1;
      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    });
    if (bestScore === 3) break;
  }
  if (bestIdx === -1) {
    sendToMainWorld$1("__applydash_close_select", {});
    el.removeAttribute("data-ad-tmp");
    return false;
  }
  await new Promise((r) => setTimeout(r, 200));
  sendToMainWorld$1("__applydash_select_by_index", { controlAttr: tmpId, idx: String(bestIdx) });
  await new Promise((r) => setTimeout(r, 400 + bestIdx * 100));
  if (document.querySelector(".select__menu")) {
    sendToMainWorld$1("__applydash_close_select", {});
    await new Promise((r) => setTimeout(r, 200));
  }
  el.removeAttribute("data-ad-tmp");
  return true;
}
function sendToMainWorld(type, detail) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
async function fillLeverLocation(el, candidates) {
  const input = el instanceof HTMLInputElement ? el : el.querySelector("input");
  if (!input) return false;
  const tmpId = `_ad_lv_${Date.now()}`;
  input.setAttribute("data-ad-tmp", tmpId);
  const selector = `[data-ad-tmp="${tmpId}"]`;
  input.focus();
  input.click();
  for (const candidate of candidates) {
    sendToMainWorld("__applydash_type_value", { selector, value: candidate });
    const lower = candidate.toLowerCase().trim();
    for (let attempt = 0; attempt < 8; attempt++) {
      await new Promise((r) => setTimeout(r, 400));
      const options = Array.from(
        document.querySelectorAll(
          '[role="option"], [role="listbox"] li, ul li'
        )
      ).filter((opt) => {
        var _a;
        const text = (_a = opt.textContent) == null ? void 0 : _a.trim();
        if (!text || text.length > 100) return false;
        const s = window.getComputedStyle(opt);
        return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
      });
      if (options.length === 0) continue;
      const exactMatch = options.find((o) => o.textContent.trim().toLowerCase() === lower);
      const partialMatch = options.find((o) => {
        const t = o.textContent.trim().toLowerCase();
        return t.includes(lower) || lower.includes(t);
      });
      const match = exactMatch ?? partialMatch;
      if (!match) continue;
      match.click();
      await new Promise((r) => setTimeout(r, 200));
      dispatch(input, "change");
      dispatch(input, "blur");
      input.removeAttribute("data-ad-tmp");
      return true;
    }
  }
  input.removeAttribute("data-ad-tmp");
  return false;
}
async function fillLeverText(el, value) {
  if (el instanceof HTMLInputElement) {
    const tmpId = `_ad_lv_${Date.now()}`;
    el.setAttribute("data-ad-tmp", tmpId);
    sendToMainWorld("__applydash_type_value", { selector: `[data-ad-tmp="${tmpId}"]`, value });
    await new Promise((r) => setTimeout(r, 100));
    el.removeAttribute("data-ad-tmp");
  } else {
    el.focus();
    setNativeValue(el, value);
    el.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true }));
    dispatch(el, "change");
    dispatch(el, "blur");
  }
}
const SALARY_PATTERNS = [
  // $120,000 - $180,000 or $120,000 – $180,000
  /\$\s*([\d,]+)\s*(?:–|-|to)\s*\$\s*([\d,]+)/gi,
  // $120K - $180K
  /\$\s*([\d.]+)\s*[Kk]\s*(?:–|-|to)\s*\$\s*([\d.]+)\s*[Kk]/gi,
  // Up to $180,000
  /up\s+to\s+\$\s*([\d,]+)/gi,
  // $180,000/yr or $180K/year
  /\$\s*([\d,]+)\s*(?:\/\s*(?:yr|year|annually))/gi,
  // $180K
  /\$\s*([\d.]+)\s*[Kk]/gi
];
function parseAmount(raw) {
  const cleaned = raw.replace(/,/g, "").trim();
  const num = parseFloat(cleaned);
  return num < 1e3 ? num * 1e3 : num;
}
function scanPageForMaxSalary() {
  const bodyText = document.body.innerText;
  let maxSalary = 0;
  let found = false;
  for (const pattern of SALARY_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(bodyText)) !== null) {
      const val1 = match[1] ? parseAmount(match[1]) : 0;
      const val2 = match[2] ? parseAmount(match[2]) : 0;
      const max = Math.max(val1, val2);
      if (max > maxSalary) {
        maxSalary = max;
        found = true;
      }
    }
  }
  return found ? maxSalary : null;
}
function formatSalary(amount) {
  return Math.round(amount).toLocaleString("en-US");
}
const isLever = window.location.hostname.includes("lever.co");
const FILL_DELAY = 500;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getCandidateValuesForField(field, profile2) {
  const s = profile2.static;
  switch (field.fieldType) {
    case "firstName":
      return [s.personal.firstName];
    case "lastName":
      return [s.personal.lastName];
    case "fullName":
      return [`${s.personal.firstName} ${s.personal.lastName}`];
    case "middleName":
      return [s.personal.middleName];
    case "preferredName":
      return [s.personal.preferredName || s.personal.firstName];
    case "email":
      return [s.personal.email];
    case "phone":
      return [s.personal.phone];
    case "phoneType":
      return [s.personal.phoneType];
    case "addressLine1":
      return [s.personal.addressLine1];
    case "addressLine2":
      return [s.personal.addressLine2];
    case "location":
      return [
        `${s.personal.city}, ${s.personal.state}`,
        `${s.personal.city}, TX, USA`,
        `${s.personal.city}, ${s.personal.state}, ${s.personal.country}`,
        s.personal.city
      ];
    case "city":
      return [s.personal.city];
    case "state":
      return [s.personal.state];
    case "zip":
      return [s.personal.zip];
    case "country":
      return [s.personal.country];
    case "linkedin":
      return [s.links.linkedin];
    case "github":
      return [s.links.github];
    case "portfolio":
      return [s.links.portfolio];
    case "coverLetter":
      return [s.coverLetter];
    case "workAuthorization":
      return [s.workAuth.authorizedToWork ? "Yes" : "No"];
    case "sponsorship":
      return [s.workAuth.requiresSponsorship ? "Yes" : "No"];
    case "visaType":
      return [s.workAuth.visaType];
    case "citizenship":
      return [s.workAuth.citizenship];
    case "countryOfBirth":
      return [s.workAuth.countryOfBirth];
    case "salary": {
      const maxFromPage = scanPageForMaxSalary();
      return maxFromPage ? [formatSalary(maxFromPage)] : [];
    }
    case "salaryMax": {
      const maxFromPage = scanPageForMaxSalary();
      return maxFromPage ? [formatSalary(maxFromPage)] : [];
    }
    case "salaryMin": {
      const maxFromPage = scanPageForMaxSalary();
      return maxFromPage ? [formatSalary(Math.round(maxFromPage * 0.9))] : [];
    }
    case "currentSalary":
      return [s.compensation.currentSalary];
    case "noticePeriod":
      return [s.compensation.noticePeriod, "Available Immediately", "Immediately"];
    case "startDate":
      return ["Immediately", "Available Immediately"];
    case "availableImmediately":
      return ["Yes", "Immediately", "Available Immediately"];
    case "relocation":
      return [s.preferences.openToRelocation ? "Yes" : "No"];
    case "workPreference":
      return ["On-site or Hybrid"];
    case "employmentType":
      return [s.preferences.preferredEmploymentType];
    case "travel":
      return [s.preferences.willingToTravel ? "Yes" : "No"];
    case "contractToHire":
      return [s.preferences.openToContractToHire ? "Yes" : "No"];
    case "gender":
      return s.demographics.gender.filter(Boolean);
    case "pronouns":
      return s.demographics.pronouns.filter(Boolean);
    case "sexualOrientation":
      return s.demographics.sexualOrientation.filter(Boolean);
    case "lgbtq":
      return [s.demographics.lgbtq ? "Yes" : "No"];
    case "transgender":
      return ["No", "I do not identify as transgender", "I prefer not to answer"];
    case "race":
      return s.demographics.race.filter(Boolean);
    case "veteran":
      return s.demographics.veteranStatus.filter(Boolean);
    case "disability":
      return s.demographics.disability.filter(Boolean);
    case "hispanic":
      return [s.demographics.hispanic ? "Yes" : "No"];
    case "over18":
      return ["Yes", "Over 18", "18+", "25-34", "30-34", "30-39"];
    case "age":
      return [s.demographics.age, "25-34", "30-34", "30-39", "Over 18", "18+"];
    case "custom": {
      const qa = profile2.static.customQA.find((q) => q.id === field.expectedValue);
      return (qa == null ? void 0 : qa.answers) ?? [];
    }
    default:
      return [];
  }
}
async function fillSingleField(field, profile2, resumeBuffer, onUpdate) {
  var _a;
  const el = field.element;
  if (!document.contains(el)) {
    onUpdate(field.id, "skipped");
    return;
  }
  onUpdate(field.id, "filling");
  await sleep(FILL_DELAY);
  try {
    if (field.fieldType === "resumeUpload") {
      if (resumeBuffer && el instanceof HTMLInputElement && el.type === "file") ;
      else {
        onUpdate(field.id, "skipped");
      }
      return;
    }
    const candidates = getCandidateValuesForField(field, profile2);
    const value = candidates[0] ?? "";
    if (field.fieldType === "startDate") {
      const filled = await fillDatePicker(el);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (candidates.length === 0 || !value) {
      onUpdate(field.id, "skipped");
      return;
    }
    const containerCheckboxes = el.querySelectorAll('input[type="checkbox"]');
    if (containerCheckboxes.length >= 2) {
      let anyFilled = false;
      for (const cb of Array.from(containerCheckboxes)) {
        let labelEl = null;
        const optionText = (() => {
          var _a2, _b;
          if (cb.id) {
            const forLabel = document.querySelector(`label[for="${CSS.escape(cb.id)}"]`);
            if (forLabel) {
              labelEl = forLabel;
              return ((_a2 = forLabel.textContent) == null ? void 0 : _a2.trim()) ?? "";
            }
          }
          const wrapLabel = cb.closest("label");
          if (wrapLabel) {
            labelEl = wrapLabel;
            const clone = wrapLabel.cloneNode(true);
            clone.querySelectorAll("input").forEach((i) => i.remove());
            const text = (_b = clone.textContent) == null ? void 0 : _b.trim();
            if (text) return text;
          }
          const val = cb.getAttribute("value") ?? "";
          if (val) return val;
          return cb.getAttribute("name") ?? "";
        })().toLowerCase().trim();
        if (!optionText) continue;
        const isMatch = candidates.some((c) => c.toLowerCase().trim() === optionText);
        if (isMatch && !cb.checked) {
          let checked = false;
          if (labelEl) labelEl.click();
          else cb.click();
          checked = cb.checked;
          if (!checked) {
            const nativeSetter = (_a = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked")) == null ? void 0 : _a.set;
            if (nativeSetter) nativeSetter.call(cb, true);
            else cb.checked = true;
            checked = triggerReactHandler(cb, "change", true);
          }
          if (!checked && !cb.checked) {
            if (labelEl) triggerReactHandler(labelEl, "click");
          }
          anyFilled = true;
        }
      }
      onUpdate(field.id, anyFilled ? "filled" : "skipped");
      return;
    }
    if (el instanceof HTMLInputElement && el.type === "checkbox") {
      const shouldCheck = candidates.some((candidate) => {
        const lower = candidate.toLowerCase();
        return lower === "yes" || lower === "true";
      });
      fillCheckbox(el, shouldCheck);
      onUpdate(field.id, "filled");
      return;
    }
    if (el.querySelectorAll("button").length >= 2) {
      const filled = fillButtonGroup(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (el.getAttribute("role") === "checkbox") {
      const shouldCheck = candidates.some((candidate) => {
        const lower = candidate.toLowerCase();
        return lower === "yes" || lower === "true";
      });
      const filled = fillAriaCheckbox(el, shouldCheck);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    const ghControl = el.classList.contains("select__control") ? el : el.closest(".select__control") ?? (el.querySelector(".select__value-container") ? el : null);
    if (ghControl) {
      const filled = await fillGreenhouseSelect(ghControl, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (el instanceof HTMLSelectElement) {
      const filled = fillSelect(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    const DEMOGRAPHIC_TYPES = /* @__PURE__ */ new Set([
      "gender",
      "race",
      "veteran",
      "disability",
      "pronouns",
      "sexualOrientation",
      "lgbtq",
      "transgender",
      "hispanic",
      "over18",
      "age",
      "workAuthorization",
      "sponsorship",
      "relocation",
      "employmentType",
      "visaType"
    ]);
    if (DEMOGRAPHIC_TYPES.has(field.fieldType) && el.getAttribute("role") === "combobox") {
      const filled = await fillClickDropdown(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (isLever && field.fieldType === "location") {
      const filled = await fillLeverLocation(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (el.getAttribute("role") === "combobox" || el.getAttribute("aria-autocomplete") === "list" || field.fieldType === "location" && el instanceof HTMLInputElement) {
      const filled = await fillAriaCombobox(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (el instanceof HTMLInputElement && el.type === "radio") {
      const filled = fillRadioByName(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (el.querySelector('input[type="radio"]')) {
      const filled = fillRadio(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (el.getAttribute("role") === "radio") {
      const filled = fillAriaRadio(el, candidates);
      onUpdate(field.id, filled ? "filled" : "skipped");
      return;
    }
    if (el.getAttribute("contenteditable") === "true") {
      fillContentEditable(el, value);
      onUpdate(field.id, "filled");
      return;
    }
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (field.fieldType === "custom" && el instanceof HTMLInputElement) {
        const filled = await fillAriaCombobox(el, candidates);
        if (!filled) fillText(el, value);
        onUpdate(field.id, "filled");
        return;
      }
      if (isLever && el instanceof HTMLInputElement) {
        await fillLeverText(el, value);
      } else {
        fillText(el, value);
      }
      onUpdate(field.id, "filled");
      return;
    }
    onUpdate(field.id, "skipped");
  } catch (err) {
    console.warn("[ApplyDash] Failed to fill field:", field.label, err);
    onUpdate(field.id, "skipped");
  }
}
async function fillFields(fields, profile2, resumeBuffer, onUpdate, isCancelled = () => false) {
  for (const field of fields) {
    if (isCancelled()) break;
    if (field.status === "filled") continue;
    await fillSingleField(field, profile2, resumeBuffer, onUpdate);
  }
}
const STYLES = "/* The host element is a zero-size fixed anchor so children's position:fixed\n   is always relative to the viewport, even on pages with CSS contain/transform. */\n:host {\n  all: initial;\n  position: fixed !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n  z-index: 2147483647 !important;\n  pointer-events: none !important;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;\n}\n\n#applydash-root {\n  position: fixed;\n  top: 0; right: 0; bottom: 0;\n  width: 0;\n  z-index: 2147483647;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n}\n\n#applydash-tab {\n  position: fixed;\n  right: 0;\n  top: 120px;\n  width: 36px;\n  height: 36px;\n  background: #059669;\n  border-radius: 6px 0 0 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: -2px 2px 8px rgba(0,0,0,0.35);\n  z-index: 2147483647;\n  pointer-events: auto;\n  transition: background 0.15s;\n  border: none;\n  outline: none;\n}\n#applydash-tab:hover { background: #10b981; }\n#applydash-tab svg { pointer-events: none; }\n\n#applydash-panel {\n  position: fixed;\n  right: -240px;\n  top: 80px;\n  width: 230px;\n  height: 500px;\n  background: rgba(17, 24, 39, 0.97);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid rgba(75, 85, 99, 0.5);\n  border-right: none;\n  border-radius: 10px 0 0 10px;\n  display: flex;\n  flex-direction: column;\n  z-index: 2147483647;\n  pointer-events: auto;\n  transition: right 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: -4px 4px 20px rgba(0,0,0,0.45);\n}\n#applydash-panel.ad-open { right: 0; }\n\n/* ── Header ── */\n.ad-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 9px 12px;\n  border-bottom: 1px solid rgba(75, 85, 99, 0.4);\n  flex-shrink: 0;\n}\n.ad-header-left {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.ad-title {\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n}\n.ad-close-btn {\n  background: none;\n  border: none;\n  color: #9ca3af;\n  cursor: pointer;\n  font-size: 18px;\n  line-height: 1;\n  padding: 1px 5px;\n  border-radius: 4px;\n  transition: color 0.15s, background 0.15s;\n}\n.ad-close-btn:hover { color: #ffffff; background: rgba(75,85,99,0.4); }\n\n/* ── Autofill button — pinned just below header ── */\n.ad-autofill-wrap {\n  padding: 8px 10px;\n  border-top: 1px solid rgba(75, 85, 99, 0.3);\n  flex-shrink: 0;\n}\n.ad-btn-row {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.ad-autofill-btn {\n  flex: 1;\n  padding: 8px;\n  background: #059669;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.ad-autofill-btn:hover:not(:disabled) { background: #10b981; }\n.ad-autofill-btn:disabled { background: rgba(55,65,81,0.6); color: #6b7280; cursor: not-allowed; }\n.ad-stop-btn {\n  flex-shrink: 0;\n  width: 32px;\n  height: 32px;\n  background: #dc2626;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s;\n}\n.ad-stop-btn:hover:not(:disabled) { background: #ef4444; }\n.ad-stop-btn:disabled { background: rgba(55,65,81,0.6); color: #6b7280; cursor: not-allowed; }\n\n.ad-status-text {\n  color: #6b7280;\n  font-size: 10px;\n  text-align: center;\n  margin-top: 4px;\n}\n\n/* ── Fields list — scrollable ── */\n.ad-fields {\n  flex: 1;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  min-height: 0;\n}\n.ad-fields::-webkit-scrollbar { width: 6px; }\n.ad-fields::-webkit-scrollbar-track { background: rgba(55, 65, 81, 0.3); border-radius: 3px; }\n.ad-fields::-webkit-scrollbar-thumb { background: #6b7280; border-radius: 3px; }\n.ad-fields::-webkit-scrollbar-thumb:hover { background: #9ca3af; }\n\n.ad-empty {\n  padding: 24px 12px;\n  text-align: center;\n  color: #6b7280;\n  font-size: 11px;\n  line-height: 1.6;\n}\n.ad-empty strong { display: block; color: #9ca3af; margin-bottom: 4px; }\n\n.ad-field-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 7px 10px;\n  border-bottom: 1px solid rgba(55, 65, 81, 0.4);\n  transition: background 0.1s;\n  cursor: pointer;\n}\n.ad-field-row:hover { background: rgba(55, 65, 81, 0.4); }\n.ad-field-row:hover .ad-field-fill-btn { opacity: 1; }\n\n.ad-field-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  background: #4b5563;\n  transition: background 0.3s;\n}\n.ad-field-dot.filling { background: #f59e0b; }\n.ad-field-dot.filled  { background: #10b981; }\n.ad-field-dot.skipped { background: #ef4444; }\n\n.ad-field-info { flex: 1; min-width: 0; }\n.ad-field-label {\n  color: #f3f4f6;\n  font-size: 11px;\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.ad-field-type {\n  color: #6b7280;\n  font-size: 10px;\n}\n.ad-field-value {\n  color: #10b981;\n  font-size: 10px;\n  max-width: 60px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: right;\n  flex-shrink: 0;\n}\n\n.ad-field-fill-btn {\n  flex-shrink: 0;\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  border: 1px solid rgba(16, 185, 129, 0.4);\n  background: rgba(16, 185, 129, 0.1);\n  color: #10b981;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.15s, background 0.15s;\n  padding: 0;\n}\n.ad-field-fill-btn:hover { background: rgba(16, 185, 129, 0.25); }\n\n/* ── Close dropdown menu ── */\n.ad-close-menu {\n  position: absolute;\n  right: 8px;\n  top: 32px;\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 8px;\n  overflow: hidden;\n  z-index: 10;\n  min-width: 170px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.4);\n}\n.ad-close-menu button {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 9px 12px;\n  background: none;\n  border: none;\n  color: #d1d5db;\n  font-size: 11px;\n  cursor: pointer;\n  transition: background 0.1s, color 0.1s;\n}\n.ad-close-menu button:hover { background: #374151; color: #ffffff; }\n";
let profile = null;
let detectedFields = [];
let isAutofilling = false;
let stopRequested = false;
let panelOpen = false;
let fieldsEl = null;
let footerStatusEl = null;
let autofillBtn = null;
let stopBtn = null;
let closeMenuEl = null;
let detectionTimer = 0;
function getPreview(field) {
  if (!profile) return "";
  const s = profile.static;
  switch (field.fieldType) {
    case "firstName":
      return s.personal.firstName;
    case "lastName":
      return s.personal.lastName;
    case "fullName":
      return `${s.personal.firstName} ${s.personal.lastName}`;
    case "middleName":
      return s.personal.middleName || "—";
    case "preferredName":
      return s.personal.preferredName || s.personal.firstName;
    case "email":
      return s.personal.email;
    case "phone":
      return s.personal.phone;
    case "addressLine1":
      return s.personal.addressLine1;
    case "addressLine2":
      return s.personal.addressLine2;
    case "city":
      return s.personal.city;
    case "state":
      return s.personal.state;
    case "zip":
      return s.personal.zip;
    case "country":
      return s.personal.country;
    case "location":
      return `${s.personal.city}, ${s.personal.state}`;
    case "linkedin":
      return s.links.linkedin;
    case "github":
      return s.links.github;
    case "portfolio":
      return s.links.portfolio;
    case "workAuthorization":
      return s.workAuth.authorizedToWork ? "Yes" : "No";
    case "sponsorship":
      return s.workAuth.requiresSponsorship ? "Yes" : "No";
    case "visaType":
      return s.workAuth.visaType;
    case "citizenship":
      return s.workAuth.citizenship;
    case "countryOfBirth":
      return s.workAuth.countryOfBirth;
    case "resumeUpload":
      return "PDF";
    case "coverLetter":
      return "Cover letter";
    case "salary":
      return "Expected salary";
    case "noticePeriod":
      return s.compensation.noticePeriod;
    case "startDate":
      return "Today";
    case "relocation":
      return s.preferences.openToRelocation ? "Yes" : "No";
    case "employmentType":
      return s.preferences.preferredEmploymentType;
    case "gender":
      return s.demographics.gender[0] ?? "";
    case "pronouns":
      return s.demographics.pronouns[0] ?? "";
    case "race":
      return s.demographics.race[0] ?? "";
    case "veteran":
      return s.demographics.veteranStatus[0] ?? "";
    case "disability":
      return s.demographics.disability[0] ?? "";
    case "sexualOrientation":
      return s.demographics.sexualOrientation[0] ?? "";
    default:
      return "";
  }
}
function renderFields() {
  if (!fieldsEl) return;
  fieldsEl.innerHTML = "";
  if (detectedFields.length === 0) {
    fieldsEl.innerHTML = `<div class="ad-empty"><strong>No fields detected</strong>Open a job application form and click Autofill.</div>`;
    if (autofillBtn) {
      autofillBtn.disabled = true;
      autofillBtn.textContent = "No fields detected";
    }
    if (footerStatusEl) footerStatusEl.textContent = "";
    return;
  }
  const filled = detectedFields.filter((f) => f.status === "filled").length;
  if (autofillBtn) {
    autofillBtn.disabled = isAutofilling;
    autofillBtn.textContent = isAutofilling ? "Filling…" : `Autofill All  (${detectedFields.length} fields)`;
  }
  if (footerStatusEl) {
    footerStatusEl.textContent = filled > 0 ? `${filled} / ${detectedFields.length} filled` : "";
  }
  for (const field of detectedFields) {
    const row = document.createElement("div");
    row.className = "ad-field-row";
    row.dataset.fieldId = field.id;
    row.addEventListener("click", () => {
      field.element.scrollIntoView({ behavior: "smooth", block: "center" });
      const prev = field.element.style.outline;
      field.element.style.outline = "2px solid #10b981";
      setTimeout(() => {
        field.element.style.outline = prev;
      }, 1200);
    });
    const dot = document.createElement("div");
    dot.className = `ad-field-dot ${field.status === "pending" ? "" : field.status}`;
    dot.id = `ad-dot-${field.id}`;
    const info = document.createElement("div");
    info.className = "ad-field-info";
    info.innerHTML = `
      <div class="ad-field-label">${escHtml(field.label)}</div>
      <div class="ad-field-type">${escHtml(field.fieldType)}</div>
    `;
    const val = document.createElement("div");
    val.className = "ad-field-value";
    val.textContent = getPreview(field);
    const fillBtn = document.createElement("button");
    fillBtn.className = "ad-field-fill-btn";
    fillBtn.title = "Fill this field";
    fillBtn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    fillBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!profile || isAutofilling) return;
      isAutofilling = true;
      await fillFields([field], profile, null, (id, status) => updateFieldDot(id, status));
      isAutofilling = false;
    });
    row.appendChild(dot);
    row.appendChild(info);
    row.appendChild(val);
    row.appendChild(fillBtn);
    fieldsEl.appendChild(row);
  }
}
function updateFieldDot(fieldId, status) {
  const dot = shadowRoot == null ? void 0 : shadowRoot.getElementById(`ad-dot-${fieldId}`);
  if (dot) {
    dot.className = `ad-field-dot ${status === "pending" ? "" : status}`;
  }
  const field = detectedFields.find((f) => f.id === fieldId);
  if (field) field.status = status;
  const filled = detectedFields.filter((f) => f.status === "filled").length;
  if (footerStatusEl) {
    footerStatusEl.textContent = filled > 0 ? `${filled} / ${detectedFields.length} filled` : "";
  }
}
function runDetection() {
  if (isAutofilling || !profile) return;
  const fields = detectFields(profile.static.customQA);
  const prevStatus = new Map(detectedFields.map((f) => [`${f.fieldType}::${f.label}`, f.status]));
  for (const f of fields) {
    const key = `${f.fieldType}::${f.label}`;
    if (prevStatus.has(key)) f.status = prevStatus.get(key);
  }
  detectedFields = fields;
  renderFields();
}
async function handleAutofill() {
  if (!profile || isAutofilling || detectedFields.length === 0) return;
  isAutofilling = true;
  stopRequested = false;
  if (autofillBtn) {
    autofillBtn.disabled = true;
    autofillBtn.textContent = "Filling…";
  }
  if (stopBtn) {
    stopBtn.style.display = "inline-flex";
  }
  await fillFields(
    detectedFields,
    profile,
    null,
    (fieldId, status) => updateFieldDot(fieldId, status),
    () => stopRequested
  );
  isAutofilling = false;
  stopRequested = false;
  if (autofillBtn) {
    autofillBtn.disabled = false;
    autofillBtn.textContent = `Autofill All  (${detectedFields.length} fields)`;
  }
  if (stopBtn) {
    stopBtn.style.display = "none";
    stopBtn.disabled = false;
    stopBtn.textContent = "■";
  }
  setTimeout(runDetection, 400);
}
function handleStop() {
  stopRequested = true;
  if (stopBtn) {
    stopBtn.disabled = true;
    stopBtn.textContent = "Stopping…";
  }
}
function openPanel() {
  var _a;
  (_a = shadowRoot == null ? void 0 : shadowRoot.getElementById("applydash-panel")) == null ? void 0 : _a.classList.add("ad-open");
  panelOpen = true;
  runDetection();
}
function closePanel() {
  var _a;
  (_a = shadowRoot == null ? void 0 : shadowRoot.getElementById("applydash-panel")) == null ? void 0 : _a.classList.remove("ad-open");
  panelOpen = false;
  hideCloseMenu();
}
function togglePanel() {
  if (panelOpen) closePanel();
  else openPanel();
}
function showCloseMenu() {
  if (closeMenuEl) {
    closeMenuEl.style.display = "block";
    return;
  }
  const header = shadowRoot == null ? void 0 : shadowRoot.querySelector(".ad-header");
  if (!header) return;
  closeMenuEl = document.createElement("div");
  closeMenuEl.className = "ad-close-menu";
  const items = [
    { label: "Hide until next visit", action: () => {
      closePanel();
      sessionStorage.setItem("applydash_hidden", "1");
    } },
    { label: "Disable on this domain", action: async () => {
      var _a;
      const prefs = await getDisabledPrefs();
      prefs.domains = [.../* @__PURE__ */ new Set([...prefs.domains, window.location.hostname])];
      await saveDisabledPrefs(prefs);
      (_a = document.getElementById("applydash-root")) == null ? void 0 : _a.remove();
    } },
    { label: "Disable on all pages", action: async () => {
      var _a;
      await saveDisabledPrefs({ allPages: true, domains: [] });
      (_a = document.getElementById("applydash-root")) == null ? void 0 : _a.remove();
    } }
  ];
  for (const item of items) {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      item.action();
    });
    closeMenuEl.appendChild(btn);
  }
  header.style.position = "relative";
  header.appendChild(closeMenuEl);
}
function hideCloseMenu() {
  if (closeMenuEl) {
    closeMenuEl.style.display = "none";
  }
}
let shadowRoot = null;
function buildPanel() {
  const host = document.createElement("div");
  host.id = "applydash-root";
  host.style.cssText = "all:initial;position:fixed!important;top:0!important;left:0!important;width:0!important;height:0!important;z-index:2147483647!important;pointer-events:none!important;";
  document.body.appendChild(host);
  shadowRoot = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = STYLES;
  shadowRoot.appendChild(style);
  const tab = document.createElement("button");
  tab.id = "applydash-tab";
  tab.title = "ApplyDash";
  tab.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L2 19h20L12 3z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    <path d="M7.5 14h9" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
  tab.addEventListener("click", togglePanel);
  shadowRoot.appendChild(tab);
  const panel = document.createElement("div");
  panel.id = "applydash-panel";
  const header = document.createElement("div");
  header.className = "ad-header";
  const headerLeft = document.createElement("div");
  headerLeft.className = "ad-header-left";
  headerLeft.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 19h20L12 3z" stroke="#10b981" stroke-width="2" stroke-linejoin="round"/>
      <path d="M7.5 14h9" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span class="ad-title">ApplyDash</span>
  `;
  const closeBtn = document.createElement("button");
  closeBtn.className = "ad-close-btn";
  closeBtn.textContent = "×";
  closeBtn.title = "Close options";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (closeMenuEl && closeMenuEl.style.display !== "none") hideCloseMenu();
    else showCloseMenu();
  });
  header.appendChild(headerLeft);
  header.appendChild(closeBtn);
  panel.appendChild(header);
  fieldsEl = document.createElement("div");
  fieldsEl.className = "ad-fields";
  panel.appendChild(fieldsEl);
  const autofillWrap = document.createElement("div");
  autofillWrap.className = "ad-autofill-wrap";
  footerStatusEl = document.createElement("div");
  footerStatusEl.className = "ad-status-text";
  const btnRow = document.createElement("div");
  btnRow.className = "ad-btn-row";
  autofillBtn = document.createElement("button");
  autofillBtn.className = "ad-autofill-btn";
  autofillBtn.textContent = "Autofill All";
  autofillBtn.disabled = true;
  autofillBtn.addEventListener("click", handleAutofill);
  stopBtn = document.createElement("button");
  stopBtn.className = "ad-stop-btn";
  stopBtn.textContent = "■";
  stopBtn.title = "Stop autofill";
  stopBtn.style.display = "none";
  stopBtn.addEventListener("click", handleStop);
  btnRow.appendChild(autofillBtn);
  btnRow.appendChild(stopBtn);
  autofillWrap.appendChild(footerStatusEl);
  autofillWrap.appendChild(btnRow);
  panel.appendChild(autofillWrap);
  shadowRoot.appendChild(panel);
  shadowRoot.addEventListener("click", (e) => {
    if (closeMenuEl && closeMenuEl.style.display !== "none") {
      if (!closeMenuEl.contains(e.target)) hideCloseMenu();
    }
  });
}
function startObserver() {
  const obs = new MutationObserver(() => {
    clearTimeout(detectionTimer);
    detectionTimer = window.setTimeout(runDetection, 800);
  });
  obs.observe(document.body, { childList: true });
  const rootObs = new MutationObserver(() => {
    if (document.body) obs.observe(document.body, { childList: true });
    clearTimeout(detectionTimer);
    detectionTimer = window.setTimeout(runDetection, 800);
  });
  rootObs.observe(document.documentElement, { childList: true });
}
function escHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
async function initPanel() {
  buildPanel();
  startObserver();
  profile = await getProfile();
  const jobBoardPatterns = [
    "greenhouse.io",
    "lever.co",
    "ashbyhq.com",
    "linkedin.com/jobs",
    "workday.com",
    "myworkdayjobs.com",
    "icims.com",
    "smartrecruiters.com",
    "jobvite.com",
    "bamboohr.com",
    "taleo.net",
    "recruitee.com"
  ];
  const isJobBoard = jobBoardPatterns.some((p) => window.location.href.includes(p));
  const wasHidden = sessionStorage.getItem("applydash_hidden") === "1";
  if (isJobBoard && !wasHidden) openPanel();
  else renderFields();
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "TOGGLE_PANEL") togglePanel();
  });
}
async function main() {
  if (document.getElementById("applydash-root")) return;
  const prefs = await getDisabledPrefs();
  if (prefs.allPages) return;
  if (prefs.domains.includes(window.location.hostname)) return;
  initPanel();
}
main();
//# sourceMappingURL=index.ts-BEQvuZM2.js.map
