import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllJerseysLoad = () => {
  const { isLoading, data: jerseys } = useQuery({
    queryKey: ["jerseys"],
    queryFn: async () => {
      return await fetch(`${import.meta.env.VITE_API_URL}/alljerseys`).then(
        (res) => res.json(),
      );
    },
  });
  console.log(jerseys,"kkk")
  return jerseys;
};

export default AllJerseysLoad;
