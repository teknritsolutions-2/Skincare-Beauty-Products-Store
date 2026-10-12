# Installation

No build step or package installation is required. Serve the project over HTTP rather than opening files directly:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. Any static host that preserves the directory structure is suitable. Run `node tests/qa.mjs` before deployment.
