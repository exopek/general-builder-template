# Create Pull Request

**Task**: Create a new Pull Request for the current changes: #$ARGUMENTS

Expected format: `[feature/fix/refactor]/[short-description] [PR title]`

Example: `fix/cookie-banner Fix cookie consent banner not displaying`

---

## 🎯 Pull Request Workflow

### IMPORTANT: Always Create New Branch

**NEVER** commit directly to existing branches or add commits to existing PRs.
**ALWAYS** create a new branch from `main` for each separate PR.

---

## 📋 Step-by-Step Process

### Step 1: Checkout and Update Main Branch

```bash
git checkout main
git pull origin main
```

**Purpose**: Ensure you're starting from the latest main branch

### Step 2: Create New Feature Branch

```bash
git checkout -b [branch-name]
```

**Branch Naming Convention:**
- `fix/[description]` - Bug fixes (e.g., `fix/cookie-banner`)
- `feat/[description]` - New features (e.g., `feat/user-dashboard`)
- `refactor/[description]` - Code refactoring (e.g., `refactor/design-tokens`)
- `docs/[description]` - Documentation updates (e.g., `docs/api-guide`)
- `chore/[description]` - Maintenance tasks (e.g., `chore/deps-update`)

**Examples:**
- `fix/header-button-visibility`
- `feat/cookie-consent-banner`
- `refactor/container-padding`

### Step 3: Stage and Commit Changes

```bash
git add [files]
git commit -m "$(cat <<'EOF'
[type]: [Short descriptive title]

- [Change 1]
- [Change 2]
- [Change 3]

[Optional: Additional context or explanation]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Commit Message Guidelines:**

**Type Prefixes:**
- `fix:` - Bug fixes
- `feat:` - New features
- `refactor:` - Code refactoring (no functional changes)
- `docs:` - Documentation only
- `style:` - Code style/formatting
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Title Rules:**
- Start with lowercase
- No period at the end
- Max 72 characters
- Imperative mood (e.g., "fix bug" not "fixed bug")

**Body Format:**
- Bullet points for multiple changes
- Explain WHY, not just WHAT
- Reference issues if applicable

**Examples:**

```
fix: cookie consent banner not displaying

- Rename BaseConsentBanner to ConsentBanner in default layout
- Fixes component resolution error

The component was incorrectly named causing Vue to fail
resolving it during auto-import.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
feat: add design token system

- Implement CSS variables in global.css
- Create utility classes for colors and spacing
- Update Button component to use tokens

This establishes a centralized design system that makes
theming and consistency easier to maintain.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Step 4: Push Branch to Remote

```bash
git push -u origin [branch-name]
```

**Purpose**: Upload your branch to GitHub

### Step 5: Create Pull Request

```bash
gh pr create --title "[PR Title]" --body "$(cat <<'EOF'
## Problem
[Brief description of the issue being solved]

## Solution
[What changes were made to solve it]

- ✅ Change 1
- ✅ Change 2
- ✅ Change 3

## Testing
- [x] Tested on desktop
- [x] Tested on mobile
- [x] No console errors
- [x] All functionality working

## Related Files
- `path/to/file1.vue` - [What was changed]
- `path/to/file2.ts` - [What was changed]

## Screenshots (if applicable)
[Add screenshots showing before/after or new functionality]

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)" --base main
```

**PR Description Guidelines:**

**Problem Section:**
- What bug/issue existed?
- What feature was missing?
- What needed improvement?

**Solution Section:**
- What specific changes were made?
- Use checkmarks (✅) for completed items
- Be concise but complete

**Testing Section:**
- Checklist of what was tested
- Use `[x]` for completed checks
- Include relevant test scenarios

**Related Files:**
- List key files changed
- Brief explanation of changes
- Helps reviewers focus

---

## 📝 PR Template Examples

### Example 1: Bug Fix

```markdown
## Problem
The cookie consent banner was not showing on the website, violating GDPR compliance requirements.

## Root Cause
The `default.vue` layout referenced `<BaseConsentBanner />` but the actual component is named `ConsentBanner.vue`.

## Solution
- ✅ Changed component name from `BaseConsentBanner` to `ConsentBanner` in `layouts/default.vue`

## Testing
- [x] Cookie banner displays correctly on page load
- [x] Banner shows cookie categories
- [x] All buttons work correctly
- [x] Link to privacy policy present

## Related Files
- `layouts/default.vue` - Updated component reference
- `components/design-system-section-components/ConsentBanner.vue` - The actual component

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### Example 2: New Feature

```markdown
## Overview
Add a new user dashboard with profile management and activity tracking.

