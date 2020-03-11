import { SUPER_ADMIN } from "../Constants/roles";

export const cmpStrings = (s1, s2) => s1.toUpperCase() === s2.toUpperCase();

export const getRole = () => SUPER_ADMIN;