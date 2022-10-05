import React from "react";

const MonitoringBoxView = () => {
  return (
    <div className="multi-box">
      <div className="multil-box__container">
        <p>수집작업 목록</p>
        <select name="" id="">
          <option value="ALL">ALL</option>
          <option value="3000">3000</option>
          <option value="3001">3001</option>
        </select>

        <input
          type="checkbox"
          id="switch"
          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;

            console.log(target.checked);
          }}
        />
        <label htmlFor="switch" className="toggle-switch_bar"></label>
      </div>
    </div>
  );
};

export default MonitoringBoxView;
