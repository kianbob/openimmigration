import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-white text-lg font-bold mb-3">OpenImmigration</h3>
            <p className="text-sm text-gray-400">Exploring U.S. immigration court data with transparency. Built from official DOJ EOIR records.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courts" className="hover:text-white transition-colors">Immigration Courts</Link></li>
              <li><Link href="/nationalities" className="hover:text-white transition-colors">By Nationality</Link></li>
              <li><Link href="/judges" className="hover:text-white transition-colors">Judge Statistics</Link></li>
              <li><Link href="/states" className="hover:text-white transition-colors">By State</Link></li>
              <li><Link href="/charges" className="hover:text-white transition-colors">Charges & Offenses</Link></li>
              <li><Link href="/uscis" className="hover:text-white transition-colors">USCIS Data</Link></li>
              <li><Link href="/representation" className="hover:text-white transition-colors">Representation</Link></li>
              <li><Link href="/bond" className="hover:text-white transition-colors">Bond</Link></li>
              <li><Link href="/children" className="hover:text-white transition-colors">Children</Link></li>
              <li><Link href="/daca" className="hover:text-white transition-colors">DACA Recipients</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Analysis</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/analysis" className="hover:text-white transition-colors">Analysis & Reports</Link></li>
              <li><Link href="/backlog" className="hover:text-white transition-colors">Court Backlog</Link></li>
              <li><Link href="/asylum" className="hover:text-white transition-colors">Asylum Cases</Link></li>
              <li><Link href="/deportation" className="hover:text-white transition-colors">Deportation Statistics</Link></li>
              <li><Link href="/how-immigration-court-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Sister Sites</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.openmedicaid.org" className="hover:text-white transition-colors">OpenMedicaid</a></li>
              <li><a href="https://www.openmedicare.us" className="hover:text-white transition-colors">OpenMedicare</a></li>
              <li><a href="https://www.openfeds.org" className="hover:text-white transition-colors">OpenFeds</a></li>
              <li><a href="https://www.openspending.us" className="hover:text-white transition-colors">OpenSpending</a></li>
              <li><a href="https://www.openlobby.us" className="hover:text-white transition-colors">OpenLobby</a></li>
              <li><a href="https://www.vaccinewatch.org" className="hover:text-white transition-colors">VaccineWatch</a></li>
              <li><a href="https://thedataproject.ai" className="hover:text-white transition-colors">TheDataProject.ai</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>Data sourced from the Department of Justice Executive Office for Immigration Review (EOIR).</p>
          <p className="mt-1">A <a href="https://thedataproject.ai" className="text-gray-400 hover:text-white">TheDataProject.ai</a> platform. Open data, no paywalls.</p>
        </div>
      </div>
    </footer>
  )
}
