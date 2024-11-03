import { env } from "@/constants/env.client";
import ReactCodeMirror from "@uiw/react-codemirror";
import { barf } from "thememirror";
const snippet = `
curl --request POST \\
--url ${env.SERVICES_DOMAIN}/html2pdf\\
--header 'Authorization: Bearer YOUR_API_KEY'\\
--data '{
  "html":"<h1>Hello {{name}}</h1>", 
  "data": {"name": "World"}
}'

// Expected response
{"file_url":"http://storage.codapdf/pdfs/a076f35a-2cd8-41e6-ba45-7709c12f0d11.pdf"}
`;
export const CurlSnippet = () => {
  return (
    <ReactCodeMirror
      value={snippet}
      theme={barf}
      width="100%"
      className="h-auto overflow-hidden text-lg"
      editable={false}
    />
  );
};
