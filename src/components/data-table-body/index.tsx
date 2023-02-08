import { Data } from '../../types/data-table-body'

type Props = {
  data: Data[],
}

const DataTableBodyComponent = ({ data }: Props) => {
  return (
    <tbody>
      {data && data.map((item: Data) => (
        <tr key={item.id}>
          <td className='item-image'>
            <div className='img'>
              <img src={`https://s3-symbol-logo.tradingview.com/${item.brand}.svg`} width="35" height="35" />
            </div>
            <div className="company-info">
              <span className='company-name'>{item.name}</span>
              <span className='corporation-name'>{item.corporation_name}</span>
            </div>
          </td>
          <td>{item.price} {" "}
            <span className='currency-unit'>{item.CURRENCY}</span>
          </td>
          <td>
            <span className={item["CHG%"] > 0 ? 'color-green' : 'color-red'}>{item["CHG%"]}%</span>
          </td>
          <td>
            <span className={item.CHG > 0 ? 'color-green' : 'color-red'}>
              {item.CHG}
            </span>
            <span className='currency-unit'>{item.CURRENCY}</span>
          </td>
          <td>
            <span className={item.TECHNICAL_RATING === 'Strong Buy' ? 'color-blue'
              : item.TECHNICAL_RATING === 'Buy' ? 'color-blue' :
                item.TECHNICAL_RATING === 'Sell' ? 'color-red' : 'color-disabled'}>{item.TECHNICAL_RATING}</span>
          </td>
          <td>
            {item.VOLUME}
          </td>
          <td>
            {item["VOLUME*PRICE"]}
          </td>
          <td>
            {item.MKT_CAP}
          </td>
          <td>
            {item["P/E"]}<span className='currency-unit'>{item.CURRENCY}</span>
          </td>
          <td>
            {item.EMPLOYEES}
          </td>
          <td>
            {item.SECTOR}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default DataTableBodyComponent