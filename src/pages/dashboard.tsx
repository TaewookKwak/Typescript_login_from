import React from "react";

const Dashboard = () => {
  let arr: string[] = ["kim", "park"];
  let obj: { name: string; age?: number } = { name: "kim" };
  let differentType: string | number = 1;

  type Name = string | number;
  type Member = [number, boolean];
  type Group = {
    [key: string]: string;
  };

  let name: Name = 123;
  let john: Member = [123, false];
  let A: Group = { name: "kim", age: "123" };

  function func(x: number): number {
    return x * 2;
  }
  return <div>대쉬보드</div>;
};

export default Dashboard;
