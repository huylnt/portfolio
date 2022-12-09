import './contact.css'

const Contact = ({ device }) => {
   let iconSize = '100'
   if (device === 'mobile') iconSize = '50'
   let iconSizeInPX = iconSize + 'px'

   return <div style={{ height: '100%', display: 'flex', flexFlow: 'column', alignItems: 'center' }}>

      <p style={{ width: '90%', height: 'fit-content', padding: '5px 20px', background: 'linear-gradient(-225deg, #52b03f 0%, #115c21 100%)', color: 'white', textAlign: 'center', fontSize: 'calc(14px + 0.5vw)', boxShadow: 'rgba(7, 79, 42, 0.4) -5px 5px' }}> Feel free to contact me for work or daily-life concerns between <br /> <span className='time'> 8.00 am </span> to <span className='time'> 10.00 pm </span></p>

      <div className="contact-element-container">
         <i class="fa-solid fa-phone"></i>
         <a href='tel:+84774848931'>(+84) 774 848 931</a>
      </div>

      <div className="contact-element-container">
         <i class="fa-brands fa-google"></i>
         <a href='mailto:lnthuy29012002@gmail.com'>lnthuy29012002@gmail.com</a>
      </div>

      <div className="contact-element-container">
         <i class="fa-brands fa-facebook"></i>
         <a href='https://www.facebook.com/profile.php?id=100057375273139'>Huy Le Nguyen Truong</a>
      </div>

      <div className="contact-element-container">
         <i class="fa-solid fa-location-dot"></i>
         <a href=''>Ho Chi Minh city, Viet Nam</a>
      </div>
      <br></br>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2552305080376!2d106.64175351442813!3d10.791753592311137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eb32e90f10b%3A0xe7c786868f1c50f9!2zxJDhu5NuZyDEkGVuLCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1660613698408!5m2!1svi!2s" width="90%" height="300px" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: '0', margin: '5px 0 50px 0' }}></iframe>

   </div>

}

export default Contact