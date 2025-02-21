# Indomito 360 web micro apps

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

To update the settings read more about React + Vite configuration in official documentation

To start this project in a local development server run `npm run dev` in a terminal, to build this project run `npm run build`.

After build is complete, upload the files to the web hosting using cPanel or a tool like Filezilla.

In the source directory you'll find each microapp:
The forms in the `/forms` folder and `pages/calendar-page.tsx` for the Calendar.

When updating any of these microapps, make sure to make build of the corresponding app, rename the Javascript and CSS files from the bundle to `index.js` and `index.css` and upload theme to the corresponding directory in the web hosting.
Eg: After building the calendar component rename the files and upload to the server
`/dist/assets/index-ZnKHlLQW.js` (local) -> `/wp-content/themes/indomito-theme/calendar-component/index.js` (hosting)

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
