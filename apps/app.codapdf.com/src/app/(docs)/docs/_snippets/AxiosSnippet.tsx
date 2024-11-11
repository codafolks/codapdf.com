import ReactCodeMirror from "@uiw/react-codemirror";
import { barf } from "thememirror";
import { javascript } from "@codemirror/lang-javascript";
const snippet = `
import axios from "axios"; 
const data = {html: "<h1>Hello {{name}}</h1>", data: {name: "World"}}; 
const response = await axios.post('http://services.codapdf/api/v1/html2pdf', data, { 
  headers: { 
    Authorization: 'Bearer YOUR_API_KEY', 
  } 
});
const data = await response.json()
console.log(data);
//Expected response: {"file_url":"http://storage.codapdf/pdfs/a076f35a-2cd8-41e6-ba45-7709c12f0d11.pdf"}
`;
export const AxiosSnippet = () => {
  return (
    <ReactCodeMirror
      value={snippet}
      theme={barf}
      width="100%"
      className="h-auto overflow-hidden text-lg"
      editable={false}
      extensions={[javascript()]}
    />
  );
};
