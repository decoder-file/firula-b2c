import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingGif from '../../assets/white-loading.gif'
import BlockNotFound from '../../assets/block-not-found.gif'

import { BlockType, getBlockBySlug } from '../../services/companies/block'

import { getCompanyBySlug, CompanyType } from '../../services/companies'
import { BlockCard } from '../../components/block-card'
import { MapPin, Navigation2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { formatStringCapitalized } from '../../utils/functions'

export function CompanyPage() {
  const navigate = useNavigate()
  const { slug } = useParams()

  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState<CompanyType>()
  const [blocks, setBlocks] = useState<BlockType[]>([])

  const fetchCompanyInfo = async () => {
    const response = await getCompanyBySlug({ slug: slug ?? '' })

    if (response) {
      setCompany(response.company)
      setLoading(false)
    }
  }

  const fetchBlocks = async () => {
    const blocks = await getBlockBySlug({
      slug: slug ?? '',
      isActive: true,
    })

    if (blocks.success && blocks.blocks) setBlocks(blocks.blocks)
  }

  const openGoogleMaps = (endereco: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`
    window.open(url, '_blank')
  }

  const openWhatsApp = (telefone: string, mensagem?: string) => {
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem || '')}`
    window.open(url)
  }

  useEffect(() => {
    fetchBlocks()
    fetchCompanyInfo()
  }, [])

  return (
    <>
      <Helmet title="Info" />

      <div className="flex  w-full flex-col items-center">
        <div className="flex w-full max-w-2xl flex-col items-center">
          {!loading ? (
            <>
              <div className="space-y-6 px-4 py-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">
                    {formatStringCapitalized(company?.name ?? '')}
                  </h1>
                  <p className="text-gray-400">{company?.description}</p>

                  {blocks.length === 0 && (
                    <Button
                      onClick={() =>
                        openWhatsApp(
                          `+55${company?.mobilePhone.replace(/\D/g, '')}`,
                          'Olá! Vim pelo Firula e gostaria de reservar uma quadra!',
                        )
                      }
                    >
                      Reservar quadra
                    </Button>
                  )}
                </div>

                <Card className="w-full">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold">
                        {formatStringCapitalized(company?.name ?? '')}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Futevolei - Beach Tennis - Peteca
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-green-500">★</span>
                      <span>5.0</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-start justify-center gap-2 ">
                  <MapPin className=" h-6 w-6 shrink-0 text-gray-400" />
                  <div className="flex flex-1 items-start justify-between">
                    <span className="text-gray-400">
                      {company?.companyAddress[0].street},{' '}
                      {company?.companyAddress[0].number} -{' '}
                      {company?.companyAddress[0].neighborhood} -{' '}
                      {company?.companyAddress[0].city}
                    </span>
                    <Button
                      variant="ghost"
                      className="gap-2 text-green-500"
                      onClick={() =>
                        openGoogleMaps(`
                        ${company?.companyAddress[0].street},
                        ${company?.companyAddress[0].number} -
                        ${company?.companyAddress[0].neighborhood} -
                          `)
                      }
                    >
                      <Navigation2 className="h-4 w-4" />
                      Ver trajeto
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full justify-center ">
                <div className="w-full gap-4">
                  {blocks.length === 0 ? (
                    <div className="mb-5 flex w-full flex-col items-center  justify-center text-center">
                      <img
                        src={BlockNotFound}
                        alt="Loading..."
                        className="flex w-60"
                      />
                    </div>
                  ) : (
                    company &&
                    blocks.map((block) => {
                      return (
                        <>
                          <BlockCard
                            block={block}
                            company={company}
                            onClick={() =>
                              navigate(`/quadras/${slug}/${block.id}`)
                            }
                          />
                        </>
                      )
                    })
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 flex flex-col items-center justify-center">
                <img src={LoadingGif} alt="Loading..." className="flex w-40" />
                <p className="mt-8 text-center text-base opacity-40">
                  Estamos carregando as melhores quadras para você!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
