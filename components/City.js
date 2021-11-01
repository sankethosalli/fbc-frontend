import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { MultiSelect } from "react-multi-select-component";
import { makeHTTPGETRequest } from "../services/http";
const config = require("../configs/config");

const City = (props) => {
  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(() => false);
  const [cities, setCities] = useState(() => []);

  const getInfo = () => {
    makeHTTPGETRequest(
      `${config.api.apiBaseUrl}/campaign/fetch/many/city/?objectId=${props.objectId}`,
      {}
    )
      .then((response) => {
        // console.log({ re: response, rl: response.length, r2: response[2] }, "");
        response = response.results;
        if (response.length) {
          let cities = [];

          for (let i = 0; i < response.length; i++) {
            const value = response[i];
            const name = value.name;
            // console.log(name);
            cities.push({ label: name, value: name });
          }

          setCities(() => cities);
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
    getInfo();
  }, [props.objectId]);

  useEffect(() => {
    props.handleInputChangeKeyValue("City", selected);
  }, [selected]);

  return (
    <Select
      options={cities}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
    />
  );
};

export default City;
