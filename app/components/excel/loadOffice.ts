// @ts-ignore
import { isServer } from '@ql/lib/helpers/utils'

const loadOffice = (callback) => {
  if (!isServer) {
    const existingScript = document.getElementById('office-js');
    console.log("loading office, existing =" + existingScript)
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://appsforoffice.microsoft.com/lib/1/hosted/office.js';
      script.id = 'office-js';
      document.body.appendChild(script);

      script.onload = () => {
        if (callback) callback();
      };
    }

    if (existingScript && callback) callback();
  }
};

export default loadOffice