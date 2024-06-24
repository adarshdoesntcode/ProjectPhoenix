import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-1 items-center justify-center text-gray-800  bg-slate-50 ">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-semibold ">Oops! Something went wrong.</h3>

        <div className="mt-4">
          {error && (
            <>
              <p>{error.statusText || error.message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
