import { Container, Ratio } from "react-bootstrap"

export default function FakerDoc() {
  return (
    <iframe
      className="w-100 min-vh-100"
      src={`https://fakerjs.dev/api/`}
    ></iframe>
  );
}