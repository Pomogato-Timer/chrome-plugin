import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Finished from '@pages/finished/Finished';

function init() {
  const rootContainer = document.querySelector("#root");
  if (!rootContainer) throw new Error("Can't find Finished root element");
  const root = createRoot(rootContainer);
  root.render(<Finished />);
}

init();
