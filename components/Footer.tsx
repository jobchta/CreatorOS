import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-white">LogicLoom</h3>
            <p className="text-sm mt-1">The Creator Business Operating System.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} LogicLoom. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
