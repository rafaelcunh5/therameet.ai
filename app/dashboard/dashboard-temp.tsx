export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
      <p className="text-gray-400">Configure seu assistente de IA para WhatsApp</p>
      
      <div className="mt-8">
        <div className="bg-gray-800 rounded-xl p-6 mb-4">
          <h2 className="text-xl font-semibold text-white mb-4">Status do WhatsApp</h2>
          <p className="text-gray-400">Desconectado</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Status do Assistente</h2>
          <p className="text-gray-400">Configurado</p>
        </div>
      </div>
    </div>
  );
}
