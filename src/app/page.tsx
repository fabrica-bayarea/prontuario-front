"use client";
import Menu from "@/components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Login from "./auth/singin/usuario/page";

export default function Home() {
  const [user, setUser] = useState(false);

  return <main>{user ? <Menu /> : <Login />}</main>;
}
