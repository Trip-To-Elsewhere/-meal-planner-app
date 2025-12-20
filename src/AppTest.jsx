// Simple test component to check if React is working
function AppTest() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅ App is Working!</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        React is loaded successfully
      </p>
      <div style={{
        background: 'white',
        color: '#333',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '600px'
      }}>
        <h2>Diagnostic Info:</h2>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>✅ React: Loaded</li>
          <li>✅ Vite: Running</li>
          <li>✅ Port 3000: Active</li>
          <li>⏳ Loading components...</li>
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          If you see this, the basic app is working.
          The issue might be with component imports.
        </p>
      </div>
    </div>
  );
}

export default AppTest;
