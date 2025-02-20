
const Settings = () => {
  return (
    <div className="settings p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Store Information */}
        <section className="store-information bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Store Information</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Store Name</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Enter store name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Store Logo</label>
              <input type="file" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact Email</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="Enter contact email" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </form>
        </section>

        {/* Payment Settings */}
        <section className="payment-settings bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Settings</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Enable PayPal</label>
              <input type="checkbox" className="mr-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Enable Stripe</label>
              <input type="checkbox" className="mr-2" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </form>
        </section>

        {/* Shipping Settings */}
        <section className="shipping-settings bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Shipping Settings</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Shipping Zones</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Enter shipping zones" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Shipping Rates</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Enter shipping rates" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Settings;