import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'

import { formatStringCapitalized } from '../../utils/functions'

import { BlockType, getBlockBySlug } from '../../services/companies/block'

import { getCompanyBySlug, CompanyType } from '../../services/companies'
import { BlockCard } from '../../components/block-card'

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
              <h1 className="mb-2 mt-6 text-center text-3xl font-light ">
                Reserve seu horário na{'  '}
                <span className="font-semibold">
                  {formatStringCapitalized(company?.name ?? '')}
                </span>
              </h1>
              <h3 className="mb-6 text-center text-base font-light  opacity-60">
                Reserve seu horário na{' '}
                <span className="ml-2 mr-2 font-semibold">
                  {formatStringCapitalized(company?.name ?? '')}{' '}
                </span>
                e garanta a diversão com seus amigos.
              </h3>

              {blocks.length === 0 ? (
                <div className="flex h-screen w-full flex-col items-center justify-center  text-center">
                  <p className="text-base opacity-40">
                    Não há quadras disponíveis para reserva.
                  </p>
                </div>
              ) : (
                company &&
                blocks.map((block) => {
                  return (
                    <>
                      <BlockCard
                        block={block}
                        company={company}
                        onClick={() => navigate(`/quadras/${slug}/${block.id}`)}
                      />
                    </>
                  )
                })
              )}
            </>
          ) : (
            <>
              <p className="text-xs  opacity-40">
                Carregando informações da quadra...
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}