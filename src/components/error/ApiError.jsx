function ApiError({ error }) {
  return (
    <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-semibold ">Oops! Something went wrong.</h3>
        <p className="text-sm text-muted-foreground">
          {error.status || `STATUS ${error.originalStatus}`}
        </p>
        <div className="mt-4"> {JSON.stringify(error.data)}</div>
      </div>
    </div>
  );
}

export default ApiError;
