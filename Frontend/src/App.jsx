import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import Navbar from "./Components/Navbar"
import RequiredDocuments from "./Components/RequiredDocuments"
import TraineeForm from "./Components/TraineeForm"
import TraineeProfile from "./Components/TraineeProfile"
import TrainingForm from "./Components/TrainingForm"

function App() {
  return (
    <>
      <BrowserRouter> 
          <Toaster position="top-center" richColors/>
          <Navbar/>
          <Routes>
            <Route path="/" element={ <TraineeProfile/> }/>
            <Route path="/trainee-form" element={ <TraineeForm/> }/>
            <Route path="/training-form" element={ <TrainingForm/> }/>
            <Route path="/required-documents" element={ <RequiredDocuments/> }/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App