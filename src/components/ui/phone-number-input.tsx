import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./select";
import { Input } from "./input";

type PhoneNumberInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const countryCodes = {
  MX: "+52",
  US: "+1",
};

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value = "", onChange }) => {
  const [countryCode, setCountryCode] = React.useState<keyof typeof countryCodes>("MX");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handlePhoneNumberChange = (phone: string) => {
    const phoneNumberWithoutPrefix = phone.replace(countryCodes[countryCode], "");
    onChange(`${countryCodes[countryCode]} ${phoneNumberWithoutPrefix.trim()}`);
  };

  const handleCountryChange = (country: keyof typeof countryCodes) => {
    setCountryCode(country);
    onChange("");
  };

  return (
    <div className="flex border focus-within:border-primary focus-within:ring-1 focus-within:ring-ring">
      <Select value={countryCode} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-20 gap-2 border-0 focus:ring-0">{countryCode}</SelectTrigger>
        <SelectContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <SelectItem value="MX">MX</SelectItem>
          <SelectItem value="US">US</SelectItem>
        </SelectContent>
      </Select>

      <Input
        ref={inputRef}
        type="tel"
        value={value.replace(countryCodes[countryCode], "")}
        onChange={(e) => handlePhoneNumberChange(e.target.value)}
        placeholder="Número de teléfono"
        className="w-full border-0 focus:ring-0 pl-0"
      />
    </div>
  );
};
