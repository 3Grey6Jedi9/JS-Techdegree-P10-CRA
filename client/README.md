# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


*** ADITIONAL COMMENTS 

A) I am using Axios to handle the different API request. 

B) Since the App stores the hashed password of each user and I haven't implemented a token system to handle that sensible
data, once the user signs in  the App, the user will need to re-enter the password each time an API request is made. 

