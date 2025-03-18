import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { ArrowLeft, ChevronRight, FileText, Maximize2 } from 'lucide-react'
import { useState } from 'react'

const terms = [
  {
    id: 'lgpd',
    title: 'LGPD - Firula App',
    embedCode: `<iframe class="scribd_iframe_embed" title="LGPD - Firula App" src="https://www.scribd.com/embeds/779007623/content?start_page=1&view_mode=scroll&access_key=key-LxzA1quIOj0xHj2fSopB" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0" ></iframe> <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;"> <a title="View LGPD - Firula App on Scribd" href="https://www.scribd.com/document/779007623/LGPD-Firula-App#from_embed" style="text-decoration: underline;"> LGPD - Firula App </a> by <a title="View robertnext88's profile on Scribd" href="https://www.scribd.com/user/794424494/robertnext88#from_embed" style="text-decoration: underline;" > robertnext88 </a> </p>`,
    fullUrl: 'https://www.scribd.com/document/779007623/LGPD-Firula-App',
  },
  {
    id: 'terms',
    title: 'Termos e Condições - Firula App',
    // Substitua pelo código de incorporação real
    embedCode: `<iframe class="scribd_iframe_embed" title="Termos e Condições - Firula App" src="https://www.scribd.com/embeds/779007621/content?start_page=1&view_mode=scroll&access_key=key-rFcYoEARY53TpIK8kTqI" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0" ></iframe> <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;"> <a title="View Termos e Condições - Firula App on Scribd" href="https://www.scribd.com/document/779007621/Termos-e-Condicoes-Firula-App#from_embed" style="text-decoration: underline;"> Termos e Condições - Firula App </a> by <a title="View robertnext88's profile on Scribd" href="https://www.scribd.com/user/794424494/robertnext88#from_embed" style="text-decoration: underline;" > robertnext88 </a> </p>`,
    fullUrl:
      'https://www.scribd.com/document/DOCUMENT_ID/Termos-e-Condicoes-Firula-App',
  },
  {
    id: 'cookies',
    title: 'Política de Cookies - Firula App',
    // Substitua pelo código de incorporação real
    embedCode: ` <iframe class="scribd_iframe_embed" title="Politica de Cookies - Firula App" src="https://www.scribd.com/embeds/779007620/content?start_page=1&view_mode=scroll&access_key=key-NFd6y6Qy0jrrMU0pcWq3" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0" ></iframe> <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;"> <a title="View Politica de Cookies - Firula App on Scribd" href="https://www.scribd.com/document/779007620/Politica-de-Cookies-Firula-App#from_embed" style="text-decoration: underline;"> Politica de Cookies - Firula App </a> by <a title="View robertnext88's profile on Scribd" href="https://www.scribd.com/user/794424494/robertnext88#from_embed" style="text-decoration: underline;" > robertnext88 </a> </p> `,
    fullUrl:
      'https://www.scribd.com/document/DOCUMENT_ID/Politica-de-Cookies-Firula-App',
  },
  {
    id: 'privacy',
    title: 'Política de Privacidade - Firula App',
    // Substitua pelo código de incorporação real
    embedCode: ` <iframe class="scribd_iframe_embed" title="Politica de Privacidade - Firula App" src="https://www.scribd.com/embeds/779007619/content?start_page=1&view_mode=scroll&access_key=key-kZCWN4umphMaASp1UBem" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0" ></iframe> <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;"> <a title="View Politica de Privacidade - Firula App on Scribd" href="https://www.scribd.com/document/779007619/Politica-de-Privacidade-Firula-App#from_embed" style="text-decoration: underline;"> Politica de Privacidade - Firula App </a> by <a title="View robertnext88's profile on Scribd" href="https://www.scribd.com/user/794424494/robertnext88#from_embed" style="text-decoration: underline;" > robertnext88 </a> </p> `,
    fullUrl:
      'https://www.scribd.com/document/DOCUMENT_ID/Politica-de-Privacidade-Firula-App',
  },
  {
    id: 'help',
    title: 'Central de Ajuda - Firula App',
    // Substitua pelo código de incorporação real
    embedCode: `<iframe class="scribd_iframe_embed" title="Central de Ajuda - Firula App" src="https://www.scribd.com/embeds/DOCUMENT_ID/content?start_page=1&view_mode=scroll&access_key=YOUR_ACCESS_KEY" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0"></iframe>`,
    fullUrl:
      'https://www.scribd.com/document/DOCUMENT_ID/Central-de-Ajuda-Firula-App',
  },
  {
    id: 'faq',
    title: 'Dúvidas Frequentes - Firula App',
    // Substitua pelo código de incorporação real
    embedCode: ` <iframe class="scribd_iframe_embed" title="Central de Ajuda - Firula App" src="https://www.scribd.com/embeds/779007618/content?start_page=1&view_mode=scroll&access_key=key-kWLiAxClAecwFDXELGg6" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0" ></iframe> <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;"> <a title="View Central de Ajuda - Firula App on Scribd" href="https://www.scribd.com/document/779007618/Central-de-Ajuda-Firula-App#from_embed" style="text-decoration: underline;"> Central de Ajuda - Firula App </a> by <a title="View robertnext88's profile on Scribd" href="https://www.scribd.com/user/794424494/robertnext88#from_embed" style="text-decoration: underline;" > robertnext88 </a> </p> `,
    fullUrl:
      'https://www.scribd.com/document/DOCUMENT_ID/Duvidas-Frequentes-Firula-App',
  },
  {
    id: 'quadra',
    title: 'Termo de Adesão QUADRA Ao FIRULA',
    // Substitua pelo código de incorporação real
    embedCode: ` <iframe class="scribd_iframe_embed" title="Termo de Adesão QUADRA Ao FIRULA - Final 30.08.2024.Docx" src="https://www.scribd.com/embeds/779007613/content?start_page=1&view_mode=scroll&access_key=key-XDlYcrnfboticAQNBb6e" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0" ></iframe> <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;"> <a title="View Termo de Adesão QUADRA Ao FIRULA - Final 30.08.2024.Docx on Scribd" href="https://www.scribd.com/document/779007613/Termo-de-Adesao-QUADRA-Ao-FIRULA-Final-30-08-2024-Docx#from_embed" style="text-decoration: underline;"> Termo de Adesão QUADRA Ao FIRULA - Final 30.08.2024.Docx </a> by <a title="View robertnext88's profile on Scribd" href="https://www.scribd.com/user/794424494/robertnext88#from_embed" style="text-decoration: underline;" > robertnext88 </a> </p> `,
    fullUrl:
      'https://www.scribd.com/document/DOCUMENT_ID/Termo-de-Adesao-QUADRA-Ao-FIRULA',
  },
  {
    id: 'esportista',
    title: 'Termo de Adesão ESPORTISTA Ao FIRULA',
    // Substitua pelo código de incorporação real
    embedCode: ` <iframe class="scribd_iframe_embed" title="Termo de Adesão ESPORTISTA Ao FIRULA - Final 30.08.2024.Docx" src="https://www.scribd.com/embeds/779007612/content?start_page=1&view_mode=scroll&access_key=key-T3bOkcT0RYiFjf4wSUHW" tabindex="0" data-auto-height="true" data-aspect-ratio="0.7080062794348508" scrolling="no" width="100%" height="600" frameborder="0" ></iframe> <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;"> <a title="View Termo de Adesão ESPORTISTA Ao FIRULA - Final 30.08.2024.Docx on Scribd" href="https://www.scribd.com/document/779007612/Termo-de-Adesao-ESPORTISTA-Ao-FIRULA-Final-30-08-2024-Docx#from_embed" style="text-decoration: underline;"> Termo de Adesão ESPORTISTA Ao FIRULA - Final 30.08.2024.Docx </a> by <a title="View robertnext88's profile on Scribd" href="https://www.scribd.com/user/794424494/robertnext88#from_embed" style="text-decoration: underline;" > robertnext88 </a> </p> `,
    fullUrl:
      'https://www.scribd.com/document/779007612/Termo-de-Adesao-ESPORTISTA-Ao-FIRULA-Final-30-08-2024-Docx',
  },
]

export function Term() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)

  const selectedTermData = terms.find((term) => term.id === selectedTerm)

  const handleOpenFullDocument = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mx-auto max-w-4xl">
      {!selectedTerm ? (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Documentos Legais</CardTitle>
            <CardDescription>
              Selecione um documento para visualizar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {terms.map((term) => (
                <li key={term.id}>
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-between py-3 text-left font-normal"
                    onClick={() => setSelectedTerm(term.id)}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>{term.title}</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Separator className="mt-1" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setSelectedTerm(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <CardTitle>{selectedTermData?.title}</CardTitle>
                <CardDescription>Documento legal do Firula App</CardDescription>
              </div>
            </div>
            {selectedTermData?.fullUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() =>
                  handleOpenFullDocument(selectedTermData.fullUrl!)
                }
              >
                <Maximize2 className="h-4 w-4" />
                <span>Ver em tela cheia</span>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div
              className="scribd-container w-full"
              dangerouslySetInnerHTML={{
                __html: selectedTermData?.embedCode || '',
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
