import { useFontSettings } from '@/components/FontContext';
import Navbarbottom from '@/components/Navbarbottom'
import { useEffect } from 'react';

export default function Index() {
  const { setLoading } = useFontSettings();
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  },[])
  return (
    <>
    <Navbarbottom />
    </>
  );
}
