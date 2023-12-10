import React, { useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import Alert from '../components/Alert';
import { supabase } from '../../supabaseClient';

export default function Auth() {
  // Definir los inputs del formulario
  const [formInputs, setFormInputs] = useState([
    { name: 'email', label: 'Correo electronico', type: 'email', placeholder: 'Ingresa tu correo' },
  ]);

  // Definir el texto del formulario
  const formText = {
    title: 'Entra ya!',
    subtitle: 'Te enviaremos un correo electrónico para que puedas iniciar sesión',
    submit: 'Enviar',
  };

  // Estado inicial del formulario
  const [formValues, setFormValues] = useState({
    email: '',
  });

  // Estado para controlar las alertas
  const [alert, setAlert] = useState(null);

  // Función para actualizar el estado del formulario
  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({ email: formValues.email })

    if (error) {
      setAlert({ type: 'error', message: error.message, title: 'Error' })
    } else {
      setAlert({ type: 'success', message: 'Correo enviado', title: 'Éxito' })
    }
  };


  return (
    <section className="flex items-center justify-center h-90">
      <div className="grid grid-cols-2 h-75 w-full max-w-screen-xl">
        <div className="h-full bg-login-banner bg-center rounded-l-4xl shadow-l-3xl"></div>
        <div className="flex flex-col items-center justify-center bg-blue-400 h-full rounded-r-4xl shadow-r-3xl">
          <DynamicForm
            inputs={formInputs}
            onSubmit={handleFormSubmit}
            values={formValues}
            onChange={handleInputChange}
            formText={formText}
          />
          {alert && <Alert type={alert.type} message={{tittle: alert.title, body: alert.message}} />}
        </div>
      </div>
    </section>
  );
}
