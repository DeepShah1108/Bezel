import React, { useState, useEffect } from 'react'
import Button from './Button';
import axios from 'axios'


function Modal({ closeModal }) {

  const closeModalBgClick = (e) => {
    if(e.target.id === 'model-bg'){
      closeModal();
    }
  }

  const acceptOrder = async () => {
    try {
      await axios.post('https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123/accept');
      // Handle success, e.g., show a success message or update the order status
      closeModal()
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error accepting order:', error);
    }
  };

  const declineOrder = async () => {
    try {
      await axios.post('https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123/decline');
      // Handle success, e.g., show a success message or update the order status
      closeModal();
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error declining order:', error);
    }
  };

  const [ orderData, setOrderData ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try{
        const response = await axios.get('https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123');
        const data = response.data;
        setOrderData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrderData();

  }, [])

  if (loading) {
    return <div className='flex flex-col justify-center items-center absolute top-0 left-0 w-screen h-screen bg-zinc-700/90 text-white'>Loading...</div>;
  }


  return (
    <>

    {orderData && orderData.listing && orderData.listing.images &&(

      <div onClick={closeModalBgClick} id="model-bg" className='flex flex-col justify-center items-center absolute top-0 left-0 w-screen h-screen bg-zinc-700/90'>
      <div className='relative bg-white p-4 m-4 rounded-3xl md:w-7/12 w-10/12 max-w-screen-md'>
        <button onClick={closeModal} className='absolute right-5 top-1 text-2xl hover: cursor-pointer'>x</button>
        <div className='flex m-1 p-4'>
          <div className='basis-1/2  my-4 p-4 text-left'>
            <h2 className='text-slate-600 text-sm mx-3'>CONGRATS!</h2>
            <h1 className='text-2xl my-3 text mx-3'>Your Watch Sold!</h1>
            <p className='mt-8 text-xs text-ellipsis mx-3 text-slate-500'>You have 1 business day to accept the sale.
            <br></br>
              If you do not accept, it will be automatically rejected. 
            </p>
            <div className='mt-12'>
              <Button handleClick={acceptOrder} text="Accept sale" />
              <button onClick={declineOrder}
              className='w-full bg-white text-teal-950 text-base mx-auto hover: cursor-pointer'>Reject Sale</button>
            </div>
            
          </div>
          <div className='basis-1/2 bg-gray-100 m-2 p-6 rounded-3xl text-left'>
            <hr className="h-px my-4 bg-gray-300 border-0 :bg-gray-700" />
            <div className='flex justify-between text-sm'>
              <div className='flex flex-col'>
                <div>
                  <p>{orderData.listing.model.brand.name} {orderData.listing.model.displayName}
                  <br></br>
                  {orderData.listing.model.name} {orderData.listing.model.referenceNumber}
                  </p>
                </div>
                <div className='text-xs my-2 text-slate-500'>
                  <p>{orderData.listing.condition} / {orderData.listing.manufactureYear}</p>
                </div>
              </div>
                <img className='rounded-3xl h-16 max-w-sm' alt='Watch' src='https://getbezel.mo.cloudinary.net/sandbox/1583bb64-0df2-4a69-a10d-119e464ab6fe.png' />   
            </div>
            <hr className="h-px my-4 bg-gray-300 border-0 :bg-gray-700" />
            <div className='flex justify-between text-xs my-3'>
              <p>Sale Price</p>
              <p className='font-bold'>${orderData.salePriceCents}</p>
            </div>
            <div className='flex justify-between text-xs my-3'>
              <p>Seller Fee</p>
              <p>${orderData.sellerFeeCents}</p>
            </div>
            <div className='flex justify-between text-xs my-3'>
              <p>Commission Rate</p>
              <p>${orderData.commissionRateBips}</p>
            </div>
            <div className='flex justify-between text-xs my-3'>
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className='flex justify-between text-xs my-3 text-green-700'>
              <p>Bezel Authentication</p>
              <p>Free</p>
            </div>
            <hr className="h-px my-4 bg-gray-300 border-0 :bg-gray-700" />
            <div className='flex justify-between text-sm font-bold'>
              <p>Earnings</p>
              <p>${orderData.payoutAmountCents}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    )}
    </>
    
    
  )
}

export default Modal