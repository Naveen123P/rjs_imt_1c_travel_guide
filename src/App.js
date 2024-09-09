import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CardItem from './CardItem'
import './App.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
}

class App extends Component {
  state = {
    apiStatus: apiConstants.initial,
    packages: [],
  }

  componentDidMount() {
    this.getPackages()
  }

  formattedData = each => ({
    id: each.id,
    name: each.name,
    imageUrl: each.image_url,
    description: each.description,
  })

  getPackages = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.packages.map(each => this.formattedData(each))
      this.setState({apiStatus: apiConstants.success, packages: updatedData})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-style">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {packages} = this.state
    return (
      <ul className="ul">
        {packages.map(each => (
          <CardItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg">
        <div className="head-div">
          <h1 className="heading">Travel Guide</h1>
        </div>
        {this.renderAllViews()}
      </div>
    )
  }
}

export default App
