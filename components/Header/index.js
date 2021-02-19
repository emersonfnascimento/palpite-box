import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <div className="bg-gray-200 p-4 border-b-1">
        <div className="container mx-auto flex justify-center">
          <Link href="/">
            <a className="hover:pointer">
              <img src="/logo_palpitebox.png" alt="PalpiteBox" />
            </a>
          </Link>
        </div>
      </div>
      <div className="bg-gray-300 p-4 shadow-md text-center">
        <Link href="/sobre">
          <a className="px-2 hover:underline hover:pointer">Sobre</a>
        </Link>
        <Link href="/contato">
          <a className="px-2 hover:underline hover:pointer">Contato</a>
        </Link>
        <Link href="/pesquisa">
          <a className="px-2 hover:underline hover:pointer">Pesquisa</a>
        </Link>
      </div>
    </>
  )
}

export default Header
