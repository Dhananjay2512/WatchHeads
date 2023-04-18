import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import { deleteCookie, getCookie } from "../utils/Cookie";

const AppContext = createContext(null);
const useAppContext = () => useContext(AppContext);

const defaultState = {
  accessToken: "",
  isLoading: false,
  _id: "",
  username: "",
  cartItem: [],
  TotalAmount: 0,
  TotalItem: 0,
  isCartOpen: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const isUserAuthenticated = () => !!state.accessToken;

  const createSession = (payload) => {
    dispatch({ type: "CREATE_SESSION", payload });
  };

  const logout = () => {
    deleteCookie("refreshToken");
    dispatch({ type: "RESET_STATE" });
  };

  const refreshAccesstoken = async (refreshToken) => {
    // console.log(entityRefreshLinks[entity]);
    // console.log("refresh working");

    dispatch({ type: "SET_LOADING", payload: { status: true } });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/user/refreshAccessToken`,
        {
          refreshToken,
        }
      );

      // console.log(res, res.data);
      dispatch({
        type: "CREATE_SESSION",
        payload: {
          accessToken: res.data.data.accessToken,
          username: res.data.data.user.username,
          _id: res.data.data.user._id,
        },
      });

      // dispatch({ type: "SET_LOADING", payload: { status: false } });
    } catch (error) {}
  };

  const AddToCart = ({ title, id, price, image, quantity }) => {
    dispatch({
      type: "ADD_CART",
      payload: { title, id, price, image, quantity },
    });
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART" });
  };

  const Increase = (id) => {
    dispatch({ type: "INCREASE", payload: { id } });
  };

  const Decrease = (id) => {
    dispatch({ type: "DECREASE", payload: { id } });
  };

  console.log(state);

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");

    // console.log(refreshToken && state.accessToken === "");

    if (refreshToken && state.accessToken === "") {
      // console.log("working");
      refreshAccesstoken(refreshToken)
        .then(() => {
          dispatch({ type: "SET_LOADING", payload: { status: false } });
        })
        .catch((error) => console.log(error));
      return;
    }

    // setTimeout(() => {}, 10000);

    dispatch({ type: "SET_LOADING", payload: { status: false } });
  }, [state.accessToken]);

  // console.log(state);

  return (
    <AppContext.Provider
      value={{
        createSession,
        isUserAuthenticated,
        state,
        logout,
        AddToCart,
        Increase,
        Decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { useAppContext, AppProvider };
