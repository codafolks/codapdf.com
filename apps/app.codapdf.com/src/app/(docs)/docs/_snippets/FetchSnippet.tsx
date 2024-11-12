import { env } from "@/constants/env.client";
import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror from "@uiw/react-codemirror";
import { barf } from "thememirror";
const snippet = `
const data = { 
  html: "<h1>Hello {{name}}</h1>",
  data: { name: "World" } 
}; 
const response = await fetch('${env.SERVICES_DOMAIN}/html2pdf', { 
  method: 'POST', 
  headers: { 
    'Authorization ': 'Bearer YOUR_API_KEY', 
    'Content-Type': 'application/json', 
  }, 
  body: JSON.stringify(data), 
})
const data = await response.json()
console.log(data);
//Expected response: {"file_url":"http://storage.codapdf/pdfs/a076f35a-2cd8-41e6-ba45-7709c12f0d11.pdf"}
`;
export const FetchSnippet = () => {
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
