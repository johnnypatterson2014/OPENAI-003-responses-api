'use client';

import { ReactNode } from 'react'

export default function FeskButtonPrimarySubmit({ label }: { label: string }) {

  return (
    <>
      <button type='submit' className="btn btn-sm btn-primary">
        {label}
      </button>

    </>
  );

}