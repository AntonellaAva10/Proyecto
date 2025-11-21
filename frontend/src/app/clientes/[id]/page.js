"use client";

import React from "react";

export default function ClientId({ params }) {
  return <div>{JSON.stringify(params.id)}</div>;
}
