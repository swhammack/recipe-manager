import ky from "ky";

export const kyClient = ky.create({ prefixUrl: "http://localhost:8080/api" });
