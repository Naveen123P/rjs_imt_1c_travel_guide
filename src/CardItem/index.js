import './index.css'

const CardItem = props => {
  const {details} = props
  const {name, imageUrl, description} = details

  return (
    <li className="card-div">
      <img src={imageUrl} alt={name} className="image" />
      <div className="content-div">
        <h1 className="heading2">{name}</h1>
        <p className="para">{description}</p>
      </div>
    </li>
  )
}

export default CardItem
