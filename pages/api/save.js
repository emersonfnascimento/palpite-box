import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmsss')).toString(16).toUpperCase()
  return `${code.substr(0, 4)}-${code.substr(4, 4)}-${code.substr(8, 4)}`
}

export default async (request, response) => {
  try {
    const data = JSON.parse(request.body)

    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY,
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[1]

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A3:B3')

    const mostrarPromocaoCell = sheetConfig.getCell(2, 0)
    const textoCell = sheetConfig.getCell(2, 1)

    let Cupom = ''
    let Promo = ''
    if (mostrarPromocaoCell.value === 'VERDADEIRO') {
      Cupom = genCupom()
      Promo = textoCell.value
    }

    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Nota: parseInt(data.Nota),
      'Data Preenchimento': moment().format('DD/MM/YYYY, HH:mm:ss '),
      Cupom,
      Promo,
    })

    response.end(JSON.stringify({
      showCoupon: Cupom !== '',
      Cupom,
      Promo,
    }))
  } catch (error) {
    console.log(error)
    response.end('Error')
  }
}
