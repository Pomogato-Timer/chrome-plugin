//@ts-nocheck
import { useState, useRef } from 'react';

import Clouds from '@src/components/clouds/Clouds';

import MainLayout from './MainLayout';


export default function Finished() {
  return (
    <main className="main">
      <Clouds />
      <MainLayout />
    </main>
  );
}
