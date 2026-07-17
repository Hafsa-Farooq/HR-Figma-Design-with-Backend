import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Split background: left white, right brand blue */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#00A2CA]" />
      </div>
      <div className="absolute inset-0 md:hidden bg-[#00A2CA]" />

      {/* Header — floats, centered, responsive side margins */}
      <header className="relative z-10 mx-6 mt-6 flex h-[72px] items-center justify-between rounded-2xl bg-white px-6 shadow-[0_10px_40px_rgba(182,186,203,0.35)] sm:mx-8 md:mx-10 md:px-8 lg:mx-14 xl:mx-20">
        <div className="relative h-[33px] w-[150px] shrink-0">
          <Image src="/logo.png" alt="anez" fill className="object-contain" priority />
        </div>

        <nav className="hidden items-center gap-4 text-sm text-gray-700 md:flex">
          <a href="#" className="hover:text-[#00A2CA]">About Us</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-[#00A2CA]">Terms and Conditions</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-[#00A2CA]">Privacy Policy</a>
          <select className="rounded border border-gray-300 bg-white px-2 py-1 text-sm">
            <option>English</option>
          </select>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-108px)] items-center justify-center px-4 py-10 md:px-0">
        {/* Left illustration — shorter than card, sits lower */}
        <div className="pointer-events-none absolute bottom-0 left-6 hidden aspect-[309/571] h-[500vh] max-h-[420px] lg:block xl:left-16">
          <Image src="/left-man.png" alt="" fill className="object-contain object-bottom" />
        </div>

        {/* Right illustration — flush against right edge */}
        <div className="pointer-events-none absolute bottom-0 right-0 hidden aspect-[590/976] h-[500vh] max-h-[560px] lg:block">
          <Image src="/right-man.png" alt="" fill className="object-contain object-right-bottom" />
        </div>

        {/* Login card */}
        <div className="relative z-20 w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-xl sm:p-10">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">Login</h1>

          <form className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="company@example.com"
                className="w-full rounded-lg border border-[#00A2CA] px-4 py-3 text-sm text-gray-700 outline-none ring-[#00A2CA]/30 focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="123456789"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none ring-[#00A2CA]/30 focus:ring-2 focus:border-[#00A2CA]"
              />
            </div>

            <a href="#" className="w-fit text-sm font-medium text-[#00A2CA] hover:underline">
              Forgot Your Password?
            </a>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#00A2CA] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0090b3]"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}