import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useFrappeAuth } from 'frappe-react-sdk';

export default function Login() {
  const { login , updateCurrentUser, currentUser} = useFrappeAuth();
  const [usr, setUserName] = useState<string | undefined>();
  const [pwd, setPassword] = useState<string | undefined>();
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  useEffect(() => {
    if (currentUser) {
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      }).then(() => {
        navigate('/purchase-invoice'); 
      });
    }
    else {
      Toast.fire({
        icon: 'error',
        title: 'Invalid Credentials'
      });
    }
  }, [currentUser]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      updateCurrentUser();

      await login(
        usr || "",
        pwd || "",
      );

    } catch (error) {
      console.error('Error:', error);
      Toast.fire({
        icon: 'error',
        title: 'Invalid Credentials',
      });             
    }
  };
  
  return (
    <section className="text-center">
      <div className="p-5 bg-image" style={{ backgroundImage: "url('https://www.iitb.ac.in/sites/www.iitb.ac.in/files/styles/gallery_item/public/MainBldg%20grey.jpg')",
        backgroundSize: 'cover', height: '100vh', position: 'relative' }}>
      </div>

      <div className='d-flex justify-content-center'>
        <div className="card mx-auto mx-md-5 shadow-5-strong" style={{ marginTop: "-500px", marginBottom: "100px", background: "hsla(0, 0%, 100%, 0.5)",
          backdropFilter: "blur(30px)", maxWidth: '600px' }}>
            
          <div className="card-body py-5 px-md-5">

            <div className="col-lg-12">
              <h2 className="fw-bold mb-5">Login</h2>
              <form onSubmit={handleSubmit}>

                <div className="form-outline mb-4">
                  <input onChange={e => setUserName(e.target.value)} id="form3Example3" className="form-control" placeholder='Email Address' />
                </div>

                <div className="form-outline mb-4">
                  <input type="password" onChange={e => setPassword(e.target.value)} id="form3Example4" className="form-control" placeholder='Password' />
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">
                  Login
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
