import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { AxiosResponse } from "axios";
import InputMask from "react-input-mask";

function App() {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);

  const abortController = useRef(new AbortController());

  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function updateNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setNumber(e.target.value);
  }

  async function getUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUsers([]);
    setStatus("loading...");

    // Abort previous request
    abortController.current.abort();
    abortController.current = new AbortController();

    const cleanedNumber = number.replace(/\D/g, "");

    try {
      const response: AxiosResponse = await axios.get(
        `http://localhost:3000/get-user?number=${cleanedNumber}&email=${email}`,
        { signal: abortController.current.signal }
      );
      setStatus("success!");
      setUsers(response.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data.error) {
          setStatus(err.response.data.error);
        } else if (err.response && err.response.data) {
          setStatus(err.response.data);
        } else {
          if (err.code !== "ERR_CANCELED") setStatus(err.message);
        }
        console.error(err);
      }
    }
  }

  return (
    <>
      <div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => getUser(e)}
          className="flex flex-col gap-5"
        >
          <div className="flex justify-between gap-10">
            <label htmlFor="email">Email </label>
            <input
              onChange={updateEmail}
              value={email}
              id="email"
              type="email"
              className="w-[300px]"
              required
            ></input>
          </div>
          <div className="flex justify-between gap-10">
            <label htmlFor="number">Number </label>
            <InputMask
              mask="99-99-99"
              onChange={updateNumber}
              value={number}
              id="number"
              type="text"
              className="w-[300px]"
            />
          </div>
          <p
            className={`h-[24px] text-start ${status === "loading..." ? "text-whiteDimmed" : status === "success!" ? "text-green" : "text-red-600"}`}
          >
            {status}
          </p>
          <button
            type="submit"
            // onClick={(e: React.MouseEvent<HTMLButtonElement>) => getUser(e)}
          >
            Submit
          </button>
        </form>
        <div className="mt-10">
          <p className="pb-5 pt-5 text-[30px] text-whiteDimmed">Users</p>
          <ul className="flex flex-col items-start justify-start">
            {users.map(
              (user: { _id: string; email: string; number: number }) => {
                return (
                  <li
                    key={user._id}
                    className="flex flex-col items-start justify-start p-2"
                  >
                    <p>Email: {user.email}</p>
                    <p>Number: {user.number}</p>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
