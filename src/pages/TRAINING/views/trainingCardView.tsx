import React from "react";

type CardViewProps = {
  btnList: string[];
  title: string;
};

const TrainingCardView = ({ title, btnList }: CardViewProps): JSX.Element => {
  return (
    <div className="card flex8">
      <p className="card__title">{title}</p>
      <div className="card__table"></div>
      <div className="card__table__btn-container">
        {btnList.map((list) => {
          return <button className="card__table__btn">{list}</button>;
        })}
      </div>
    </div>
  );
};

export default TrainingCardView;
