import Link from "next/link";

const UnAuth: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center text-[#f8f8f8]">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
        Welcome to TodoApp
      </h1>
      <p className="mb-6 max-w-lg text-base sm:text-lg">
        Stay organized and boost your productivity with TodoApp. Manage your
        tasks efficiently and never miss a deadline.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link href="/login">
          <div className="rounded bg-blue-500 px-6 py-2 text-center font-bold text-[#f8f8f8] hover:bg-blue-700 sm:px-4">
            Login
          </div>
        </Link>
        <Link href="/signup">
          <div className="rounded bg-green-500 px-6 py-2 text-center font-bold text-[#f8f8f8] hover:bg-green-700 sm:px-4">
            Sign Up
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UnAuth;
