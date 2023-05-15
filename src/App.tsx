import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import AppContextProvider from './services/context'
import { RequireAuth } from './services/RequireContext'
import { Header } from './components/Header/index'
import { GlobalStyle, StyleDarkMode, StandardStyle } from './styles/global'
import { TasklistContent } from './components/TasklistContent'
import Home from './pages/Home'
import { Login } from './pages/Login'

function App() {
  const [isNotificationsSideBarActive, setIsNotificationsSideBarActive] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  function HandleNotificationsSideBar() {
    setIsNotificationsSideBarActive(!isNotificationsSideBarActive)
  }
  function CloseRightSideBar(){
    setIsNotificationsSideBarActive(false)
  }
  function HandleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }
  
  return (
   // <BrowserRouter  basename={'/webtasklist'}>
    <BrowserRouter  basename={'/'}>
      {isDarkMode ? <StyleDarkMode /> : <StandardStyle />}
      <GlobalStyle />
      <AppContextProvider>
        <Routes>
          <Route path="login/" element={<Login isRecovering={false} />} />
          <Route path="login/recover" element={<Login isRecovering={true} />} />
          <Route path="/" element={
            <RequireAuth>
              <Header HandleNotificationsSideBar={HandleNotificationsSideBar} 
              isOpen={isNotificationsSideBarActive} 
              HandleDarkMode={HandleDarkMode}
              CloseRightSideBar={CloseRightSideBar}/>
            </RequireAuth>}>
            <Route index element={
              <RequireAuth>
                <Home flagSideBar={isNotificationsSideBarActive} />
              </RequireAuth>
            } />
            <Route path="tasklist/:tasklistid" element={
              <RequireAuth>
                <TasklistContent flagSideBar={isNotificationsSideBarActive} />
              </RequireAuth>
            } />
            <Route path="tasksAssignedToMe/" element={
              <RequireAuth>
                <TasklistContent flagSideBar={isNotificationsSideBarActive} assignedToMe />
              </RequireAuth>
            } />
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  )
}
export default App
