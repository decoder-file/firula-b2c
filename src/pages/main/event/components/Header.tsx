import LogoGreen from '../../../../assets/logo-green.png'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <img src={LogoGreen} alt="Logo Firula" className="w-10" />
      </div>
    </header>
  )
}
