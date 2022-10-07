import React from "react";

type ToggleSwitchProps = {
  setToggleSwitchValue: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const ToggleSwitch = ({ setToggleSwitchValue, title }: ToggleSwitchProps) => {
  return (
    <>
      <input
        type="checkbox"
        id="switch"
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;

          console.log(target.checked);
          setToggleSwitchValue(target.checked);
        }}
      />
      <label htmlFor="switch" className="toggle-switch_bar"></label>
      <span>Update Current Position</span>
    </>
  );
};

export default ToggleSwitch;
