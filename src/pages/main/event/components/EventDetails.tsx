import { Calendar, MapPin } from 'lucide-react'

export default function EventDetails() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Réveillon WA 2025</h1>
      <div className="flex items-center space-x-2 text-gray-600">
        <Calendar className="h-5 w-5" />
        <span>Domingo, 31 de Dezembro de 2024 • 22:00</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <MapPin className="h-5 w-5" />
        <span>Wetn Wild - Rod. dos Bandeirantes, km 72 - Itupeva - SP</span>
      </div>
      <p className="text-gray-700">
        Prepare-se para a festa de Réveillon mais emocionante de 2025! O Wetn
        Wild, o maior parque aquático da América Latina, será o cenário perfeito
        para uma celebração inesquecível.
      </p>
    </div>
  )
}
