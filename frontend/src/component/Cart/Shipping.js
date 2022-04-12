import React, { Fragment, useState } from "react";
import "./Shipping.css";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps.js";
import { saveShippingInformationAction } from "../../store/actions/cartActions";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setpinCode] = useState(shippingInfo.pinCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const shippingSubmitHandler = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      alert.error("Phone number should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInformationAction({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNumber,
      })
    );

    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading"> Shipping Details </h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmitHandler}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address.."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City.."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pincode.."
                value={pinCode}
                onChange={(e) => setpinCode(e.target.value)}
                required
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone number.."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <PublicIcon />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value=""> Select Country </option>
                {Country &&
                  Country.getAllCountries().map((cItem) => (
                    <option key={cItem.isoCode} value={cItem.isoCode}>
                      {cItem.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value=""> Select State </option>
                  {State &&
                    State.getStatesOfCountry(country).map((sItem) => (
                      <option key={sItem.isoCode} value={sItem.isoCode}>
                        {sItem.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
