import React, { useState, useEffect } from "react";
import Head from "next/head";
import createNotification from "../assets/notification";
import { makeHTTPPOSTRequest } from "../services/http";
import Gender from "../components/Gender";
import Country from "../components/Country";
import City from "../components/City";
// import MapPreview from "../components/MapPreview";
const config = require("../configs/config");

const campaign = () => {
  const [data, setData] = useState({
    Name: "",
    "Minimum Age": "",
    "Maximum Age": "",
    Gender: "Male",
    Country: "",
    City: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const handleInputChangeKeyValue = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    return makeHTTPPOSTRequest(
      `${config.api.apiBaseUrl}/campaign/submit/single/campaign/`,
      {
        Name: data.Name,
        "Minimum Age": data["Minimum Age"],
        "Maximum Age": data["Maximum Age"],
        Gender: data.Gender,
        Country: data.Country.value ? data.Country.value : "",
        City: data.City.value ? data.City.value : "",
      }
    )
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          createNotification({
            title: "Succesful",
            message: "Campaign Generated",
            type: "success",
            container: "top-right",
          });
        } else {
          if (response.err) {
            const errList = response.err;

            for (let i = 0; i < errList.length; i++) {
              for (const [key, value] of Object.entries(errList[i])) {
                createNotification({
                  title: value.errorTitle,
                  message: value.errorMessage,
                  type: value.errorType,
                  container: "top-right",
                });
              }
            }
          } else if (response.errorMessage) {
            createNotification({
              title: response.errorTitle,
              message: response.errorMessage,
              type: response.errorType,
              container: "top-right",
            });
          } else {
            createNotification({
              title: "Error",
              message: "Unknown Error Occured",
              type: "danger",
              container: "top-right",
            });
          }
        }
      })
      .catch((err) => {
        createNotification({
          title: "Error",
          message: "Unknown Error Occured",
          type: "danger",
          container: "top-right",
        });
      });
  };

  return (
    <div>
      <Head>
        <title>Campaign | Facebook Campaign</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src="/fb.png" class="inline" draggable="false" />
      <h1 class="text-2xl font-black inline m-3">Campaign</h1>
      <br />
      <br />
      {/* {JSON.stringify(data)} */}
      <div class="w-full max-w-xs">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <input
              name="Name"
              onChange={handleInputChange}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name Here"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="minimumAge"
            >
              Minimum Age
            </label>
            <input
              name="Minimum Age"
              onChange={handleInputChange}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="minimumAge"
              type="text"
              placeholder="Minimum Age Here"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="maximumAge"
            >
              Maximum Age
            </label>
            <input
              name="Maximum Age"
              onChange={handleInputChange}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="maximumAge"
              type="text"
              placeholder="Maximum Age Here"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="gender"
            >
              Gender
            </label>
            <Gender handleInputChangeKeyValue={handleInputChangeKeyValue} />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="country"
            >
              Country
            </label>
            <Country handleInputChangeKeyValue={handleInputChangeKeyValue} />
          </div>

          {data.Country && data.Country.value ? (
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="city"
              >
                City
              </label>
              <City
                objectId={data.Country.objectId}
                handleInputChangeKeyValue={handleInputChangeKeyValue}
              />
            </div>
          ) : null}

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <br />
      {/* <MapPreview /> */}
      <br />
      <br />
      <center
        style={{
          padding: "4px",
          border: "2px solid rgb(	66 ,103 ,178)",
          "border-radius": "4px",
        }}
      >
        <a
          class="text-grey-900"
          href="https://github.com/sanket-enigma/fbc-frontend"
        >
          Source Code (Front End)
        </a>
        <br />
        <a
          class="text-grey-900"
          href="https://github.com/sanket-enigma/fbc-backend"
        >
          Source Code (Back End)
        </a>
      </center>
    </div>
  );
};

export default campaign;
