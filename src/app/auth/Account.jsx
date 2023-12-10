import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient';
import DynamicForm from '../components/DynamicForm';
import Alert from '../components/Alert';

export default function Account({ session }) {

  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null);

   // Definir los inputs del formulario
  const [formInputs, setFormInputs] = useState([
    { name: 'firstName', label: 'Nombre', type: 'text', placeholder: 'Ingrese su nombre' },
    { name: 'lastName', label: 'Apellido', type: 'text', placeholder: 'Ingrese su apellido' },
  ]);

  // Definir el texto del formulario
  const formText = {
    title: 'Solo necesitamos unos datos más',
    subtitle: 'Por favor ingrese su nombre, apellido y dirección',
    submit: 'Guardar',
  };

  // Estado inicial del formulario
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
  });

  // Función para actualizar el estado del formulario
  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleFormSubmit = async (event) => {

    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      console.warn(error)
      setAlert({ type: 'error', message: error.message, title: 'Error' })
    } else {
      setAlert({ type: 'success', message: 'Perfil actualizado', title: 'Éxito' })
    }

    setLoading(false)
  };
  
  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`first_name, last_name`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setFormValues({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
          })
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])


  return (
    <section className="flex items-center justify-center h-90">
      <div className="grid grid-cols-2 h-75 w-full max-w-screen-xl">
        <div className="flex flex-col items-center justify-center bg-yellow-400 h-full rounded-l-4xl shadow-l-3xl">
            <DynamicForm
              inputs={formInputs}
              onSubmit={handleFormSubmit}
              values={formValues}
              onChange={handleInputChange}
              formText={formText}
            />
            {alert && <Alert type={alert.type} message={{tittle: alert.title, body: alert.message}} />}
        </div>
        <div className="h-full bg-signup-banner bg-center rounded-r-4xl shadow-r-3xl"></div>
      </div>
    </section>
  )
}
