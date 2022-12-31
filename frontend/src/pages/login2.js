import React from "react";
import { useParams } from "react-router-dom";
export default function LoginPage() {
  let { id } = useParams();
  return (
    <>
      <h1>Hello there user {id}</h1>
      <p>This is your awesome User Profile page</p>
    </>
  );
}