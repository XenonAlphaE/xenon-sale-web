import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './smoketest/App_TEST';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import store from './store';



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
<React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
