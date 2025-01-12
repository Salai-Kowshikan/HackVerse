import { useFontSettings } from "@/components/FontContext";
import Navbarbottom from "@/components/Navbarbottom";
import { useEffect } from "react";
import Navbarheader from "@/components/Navbarheader";
import Loader from "@/components/Loader";

export default function Index() {
  const { setLoading } = useFontSettings();

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  return (
    <>
      <Navbarheader />
      <Loader />
      <Navbarbottom />
    </>
  );
}
