import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { MultiSelect } from "react-multi-select-component";
import { makeHTTPGETRequest } from "../services/http";
const config = require("../configs/config");

const Country = (props) => {
  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(() => false);
  const [countries, setCountries] = useState(() => []);

  const getInfo = () => {
    makeHTTPGETRequest(
      `${config.api.apiBaseUrl}/campaign/fetch/many/country/`,
      {}
    )
      .then((response) => {
        // console.log({ re: response, rl: response.length, r2: response[2] }, "");
        response = response.results;
        if (response.length) {
          let countries = [];

          for (let i = 0; i < response.length; i++) {
            const value = response[i];
            const name = value.name;
            const objectId = value.objectId;
            // console.log(name);
            countries.push({ label: name, value: name, objectId });
          }

          setCountries(() => countries);
        } else {
        }
      })
      .catch((err) => {
        console.log({ err }, "");
      });
  };

  useEffect(() => {
    if (loading === false) {
      setLoading(() => {
        return true;
      }, getInfo());
    }
  }, [loading]);

  useEffect(() => {
    props.handleInputChangeKeyValue("Country", selected);
  }, [selected]);

  return (
    <Select
      options={countries}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
    />
  );
};

export default Country;
