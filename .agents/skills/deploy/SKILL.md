---
name: deploy
description: Automation skill for deployment workflows. When the user asks to deploy, publish, or run a deployment pipeline, this skill handles the full deployment process.
---

# Deploy Skill

This skill automates the deployment workflow by running tests, building the production bundle, and pushing to the staging area.

## When to Use This Skill

Activate this skill when the user:
- Asks to "deploy", "publish", or "release"
- Requests to "push to staging" or "deploy to production"
- Needs to run a deployment pipeline
- Says "build and deploy" or similar

## Deployment Workflow

### Step 1: Run All Tests

Before any deployment, run all tests to ensure the code is stable:

```bash
npm test
```

If the project uses a different test command, detect it from package.json:
- `npm run test:unit` - Unit tests
- `npm run test:e2e` - End-to-end tests
- `npm run test:all` - Run all test suites

If tests fail, stop the deployment and report the failures to the user.

### Step 2: Build Production Bundle

Build the production-optimized bundle:

```bash
npm run build
```

Common build commands:
- `npm run build` - Standard build
- `npm run build:prod` - Production build
- `npm run build:production` - Production build alternative

If the build fails, stop the deployment and report the errors.

### Step 3: Push to Staging Area

Push changes to the staging remote:

```bash
git add .
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M')"
git push origin staging
```

If there's no staging branch, create it:

```bash
git push -u origin staging
```

## Detection and Configuration

### Auto-Detect Package Manager

The skill should detect the package manager from the project:
- `package-lock.json` → npm
- `yarn.lock` → yarn
- `pnpm-lock.yaml` → pnpm

Use the appropriate commands based on the detected package manager.

### Test Command Detection

Read from package.json to find the correct test command:
```json
"scripts": {
  "test": "jest",
  "test:unit": "jest --testPathPattern=unit",
  "test:e2e": "playwright test"
}
```

## Error Handling

1. **Tests fail**: Do not proceed with deployment. Report test failures.
2. **Build fails**: Do not proceed with deployment. Report build errors.
3. **Push fails**: Report git errors and suggest solutions.

## Example Response

When deployment completes successfully:

```
✅ Deployment completed successfully!

Steps executed:
1. ✓ All tests passed
2. ✓ Production bundle built
3. ✓ Pushed to staging branch
```

When deployment fails:

```
❌ Deployment failed at step [step name]

[Error details here]

Please fix the issues and try again.
```

## Configuration Options

Users can customize the deployment workflow by adding to their project's AGENTS.md:

```markdown
## Deploy Configuration

- test command: npm run test:all
- build command: npm run build:prod
- staging branch: staging
- auto-detect package manager: true
```