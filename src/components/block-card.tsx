import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import {
  formatStringCapitalized,
  formatCurrency,
  translateSportToPortuguese,
  Sport,
} from '../utils/functions'
import { FileImage } from 'lucide-react'
import { BlockType } from '../services/companies/block'
import { CompanyType } from '../services/companies'
import { Badge } from './ui/badge'

type BlockCardProps = {
  block: BlockType
  company: CompanyType
  onClick?: () => void
}

export function BlockCard({ block, company, onClick }: BlockCardProps) {
  return (
    <div className="mb-4 flex w-full rounded-2xl bg-white shadow-md">
      <div className=" flex w-full max-w-48 items-center justify-center rounded-s-2xl ">
        {block?.imageUrl ? (
          <img
            src={`https://pub-ed847887b3d7415384bbf5488c674561.r2.dev/${block?.imageUrl}`}
            alt="Imagem da quadra"
            className="h-full w-full rounded-s-2xl object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <FileImage />
            <p className="mt-2 from-neutral-300 text-xs font-normal">
              Quadra sem imagem
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col justify-center p-3">
        <div className="flex gap-1">
          {block.sports.length > 0 &&
            block.sports.map((sport) => (
              <Badge key={sport} variant="default">
                {translateSportToPortuguese(sport.toLocaleUpperCase() as Sport)}
              </Badge>
            ))}
        </div>
        <p className="text-base ">{formatStringCapitalized(company?.name)}</p>
        <p className="mb-1 text-xl font-normal ">
          {formatStringCapitalized(block.name)}
        </p>
        <p className="text-xs  opacity-60">
          {formatStringCapitalized(
            company?.companyAddress.length > 0
              ? company?.companyAddress[0].street
              : '',
          )}
          ,{' '}
          {company?.companyAddress.length > 0
            ? company?.companyAddress[0].number
            : ''}
        </p>
        <Separator className="my-2 opacity-30" />

        <Button onClick={onClick}>Agendar Horário</Button>
        <div className="mt-2 w-full text-center">
          <p className="text-xs  opacity-40">
            A partir de R$ {formatCurrency(block.valueForHour)}
          </p>
        </div>
      </div>
    </div>
  )
}
