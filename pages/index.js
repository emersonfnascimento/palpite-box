import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/PageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
  const { data, error } = useSWR('/api/get-promo', fetcher)

  return (
    <div>
      <PageTitle title="Softcado" />
      <p className="mt-6 text-center">O restaurante Softcado sempre busca por atender melhor seus clientes.</p>
      <p className="text-center">Por isso, estamos abertos a ouvir sua opinião.</p>

      <div className="text-center my-12">
        <Link href="/pesquisa">
          <a className="bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow hover:bg-blue-500">Dar opinião ou sugestão</a>
        </Link>
      </div>
      {!data && <p>Carregando...</p>}
      {!error && data && data.showCoupon &&
        <p className="text-center my-12">
          {data.message}
        </p>
      }

    </div>
  )
}

export default Index;
