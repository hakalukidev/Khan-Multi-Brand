// app/products/page.tsx
'use client';

import { Activity, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🔧' },
    { id: 'scanner', name: 'Diagnostic Scanners', icon: '📱' },
    { id: 'workshop', name: 'Workshop Equipment', icon: '🏭' },
    { id: 'tools', name: 'Hand Tools', icon: '🛠️' },
    { id: 'tester', name: 'Testing Equipment', icon: '⚡' },
  ];

  const products = [
    // Diagnostic Scanners
    { id: 1, name: 'Autel MX808S', category: 'scanner', price: 'Contact for Price', image: '🔧', hot: true, description: 'Professional diagnostic scanner for all car models' },
    { id: 2, name: 'Autel MS906 MAX', category: 'scanner', price: 'Contact for Price', image: '📱', hot: true, description: 'Advanced diagnostic system with ADAS calibration' },
    { id: 3, name: 'Launch X431 Pros V5.0', category: 'scanner', price: 'Contact for Price', image: '📟', hot: true, description: 'Complete diagnostic solution with 2-year free update' },
    { id: 4, name: 'JDia M100 Pro', category: 'scanner', price: 'Contact for Price', image: '📱', hot: false, description: 'Entry-level professional scanner' },
    { id: 5, name: 'JDia M300', category: 'scanner', price: 'Contact for Price', image: '📟', hot: false, description: 'Mid-range diagnostic tool' },
    { id: 6, name: 'MOTO SCAN', category: 'scanner', price: 'Contact for Price', image: '🏍️', hot: false, description: 'Specialized motorcycle diagnostic tool' },
    
    // Workshop Equipment
    { id: 7, name: 'Engine Crane - 2TON', category: 'workshop', price: 'Contact for Price', image: '🏗️', hot: true, description: 'Heavy duty engine crane for workshop use' },
    { id: 8, name: 'Engine Crane - 1TON', category: 'workshop', price: 'Contact for Price', image: '🏗️', hot: false, description: 'Light duty engine crane' },
    { id: 9, name: 'Tyre Changer - LAUNCH', category: 'workshop', price: 'Contact for Price', image: '⚙️', hot: true, description: 'Automatic tyre changing machine' },
    { id: 10, name: 'Car Lift', category: 'workshop', price: 'Contact for Price', image: '🔧', hot: true, description: 'Hydraulic car lift for workshops' },
    { id: 11, name: 'Air Impact Wrench', category: 'workshop', price: 'Contact for Price', image: '💨', hot: true, description: 'Pneumatic impact wrench' },
    { id: 12, name: 'High Pressure Washer Pump', category: 'workshop', price: 'Contact for Price', image: '💧', hot: false, description: 'Industrial pressure washer' },
    
    // Hand Tools
    { id: 13, name: 'Professional Tools Set', category: 'tools', price: 'Contact for Price', image: '🧰', hot: true, description: 'Complete tool set for professionals' },
    { id: 14, name: 'Circuit Tester', category: 'tools', price: 'Contact for Price', image: '⚡', hot: false, description: 'Electrical circuit testing tool' },
    { id: 15, name: 'Injector Cleaner - AUTON', category: 'tools', price: 'Contact for Price', image: '💉', hot: true, description: 'Fuel injector cleaning machine' },
    { id: 16, name: 'Car Creeper', category: 'tools', price: 'Contact for Price', image: '🛞', hot: false, description: 'Mechanics creeper for under-car work' },
    { id: 17, name: 'Mechanical Stethoscope', category: 'tools', price: 'Contact for Price', image: '🩺', hot: true, description: 'Engine noise detection tool' },
    
    // Testing Equipment
    { id: 18, name: 'Engine Oil Tester', category: 'tester', price: 'Contact for Price', image: '🛢️', hot: true, description: 'Engine oil quality tester' },
    { id: 19, name: 'Spark Plug Tester', category: 'tester', price: 'Contact for Price', image: '🔌', hot: true, description: 'Spark plug diagnostic tool' },
    { id: 20, name: 'Brake Oil Tester', category: 'tester', price: 'Contact for Price', image: '🛞', hot: false, description: 'Brake fluid tester' },
    { id: 21, name: 'Automotive Wheel Balancer', category: 'tester', price: 'Contact for Price', image: '⚖️', hot: true, description: 'Wheel balancing machine' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hotProducts = products.filter(p => p.hot);

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl max-w-2xl mx-auto">
            High-quality industrial machinery and automobile equipment for your workshop
          </p>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="sticky top-16 bg-white shadow-md z-40 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hot Sale Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🔥 HOT SALE PRODUCTS</h2>
            <p className="text-gray-600">Most popular items this month</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hotProducts.slice(0, 4).map(product => (
              <div key={product.id} className="group relative bg-white border rounded-lg p-4 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  HOT
                </div>
                <div className="text-6xl text-center py-6">{product.image}</div>
                <h3 className="font-bold text-gray-800 text-center mb-2">{product.name}</h3>
                <p className="text-blue-600 text-center text-sm font-semibold">{product.price}</p>
                <Link href={`/contact?product=${product.name}`}>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Inquiry Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBD Information Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-blue-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">Diagnostic Scan System</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">OBD (On-Board Diagnostics) Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Dynamic management service for vehicle diagnostics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>ECU (Electronic Control Unit) high performance testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Trouble code reading and clearing (e.g., P0420 – Catalytic Converter Issue)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Live data streaming and graphing</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Why Choose Our Diagnostic Tools?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">✅ Accurate fault code reading</li>
                  <li className="flex items-center gap-2">✅ Comprehensive vehicle coverage</li>
                  <li className="flex items-center gap-2">✅ Regular software updates</li>
                  <li className="flex items-center gap-2">✅ User-friendly interface</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">All Products</h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 text-center">
                    <div className="text-7xl">{product.image}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                      {product.hot && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Hot</span>}
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                    <p className="text-blue-600 font-semibold mb-3">{product.price}</p>
                    <Link href={`/contact?product=${product.name}`}>
                      <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        Get Quote
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Professional Equipment?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            We provide high-quality industrial machinery and automobile equipment with warranty and support.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              CONTACT US
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}