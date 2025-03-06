//@ts-nocheck
import { useState, useRef } from 'react';

import MainLayout from './MainLayout';
import Clouds from './components/clouds/Clouds';


export default function Popup() {
  return (
    <main className="main">
      <Clouds />
      <MainLayout/>
    </main>
  );
}
