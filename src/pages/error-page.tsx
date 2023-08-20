import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-9xl font-serif text-center m-40">Oops!</h1>
      <p className="text-2xl font-mono text-slate-800 ">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg text-slate-700 m-8">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}