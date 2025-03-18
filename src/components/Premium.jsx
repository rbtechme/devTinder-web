import axios from "axios";
import React, { use, useEffect } from "react";
import BASE_URL from "../constants/baseUrl";

const Premium = () => {
  const [isPremium, setIsPremium] = React.useState(false);

  const handlePayment = async (type) => {
    const res = await axios.post(
      BASE_URL + "/payment/create",
      { memberShip: type },
      { withCredentials: true }
    );

    const { keyId, amount, currency, orderId, notes } = res.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Darak Darika",
      description: "This is a buddhist matrimony site for Buddhist people.",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const premiumVerify = async () => {
    try {
    } catch (error) {
      console.log(error);
    }

    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    const { isPremiumUser } = res.data;
    if (isPremiumUser === true) {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  };

  useEffect(() => {
    premiumVerify();
  }, []);

  return isPremium ? (
    <>
      <div className="stack size-28">
        <div className="border-base-content card bg-base-100 border text-center">
          <div className="card-body">🎉 You already Premium user 🙏</div>
        </div>
        <div className="border-base-content card bg-base-100 border text-center">
          <div className="card-body">😍</div>
        </div>
        <div className="border-base-content card bg-base-100 border text-center">
          <div className="card-body">🥳</div>
        </div>
      </div>
    </>
  ) : (
    <div className="m-10">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-200 rounded-box grid h-auto grow place-items-center">
          <div className="bg-[#C0C0C0] text-black rounded-box h-10 w-full"></div>
          <h1 className="font-bold text-3xl m-2">Silver premium</h1>
          <p>Get access to all the features of the app</p>
          <ul>
            <li>Ad free experience</li>
            <li>100 access to all the features</li>
            <li>3 months</li>
          </ul>
          <button
            onClick={() => handlePayment("Silver")}
            className="btn bg-[#C0C0C0] text-black m-2"
          >
            Get Silver
          </button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-auto grow place-items-center">
          <div className="bg-[#FFD700] text-black rounded-box h-10 w-full"></div>
          <h1 className="font-bold text-3xl m-2">Gold premium</h1>
          <p>Get access to all the features of the app</p>
          <ul>
            <li>Ad free experience</li>
            <li>unlimited access to all the features</li>
            <li>6 months</li>
          </ul>
          <button
            onClick={() => handlePayment("Gold")}
            className="btn bg-[#FFD700] text-black  m-2"
          >
            Get Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
