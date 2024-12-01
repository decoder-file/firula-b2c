import { Calendar, MapPin } from 'lucide-react'
import moment from 'moment'
import React from 'react'

type EventDetailsProps = {
  title: string
  startDate: string
  startTime: string
  location: string
  description: string
}

export default function EventDetails({
  title,
  startDate,
  startTime,
  location,
  description,
}: EventDetailsProps) {
  function formatarDataEHora(startDate: string, startTime: string) {
    // Combina a data e a hora em uma única string
    const dateTimeString = `${startDate.split('T')[0]}T${startTime}:00`

    // Define o idioma para português
    moment.locale('pt-br')

    // Formata a data
    return moment(dateTimeString).format('dddd, DD [de] MMMM [de] YYYY • HH:mm')
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex items-center space-x-2 text-gray-600">
        <Calendar className="h-5 w-5" />
        <span>{formatarDataEHora(startDate, startTime)}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <MapPin className="h-5 w-5" />
        <span>{location}</span>
      </div>
      <p className="text-gray-700">
        {description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  )
}
