import { useState } from "react"
import successIcon from "./assets/images/icon-success-check.svg";
import consentIcon from './assets/images/icon-checkbox-check.svg';
import querySelected from './assets/images/icon-radio-selected.svg';

export default function App() {
    const [formData, setFormData] = useState({
      firstName:'',
      secondName:'',
      email:'',
      queryType:'',
      message:'',
      consent: false
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    function handleSubmit(e){
      e.preventDefault();

      const newError = {}
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // for email validation

      if(!formData.firstName.trim()){
        newError.firstName = 'This field is required';
      }
      if(!formData.secondName.trim()){
        newError.secondName = 'This field is required';
      }
      if(!emailRegex.test(formData.email.trim())){
        newError.email = 'Please enter a valid email';
      }
      if (!formData.queryType) {
          newError.queryType = 'Please select a query type';
      }
      if(!formData.message.trim()){
        newError.message = 'This field is required';
      }
      if(!formData.consent){
        newError.consent = 'To submit this form, please consent to be contacted';
      }
      setErrors(newError);

      //Checking if there is no error
      Object.keys(newError).length === 0 ? setSuccess(true): setSuccess(false);
      
    }

  return(
    <div className="bg-Green_lighter font-[karla] flex flex-col justify-center items-center min-h-screen py-6">
    {success && 
    <div className="w-113 mx-auto p-6 bg-Grey_darker rounded-sm">
      <div className="flex gap-2">
        <img 
        src={successIcon}
        alt="success"
        /> 
        <p className="text-Green_lighter font-bold">
          Message Sent!
          </p>
        </div>
        <p 
        className="text-white">
          Thanks for completing the form. We'll be in touch soon!
          </p>
      </div>}
    <form
    onSubmit={handleSubmit} 
    className="bg-White w-full max-w-85 sm:max-w-185 flex justify-center p-6 rounded-2xl shadow-l sm:p-8">
      <div>

      <h1 
      className="text-2xl font-bold"
      >Contact Us
      </h1>

      <div 
      className="flex flex-col sm:flex-row gap-4 mb-5"
      >
      <div 
      className="flex flex-col"
      >

        <label 
        htmlFor="firstName" className="labels"
        >
          First Name
          </label>

        <input 
        type="text" 
        className="inputs" 
        name="firstName"
        value={formData.firstName}
        onChange={e => setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))}
        />

        <p className="error">{errors.firstName}</p>
      </div>

      <div 
      className="flex flex-col"
      >

        <label 
        htmlFor="secondName" 
        className="labels">
          Second Name
          </label>

        <input 
        type="text" 
        className="inputs" 
        name="secondName"
        value={formData.secondName}
        onChange={e => setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))}
        />

        <p className="error">{errors.secondName}</p>
      </div>
      </div>

      <div 
      className="wrapper">
        <label 
        htmlFor="Email" 
        className="labels"
       >
          Email Address
          </label>
        <input 
        type="email" 
        name="email" 
        className="inputs w-full"
        value={formData.email}
        onChange={e => setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))}/>

        <p className="error">{errors.email}</p>
      </div>

      <div 
      className="wrapper">
        <label 
        htmlFor="Query Type" 
        className="labels">
          Query Type</label>
        <div 
        className="flex flex-col sm:flex-row gap-4"
        >
          {/*General Enquiry */}

          <div 
          onClick = {() => setFormData(prev => ({...prev, queryType:"general"}))}
          className="flex items-center gap-3 pl-6 inputs"
          >
          {formData.queryType === 'general' ? (
            <img src={querySelected}
                 alt="selected"
                 className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
          )}
          <label 
          htmlFor="General Enquiry" 
          className="labels text-[1rem] m-0">
            General Enquiry
            </label>
        </div>

         {/*Support Enquiry */}
        <div 
        onClick = {() => setFormData(prev => ({...prev, queryType:"support"}))}
        className="flex items-center gap-3 pl-6 inputs"
        >
         {formData.queryType === 'support' ? (
            <img src={querySelected}
                 alt="selected"
                 className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
          )}
          <label 
          htmlFor="Support Enquiry" 
          className="labels text-[1rem] m-0"
          >Support Enquiry
          </label>
        </div>
        <p className="error">{errors.query}</p>
        </div>
      </div>
      <div 
      className="wrapper">
         <label 
         htmlFor="message" 
         className="labels"
       >
          Message
          </label>
        <textarea
        name="message" 
        className="inputs w-full h-60 sm:h-25"
        value={formData.message}
       onChange={e => setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))}/>
        <p className="error">{errors.message}</p>
      </div>
      <div className="mb-5">
      <div 
      className="flex gap-2"
      >

       <label onClick={() =>
  setFormData(prev => ({ ...prev, consent: !prev.consent }))
} className="cursor-pointer w-5 h-5 block">
  {formData.consent ? (
    <img src={consentIcon} alt="consent" className="w-full h-full" />
  ) : (
    <div className="w-full h-full border  border-gray-400"></div> // placeholder for unchecked
  )}
</label>

        <p 
        className="labels mb-0 font-medium">
          I hereby consent to being contacted by the team</p>
      </div>
      <p className="error">{errors.consent}</p>
      </div>
      <button
      type="submit"
      className="w-full h-15 text-white rounded-md bg-Green_medium cursor-pointer">
        Submit
        </button>
      </div>
    </form>
    </div>
  )
}