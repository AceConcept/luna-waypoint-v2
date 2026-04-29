param(
  [string]$CommitMessage = "Bump stepscreen (polar-sys) from GitHub",
  [switch]$Push
)

$ErrorActionPreference = "Stop"

Write-Host "Fetching latest stepscreen from github:AceConcept/polar-sys#main ..." -ForegroundColor Cyan
npm install "stepscreen@github:AceConcept/polar-sys#main"

Write-Host "Staging package-lock.json if changed..." -ForegroundColor Cyan
git add package-lock.json

$hasChanges = git diff --cached --name-only
if (-not $hasChanges) {
  Write-Host "Lockfile unchanged — already on latest resolved commit." -ForegroundColor Yellow
  exit 0
}

Write-Host "Creating commit: $CommitMessage" -ForegroundColor Cyan
git commit -m "$CommitMessage"

if ($Push) {
  Write-Host "Pushing current branch..." -ForegroundColor Cyan
  git push
} else {
  Write-Host "Done. Run 'git push' when you are ready." -ForegroundColor Green
}
