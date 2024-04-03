var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/utils/generate_view_state.ts
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));

// src/update-daily/helpers.ts
var main_branches = ["master", "develop", "devel", "development", "main"];
var branch_types = ["main", "release", "feature", "user", "other"];
var MAX_SLUG_STRING_SIZE = 63;
function slug_cs(envVar) {
  return trailHyphen(replaceAnyNonAlphanumericCharacter(envVar)).substring(0, MAX_SLUG_STRING_SIZE);
}
function slug(envVar) {
  return slug_cs(envVar.toLowerCase());
}
function trailHyphen(envVar) {
  return envVar.replace(RegExp("^-*", "g"), "").replace(RegExp("-*$", "g"), "");
}
function replaceAnyNonAlphanumericCharacter(envVar) {
  return envVar.replace(RegExp("[^a-zA-Z0-9._]", "g"), "-");
}

// src/utils/generate_view_state.ts
var generatedProjectNames = new Map();
var generatedBranchNames = [];
var generatedUsers = [];
var generatedVersions = [];
var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
var digits = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9
];
var chars = [
  ...digits.map((n) => n.toString()),
  ...alphabet,
  "-",
  "/"
];
var view_state = {
  id: Date.now(),
  host_repository: generateRandomString(10, alphabet),
  projects: []
};
function generateRandomString(len, characters) {
  const str = [];
  const charactersLen = characters.length - 1;
  for (let i = 0; i < len; i++) {
    const c = characters[Math.round(Math.random() * charactersLen)];
    str.push(Math.random() > 0.5 ? c.toUpperCase() : c);
  }
  return str.join("");
}
function generateRandomProjectIdentifier(len) {
  const projectName = generateRandomString(len, alphabet).toUpperCase();
  if (generatedProjectNames.has(projectName)) {
    return generateRandomProjectIdentifier(len);
  } else {
    generatedProjectNames.set(projectName, 1);
  }
  return projectName + "-" + generatedProjectNames.get(projectName);
}
function incrementProjectIdentifier(identifier) {
  if (generatedProjectNames.has(identifier)) {
    generatedProjectNames.set(identifier, generatedProjectNames.get(identifier) + 1);
  } else {
    generatedProjectNames.set(identifier, 1);
  }
  return identifier + "-" + generatedProjectNames.get(identifier);
}
function generateRandomUser() {
  const randomUser = generateRandomString(4, alphabet).toLowerCase();
  if (generatedUsers.includes(randomUser)) {
    return generateRandomUser();
  }
  generatedUsers.push(randomUser);
  return randomUser;
}
function generateRandomDate() {
  const startDate = new Date(2012, 0, 1);
  const endDate = new Date();
  const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour}:${minute}`;
}
function generateRandomVersion() {
  const randomVersion = Math.round(Math.random() * 99).toString() + "." + Math.round(Math.random() * 99).toString() + "." + Math.round(Math.random() * 999).toString();
  if (generatedVersions.includes(randomVersion)) {
    return generateRandomVersion();
  }
  generatedVersions.push(randomVersion);
  return randomVersion;
}
function generateBranchName(type) {
  if (type === "main") {
    for (const branch of main_branches) {
      if (!generatedBranchNames.includes(branch)) {
        generatedBranchNames.push(branch);
        return branch;
      }
    }
  }
  if (type === "user" || type === "feature") {
    const projectIdentifiers = Array.from(generatedProjectNames.keys());
    const projectIdentifier = projectIdentifiers.length === 0 ? generateRandomProjectIdentifier(2 + Math.round(Math.random() * 2)) + "-" : incrementProjectIdentifier(projectIdentifiers[Math.round(Math.random() * (projectIdentifiers.length - 1))]);
    const withProjectIdentifier = Math.random() > 0.5 ? projectIdentifier : "";
    if (type === "feature") {
      return "feature/" + withProjectIdentifier + generateRandomString(Math.round(10 + Math.random() * 10), chars).toLowerCase();
    }
    const useExistingUser = Math.random() > 0.5 || generatedUsers.length === 0 ? generateRandomUser() : generatedUsers[Math.round(Math.random() * (generatedUsers.length - 1))];
    return "user/" + useExistingUser + "/" + withProjectIdentifier + generateRandomString(Math.round(10 + Math.random() * 10), chars).toLowerCase();
  }
  if (type === "release") {
    return "release/" + generateRandomVersion();
  }
  return generateRandomString(Math.round(5 + Math.random() * 10), chars);
}
for (let i = 0; i < 5; i++) {
  const branches = {
    main: [],
    user: [],
    release: [],
    feature: [],
    other: []
  };
  for (let k = 0; k < 500; k++) {
    const branchType = branch_types[Math.round(Math.random() * (branch_types.length - 1))];
    const name = generateBranchName(branchType);
    branches[branchType].push({
      name,
      slug: slug(name),
      date: generateRandomDate()
    });
  }
  const project = {
    name: generateRandomString(10, alphabet),
    repository: generateRandomString(10, alphabet),
    branches
  };
  view_state.projects.push(project);
}
var filePath = "./src/daily-client/test/view_state.json";
if (!import_fs.default.existsSync(filePath)) {
  const directory = import_path.default.dirname(filePath);
  import_fs.default.mkdirSync(directory, { recursive: true });
}
import_fs.default.writeFileSync(`./src/daily-client/test/view_state.json`, JSON.stringify(view_state, null, 4));
