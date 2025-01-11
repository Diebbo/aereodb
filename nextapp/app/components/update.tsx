import React from "react";

type UpdateProps = {
  e: string
};

const Update: React.FC<UpdateProps> = ({ e }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Valore di e:</h2>
      <p className="text-gray-700">{e}</p>
    </div>
  );
};

export default Update;