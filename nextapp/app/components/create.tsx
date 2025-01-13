import React from "react";

type CreateProps = {
  q: string
};

const Create: React.FC<CreateProps> = ({ q }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Valore di q:</h2>
      <p className="text-gray-700">{q}</p>
    </div>
  );
};

export default Create;