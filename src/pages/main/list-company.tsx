import { SetStateAction, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { FileImage } from 'lucide-react'
import {
  CompanyType,
  fetchAllCompany,
  FetchAllCompanyResponseType,
} from '../../services/companies'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination'
import { Input } from '../../components/ui/input'

export function ListCompany() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [companyInfo, setCompanyInfo] = useState<CompanyType[] | []>()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [search, setSearch] = useState('')

  const getAllCompanies = async (pageNumber: number) => {
    setLoading(true)
    const response: FetchAllCompanyResponseType | boolean =
      await fetchAllCompany({
        page: pageNumber.toString(),
      })

    if (response && response.company.length > 0) {
      setCompanyInfo(response.company)
      setDisabledButton(false)
      setTotalPages(response.totalPages)
    }
    setDisabledButton(true)
    setLoading(false)
  }

  useEffect(() => {
    getAllCompanies(page)
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    const response: FetchAllCompanyResponseType | boolean =
      await fetchAllCompany({
        page: page.toString(),
        nameQuery: search,
      })

    if (response && response.company.length > 0) {
      setCompanyInfo(response.company)
      setDisabledButton(false)
      console.log(disabledButton)
      setTotalPages(response.totalPages)
    }
    setDisabledButton(true)
    setLoading(false)
  }

  return (
    <>
      <Helmet title="Quadras" />

      <div className="flex flex-col items-center px-4">
        <div className="mb-5 flex w-full max-w-2xl flex-col items-center ">
          {!loading ? (
            <>
              <h1 className="mb-2 mt-6 text-center text-3xl font-semibold">
                Reserve seu horário nas melhores quadras do Brasil
              </h1>
              <h3 className="mb-6 text-center text-base font-light opacity-60">
                Com o Firula você consegue reservas seus horários de forma
                rápida e prática nas melhores quadras do Brasil
              </h3>

              {companyInfo?.length === 0 && (
                <div className="flex h-screen items-center justify-center text-center">
                  <h1 className="opacity-75">
                    Nenhuma quadra disponível no momento, tente novamente mais
                    tarde.
                  </h1>
                </div>
              )}

              <div className="mb-5 flex w-full items-center space-x-2">
                <Input
                  id="name"
                  placeholder="Pesquise pelo nome da quadra"
                  input={{
                    maxLength: 50,
                    change: (e: {
                      target: { value: SetStateAction<string> }
                    }) => setSearch(e.target.value),
                    value: search,
                  }}
                />

                <Button type="submit" onClick={handleSearch}>
                  Pesquisar
                </Button>
              </div>

              {companyInfo?.map((company) => (
                <div
                  key={company.id}
                  className="mb-4 flex h-full w-full rounded-2xl bg-white shadow-md"
                >
                  <div className="flex  w-full max-w-48 items-center justify-center rounded-s-2xl ">
                    {company.imageUrl ? (
                      <img
                        src={`https://pub-ed847887b3d7415384bbf5488c674561.r2.dev/${company.imageUrl}`}
                        alt="Imagem da quadra"
                        className="h-full w-full rounded-s-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full  flex-col items-center justify-center ">
                        <FileImage />
                        <p className="mt-2 text-xs font-normal text-neutral-300">
                          Quadra sem imagem
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex w-full flex-col justify-center p-3">
                    <p className="mb-1 text-xl font-semibold">{company.name}</p>
                    <p className="text-xs opacity-60">
                      <span className="font-semibold">Endereço:</span>{' '}
                      {company.companyAddress[0]?.street},{' '}
                      {company.companyAddress[0]?.number},{' '}
                      {company.companyAddress[0]?.neighborhood},{' '}
                      {company.companyAddress[0]?.zipCode}
                    </p>
                    <p className="text-xs opacity-60">
                      <span className="font-semibold">Telefone:</span>{' '}
                      {company.mobilePhone}
                    </p>
                    <Separator className="my-2 opacity-30" />
                    <Button
                      onClick={() => navigate(`/quadras/${company.slug}`)}
                    >
                      Selecionar quadra
                    </Button>
                  </div>
                </div>
              ))}

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <p className="text-xs opacity-40">
              Carregando quadras disponíveis...
            </p>
          )}
        </div>
      </div>
    </>
  )
}
