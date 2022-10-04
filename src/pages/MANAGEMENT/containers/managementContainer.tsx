import React from "react";

const ManagementContainer = () => {
  return (
    <main>
      <div className="multi-box">
        <div className="multil-box__container">
          <p>Site : ETRI | 빌딩</p>
          <select name="" id="">
            <option value="ALL">ALL</option>
            <option value="3000">3000</option>
            <option value="3001">3001</option>
          </select>
        </div>
      </div>

      <div className="card">
        <p className="card__title">측위자원 수집 데이터세트</p>
        <div className="card__table"></div>
        <div className="card__table__btn-container">
          <button className="card__table__btn">Post Processing</button>
          <button className="card__table__btn">Delete Dataset</button>
        </div>
      </div>

      <div className="card"></div>

      <div className="card"></div>
      <div className="card"></div>
    </main>
  );
};

export default ManagementContainer;
