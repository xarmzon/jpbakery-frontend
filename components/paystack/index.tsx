import { useState, useRef, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import dateformat from "dateformat";
import { APP_NAME, MESSAGES, ROUTES } from "@utils/constants";
import api from "@utils/fetcher";
import toast from "react-hot-toast";
import { formatPrice } from "@utils/index";
import Image from "next/image";
import Loader from "@components/Loader";


export interface PaystackProps {
  email: string;
  amount: number;
  reference?: string;
  orderId: string
  onComplete: (msg: string) => void;
}


const PaystackPayment = ({
  onComplete,
  email,
  amount,
  reference = "",
  orderId
}: PaystackProps) => {
  const [paymentText, setPaymentText] = useState<string>("Make Payment");
  const [refNum, setRefNum] = useState<string>(() => {
    if (reference && reference.length > 0) {
      return reference;
    }

    let ref = dateformat(new Date(), "isoUtcDateTime");
    ref = ref
      .replace("-", "")
      .replace(":", "")
      .replace("-", "")
      .replace(":", "")
      .split("Z")[0];
    return APP_NAME.split(" ")[0] + "-" + ref;
  });

  const makePayment = usePaystackPayment({
    email,
    amount,
    reference: refNum,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
  });


  useEffect(() => {
    if (paymentText === "Verify") {
      verifyPayment();
    } else if (paymentText === "Successful") {
      setTimeout(() => setPaymentText("Make Payment"), 1000);
    }
  }, [paymentText]);

  const onSuccess = (ref: string) => {
    //console.log(ref);
    setPaymentText("Verify");
  };
  const performPayment = async () => {
    switch (paymentText) {
      case "Make Payment":
        setPaymentText("Loading...");
        //add Payment data to database
        try {
          const { data } = await api.post(`${ROUTES.API.PAYMENT}`, {
            reference: refNum,
            order:orderId,
            charges: amount
          });
          // console.log(data);
          //make payment
          makePayment(
            (ref: string) => onSuccess(ref), //onSuccess callback
            () => setPaymentText("Make Payment") //onClose callback
          );
        } catch (e) {
          // console.log(e);
          toast.error("Adding Payment Failed")
          setPaymentText("Make Payment")
        }

        break;
      case "Verify Payment":
        verifyPayment();
        break;
    }
  };

  const verifyPayment = async () => {
    setPaymentText("Validating...");
    try {
      const { data } = await api.get(
        `${ROUTES.API.PAYMENT}verify?&reference=${refNum}`
      );
      toast.success("Payment Added")
      updatePayment();
      setPaymentText("Done");
    } catch (e) {
        toast.error("Payment Verification Failed")
    }
  };

  const updatePayment = async () => {
      
    try {
      const { data } = await api.patch(`${ROUTES.API.PAYMENT}`, {
        reference: refNum,
        status: true,
      });
      onComplete(data.msg);
    } catch (e) {
      toast.error("Failed to update Payment status")
    }
  };
  return (
    <div className="space-y-3 flex flex-col items-center">
      <p className="text-xl md:text-2xl text-center font-bold text-secondary">
        &#8358;{formatPrice(amount / 100)}
      </p>
      <p className="text-xs md:text-sm text-center font-bold text-secondary">
        Reference Number<span className="block italic">{refNum}</span>
      </p>
      <button
        onClick={performPayment}
        type="button"
        className="py-2 px-4 bg-primary text-primary-100 hover:bg-ascent-light hover:text-primary transition duration-500"
      >
        {paymentText}
      </button>
      {
          paymentText.includes(".") && (
            <div className="">
            <Loader text={paymentText}/>
        </div>
          )
      }
     <div className="h-12 w-full relative">

      <Image
      alt="paystack"
      layout="fill"
      objectFit="contain"
        src="/images/paystack-badge-cards-ngn.png"
      />
     </div>
    </div>
  );
};

export default PaystackPayment;
