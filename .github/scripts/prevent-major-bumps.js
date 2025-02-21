/**
 * DO NOT REMOVE ME UNLESS YOU KNOW WHAT YOU'RE DOING!!
 */

const {execSync} = require("child_process")
const fs = require("fs")

// Fetch the latest changes from the main branch
execSync("git fetch origin master")

const packageJsons = execSync("git ls-files 'packages/*/package.json'")
  .toString()
  .split("\n")
  .filter(Boolean)

// Assert that the package.json files exist
if (packageJsons.length === 0) {
  console.error("Error: No package.json files found.")
  process.exit(1) // Fail the CI
}

for (const packageJson of packageJsons) {
  // Get the current version from package.json
  const newPackageJson = JSON.parse(fs.readFileSync(packageJson, "utf8"))
  const newPackageName = newPackageJson.name
  const newVersion = newPackageJson.version

  // Get the version from the main branch (or latest release)
  let prevPackageJson
  try {
    prevPackageJson = JSON.parse(
      execSync(`git show origin/master:${packageJson}`).toString()
    )
  } catch (error) {
    console.info("Skipping new package", newPackageName)
    continue
  }
  const prevPackageName = prevPackageJson.name
  const prevVersion = prevPackageJson.version

  // Assert that the package names match
  if (newPackageName !== prevPackageName) {
    console.error(
      `Error: Package name mismatch for ${newPackageName} (${prevPackageName} -> ${newPackageName}).`
    )
    process.exit(1) // Fail the CI
  }

  // Extract major, minor, and patch numbers
  const newMajor = parseInt(newVersion.split(".")[0])
  const prevMajor = parseInt(prevVersion.split(".")[0])

  // Check if it's a major version bump
  if (newMajor > prevMajor) {
    console.error(
      `Error: Major version bump detected for ${newPackageName} (${prevVersion} -> ${newVersion}).`
    )
    process.exit(1) // Fail the CI
  }

  console.log(
    `Version bump allowed for ${newPackageName}: ${prevVersion} -> ${newVersion}`
  )
}

process.exit(0) // Allow the CI to pass
