import ClientSidebar from "@/components/client/ClientSidebar";

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ClientSidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}