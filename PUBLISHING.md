# Publishing checklist

## First-time setup

1. Create GitHub repo: `learnj-ai/honkit-plugin-theme-learnj`
2. Push this directory:

   ```bash
   git init
   git add .
   git commit -m "Initial release of honkit-plugin-theme-learnj"
   git branch -M main
   git remote add origin git@github.com:learnj-ai/honkit-plugin-theme-learnj.git
   git push -u origin main
   ```

3. Log in to npm:

   ```bash
   npm login
   ```

4. Verify package contents before publishing:

   ```bash
   npm run build
   npm pack --dry-run
   ```

5. Publish:

   ```bash
   npm publish
   ```

## Subsequent releases

1. Update version in `package.json` (semver)
2. Rebuild and publish:

   ```bash
   npm run build
   npm publish
   ```

3. Tag the release on GitHub:

   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

## Consumer install (after publish)

```bash
npm install honkit-plugin-theme-learnj --save-dev
```

In `book.json`:

```json
{
  "plugins": ["-theme-default", "theme-learnj"]
}
```
