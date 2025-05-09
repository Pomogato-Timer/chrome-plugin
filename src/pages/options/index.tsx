//@ts-ignore
import '@pages/options/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Options from '@pages/options/Options';


function init() {
  const rootContainer = document.querySelector("#root");
  if (!rootContainer) throw new Error("Can't find Options root element");
  const root = createRoot(rootContainer);
  root.render(<Options />);
}

init();
