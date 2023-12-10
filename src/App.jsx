import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './app/auth/Auth'
import Account from './app/auth/Account'
import MainPage from './MainPage'

function App() {
  const [session, setSession] = useState(null)
  const [userData, setUserData] = useState(null) // To store user data (name, username, etc.)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        // If user is logged in, fetch their data
        fetchUserData(session.user.id)
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        // If user is logged in, fetch their data
        fetchUserData(session.user.id)
      }
    })
  }, [])

  async function fetchUserData(userId) {
    // Fetch user data (name, username, etc.) from your database
    const { data, error } = await supabase
      .from('profiles')
      .select(`first_name, last_name`)
      .eq('id', userId)
      .single()

    if (!error && data) {
      setUserData(data)
    }
  }

  return (
    <div>
      {!session ? (
        <Auth />
      ) : userData && userData.first_name ? ( // Check if user data is available
        <MainPage /> // Redirect to the main page
      ) : (
        <Account
          key={session.user.id}
          session={session}
          fetchUserData={fetchUserData}
        />
      )}
    </div>
  )
}

export default App