## Features Implemented
- ✅ User profile view with editable fields
- ✅ Activity timeline showing recent actions
- ✅ Settings page for preferences
- ✅ Responsive design for mobile/desktop

## Technical Details
- Uses Pinia store for state management
- Implements lazy loading for performance
- All components use design tokens from global.css

## Testing
- [x] Profile updates save correctly
- [x] Activity timeline loads properly
- [x] Settings persist across sessions
- [x] Responsive on all breakpoints
- [x] No console errors

## Related Files
- `pages/dashboard/index.vue` - Main dashboard page
- `stores/user.ts` - User state management
- `components/dashboard/ProfileCard.vue` - Profile component

## Screenshots
![Dashboard Desktop View](url)
![Dashboard Mobile View](url)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### Example 3: Refactoring

```markdown
## Purpose
Refactor the design system to use centralized CSS tokens instead of scattered hardcoded values.

## Changes Made
- ✅ Moved all colors to CSS variables in global.css
- ✅ Updated Button component to use design tokens
- ✅ Created utility classes for consistent styling
- ✅ Removed 200+ duplicate utility classes

## Benefits
- Single source of truth for design values
- Easy theme switching capability
- Consistent styling across components
- Easier maintenance

## Testing
- [x] All existing components still render correctly
- [x] No visual regressions
- [x] Button variants work as expected
- [x] Color utilities apply correctly

## Related Files
- `assets/css/global.css` - Centralized design tokens
- `components/design-system-ui-components/Button.vue` - Uses tokens
- `tailwind.config.js` - Maps tokens to Tailwind

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## ✅ Pre-PR Checklist

Before creating the PR, verify:

### Code Quality
- [ ] All changes follow CLAUDE.md guidelines
- [ ] Design tokens used (no hardcoded values)
- [ ] Code is clean and well-commented
- [ ] No console.log or debug code left
- [ ] TypeScript types are correct

### Functionality
- [ ] Changes work as intended
- [ ] No new bugs introduced
- [ ] Edge cases handled
- [ ] Loading/error states considered

### Testing
- [ ] Tested on desktop (Chrome/Safari/Firefox)
- [ ] Tested on mobile (iOS/Android)
- [ ] No console errors
- [ ] All interactions work

### Documentation
- [ ] CLAUDE.md updated if needed
- [ ] Comments added for complex logic
- [ ] Props/interfaces documented

---

## 🚨 Common Mistakes to Avoid

### Mistake 1: Adding to Existing PRs
```bash
# ❌ WRONG - Adding commits to existing PR
git checkout existing-pr-branch
git commit -m "Additional fix"
git push

# ✅ CORRECT - Create new branch for each fix
git checkout main
git checkout -b fix/new-separate-fix
```

### Mistake 2: Not Starting from Latest Main
```bash
# ❌ WRONG - Creating branch from old main
git checkout -b fix/my-fix

# ✅ CORRECT - Update main first
git checkout main
git pull origin main
git checkout -b fix/my-fix
```

### Mistake 3: Vague Commit Messages
```bash
# ❌ WRONG
git commit -m "fix stuff"
git commit -m "updates"
git commit -m "changes"

# ✅ CORRECT
git commit -m "fix: cookie consent banner not displaying"
git commit -m "feat: add user dashboard with profile management"
git commit -m "refactor: migrate to design token system"
```

### Mistake 4: Missing PR Context
```markdown
# ❌ WRONG - No explanation
## Changes
Fixed the thing

# ✅ CORRECT - Clear context
## Problem
Cookie consent banner was not displaying, violating GDPR.

## Solution
Renamed component from BaseConsentBanner to ConsentBanner.
```

---

## 🔄 Workflow Summary

```
1. git checkout main
2. git pull origin main
3. git checkout -b [type]/[description]
4. [Make changes]
5. git add [files]
6. git commit -m "[detailed message]"
7. git push -u origin [branch-name]
8. gh pr create [with detailed description]
```

---

Now create a Pull Request following this complete workflow! 🚀
