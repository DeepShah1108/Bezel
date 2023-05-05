import './App.css';

import Modal from './components/Modal';

import Button from './components/Button';
import { useState } from 'react';

function App() {

  const [showModal, setShowModal] = useState(false);
  

  function openModal() {
    console.log('opening modal');
    setShowModal(true);
  }

  function closeModal() {
    console.log('closing Modal');
    setShowModal(false);
  }

  return (
    <div className="App w-screen h-screen bg-zinc-300 flex flex-col justify-center items-center">
      <div className='container w-9/12 bg-white m-5 px-4 py-10 rounded-lg'>
        <h1 className="text-3xl my-8">Bezel Modal Challenge</h1>
        <p>Created an Order Action Modal</p>
        <Button handleClick={openModal} text="Order Watch" />

      </div>
      {showModal && <Modal closeModal={closeModal}/>}
    </div>
  );
}

export default App;