import { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    document.title = 'graced.is';
  }, []);


  return (
    <>
    {document.baseURI}<br />
    {}
    </>
  );
}

export default App
