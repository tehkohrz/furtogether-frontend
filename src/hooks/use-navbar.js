import { useContext } from "react";
import { AvatarContext } from "../contexts/navbar-context";

export const useAvatar = () => useContext(AvatarContext)