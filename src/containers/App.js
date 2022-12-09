import React, { Component } from 'react';

import '../index.css';
import './App.css';

import PageIcon from './page-icon';
import CurrentPage from './current-page';

class App extends Component {
  constructor() {
    super()
    this.state = {
      page: 'Home',
      isWaiting: true,
      device: undefined,
      gradientFactor: 0,
    }
  }

  handleResize = () => (window.innerWidth >= 1190) ? this.setState({ device: 'desktop' }) : this.setState({ device: 'mobile' })

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    setInterval(() => {
      const increment = Math.floor(Math.random(0, 1) * 15)
      this.setState({ gradientFactor: increment })
    }, 5000)
  }

  switchPage = (event) => {
    const pageName = event.target.getAttribute('data-page-name') || event.target.textContent
    console.log(pageName)
    switch (pageName) {
      case 'Home':
        this.setState({ page: 'Home' })
        break
      case 'Expertise':
        this.setState({ page: 'Expertise' })
        break
      case 'Project':
        this.setState({ page: 'Project' })
        break
      case 'Contact':
        this.setState({ page: 'Contact' })
        break
      case 'Comment':
        this.setState({ page: 'Comment' })
        break
      default:
        console.log('Page switching failed to proceed')
        break
    }
  }

  render() {

    if (this.state.isWaiting === true) {
      setTimeout(() => this.setState({ isWaiting: false }), 1000)
      return <button> </button>
    }

    let { page, device, gradientFactor } = this.state

    if (device === 'desktop') {
      return <div>

        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexFlow: 'row no-wrap', justifyContent: 'space-between', alignItems: 'center', gap: '6vw' }}>
          <div className='navigation-desktop'>
            <PageIcon pageName='Home' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
            <PageIcon pageName='Expertise' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
            <PageIcon pageName='Project' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
            <PageIcon pageName='Contact' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
            <PageIcon pageName='Comment' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
          </div>

          <img src='./avatar.jpg' id='avatar' />

          <div className='page-desktop'>
            <CurrentPage pageName={this.state.page} />
          </div>
        </div>

      </div>
    }

    else if (device === 'mobile') {
      return <div>

        <div style={{ position: 'relative', width: '100vw', height: '150px', background: `linear-gradient(to top, #8ae38a ${gradientFactor}%, #094709 ${100 - gradientFactor}%)` }}>
          <div style={{ width: '150px', height: '150px', position: 'absolute', inset: '35px 50% 0 50%', transform: 'translateX(-50%)', background: 'url(avatar-square.png)', backgroundRepeat: 'none', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%' }}> </div>
        </div>

        <div className='navigation-mobile'>
          <PageIcon pageName='Home' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
          <PageIcon pageName='Expertise' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
          <PageIcon pageName='Project' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
          <PageIcon pageName='Contact' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
          <PageIcon pageName='Comment' currentPage={this.state.page} switchPage={this.switchPage} device={device} />
        </div>

        <div className='page-mobile'>
          <CurrentPage pageName={page} device={device} />
        </div>

      </div>
    }
  }
}

export default App;