import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Nota: 0,
  })
  const notas = [0, 1, 2, 3, 4, 5]
  const [retorno, setRetorno] = useState({})
  const [success, setSuccess] = useState(false)

  const save = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      const data = await response.json()

      setSuccess(true)
      setRetorno(data)

      setForm({
        Nome: '',
        Email: '',
        Whatsapp: '',
        Nota: 0,
      })
    } catch (error) {

    }
  }

  const handleInput = (e) => {
    const value = e.target.value
    const key = e.target.name

    setForm(old => ({
      ...old,
      [key]: value
    }))
  }

  return (
    <div className="pt-6">
      <PageTitle title="Pesquisa" />
      <h1 className="text-center font-bold my-4 text-2xl">Críticas e Sugestões</h1>
      <p className="mt-6 text-center">O restaurante Softcado sempre busca por atender melhor seus clientes.</p>
      <p className="text-center">Por isso, estamos abertos a ouvir sua opinião.</p>
      { !success && <div className="w-32 mx-auto flex justify-center my-12">
        <form method="POST" onSubmit={save}>
          <label className="font-bold" htmlFor="name">Seu nome:</label>
          <input
            className="bg-blue-100 border-2 border-solid border-indigo-100 w-96 h-12 my-2 shadow rounded-md"
            type="text"
            name="Nome"
            id="name"
            placeholder="Nome"
            onChange={handleInput}
            value={form.Nome}
          />

          <label className="font-bold" htmlFor="email">Seu e-mail:</label>
          <input
            className="bg-blue-100 border-2 border-solid border-indigo-100 w-96 h-12 my-2 shadow rounded-md"
            type="email"
            name="Email"
            id="email"
            placeholder="E-mail"
            onChange={handleInput}
            value={form.Email}
          />

          <label className="font-bold" htmlFor="whatsapp">Seu Whatsapp:</label>
          <input
            className="bg-blue-100 border-2 border-solid border-indigo-100 w-96 h-12 my-2 shadow rounded-md"
            type="text"
            name="Whatsapp"
            id="whatsapp"
            placeholder="Whatsapp"
            onChange={handleInput}
            value={form.Whatsapp}
          />

          <div className="flex py-6">
            <label className="font-bold" htmlFor="nota">Nota: </label>
            {notas.map(nota => {
              return (
                <label className="block w-1/6 text-center">
                  {nota} <br />
                  <input key={nota} type="radio" name="Nota" value={nota} onChange={handleInput} />
                </label>
              )
            })}
          </div>
          <button className="bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow" type="submit">Salvar</button>
        </form>
      </div>}

      {success && <div className="w-1/5 mx-auto mt-6">
        <p className="mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3">Obrigado por contribuir com sua sugestão ou crítica.</p>
        {
          retorno.showCoupon && <div className="text-center border p-4 mb-6">
            Seu cupom: <br />
            <span className="font-bold text-2xl">{retorno.Cupom}</span>
          </div>
        }
        {
          retorno.showCoupon && <div className="text-center border p-4 mb-6">
            <span className="font-bold block mb-2">{retorno.Promo}</span>
            <br />
            <span>Tire print ou foto do seu cupom e apresente para garçon/garçonete para receber seu desconto.</span>
          </div>
        }
      </div>}
    </div>
  )
}

export default Pesquisa
