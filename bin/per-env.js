#!/usr/bin/env node
const env = require("../lib/env");
const process = require("../lib/process");
const spawnSync = require("child_process").spawnSync;

if (!env.NODE_ENV) {
  env.NODE_ENV = "development";
}

if (!env.npm_command) {
  env.npm_command = "run";
}

let command = env.npm_execpath;
if (!command) {
  try {
    let which = require("which");
    command = which.sync("npm"); // get full path to npm command
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (!env.npm_lifecycle_event) {
  console.error(
    "process.env.npm_lifecycle_event is not defined. Probably you are using a non-npm compatible package manager. per-env is not supported in this case."
  );
  process.exit(1);
}

const script = [
  env.npm_lifecycle_event, // e.g. "start"
  env.NODE_ENV, // e.g. "development"
].join(":"); // e.g. "start:development"

const args = [
  env.npm_command, // e.g. "run"
  script,
].concat(
  // Extra arguments after "per-env"
  process.argv.slice(2)
);

const options = {
  cwd: process.cwd(),
  env: env,
  stdio: "inherit",
};

const result = spawnSync(command, args, options);

process.exit(result.status);
