import "./Card.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";

interface Inputs {
  name: string;
  cardNum: string;
  date: string;
  cvv: string;
  zip: string;
}
const schema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .max(30, "too long")
    .test("includes-spaces", "Full name is required", (value) =>
      value.includes(" ")
    ),

  cardNum: yup
    .string()
    .required("Card Number is required")
    .min(19, "card number must be 16 characters"),

  date: yup.string().required("Date is required"),
  cvv: yup.string().required("CVV is required").max(3, "CVV must be 3 digits"),
  zip: yup
    .string()
    .required("Zip Code is required")
    .min(5, "Zip code must be at least 5 digits"),
});

export default function Card({ setShow }: { setShow: (p: boolean) => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const handleClick: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setShow(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <div className="form-container">
        <div className="box">
          <label htmlFor="name">Full Name</label>
          <input
            className="inp"
            type="text"
            id="name"
            placeholder="Alex Smith"
            {...register("name")}
          />
          {errors.name ? <p>{errors.name.message}</p> : null}
        </div>

        <div className="box">
          <label htmlFor="cardNum">Credit Card Number</label>
          <InputMask
            mask="9999 9999 9999 9999"
            maskChar=""
            className="inp"
            type="text"
            id="cardNum"
            placeholder="1234 1234 1234 1234"
            {...register("cardNum")}
          />
          {errors.cardNum ? <p>{errors.cardNum.message}</p> : null}
        </div>

        <div className="box2">
          <div className="box2in">
            <label htmlFor="date">Exp Date</label>
            <input
              className="inp2"
              type="date"
              id="date"
              placeholder="MM/YY"
              {...register("date")}
            />
            {errors.date ? <p>{errors.date.message}</p> : null}
          </div>

          <div className="box2in">
            <label htmlFor="cvv">CVV</label>
            <input
              className="inp2"
              type="text"
              id="cvv"
              placeholder="..."
              {...register("cvv")}
            />
            {errors.cvv ? <p>{errors.cvv.message}</p> : null}
          </div>
        </div>

        <div className="box">
          <label htmlFor="zip">Zip Code</label>
          <input
            className="inp"
            type="text"
            id="zip"
            placeholder="90210"
            {...register("zip")}
          />
          {errors.zip ? <p>{errors.zip.message}</p> : null}
        </div>

        <button type="submit" className="but">
          Confirm Payment
        </button>
      </div>
    </form>
  );
}
