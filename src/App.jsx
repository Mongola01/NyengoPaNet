import backgroundImage from './image.jpg';
import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const apiKey = 'ca816ba3b8f76febe5bf3130ecc24894';

  const fetchWeather = async () => {
     if(!city) return;

     try{
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      
       const data = await response.json();

       if (response.ok){
        setWeather(data);
       }
       else{
        alert("Check the spelling");
       }
     }
     catch(error){
      console.error("Error Fetching the Weather: ", error);
     }
    
  }

return (
     <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      /* THESE ARE THE KEY LINES */
      width: '100vw',         // Full Viewport Width
      minHeight: '100vh',     // Full Viewport Height
      display: 'flex',        // Enables Flexbox
      alignItems: 'center',    // Centers vertically
      justifyContent: 'center',// Centers horizontally
      /* ----------------------- */
      fontFamily: 'sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}
  >
    {/* Your Card Container */}
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      padding: '40px',
      borderRadius: '24px',
      width: '90%',           // Responsive width for mobile
      maxWidth: '400px',      // Limits width on desktop
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      color: 'white'
    }}>
 
      <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>Nyengo Pa Net</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter a City"
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          style={{
            padding: '15px',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            fontSize: '16px' // Prevents iOS auto-zoom on focus
          }}
        />

        <button
          onClick={fetchWeather}
          style={{
            padding: '15px',
            borderRadius: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none',
            transition: '0.3s'
          }}
        >
          🔍 Search
        </button>
      </div>

      {weather && (
        <div style={{ marginTop: '30px', animation: 'fadeIn 0.5s' }}>
          <h2 style={{ fontSize: '1.5rem', margin: '0' }}>{weather.name}</h2>
          <div style={{ fontSize: '60px', fontWeight: 'bold', margin: '10px 0' }}>
            {Math.round(weather.main.temp)}°C
          </div>
          <p style={{ textTransform: 'capitalize', fontSize: '1.2rem', opacity: '0.9' }}>
            {weather.weather[0].description}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '20px' }}>
            <div>
              <small>Humidity</small>
              <p style={{ margin: '5px 0' }}>{weather.main.humidity}%</p>
            </div>
            <div>
              <small>Wind</small>
              <p style={{ margin: '5px 0' }}>{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
 
}

export default App
