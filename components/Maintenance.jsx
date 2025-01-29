function Maintenance() {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-dvh w-dvh bg-slate-100">
          <div className="text-center p-6">
            <h1 className="mt-4 text-3xl font-bold text-natural-500 tracking-wide">Maintenance Mode</h1>
            <p className="mt-2 text-gray-400 text-sm">
              Our website is currently undergoing scheduled maintenance.
              <br />
              We should be back shortly. Thank you for your patience.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

export default Maintenance;
