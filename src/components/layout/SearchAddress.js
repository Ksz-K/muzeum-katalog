import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const libraries = ["places"];

function SearchAddress({ takeData, editedAddress }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD4TkS2QxokFJN5XvWXg9LcpB8_HV5RH4U",
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Search takeData={takeData} editedAddress={editedAddress} />
    </div>
  );
}

function Search({ takeData, editedAddress }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.691111, lng: () => 18.974167 },
      radius: 456789,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            takeData(lat, lng, results[0].formatted_address);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <ComboboxInput
          className="form-control"
          value={value || editedAddress}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Wpisz adres wraz z numerem ulicy"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={uuidv4()} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default SearchAddress;
