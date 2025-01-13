import React from "react";

export default function Update({ q }: { q: string }) {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Valore di q:</h2>
      <p className="text-gray-700">{q}</p>
    </div>
  );
};
